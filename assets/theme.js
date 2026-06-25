/* ==========================================================================
   LIMEN — theme.js
   Global foundation: utilities, focus management, reveal-on-scroll, and the
   shared accessible primitives (drawer, quantity input) used across the theme.
   Vanilla JS + Custom Elements only. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------- */
  /* Namespace + config                                                     */
  /* ---------------------------------------------------------------------- */
  const root = document.documentElement;
  const Limen = (window.Limen = window.Limen || {});

  Limen.config = Object.assign(
    {
      animationsEnabled: root.classList.contains('animations-enabled'),
      moneyFormat: '${{amount}}',
      routes: {}
    },
    window.LimenConfig || {}
  );

  Limen.strings = window.LimenStrings || {};

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------------------------- */
  /* Pub/Sub                                                                */
  /* ---------------------------------------------------------------------- */
  const subscribers = {};
  Limen.PUB_SUB_EVENTS = {
    cartUpdate: 'cart:update',
    cartError: 'cart:error',
    quantityUpdate: 'quantity:update',
    variantChange: 'variant:change'
  };
  Limen.subscribe = function (event, cb) {
    (subscribers[event] = subscribers[event] || []).push(cb);
    return function () {
      subscribers[event] = (subscribers[event] || []).filter((fn) => fn !== cb);
    };
  };
  Limen.publish = function (event, data) {
    (subscribers[event] || []).forEach((cb) => cb(data));
  };

  /* ---------------------------------------------------------------------- */
  /* Utilities                                                              */
  /* ---------------------------------------------------------------------- */
  Limen.debounce = function (fn, wait) {
    let t;
    return function () {
      const args = arguments;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  Limen.formatMoney = function (cents) {
    if (typeof cents === 'string') cents = cents.replace('.', '');
    const value = (cents / 100).toFixed(2);
    return Limen.config.moneyFormat.replace(/\{\{\s*amount\s*\}\}/, value);
  };

  Limen.fetchConfig = function (type) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: `application/${type || 'json'}`
      }
    };
  };

  /* Focus trapping ------------------------------------------------------- */
  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, details, [tabindex]:not([tabindex="-1"])';
  let trapHandler;

  Limen.trapFocus = function (container, elementToFocus) {
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    Limen.removeTrapFocus();
    trapHandler = function (e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trapHandler);
    (elementToFocus || first).focus();
  };

  Limen.removeTrapFocus = function (elementToFocus) {
    if (trapHandler) document.removeEventListener('keydown', trapHandler);
    trapHandler = null;
    if (elementToFocus) elementToFocus.focus();
  };

  /* Scroll lock ---------------------------------------------------------- */
  let scrollLockCount = 0;
  let scrollY = 0;
  Limen.lockScroll = function () {
    if (scrollLockCount === 0) {
      scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('scroll-locked');
    }
    scrollLockCount++;
  };
  Limen.unlockScroll = function () {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.classList.remove('scroll-locked');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Reveal on scroll                                                       */
  /* ---------------------------------------------------------------------- */
  function initReveals() {
    if (!Limen.config.animationsEnabled || prefersReducedMotion.matches) {
      document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------------------- */
  /* Custom element: <limen-drawer>                                         */
  /* Accessible off-canvas panel reused by menu, cart and filters.          */
  /* Markup: <limen-drawer id="..."> with [data-drawer-overlay],            */
  /* [data-drawer-panel], [data-drawer-close]; opened by                    */
  /* [aria-controls=<id>] buttons or Limen.openDrawer(id).                  */
  /* ---------------------------------------------------------------------- */
  class LimenDrawer extends HTMLElement {
    constructor() {
      super();
      this.panel = this.querySelector('[data-drawer-panel]') || this;
      this.overlay = this.querySelector('[data-drawer-overlay]');
      this.openers = [];
      this.activeOpener = null;
      this.onKeydown = this.onKeydown.bind(this);
    }

    connectedCallback() {
      this.setAttribute('aria-hidden', 'true');
      this.querySelectorAll('[data-drawer-close]').forEach((btn) =>
        btn.addEventListener('click', () => this.close())
      );
      if (this.overlay) this.overlay.addEventListener('click', () => this.close());

      this.openers = Array.from(document.querySelectorAll(`[aria-controls="${this.id}"]`));
      this.openers.forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.activeOpener = btn;
          this.open();
        });
      });
    }

    open() {
      this.classList.add('is-open');
      this.setAttribute('aria-hidden', 'false');
      this.openers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
      Limen.lockScroll();
      document.addEventListener('keydown', this.onKeydown);
      requestAnimationFrame(() => {
        const focusTarget = this.querySelector('[autofocus]') || this.panel;
        Limen.trapFocus(this.panel, focusTarget);
      });
      this.dispatchEvent(new CustomEvent('drawer:open', { bubbles: true }));
    }

    close() {
      if (!this.classList.contains('is-open')) return;
      this.classList.remove('is-open');
      this.setAttribute('aria-hidden', 'true');
      this.openers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      Limen.unlockScroll();
      document.removeEventListener('keydown', this.onKeydown);
      Limen.removeTrapFocus(this.activeOpener || undefined);
      this.dispatchEvent(new CustomEvent('drawer:close', { bubbles: true }));
    }

    onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    }
  }
  if (!customElements.get('limen-drawer')) customElements.define('limen-drawer', LimenDrawer);

  Limen.openDrawer = function (id) {
    const drawer = document.getElementById(id);
    if (drawer && typeof drawer.open === 'function') drawer.open();
  };
  Limen.closeDrawer = function (id) {
    const drawer = document.getElementById(id);
    if (drawer && typeof drawer.close === 'function') drawer.close();
  };

  /* ---------------------------------------------------------------------- */
  /* Custom element: <quantity-input>                                       */
  /* ---------------------------------------------------------------------- */
  class QuantityInput extends HTMLElement {
    constructor() {
      super();
      this.input = this.querySelector('input');
      this.changeEvent = new Event('change', { bubbles: true });
      this.querySelectorAll('button').forEach((btn) =>
        btn.addEventListener('click', this.onButtonClick.bind(this))
      );
      if (this.input) this.input.addEventListener('change', this.validate.bind(this));
    }

    onButtonClick(e) {
      e.preventDefault();
      const step = e.currentTarget.name === 'plus' ? 1 : -1;
      const current = parseInt(this.input.value, 10) || 0;
      const min = parseInt(this.input.min, 10) || 0;
      const max = this.input.max ? parseInt(this.input.max, 10) : Infinity;
      const next = Math.min(max, Math.max(min, current + step));
      if (next !== current) {
        this.input.value = next;
        this.input.dispatchEvent(this.changeEvent);
      }
    }

    validate() {
      const min = parseInt(this.input.min, 10) || 0;
      const max = this.input.max ? parseInt(this.input.max, 10) : Infinity;
      let value = parseInt(this.input.value, 10);
      if (isNaN(value) || value < min) value = min;
      if (value > max) value = max;
      this.input.value = value;
    }
  }
  if (!customElements.get('quantity-input')) customElements.define('quantity-input', QuantityInput);

  /* ---------------------------------------------------------------------- */
  /* Init                                                                   */
  /* ---------------------------------------------------------------------- */
  function init() {
    initReveals();
    // Re-run reveals when the Theme Editor loads a section.
    document.addEventListener('shopify:section:load', initReveals);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
