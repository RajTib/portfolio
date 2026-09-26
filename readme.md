# Raj Tibarewala — Portfolio

Personal site of **Raj Tibarewala**, AI / ML engineer building machine-learning systems for autonomous drones:
explainable intrusion detection (AegisFlight), onboard vision on NVIDIA Jetson, and geospatial computer vision.

**Live:** https://raj-tib.vercel.app

---

## Stack

Plain HTML, CSS and a small amount of vanilla JavaScript. No framework and no build step — the repository root is
the deployed site (Vercel static hosting).

| File | Purpose |
|---|---|
| `index.html` | Portfolio: hero + currently building, selected work, experience, about, skills, research, contact |
| `resume.html` | Web resume. Its print stylesheet produces `assets/Raj_Tibarewala_Resume.pdf` |
| `404.html` | Served by Vercel for unknown routes |
| `style.css` | Design tokens and all styles — dark theme, one amber accent, Geist / Geist Mono |
| `script.js` | Progressive enhancement only: header state, mobile menu, active-section highlighting, diagram reveal, copy-email |
| `assets/fonts/` | Self-hosted Geist variable fonts (SIL Open Font License — see `LICENSE-Geist.txt`) |
| `assets/og.jpg` | 1200×630 social preview image |
| `vercel.json` | Security headers (CSP, frame, referrer, permissions) and long-lived font caching |
| `.vercelignore` | Keeps `docs/` and superseded files out of the deployment |

Every section is readable with JavaScript disabled, and motion respects `prefers-reduced-motion`.

## Run locally

Any static file server works:

```bash
npx serve .            # or: python -m http.server 8000
```

The CSP and other headers come from `vercel.json`, so they only apply on Vercel.

## Updating content

- **Projects** are `<article class="case">` blocks inside `#work` in `index.html`: the left rail holds metadata
  (status, year, context, stack, links); the main column holds problem / approach / evaluation / status.
- **Only publish verified facts.** Metrics, results and links must trace to a real run, repo or document.
- **Resume:** edit `resume.html`, then regenerate the PDF — open it in Chrome or Edge → Print → *Save as PDF*,
  A4, default margins, background graphics off → save over `assets/Raj_Tibarewala_Resume.pdf`. Keep it to one page.
- After an update, change "Updated …" in the footer and on the resume page, and `lastmod` in `sitemap.xml`.

---

## Beyond code

I don’t just work with code — I work with patterns.

* Published poet (2 works in anthology)
* Multiple poetry competition wins
* State-level Spell Bee qualifier
* Abacus runner-up & merit holder
