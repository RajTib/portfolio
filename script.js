/* ==========================================================================
   Raj Tibarewala — portfolio interactions
   Progressive enhancement only: every section is readable without this file.
   Features: header state · mobile menu · section highlighting · diagram
   reveal · copy email.
   ========================================================================== */

'use strict';

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');

  /* ---------- Header background once the page scrolls ---------- */
  if (header) {
    const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* ---------- Mobile menu (disclosure pattern) ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('nav-panel');

  if (header && toggle && panel) {
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    const setOpen = (open, { restoreFocus = false } = {}) => {
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.toggle('menu-open', open);
      if (!open && restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Choosing a destination closes the menu.
    panel.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isOpen()) setOpen(false, { restoreFocus: true });
    });

    // Clicking outside the header closes the menu.
    document.addEventListener('click', event => {
      if (isOpen() && !header.contains(event.target)) setOpen(false);
    });

    // Returning to the desktop layout resets the menu state.
    window.matchMedia('(min-width: 900px)').addEventListener('change', event => {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Highlight the nav link for the section in view ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

  if (navLinks.length && 'IntersectionObserver' in window) {
    const linkFor = new Map(navLinks.map(link => [link.getAttribute('href').slice(1), link]));
    const targets = [document.getElementById('top'), ...Array.from(linkFor.keys(), id => document.getElementById(id))]
      .filter(Boolean);

    const setCurrent = id => {
      navLinks.forEach(link => link.removeAttribute('aria-current'));
      const link = linkFor.get(id);
      if (link) link.setAttribute('aria-current', 'true');
    };

    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    targets.forEach(target => spy.observe(target));
  }

  /* ---------- Flow diagrams: build left-to-right once, when first seen ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const flows = Array.from(document.querySelectorAll('.flow'));

    const reveal = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-running');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    flows.forEach(flow => {
      // Only arm diagrams that start below the fold, so nothing visible ever flickers.
      if (flow.getBoundingClientRect().top > window.innerHeight) {
        flow.classList.add('is-armed');
        reveal.observe(flow);
      }
    });
  }

  /* ---------- Copy email address ---------- */
  const copyButton = document.querySelector('[data-copy]');
  const copyStatus = document.getElementById('copy-status');

  if (copyButton && navigator.clipboard && window.isSecureContext) {
    const label = copyButton.querySelector('.copy-label');
    let resetTimer = null;

    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        copyButton.classList.add('is-done');
        if (label) label.textContent = 'Copied';
        if (copyStatus) copyStatus.textContent = 'Email address copied to clipboard';
      } catch {
        if (copyStatus) copyStatus.textContent = 'Copy failed. Select the address to copy it manually.';
      }
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyButton.classList.remove('is-done');
        if (label) label.textContent = 'Copy';
        if (copyStatus) copyStatus.textContent = '';
      }, 2200);
    });
  }
})();
