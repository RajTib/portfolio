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

  /* ======================================================================
     CREATIVE LAYER — ambient environment, custom cursor, kinetic hero,
     scroll reveals, section continuity. All progressive enhancement.
     ====================================================================== */
  const root = document.documentElement;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasIO = 'IntersectionObserver' in window;

  // Shared normalized pointer position (-0.5 .. 0.5), read by the canvas.
  let ptrNX = 0;
  let ptrNY = 0;

  // js-fx unlocks the animated layer (name sheen, reveals, section lighting).
  if (!reduceMotion) root.classList.add('js-fx');

  /* ---------- Entry sequence: drop the boot overlay once it fades ---------- */
  const boot = document.getElementById('boot');
  if (boot) {
    const killBoot = () => { if (boot.parentNode) boot.remove(); };
    let alreadyBooted = false;
    try { alreadyBooted = sessionStorage.getItem('rt-booted') === '1'; } catch (e) { /* private mode */ }
    if (alreadyBooted) {
      // Seen the entry sequence this session — don't gate return visits.
      killBoot();
    } else {
      try { sessionStorage.setItem('rt-booted', '1'); } catch (e) { /* ignore */ }
      boot.addEventListener('animationend', event => {
        if (event.animationName === 'boot-out') killBoot();
      });
      window.setTimeout(killBoot, 2500); // fallback if animationend never lands
    }
  }

  /* ---------- Pointer → ambient lighting + parallax ---------- */
  if (finePointer && !reduceMotion) {
    let lastX = window.innerWidth * 0.72;
    let lastY = window.innerHeight * 0.3;
    let queued = false;
    let pointerLit = false;

    const applyPointer = () => {
      queued = false;
      const rx = lastX / window.innerWidth;
      const ry = lastY / window.innerHeight;
      root.style.setProperty('--mx', (rx * 100).toFixed(2) + '%');
      root.style.setProperty('--my', (ry * 100).toFixed(2) + '%');
      if (!pointerLit) {
        pointerLit = true;
        root.style.setProperty('--pointer', '1');
      }
      ptrNX = rx - 0.5;
      ptrNY = ry - 0.5;
    };

    window.addEventListener('pointermove', event => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(applyPointer);
      }
    }, { passive: true });
  }

  /* ---------- Ambient background: drifting stars + constellation links ----- */
  const canvas = document.getElementById('fx-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d', { alpha: true });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 118;
    let w = 0;
    let h = 0;
    let points = [];
    let raf = 0;
    let running = false;
    let ex = 0; // eased parallax
    let ey = 0;

    const rand = (a, b) => a + Math.random() * (b - a);

    const build = () => {
      const target = Math.min(Math.round((w * h) / 15000), 110);
      points = [];
      for (let i = 0; i < target; i++) {
        const z = rand(0.3, 1);
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: z,
          r: 0.4 + z * 1.1,
          vx: rand(-0.06, 0.06),
          vy: rand(-0.05, 0.02),
          dx: 0,
          dy: 0
        });
      }
    };

    const resize = () => {
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    };

    const render = (animate) => {
      ctx.clearRect(0, 0, w, h);
      ex += (ptrNX - ex) * 0.05;
      ey += (ptrNY - ey) * 0.05;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
          if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
        }
        p.dx = p.x + ex * 28 * p.z;
        p.dy = p.y + ey * 28 * p.z;
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(150, 200, 212,' + (0.1 + p.z * 0.32) + ')';
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.dx - b.dx;
          const dy = a.dy - b.dy;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.14;
            ctx.strokeStyle = 'rgba(47, 220, 230,' + alpha + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.dx, a.dy);
            ctx.lineTo(b.dx, b.dy);
            ctx.stroke();
          }
        }
      }

      if (animate && running) raf = requestAnimationFrame(() => render(true));
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(() => render(true));
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduceMotion) render(false);
      }, 180);
    }, { passive: true });

    resize();

    if (reduceMotion) {
      render(false); // one calm, static frame
    } else {
      start();
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
      });
    }
  }

  /* ---------- Custom cursor (fine pointer, motion allowed) ---------- */
  if (finePointer && !reduceMotion) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    const pulse = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    pulse.className = 'cursor-pulse';
    [dot, ring, pulse].forEach(el => {
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    });
    root.classList.add('has-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    window.addEventListener('pointermove', event => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    }, { passive: true });

    const follow = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);

    const linkSel = 'a, button, summary, .lens, [role="button"], input, label';
    document.addEventListener('pointerover', event => {
      const el = event.target;
      if (!el || !el.closest) return;
      const inLink = el.closest(linkSel);
      const inCase = el.closest('.case');
      ring.classList.toggle('is-link', !!inLink);
      ring.classList.toggle('is-target', !!inCase && !inLink);
    });

    window.addEventListener('pointerdown', event => {
      ring.classList.add('is-down');
      pulse.style.setProperty('--cx', event.clientX + 'px');
      pulse.style.setProperty('--cy', event.clientY + 'px');
      pulse.classList.remove('is-firing');
      void pulse.offsetWidth;
      pulse.classList.add('is-firing');
    }, { passive: true });
    window.addEventListener('pointerup', () => ring.classList.remove('is-down'), { passive: true });

    // Hide the custom cursor when the pointer leaves the window.
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '';
      ring.style.opacity = '';
    });

    // Magnetic pull on primary controls.
    document.querySelectorAll('.btn, .nav-resume, .contact-email').forEach(el => {
      el.classList.add('magnetic');
      el.addEventListener('pointermove', event => {
        const r = el.getBoundingClientRect();
        const dx = event.clientX - (r.left + r.width / 2);
        const dy = event.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (dx * 0.16).toFixed(1) + 'px,' + (dy * 0.22).toFixed(1) + 'px)';
      }, { passive: true });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Case studies: directional light follows the cursor ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.case').forEach(caseEl => {
      caseEl.addEventListener('pointermove', event => {
        const r = caseEl.getBoundingClientRect();
        caseEl.style.setProperty('--px', ((event.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        caseEl.style.setProperty('--py', ((event.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      }, { passive: true });
    });
  }

  /* ---------- Hero: rotating identity signal (scramble + swap) ---------- */
  const rotator = document.querySelector('[data-rotator]');
  if (rotator && !reduceMotion) {
    const word = rotator.querySelector('.rot-word');
    const phrases = [
      'Building intelligent systems',
      'AI / ML engineer',
      'Edge AI engineer',
      'Computer vision researcher',
      'Autonomous systems R&D',
      'Backend systems builder',
      'Machine learning engineer'
    ];
    const glyphs = '01<>/\\=+*#_—·';
    let idx = 0;
    let decoding = false;

    const decodeTo = text => {
      decoding = true;
      const dur = 520;
      const t0 = performance.now();
      const len = text.length;
      const tick = now => {
        const t = Math.min((now - t0) / dur, 1);
        const revealed = Math.floor(t * len);
        let out = '';
        for (let i = 0; i < len; i++) {
          if (i < revealed || text[i] === ' ') out += text[i];
          else out += glyphs[(Math.random() * glyphs.length) | 0];
        }
        word.textContent = out;
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          word.textContent = text;
          decoding = false;
        }
      };
      requestAnimationFrame(tick);
    };

    const advance = () => {
      if (document.hidden || decoding) return;
      idx = (idx + 1) % phrases.length;
      word.classList.remove('is-swap');
      void word.offsetWidth;
      word.classList.add('is-swap');
      decodeTo(phrases[idx]);
    };

    window.setInterval(advance, 3200);
  }

  /* ---------- Scroll reveals + section continuity (motion allowed) ---------- */
  if (root.classList.contains('js-fx') && hasIO) {
    // Light per-group stagger so grids cascade instead of popping together.
    document.querySelectorAll('.intersections, .also-list, .research-grid').forEach(group => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--rd', (i * 55) + 'ms');
      });
    });

    const revealSel = [
      '.section-head', '.case', '.role', '.also', '.paper', '.proof-row',
      '.intersections > li', '.skill-row', '.learning', '.contact-list', '.research-grid'
    ].join(',');

    const revealIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    document.querySelectorAll(revealSel).forEach(el => {
      if (el.closest('.hero')) return; // hero already animates on load
      // Only arm elements below the fold, so nothing on-screen ever flickers.
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.setAttribute('data-reveal', '');
        revealIO.observe(el);
      }
    });

    // Accent segment lights along each section's top edge as it enters view.
    const sectionIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-lit');
      });
    }, { threshold: 0.04 });
    document.querySelectorAll('.section').forEach(section => sectionIO.observe(section));
  }
})();
