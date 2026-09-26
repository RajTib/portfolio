# Improvements Log

Companion to `AUDIT.md` (findings) and `RESUME-LINKEDIN-BRAND.md` (career materials).
Design language, colors, typography, and every animation concept were **kept**. This pass
was correctness, responsiveness, accessibility, performance, and small acts of intentionality.

---

## Correctness & content

| Change | Before → After | Why |
|---|---|---|
| Fixed "Certificate of **Intenship**" | typo → "Certificate of Internship" | A spelling error in the credentials section is the single cheapest credibility loss on the site. |
| Unified LinkedIn URL | hero: `/in/rajtibarewala` → `/in/raj-tibarewala` everywhere | The hero link 404'd. Verified handle used in both hero and contact. |
| Fixed project numbering | 01,02,03,**06,04,05,06** → 01–07 in order | Two cards claimed "06"; numbering now matches display order and modal data. |
| Fixed Cosmopedia repo link | `RajTib/ISA-Summer-School` → `RajTib/cosmopedia-react` | The old link opened the astrophysics repo. Verified against the live GitHub API that `cosmopedia-react` exists and matches the React stack. |
| Fixed GeoAI demo link | `…/geoai?logs=container` → `…/geoai` | Visitors were being sent to HuggingFace's container-log view. |
| Rewrote hero description | "3rd Year CSE Cybersecurity student in Vellore Institute of Technology, Vellore. Interested in…" → "Third-year CSE (Cyber Security) student at VIT Vellore. I build security tooling, ML pipelines, and embedded systems — and I care most about the ones that actually ship." | Fixed grammar ("in" → "at", doubled "Vellore", missing period) and switched from *interest* language to *builder* language. Second sentence a recruiter reads. |
| Rewrote Cosmopedia copy | "Created an online encyclopedia for only space enthusiasts… much more fun and interactive way" → design-to-deployment story matching the polish of the other blurbs | This card was the one that most read "unedited AI output" next to the SIEM/GeoAI writing. Card and modal now agree. |
| De-duplicated section titles | "Projects / Projects", "Technical Skills / Skills" → "Projects / Selected Work", "Technical Skills / What I Work With" | Every other section had a real title; the duplicated ones read templated. Same type scale, no new styling. |
| Cosmopedia badge | "WEB DEV" (unstyled — `.badge-web` never existed in the CSS) → "Web Dev", with a proper neutral badge style | Pre-existing bug: the class had no rule, so the badge rendered without border/color treatment. |

## Responsiveness (highest priority)

- **Breakpoint system**: was a single 1024px query; now 1800px+ (4K), 1200, 1024, 768, 480,
  360 — verified paddings and type at a 320px floor.
- **Hero photo restored on tablet/mobile**: previously `display:none` under 1024px. Now
  scales (`min(280px, 72vw)`, `aspect-ratio: 3/4`) and moves *above* the text — the human
  element leads on small screens.
- **Mobile navigation added**: previously nav links simply vanished under 1024px. Now a
  hamburger (animated to ✕) opens a blurred dropdown panel matching `nav.scrolled` styling;
  closes on selection; `aria-expanded` kept in sync.
- **4K/ultrawide**: content constrained to a 1600px measure via symmetric padding, so section
  border-lines still run full-bleed (preserves the design) while text stays readable.
- **Projects/certs grids**: 3 → 2 columns at 1024, 1 at 768 (was 3 → 1, which wasted tablet
  width). Skills 4 → 2 → 1.
- Small-screen tuning: modal padding, stacked hero buttons and contact links at 480px,
  hero-tag/coordinate type at 360px, `scroll-padding-top` so anchor jumps clear the fixed nav.

## Accessibility

- Project and certificate cards: `<div onclick>` → `<article role="button" tabindex="0">`,
  activated by Enter/Space; card headings are real `<h3>`s.
- Modals: `role="dialog"`, `aria-modal`, labelled by their titles; focus moves to the close
  button on open and **returns to the invoking card on close**; ESC closes any open modal
  (previously only the project modal).
- Added skip-to-content link, global `:focus-visible` outline, `<main>` landmark,
  `aria-label`s on icon-only/ambiguous controls, `alt` text on the portrait.
- `prefers-reduced-motion`: fade-ups render instantly, starfield paints one static frame,
  typing effect shows a static role, pulse/caret animations off.
- Touch devices: native cursor restored (`cursor: none` was global), custom cursor elements
  fully removed from touch rendering.

## Performance

- **85KB base64 portrait extracted** from the HTML into `assets/profile.jpg`, resized
  2000px → 1680px and recompressed (**40KB**), with `width`/`height` (no CLS), `preload` +
  `fetchpriority="high"` (it's the LCP element). `index.html` dropped from ~111KB to ~26KB.
- Cursor ring: `setTimeout`-per-mousemove → single `requestAnimationFrame` loop with lerp
  easing (same visual trail, no timer churn).
- Starfield: pauses via `visibilitychange` when the tab is hidden; star count scales with
  viewport width on small screens.
- Removed the 500ms `setInterval` blink (it fought a CSS animation that referenced a
  keyframe that didn't exist — the keyframe now exists, CSS-only).
- Duplicated inline SVGs (GitHub path ×3, LinkedIn ×3, expand icon ×7) → one `<symbol>`
  sprite + `<use>` references.
- `defer` on the script tag; `rel="noopener"` on all `target="_blank"` links;
  IntersectionObserver unobserves elements after reveal.

## SEO / metadata

Added: meta description, canonical URL, Open Graph + Twitter card (site now unfurls properly
when shared on LinkedIn — the one place it will be shared), JSON-LD `Person` schema with
`sameAs` links, `theme-color`, `fonts.gstatic.com` preconnect. Favicon path made relative so
it works locally too.

## New capabilities

- **Certificate modal** (Part 5): every cert card opens an elegant modal — issuer, date,
  credential ID, skills covered, "Verify Credential" link (TryHackMe + Coursera verify URLs),
  and a certificate-image slot. Drop images into `assets/certs/` (see the README there) and
  they appear automatically; until then a styled placeholder shows. The previous markup had a
  dead, invalid second modal (duplicate IDs, empty data object) — replaced entirely.
- **Resume page** (Part 6): `resume.html` — rather than embedding a PDF viewer (whose gray
  browser chrome can't be styled), the resume is rendered *natively* in the site's design
  language — same starfield, mono/Syne type, section rules — so it reads as a continuation of
  the site, not a sheet dropped into it. Content mirrors the Combined PDF exactly; Download
  and Open-in-new-tab buttons serve the real PDF (see `RESUME-LINKEDIN-BRAND.md` §1 for why
  only one resume is public). This also sidesteps mobile inline-PDF failures entirely.
  "Resume" added to nav and hero/contact links. Note: the HTML rendition and the PDF are now
  two copies of the same content — when the PDF changes, update `resume.html` too.

## Intentionally left unchanged

- **The entire visual identity**: palette, Syne/Space Mono pairing, starfield, scanlines,
  custom cursor, clip-path corners, glow hovers — this is the site's signature.
- Existing project modal *content* (well-written; only links corrected).
- Experience/About/Contact copy beyond the fixes noted.
- Small mono type sizes (0.55–0.65rem tags). They're borderline for readability but they're
  load-bearing for the aesthetic; revisit only if real users complain.
- The typing animation and role list.
- Phone number in the contact section — it's your call to publish it; flagging that a public
  portfolio + phone number invites spam (consider removing once applications are done).
- `readme.md` — flagged in the brand doc (it promises projects the site doesn't show) but
  not rewritten without your input on project naming (SnapScript vs Infinity-Snap).

## Future ideas (deliberately not built)

1. **Add the honeypot project** — your most distinctive security artifact; currently only on
   the cybersecurity resume. Would slot in as project 02.
2. Project screenshots in modals (same pattern as cert images — an `images` array per project).
3. A short "Beyond code" line in About (published poet, spell-bee, abacus) — the most human
   detail in your brand, currently only in the README.
4. Custom domain (`rajtib.dev`) to unify with the `RT.dev` logo.
5. `sitemap.xml` + `robots.txt` (marginal for a 2-page site, cheap to add).
6. Case-study pages for SIEM-Lite and GeoAI (architecture diagram, challenges, lessons) —
   only worth it when you have screenshots and diagrams ready; a thin case study is worse
   than a good modal.
7. Verify the Coursera/TryHackMe credential URLs resolve to your certificates (I built them
   from the IDs on the site; they follow each platform's standard pattern but I couldn't
   verify behind login walls).

---

# Honest critique — five reviewers

**Recruiter (30 seconds per portfolio):** Strong first impression; dark cyber aesthetic is
memorable and the hero states school + year + focus immediately. Resume is now one click from
everywhere — good. What's still weak: no single "proof" number above the fold. The VTOP
"13k impressions" and the IIT Bombay hackathon are your two credibility spikes and they're
buried in modals. I'd surface one line of social proof in the hero area.

**Hiring manager:** The projects are appropriately scoped for a 3rd-year and honestly
described — the keylogger framed as detection research shows judgment. But I can't tell what
*you* did versus teammates on GeoAI/Team Ardra, and there are no outcomes ("did it place?").
One sentence of "my role" per collaborative project would answer the question I'll otherwise
ask in a screen. The missing honeypot project is the one I'd most want to discuss.

**Senior software engineer:** Vanilla HTML/CSS/JS with no build step is a defensible,
even tasteful choice — and the code now backs it up (sprite reuse, rAF loop, reduced-motion
handling, no dead code). Remaining nits: project/cert data lives in JS object literals that
must be kept in sync with HTML cards by hand — fine at 7 projects, error-prone at 15 (it
already drifted once); and there are no tests or CI, which is normal for a portfolio but a
`vercel.json` with security headers (CSP, X-Frame-Options) would be an on-brand touch for a
security student.

**UI/UX designer:** Identity is cohesive and the restraint is professional. Two things I'd
still push on: (1) the smallest mono labels sit below 10px — atmospheric, but squint-y on
dense laptop screens; (2) modals are the only depth the site has — everything else is one
flat scroll, so consider letting one project breathe as an inline case study for rhythm.
The photo-first mobile hero was the right trade.

**Open-source maintainer:** The site links 7 repos — those repos are now the weakest link.
If `siem-lite` has no README screenshot, no license, no commit history since the demo, the
portfolio's polish sets an expectation the repo breaks. Pin the six showcased repos, give
each a README with one image and a run command, and archive the rest. Also: the site repo
itself now has docs/ — keep `AUDIT.md` and this file out of the deployed site if you'd
rather reviewers not see the sausage-making (add them to `.vercelignore`).

**What would most improve your chances of standing out, in order:**
1. Fix the cross-artifact inconsistencies (resume §1 table) — they're the only *dangerous* issues.
2. READMEs with screenshots on the six showcased repos.
3. Surface one proof metric in the hero.
4. Add the honeypot as a project with a "what attackers actually did" narrative.
5. Certificate images in `assets/certs/` so the new modal pays off.
