/* ==========================================================================
   LIMEN — facets.js
   Collection filtering + sorting with the Section Rendering API: updates the
   product grid, result count and filter UI without a full reload, and keeps
   the address bar in sync (shareable, back-button friendly). Without JS the
   filter form and sort select submit as normal GET navigations.
   Depends on window.Limen (theme.js).
   ========================================================================== */
(function () {
  'use strict';

  const Limen = window.Limen || {};
  const debounce = Limen.debounce || ((fn) => fn);

  function root() {
    return document.querySelector('[data-facet-results]');
  }
  function sectionId() {
    const r = root();
    return r ? r.dataset.sectionId : null;
  }
  function parseHTML(text) {
    return new DOMParser().parseFromString(text, 'text/html');
  }

  function setLoading(state) {
    const r = root();
    if (r) r.classList.toggle('is-loading', state);
  }

  // Drop empty values (e.g. untouched price inputs) and pagination.
  function cleanParams(params) {
    const out = new URLSearchParams();
    params.forEach((value, key) => {
      if (value !== '' && key !== 'page') out.append(key, value);
    });
    return out;
  }

  function applyFromForm(form) {
    const action = new URL(form.action, window.location.origin);
    const params = cleanParams(new URLSearchParams(new FormData(form)));
    const current = new URLSearchParams(window.location.search);
    if (current.get('sort_by') && !params.has('sort_by')) {
      params.set('sort_by', current.get('sort_by'));
    }
    applyURL(action.pathname + '?' + params.toString());
  }

  function applyFromSort(select) {
    const params = new URLSearchParams(window.location.search);
    params.set('sort_by', select.value);
    params.delete('page');
    applyURL(window.location.pathname + '?' + params.toString());
  }

  function applyURL(url, fromPopState) {
    const id = sectionId();
    if (!id) {
      window.location.href = url;
      return;
    }
    setLoading(true);
    const sep = url.indexOf('?') === -1 ? '?' : '&';
    fetch(url + sep + 'section_id=' + id)
      .then((r) => r.text())
      .then((text) => {
        const doc = parseHTML(text);
        swap(doc, '[data-product-grid]');
        swap(doc, '[data-facet-count]');
        swapFacets(doc);
        if (!fromPopState) window.history.pushState({ facets: true }, '', url);
        // Move focus to the results region for screen-reader continuity.
        const grid = document.querySelector('[data-product-grid]');
        if (grid && !fromPopState) grid.setAttribute('tabindex', '-1');
      })
      .catch(() => {
        window.location.href = url;
      })
      .finally(() => setLoading(false));
  }

  function swap(doc, selector) {
    const fresh = doc.querySelector(selector);
    const target = document.querySelector(selector);
    if (fresh && target) target.innerHTML = fresh.innerHTML;
  }

  // Keep both filter instances (desktop aside + mobile drawer) in sync.
  function swapFacets(doc) {
    document.querySelectorAll('facet-filters').forEach((el) => {
      const fresh = doc.querySelector('facet-filters[data-context="' + el.dataset.context + '"]');
      if (fresh) {
        el.innerHTML = fresh.innerHTML;
        el.classList.add('is-enhanced');
      }
    });
  }

  /* Delegated listeners — survive innerHTML swaps without re-binding. -------- */
  function init() {
    document.querySelectorAll('facet-filters').forEach((el) => el.classList.add('is-enhanced'));

    const onFormInput = debounce((e) => {
      const form = e.target.closest('[data-facet-form]');
      const facet = e.target.closest('facet-filters');
      if (!form || !facet) return;
      // Auto-apply on the desktop aside; the drawer waits for the Apply button.
      if (facet.dataset.context === 'inline') applyFromForm(form);
    }, 450);

    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-facet-sort]')) {
        applyFromSort(e.target);
        return;
      }
      if (e.target.closest('[data-facet-form]')) onFormInput(e);
    });

    document.addEventListener('submit', (e) => {
      const form = e.target.closest('[data-facet-form]');
      if (!form) return;
      e.preventDefault();
      applyFromForm(form);
      const drawer = form.closest('limen-drawer');
      if (drawer && typeof drawer.close === 'function') drawer.close();
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-facet-remove], [data-facet-clear-all]');
      if (!link) return;
      e.preventDefault();
      applyURL(link.getAttribute('href'));
    });

    window.addEventListener('popstate', () => {
      if (root()) applyURL(window.location.pathname + window.location.search, true);
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
