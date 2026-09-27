/* ==========================================================================
   Raj Tibarewala — portfolio interactions
   Progressive enhancement only: every section is readable without this file.
   Features: header state · mobile menu · section highlighting · project
   lens (filter) · diagram reveal · copy email.
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

    // Clicking outside the header, or tabbing out of it, closes the menu.
    document.addEventListener('click', event => {
      if (isOpen() && !header.contains(event.target)) setOpen(false);
    });

    header.addEventListener('focusout', event => {
      if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
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

    const lastId = navLinks[navLinks.length - 1].getAttribute('href').slice(1);
    const atPageEnd = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    const spy = new IntersectionObserver(entries => {
      if (atPageEnd()) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    targets.forEach(target => spy.observe(target));

    // The last section can be too short to ever cross the detection band on tall screens.
    window.addEventListener('scroll', () => {
      if (atPageEnd()) setCurrent(lastId);
    }, { passive: true });

    // Reflect the choice immediately instead of waiting for the scroll to finish.
    navLinks.forEach(link => link.addEventListener('click', () => setCurrent(link.getAttribute('href').slice(1))));
  }

  /* ---------- Flow diagrams: build left-to-right once, when first seen ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const flows = Array.from(document.querySelectorAll('.flow'));

    const reveal = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Swap (not add) so no hidden state lingers for print or later style changes.
        entry.target.classList.replace('is-armed', 'is-running');
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

  /* ---------- Work lens: filter projects by focus ---------- */
  const lensBar = document.querySelector('.work-lens');
  const work = document.getElementById('work');

  if (lensBar && work) {
    const buttons = Array.from(lensBar.querySelectorAll('.lens'));
    const countEl = lensBar.querySelector('.lens-count');
    const statusEl = document.getElementById('lens-status');
    const cases = Array.from(work.querySelectorAll('.case'));
    const alsoItems = Array.from(work.querySelectorAll('.also-list li'));
    const alsoBlock = work.querySelector('.also');
    const items = [...cases, ...alsoItems];
    const total = items.length;

    const labels = { all: 'All', aiml: 'AI/ML', software: 'Software', systems: 'Systems', cv: 'Computer Vision', security: 'Security' };
    const matches = (el, lens) => lens === 'all' || (el.dataset.genres || '').split(' ').includes(lens);

    const apply = (lens, announce) => {
      const survivors = [];
      items.forEach(el => {
        const ok = matches(el, lens);
        el.hidden = !ok;
        el.querySelectorAll('.genre').forEach(g => {
          g.classList.toggle('is-lit', lens !== 'all' && ok && g.dataset.g === lens);
        });
        if (ok) survivors.push(el);
      });

      // Hide the "Also built" block entirely when none of its items match.
      if (alsoBlock) alsoBlock.hidden = !alsoItems.some(li => !li.hidden);

      const shown = survivors.length;
      if (countEl) countEl.textContent = shown === total ? total + ' projects' : shown + ' / ' + total + ' shown';
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lens === lens)));

      if (announce) {
        if (!reduceMotion) {
          survivors.forEach((el, i) => {
            el.classList.remove('lens-rise');
            void el.offsetWidth; // restart the entrance animation
            el.style.animationDelay = (i * 55) + 'ms';
            el.classList.add('lens-rise');
            el.addEventListener('animationend', () => {
              el.classList.remove('lens-rise');
              el.style.animationDelay = '';
            }, { once: true });
          });
        }
        if (statusEl) statusEl.textContent = (labels[lens] || lens) + ' — ' + shown + ' project' + (shown === 1 ? '' : 's') + ' shown';
      }
    };

    lensBar.hidden = false;
    buttons.forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.lens, true)));
    apply('all', false);

    // A link to a project that the current lens has filtered out can't scroll to a
    // hidden target — reset to "All" first so the anchor still lands.
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target && items.includes(target) && target.hidden) apply('all', false);
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
