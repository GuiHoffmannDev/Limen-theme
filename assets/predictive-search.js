/* ==========================================================================
   LIMEN — predictive-search.js
   <predictive-search>: progressive enhancement over the native search form.
   Without JS the form still submits to /search. With JS it fetches live
   results from the predictive-search section and renders an accessible
   combobox (ARIA 1.2 pattern) with keyboard navigation.
   ========================================================================== */
(function () {
  'use strict';

  const Limen = window.Limen || {};
  const routes = (Limen.config && Limen.config.routes) || {};

  class PredictiveSearch extends HTMLElement {
    constructor() {
      super();
      this.input = this.querySelector('input[type="search"]');
      this.results = this.querySelector('[data-predictive-results]');
      this.reset = this.querySelector('[data-predictive-reset]');
      this.sectionId = this.dataset.sectionId || 'predictive-search';
      this.cache = {};
      this.abortController = null;
    }

    connectedCallback() {
      if (!this.input || !this.results || !routes.predictiveSearch) return;

      this.input.setAttribute('role', 'combobox');
      this.input.setAttribute('aria-expanded', 'false');
      this.input.setAttribute('aria-autocomplete', 'list');
      this.input.setAttribute('autocomplete', 'off');
      this.results.setAttribute('role', 'listbox');

      const run = Limen.debounce ? Limen.debounce(this.search.bind(this), 240) : this.search.bind(this);
      this.input.addEventListener('input', run);
      this.input.addEventListener('keydown', this.onKeydown.bind(this));
      if (this.reset) this.reset.addEventListener('click', () => this.clear());

      // Close results when the surrounding drawer closes.
      const drawer = this.closest('limen-drawer');
      if (drawer) drawer.addEventListener('drawer:close', () => this.clear());
    }

    get term() {
      return (this.input.value || '').trim();
    }

    search() {
      const term = this.term;
      if (term.length < 2) {
        this.close();
        return;
      }
      if (this.cache[term]) {
        this.render(this.cache[term]);
        return;
      }

      if (this.abortController) this.abortController.abort();
      this.abortController = new AbortController();
      this.setLoading(true);

      const params =
        'q=' +
        encodeURIComponent(term) +
        '&section_id=' +
        encodeURIComponent(this.sectionId) +
        '&resources[type]=product,article,page,query&resources[limit]=6&resources[limit_scope]=each';
      const url =
        routes.predictiveSearch + (routes.predictiveSearch.indexOf('?') === -1 ? '?' : '&') + params;

      fetch(url, { signal: this.abortController.signal })
        .then((r) => r.text())
        .then((text) => {
          const doc = new DOMParser().parseFromString(text, 'text/html');
          const fresh = doc.querySelector('[data-predictive-results]');
          const html = fresh ? fresh.innerHTML : '';
          this.cache[term] = html;
          this.render(html);
        })
        .catch((e) => {
          if (e.name !== 'AbortError') this.close();
        })
        .finally(() => this.setLoading(false));
    }

    render(html) {
      this.results.innerHTML = html;
      this.open();
    }

    setLoading(state) {
      this.toggleAttribute('aria-busy', state);
      this.classList.toggle('is-loading', state);
    }

    open() {
      this.classList.add('is-open');
      this.input.setAttribute('aria-expanded', 'true');
    }

    close() {
      this.classList.remove('is-open');
      this.input.setAttribute('aria-expanded', 'false');
      this.activeIndex = -1;
    }

    clear() {
      if (this.input) this.input.value = '';
      this.results.innerHTML = '';
      this.close();
    }

    get options() {
      return Array.from(this.results.querySelectorAll('[role="option"]'));
    }

    onKeydown(e) {
      const opts = this.options;
      if (!this.classList.contains('is-open') || !opts.length) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const dir = e.key === 'ArrowDown' ? 1 : -1;
        this.activeIndex = ((this.activeIndex == null ? -1 : this.activeIndex) + dir + opts.length) % opts.length;
        opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === this.activeIndex)));
        const active = opts[this.activeIndex];
        active.scrollIntoView({ block: 'nearest' });
        this.input.setAttribute('aria-activedescendant', active.id || '');
      } else if (e.key === 'Enter' && this.activeIndex != null && this.activeIndex > -1) {
        const link = opts[this.activeIndex].querySelector('a');
        if (link) {
          e.preventDefault();
          window.location.href = link.href;
        }
      } else if (e.key === 'Escape') {
        this.close();
      }
    }
  }

  if (!customElements.get('predictive-search')) customElements.define('predictive-search', PredictiveSearch);
})();
