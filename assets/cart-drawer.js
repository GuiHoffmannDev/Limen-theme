/* ==========================================================================
   LIMEN — cart-drawer.js
   AJAX cart: line-item quantity/removal (<cart-items>) and add-to-cart
   enhancement that opens the drawer. Uses the Section Rendering API so the
   server-rendered Liquid stays the single source of truth. Progressive
   enhancement — every action has a working no-JS fallback (native forms /
   change links). Depends on window.Limen (theme.js).
   ========================================================================== */
(function () {
  'use strict';

  const Limen = window.Limen || {};
  const EVENTS = Limen.PUB_SUB_EVENTS || {};
  const routes = (Limen.config && Limen.config.routes) || {};

  /* ---------------------------------------------------------------------- */
  /* Helpers                                                                */
  /* ---------------------------------------------------------------------- */
  function parseHTML(text) {
    return new DOMParser().parseFromString(text, 'text/html');
  }

  // Section ids of every cart root on the page (cart drawer + cart page),
  // for the Section Rendering API `sections` parameter.
  function cartSectionIds() {
    const ids = [];
    document.querySelectorAll('[data-cart-root]').forEach((root) => {
      const id = root.dataset.sectionId;
      if (id && ids.indexOf(id) === -1) ids.push(id);
    });
    return ids;
  }

  // Swap the [data-cart-contents] region of every cart root from a sections map.
  function renderCartSections(sections) {
    if (!sections) return;
    document.querySelectorAll('[data-cart-root]').forEach((root) => {
      const html = sections[root.dataset.sectionId];
      if (!html) return;
      const fresh = parseHTML(html).querySelector('[data-cart-contents]');
      const target = root.querySelector('[data-cart-contents]');
      if (fresh && target) target.innerHTML = fresh.innerHTML;
    });
  }

  // Read the authoritative item count from a freshly rendered cart root.
  function readItemCount() {
    const contents = document.querySelector('[data-cart-root] [data-cart-contents]');
    if (contents && typeof contents.dataset.itemCount !== 'undefined') {
      return parseInt(contents.dataset.itemCount, 10) || 0;
    }
    return undefined;
  }

  function announce(message) {
    let region = document.getElementById('CartLiveRegion');
    if (!region) {
      region = document.createElement('div');
      region.id = 'CartLiveRegion';
      region.className = 'visually-hidden';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('role', 'status');
      document.body.appendChild(region);
    }
    region.textContent = '';
    requestAnimationFrame(() => {
      region.textContent = message;
    });
  }

  /* ---------------------------------------------------------------------- */
  /* <cart-items> — quantity change + removal for drawer and cart page      */
  /* ---------------------------------------------------------------------- */
  class CartItems extends HTMLElement {
    connectedCallback() {
      this.sectionId = this.dataset.sectionId;
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.addEventListener('change', this.onChange);
      this.addEventListener('click', this.onClick);
    }

    onChange(e) {
      const input = e.target;
      if (!input.matches('[data-quantity-key]')) return;
      const key = input.dataset.quantityKey;
      let qty = parseInt(input.value, 10);
      if (isNaN(qty) || qty < 0) qty = 0;
      this.updateQuantity(key, qty, input.closest('[data-cart-item]'));
    }

    onClick(e) {
      const remove = e.target.closest('[data-cart-remove]');
      if (!remove) return;
      e.preventDefault();
      this.updateQuantity(remove.dataset.key, 0, remove.closest('[data-cart-item]'));
    }

    updateQuantity(key, quantity, lineEl) {
      if (!routes.cartChange) return; // no-JS-style fallback: let links/forms work
      if (lineEl) lineEl.setAttribute('aria-busy', 'true');
      this.toggleAttribute('aria-busy', true);

      const body = JSON.stringify({
        id: key,
        quantity: quantity,
        sections: cartSectionIds().join(','),
        sections_url: window.location.pathname
      });

      fetch(routes.cartChange, Object.assign(Limen.fetchConfig('json'), { body }))
        .then((r) => r.json())
        .then((state) => {
          if (state.status) {
            this.showError(lineEl, state.message || state.description);
            if (EVENTS.cartError) Limen.publish(EVENTS.cartError, { message: state.message });
            return;
          }
          renderCartSections(state.sections);
          if (EVENTS.cartUpdate) {
            Limen.publish(EVENTS.cartUpdate, { cartCount: state.item_count, source: 'cart-items' });
          }
          announce(
            quantity === 0
              ? (Limen.strings.cartRemoved || 'Item removed')
              : (Limen.strings.cartUpdated || 'Cart updated')
          );
        })
        .catch(() => {
          if (lineEl) lineEl.removeAttribute('aria-busy');
        })
        .finally(() => {
          this.removeAttribute('aria-busy');
        });
    }

    showError(lineEl, message) {
      if (lineEl) lineEl.removeAttribute('aria-busy');
      const target = lineEl && lineEl.querySelector('[data-cart-item-error]');
      if (target && message) {
        target.textContent = message;
        target.hidden = false;
      }
    }
  }
  if (!customElements.get('cart-items')) customElements.define('cart-items', CartItems);

  /* ---------------------------------------------------------------------- */
  /* Add to cart — one delegated handler for product page, featured product  */
  /* and quick-add cards. Only enhances when a cart drawer is present;        */
  /* otherwise the native form submit (→ /cart → checkout) is left untouched. */
  /* ---------------------------------------------------------------------- */
  function initAddToCart() {
    if (window.__limenCartBound) return;
    window.__limenCartBound = true;

    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      const action = form.getAttribute('action') || '';
      const addButton = form.querySelector('[data-add-to-cart]');
      const drawer = document.getElementById('CartDrawer');
      if (!addButton || action.indexOf('/cart/add') === -1 || !drawer) return;

      e.preventDefault();
      addToCart(form, addButton, drawer);
    });
  }

  function addToCart(form, button, drawer) {
    button.setAttribute('aria-busy', 'true');
    const errorTarget = form.querySelector('[data-cart-error]');
    if (errorTarget) {
      errorTarget.hidden = true;
      errorTarget.textContent = '';
    }

    const body = new FormData(form);
    const drawerSection = drawer.dataset.sectionId;
    if (drawerSection) {
      body.append('sections', drawerSection);
      body.append('sections_url', window.location.pathname);
    }

    fetch(routes.cartAdd || '/cart/add.js', {
      method: 'POST',
      headers: { Accept: 'application/javascript', 'X-Requested-With': 'XMLHttpRequest' },
      body: body
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status) {
          if (errorTarget) {
            errorTarget.textContent = data.description || data.message || '';
            errorTarget.hidden = false;
          }
          if (EVENTS.cartError) Limen.publish(EVENTS.cartError, { message: data.description });
          return;
        }
        renderCartSections(data.sections);
        const count = readItemCount();
        if (EVENTS.cartUpdate) {
          Limen.publish(EVENTS.cartUpdate, { cartCount: count, source: 'add-to-cart', product: data });
        }
        announce(Limen.strings.cartItemAdded || 'Item added to your cart');
        if (typeof drawer.open === 'function') drawer.open();
      })
      .catch(() => {
        if (errorTarget) {
          errorTarget.textContent = Limen.strings.cartGenericError || '';
          errorTarget.hidden = false;
        }
      })
      .finally(() => {
        button.removeAttribute('aria-busy');
      });
  }

  if (document.readyState !== 'loading') initAddToCart();
  else document.addEventListener('DOMContentLoaded', initAddToCart);
})();
