/* ==========================================================================
   LIMEN — header.js
   <limen-header>: sticky behaviour, transparent-over-hero contrast switch,
   mobile submenu disclosures, and country/language disclosure polish.
   Loaded by the header section. Depends on window.Limen (theme.js).
   ========================================================================== */
(function () {
  'use strict';

  const Limen = window.Limen || {};

  /* ---------------------------------------------------------------------- */
  /* <limen-header>                                                          */
  /* ---------------------------------------------------------------------- */
  class LimenHeader extends HTMLElement {
    connectedCallback() {
      this.sticky = this.hasAttribute('data-sticky');
      this.transparent = this.hasAttribute('data-transparent');
      this.scrolled = false;
      this.ticking = false;
      this.onScroll = this.onScroll.bind(this);
      // Positioning is applied to the section-group wrapper (or the section
      // wrapper as a fallback) so sticky resolves against the page, not this
      // short box. CSS makes the group sticky by default; only the non-default
      // cases need a class.
      this.group = this.closest('.shopify-section-group-header-group');
      this.positionEl = this.group || this.closest('.shopify-section');

      if (this.positionEl) {
        if (this.transparent) this.positionEl.classList.add('is-transparent');
        else if (!this.sticky) this.positionEl.classList.add('is-static');
        else if (!this.group) this.positionEl.classList.add('is-sticky');
      }

      this.initSubmenuToggles();
      this.initDisclosures();

      if (this.sticky || this.transparent) {
        this.update();
        window.addEventListener('scroll', this.onScroll, { passive: true });
      }
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
    }

    update() {
      // Past the threshold once the page has scrolled a little: gain a solid,
      // contrasting background. Transparent headers also drop transparency
      // and anchor to the top of the viewport.
      const past = window.scrollY > 8;
      if (past === this.scrolled) return;
      this.scrolled = past;
      this.classList.toggle('is-scrolled', past);
      if (this.transparent) {
        this.classList.toggle('is-solid', past);
        if (this.positionEl) this.positionEl.classList.toggle('is-fixed', past);
      }
    }

    /* Mobile drawer: expand/collapse child menus -------------------------- */
    initSubmenuToggles() {
      this.querySelectorAll('[data-submenu-toggle]').forEach((btn) => {
        const panel = this.querySelector('#' + btn.getAttribute('aria-controls'));
        if (!panel) return;
        btn.addEventListener('click', () => {
          const open = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!open));
          panel.hidden = open;
        });
      });
    }

    /* Country / language <details> disclosures: close on Escape + outside -- */
    initDisclosures() {
      this.disclosures = Array.from(this.querySelectorAll('[data-disclosure]'));
      if (!this.disclosures.length) return;

      this.onDocClick = (e) => {
        this.disclosures.forEach((d) => {
          if (d.open && !d.contains(e.target)) d.open = false;
        });
      };
      this.onDocKey = (e) => {
        if (e.key !== 'Escape') return;
        this.disclosures.forEach((d) => {
          if (d.open) {
            d.open = false;
            const summary = d.querySelector('summary');
            if (summary) summary.focus();
          }
        });
      };
      document.addEventListener('click', this.onDocClick);
      document.addEventListener('keydown', this.onDocKey);
    }
  }
  if (!customElements.get('limen-header')) customElements.define('limen-header', LimenHeader);

  /* ---------------------------------------------------------------------- */
  /* Cart count: keep header badge in sync with cart updates (Stage 4 AJAX). */
  /* ---------------------------------------------------------------------- */
  if (Limen.subscribe && Limen.PUB_SUB_EVENTS) {
    Limen.subscribe(Limen.PUB_SUB_EVENTS.cartUpdate, (data) => {
      if (!data || typeof data.cartCount === 'undefined') return;
      document.querySelectorAll('[data-cart-count]').forEach((el) => {
        el.textContent = data.cartCount;
        el.toggleAttribute('hidden', data.cartCount === 0);
      });
    });
  }
})();
