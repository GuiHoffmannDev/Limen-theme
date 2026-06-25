/* ==========================================================================
   LIMEN — product.js
   Product page interactivity: variant selection (<variant-radios>) and the
   media gallery (<product-media-gallery>) with keyboard navigation and an
   optional accessible zoom lightbox. Add-to-cart is handled globally by
   cart-drawer.js. Variant pricing/availability is re-rendered from Liquid via
   the Section Rendering API, so the server stays the source of truth.
   Vanilla JS + Custom Elements. Depends on window.Limen (theme.js).
   ========================================================================== */
(function () {
  'use strict';

  const Limen = window.Limen || {};
  const EVENTS = Limen.PUB_SUB_EVENTS || {};

  function parseHTML(text) {
    return new DOMParser().parseFromString(text, 'text/html');
  }

  /* ---------------------------------------------------------------------- */
  /* <variant-radios>                                                        */
  /* ---------------------------------------------------------------------- */
  class VariantRadios extends HTMLElement {
    connectedCallback() {
      this.sectionId = this.dataset.section;
      this.productUrl = this.dataset.url;
      this.updateUrl = this.dataset.updateUrl !== 'false';

      const dataEl = this.querySelector('[data-variant-data]');
      this.variants = dataEl ? JSON.parse(dataEl.textContent) : [];

      const mediaEl = this.querySelector('[data-variant-media]');
      this.mediaMap = {};
      if (mediaEl) {
        try {
          JSON.parse(mediaEl.textContent).forEach((pair) => {
            if (!pair) return;
            const [id, mediaId] = pair.split(':');
            this.mediaMap[id] = mediaId;
          });
        } catch (e) {
          /* ignore */
        }
      }

      this.form = document.getElementById(this.dataset.form) || this.closest('form');
      this.idInput = this.form ? this.form.querySelector('[data-product-id-input]') : null;
      // Enabled only under JS — the no-JS <select name="id"> fallback submits otherwise.
      if (this.idInput) this.idInput.disabled = false;

      this.onChange = this.onChange.bind(this);
      this.addEventListener('change', this.onChange);
      this.updateAvailability();
    }

    get selectedValues() {
      return Array.from(this.querySelectorAll('input[type="radio"]:checked'))
        .sort((a, b) => a.dataset.optionIndex - b.dataset.optionIndex)
        .map((input) => input.value);
    }

    getVariant(values) {
      const want = values || this.selectedValues;
      return this.variants.find((v) => {
        const opts = v.options || [v.option1, v.option2, v.option3].filter((o) => o != null);
        return opts.length === want.length && opts.every((o, i) => o === want[i]);
      });
    }

    onChange() {
      this.updateSelectedLabels();
      this.updateAvailability();

      const variant = this.getVariant();
      const addButton = this.form && this.form.querySelector('[data-add-to-cart]');

      if (!variant) {
        if (this.idInput) this.idInput.value = '';
        this.setAddButton(addButton, false, true);
        if (EVENTS.variantChange) Limen.publish(EVENTS.variantChange, { variant: null, sectionId: this.sectionId });
        return;
      }

      this.current = variant;
      if (this.idInput) this.idInput.value = variant.id;
      this.setAddButton(addButton, variant.available, false);
      this.updateAddress(variant);
      this.renderInfo(variant);

      if (EVENTS.variantChange) {
        Limen.publish(EVENTS.variantChange, {
          variant: variant,
          sectionId: this.sectionId,
          featuredMediaId: this.mediaMap[variant.id]
        });
      }
    }

    updateSelectedLabels() {
      this.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
        const out = this.querySelector('[data-selected-value="' + input.dataset.optionIndex + '"]');
        if (out) out.textContent = input.value;
      });
    }

    // Mark option values that no available variant can satisfy, given earlier
    // selections (progressive disclosure of availability).
    updateAvailability() {
      const fieldsets = Array.from(this.querySelectorAll('.variant-picker__option'));
      const chosen = this.selectedValues;
      fieldsets.forEach((fieldset, fIndex) => {
        fieldset.querySelectorAll('input[type="radio"]').forEach((input) => {
          const candidate = chosen.slice();
          candidate[fIndex] = input.value;
          const ok = this.variants.some((v) => {
            const opts = v.options || [v.option1, v.option2, v.option3].filter((o) => o != null);
            for (let i = 0; i <= fIndex; i++) {
              if (opts[i] !== candidate[i]) return false;
            }
            return v.available;
          });
          const label = input.nextElementSibling;
          if (label) label.classList.toggle('is-unavailable', !ok);
        });
      });
    }

    setAddButton(button, available, noVariant) {
      if (!button) return;
      const text = button.querySelector('[data-add-text]');
      if (available) {
        button.removeAttribute('disabled');
        if (text) text.textContent = button.dataset.textAdd;
      } else {
        button.setAttribute('disabled', 'disabled');
        if (text) text.textContent = noVariant ? button.dataset.textUnavailable : button.dataset.textSoldOut;
      }
    }

    updateAddress(variant) {
      if (!this.updateUrl || !variant) return;
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }

    renderInfo(variant) {
      if (!this.productUrl || !this.sectionId) return;
      const url = this.productUrl + (this.productUrl.indexOf('?') === -1 ? '?' : '&') +
        'variant=' + variant.id + '&section_id=' + this.sectionId;

      const scope = this.closest('.product') || document;
      fetch(url)
        .then((r) => r.text())
        .then((text) => {
          const doc = parseHTML(text);
          ['price', 'inventory', 'sku', 'pickup'].forEach((region) => {
            const fresh = doc.querySelector('[data-update="' + region + '"]');
            const target = scope.querySelector('[data-update="' + region + '"]');
            if (fresh && target) target.innerHTML = fresh.innerHTML;
          });
        })
        .catch(() => {
          /* leave existing values in place */
        });
    }
  }
  if (!customElements.get('variant-radios')) customElements.define('variant-radios', VariantRadios);

  /* ---------------------------------------------------------------------- */
  /* <product-media-gallery>                                                 */
  /* ---------------------------------------------------------------------- */
  class ProductMediaGallery extends HTMLElement {
    connectedCallback() {
      this.media = Array.from(this.querySelectorAll('[data-gallery-media]'));
      this.thumbs = Array.from(this.querySelectorAll('[data-gallery-thumb]'));
      this.zoomEnabled = this.dataset.zoom === 'true';

      this.thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => this.setActive(thumb.dataset.mediaId, true));
        thumb.addEventListener('keydown', (e) => this.onThumbKeydown(e, i));
      });

      if (this.zoomEnabled) {
        this.querySelectorAll('[data-gallery-zoom]').forEach((btn) =>
          btn.addEventListener('click', () => this.openZoom(btn))
        );
      }

      if (EVENTS.variantChange) {
        this.unsubscribe = Limen.subscribe(EVENTS.variantChange, (data) => {
          if (data && data.featuredMediaId) this.setActive(String(data.featuredMediaId), false);
        });
      }
    }

    disconnectedCallback() {
      if (this.unsubscribe) this.unsubscribe();
    }

    setActive(mediaId, fromUser) {
      const active = this.media.find((m) => m.dataset.mediaId === mediaId);
      if (!active) return;

      this.media.forEach((m) => {
        const isActive = m === active;
        m.classList.toggle('is-active', isActive);
        if (!isActive) this.pauseMedia(m);
      });
      this.thumbs.forEach((t) => {
        const isActive = t.dataset.mediaId === mediaId;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      // Mobile: the stage is a horizontal scroller; bring the media into view.
      if (window.matchMedia('(max-width: 989px)').matches) {
        active.scrollIntoView({ behavior: fromUser ? 'smooth' : 'auto', block: 'nearest', inline: 'center' });
      }
    }

    pauseMedia(el) {
      const video = el.querySelector('video');
      if (video && !video.paused) video.pause();
      const iframe = el.querySelector('iframe');
      if (iframe) iframe.src = iframe.src; // stop external video
    }

    onThumbKeydown(e, index) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = (index + dir + this.thumbs.length) % this.thumbs.length;
      this.thumbs[next].focus();
      this.setActive(this.thumbs[next].dataset.mediaId, true);
    }

    openZoom(button) {
      const src = button.dataset.zoomSrc;
      const alt = button.dataset.zoomAlt || '';
      if (!src) return;

      const overlay = document.createElement('div');
      overlay.className = 'product-zoom';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', alt || (Limen.strings.zoomLabel || 'Zoom image'));
      overlay.innerHTML =
        '<button type="button" class="product-zoom__close drawer__close" data-zoom-close aria-label="' +
        (Limen.strings.close || 'Close') +
        '">&times;</button><img class="product-zoom__image" src="' +
        src.replace(/"/g, '&quot;') +
        '" alt="' +
        alt.replace(/"/g, '&quot;') +
        '">';

      const close = () => {
        document.removeEventListener('keydown', onKey);
        Limen.unlockScroll && Limen.unlockScroll();
        Limen.removeTrapFocus && Limen.removeTrapFocus(button);
        overlay.remove();
      };
      const onKey = (e) => {
        if (e.key === 'Escape') close();
      };

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('[data-zoom-close]')) close();
      });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(overlay);
      Limen.lockScroll && Limen.lockScroll();
      requestAnimationFrame(() => {
        overlay.classList.add('is-open');
        Limen.trapFocus && Limen.trapFocus(overlay, overlay.querySelector('[data-zoom-close]'));
      });
    }
  }
  if (!customElements.get('product-media-gallery')) {
    customElements.define('product-media-gallery', ProductMediaGallery);
  }

  /* ---------------------------------------------------------------------- */
  /* <product-recommendations> — lazy related / complementary products       */
  /* Fetches the product recommendations route (Section Rendering API) and    */
  /* injects the matching block; removes itself when there is nothing to show. */
  /* ---------------------------------------------------------------------- */
  class ProductRecommendations extends HTMLElement {
    connectedCallback() {
      const url = this.dataset.url;
      const target = this.querySelector('[data-recommendation-list]');
      if (!url || !target) return;

      const observer = new IntersectionObserver(
        (entries, obs) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();
          fetch(url)
            .then((r) => r.text())
            .then((text) => {
              const fresh = parseHTML(text).querySelector('[data-recommendation-list]');
              if (fresh && fresh.children.length) {
                target.innerHTML = fresh.innerHTML;
                this.classList.add('is-loaded');
              } else {
                this.remove();
              }
            })
            .catch(() => this.remove());
        },
        { rootMargin: '0px 0px 400px 0px' }
      );
      observer.observe(this);
    }
  }
  if (!customElements.get('product-recommendations')) {
    customElements.define('product-recommendations', ProductRecommendations);
  }
})();
