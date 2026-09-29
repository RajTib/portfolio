# Portfolio Audit — raj-tib.vercel.app

Audited: July 2026 · Source of truth: this repository (`index.html`, `style.css`, `script.js`)

Overall verdict: the visual identity is strong and distinctive — dark cyber aesthetic, mono/Syne
type pairing, starfield, angular clip-paths. It reads as *designed*, not templated. The problems
are almost entirely in the last 10%: correctness bugs, missing mobile affordances, accessibility
gaps, and a handful of content slips that undermine an otherwise credible site. Nothing here
requires a redesign.

---

## 1. Correctness bugs (highest priority — these are visible to recruiters)

| # | Issue | Where | Impact |
|---|-------|-------|--------|
| C1 | "Certificate of **Intenship**" — typo in a *credentials* section | `index.html` cert card 1 | A spelling error inside the section meant to prove rigor. Recruiters notice this first. |
| C2 | Two different LinkedIn URLs: hero uses `/in/rajtibarewala`, contact uses `/in/raj-tibarewala` | `index.html` | One of them is wrong; a dead LinkedIn link from a hero CTA is a hard fail. Actual handle: `raj-tibarewala`. |
| C3 | Project numbering is scrambled: cards display 01, 02, 03, **06, 04, 05, 06** | `index.html` projects | Two cards both say "06"; order ≠ number. Looks copy-pasted, i.e. exactly the "AI-generated" feel being avoided. |
| C4 | Cosmopedia card links to `github.com/RajTib/ISA-Summer-School` — the astrophysics repo, not Cosmopedia | `script.js` project 04 | Wrong repo behind a "GitHub" button. |
| C5 | Duplicate `id="modalBox"` (used in both modals) and a second certs modal with its own duplicate-ID fields; the certs modal is dead code (`certs = {}` and nothing opens it) | `index.html`, `script.js` | Invalid HTML; certs are advertised as cards but are not interactive. |
| C6 | GeoAI "Live Demo" points to a HuggingFace *container logs* URL (`?logs=container`) | `script.js` project 02 | Visitors land on a build-log view instead of the demo. |

## 2. Responsiveness

- **≤1024px kills the hero photo** (`.hero-right { display:none }`). Tablets and every phone
  never see the strongest human element of the page. The photo frame is fixed at 420×560px
  instead of scaling.
- **No mobile navigation at all**: `.nav-links { display:none }` under 1024px with no hamburger.
  On a phone the only nav is scrolling; "Certs", "Experience" etc. are unreachable directly.
- **Single breakpoint (1024px)** for the entire site. Nothing tuned for 768px tablets
  (skills stay 2-col — fine — but exp cards collapse early), nothing for 480px/390px/320px:
  2rem side padding is heavy at 320px, `.contact-email` at 1rem mono can overflow,
  modal padding (2.5rem) crowds small screens.
- **No upper bound for large monitors**: sections are full-bleed with 4rem padding, so at
  2560–3840px lines of body text stretch past 200 characters and the grid gutters look lost.
- Nav CTA ("Let's Talk") remains at ≤1024px but nav links vanish — inconsistent survival.

## 3. Accessibility

- Project cards are `<div onclick>` — not focusable, not announced as buttons, unusable by
  keyboard. No `:focus-visible` styles anywhere (`outline` never styled, and custom cursor
  hides the mouse affordance too).
- No skip-to-content link; no `aria-expanded`/labels for interactive elements; modals lack
  `role="dialog"`, `aria-modal`, focus management (focus stays behind the overlay), and ESC
  only closes the project modal.
- `cursor: none` on `<body>` applies to *all* pointers; on touch devices two stray cursor
  `div`s render at (0,0). No `prefers-reduced-motion` handling despite constant canvas
  animation, typing loop, scanlines, and pulse effects.
- Heading order is fine (h1 → h2), but section landmarks (`<main>`, `nav` aria-label) are absent.
- Color contrast: `--muted` (#6b7280) mono text at 0.58–0.65rem on #050608 passes AA for
  large text only marginally; smallest tags (0.55rem ≈ 8.8px) are below comfortable reading size.

## 4. Performance

- **85KB base64 JPEG inlined in `index.html`** — blocks HTML parse/first byte of every visit,
  can't be cached independently, and inflates the document to ~111KB. Should be an external,
  dimensioned, `fetchpriority="high"` asset (it's the LCP element).
- Cursor ring uses `setTimeout` inside `mousemove` (a timer per event); star canvas runs
  `requestAnimationFrame` forever, including when the tab is hidden and on devices that never
  see a benefit; 180 stars regardless of viewport.
- Redundant blink logic: CSS `animation: blink` *and* a 500ms `setInterval` fighting over the
  same element (the CSS animation isn't even defined — see C7 below).
- No `rel="noopener"` on `target="_blank"` links (minor perf/security).
- C7: `animation: blink 1s infinite` references a keyframe that doesn't exist in `style.css`;
  only the JS interval makes it blink.

## 5. SEO / metadata

Missing entirely: meta description, Open Graph, Twitter card, canonical URL, JSON-LD Person
schema, `theme-color`. Sharing this site on LinkedIn — the one place it will be shared — renders
a bare link with no preview. Favicon path `/favicon-v2.ico` is absolute (fine on Vercel, breaks
locally).

## 6. Content / storytelling ("AI-generated feel")

- Hero description has grammar slips: "3rd Year CSE Cybersecurity student **in** Vellore
  Institute of Technology, Vellore" (double Vellore, no closing period). This is the second
  sentence a reviewer reads.
- Section tag/title duplication reads templated: "Technical Skills / **Skills**",
  "Projects / **Projects**". Other sections got real titles ("Security-First. Systems Thinker.") —
  the inconsistency is what feels generated.
- Cosmopedia copy: "encyclopedia for **only** space enthusiasts … in a much more fun and
  interactive way" — reads unedited next to the polished SIEM/GeoAI blurbs. Card and modal
  descriptions also diverge in quality.
- Certs section is a flat list while projects got a modal — inconsistent depth.
- The résumé mentions strong projects absent from the site (Honeypot on Raspberry Pi,
  gesture-based file automation) while the README name-drops "SnapScript" and "Borderline",
  which don't exist on the site. Cross-artifact inconsistency (see brand review).

## 7. What is genuinely good (do not touch)

- Color system and CSS variables are disciplined; one accent family used consistently.
- Type pairing (Syne display / Space Mono UI text) is distinctive and consistently applied.
- Hover states are restrained and coherent (border + faint tint, no gimmicks).
- The modal pattern for projects is the right call; content in `script.js` project data is
  mostly well-written and specific (real repo names, real constraints).
- IntersectionObserver fade-ups are subtle and correctly threshold-ed.
- The coordinate line under the photo, the status dot in the footer, "[ ESC ] Close" —
  these small touches are exactly the handcrafted details worth keeping.

---

All items above are addressed in this pass except where `IMPROVEMENTS.md` explicitly lists
them under "intentionally unchanged".
