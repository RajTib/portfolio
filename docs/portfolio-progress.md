# Portfolio — Progress & State

Durable checkpoint for the raj-tib.vercel.app refinement. Written so a fresh Claude Code session can
continue **without** the originating conversation. Last updated: 2026-09-27 (session 2).

---

## 1. Current project state (one paragraph)

The portfolio was already redesigned around AI/ML (commit `541e074`). Session 2 applied a **positioning +
project-lens refinement**: repositioned the site as "AI/ML + software engineer who builds intelligent
software systems," added an interactive **genre "lens" filter** over the Work section, a **proof/credentials
band**, always-visible **genre tags** per project, reordered the About "intersections" to demote
cybersecurity to one dimension, and elevated research. All changes are in the working tree (not yet
committed at time of writing — see §8). The old `docs/AUDIT.md`/`IMPROVEMENTS.md` describe the pre-redesign
site and remain stale/historical.

## 2. Architecture (unchanged)

Buildless static site (no framework/bundler/CI), deployed on Vercel. `index.html` (single page),
`resume.html` (native HTML resume mirroring the PDF), one token-driven `style.css`, progressive-enhancement
`script.js` (IIFE, `'use strict'`), strict CSP in `vercel.json` (`default-src 'self'`, no inline script,
no CDN), self-hosted Geist/Geist Mono. Design system = CSS custom properties in `:root`
(`--radius-sm/--radius/--radius-lg`, amber accent family `--accent*`, green `--ok*`, `--ease`,
`--control-line` = ≥3:1 interactive boundary). Section order: hero → **proof (new)** → work → experience →
about → skills → research → contact.

## 3. Positioning strategy (session 2 — the new source of truth for voice)

Identity ladder, in priority order, must be legible in the first screens:
**AI/ML → Software/Backend → Systems/Edge (autonomous) → Computer Vision/Geospatial → Research → Security.**
The site says: "I build intelligent software systems — ML and the backend around it — where software meets
real-world data, hardware or autonomous platforms." Cybersecurity is **one dimension**, never the headline.
**AegisFlight is framed as a bridge** (AI/ML + systems + software + security): "security is the problem it
watches for; ML, systems and a real backend are what it's built from." Research (Hubble constant from Type Ia
SNe; co-authored nuclear-thermal-rocket paper) gets its own weighted beat, not an afterthought. Achievements
are surfaced as **evidence, not vanity** (proof band). No fabrication; ongoing work (AegisFlight) never
described as completed; collaborative work (Team Ardra/AegisFlight/GeoAI) never implied solo.

## 4. Project genre taxonomy (implemented)

Lens pills (single-select), left→right mirroring the identity ladder:
**All · AI/ML · Software · Systems · Computer Vision · Security.** Research stays its own elevated section
(not a Work lens — its work lives in `#research`). Each Work project carries `data-genres` + visible tags:

| Project | Genres (`data-genres`) |
|---|---|
| AegisFlight | `aiml software systems security` (the bridge — 4 tags) |
| GeoAI | `aiml cv software` |
| Infinity-Snap | `cv software` (pretrained MediaPipe landmarks → intentionally NOT tagged AI/ML) |
| SIEM-Lite | `security software` |
| VTOP GPA Calculator | `software` |

Coverage per lens ≥1 (aiml 2, software 5, systems 1, cv 2, security 2). "Systems"=AegisFlight only is honest —
the strongest systems story (Team Ardra) lives in Experience, outside the Work lens. `UniNav` was NOT added
(user mentioned it but no repo link / specifics available — adding a linkless vague card would weaken
credibility; candidate for a future pass once Raj supplies a link + specifics).

## 5. Verified profile (content ground truth — do not fabricate beyond this)

- **Raj Tibarewala.** B.Tech CSE (Cyber Security), VIT Vellore, 2024–2028, CGPA **8.65/10**.
- Direction: AI/ML, software/backend, autonomous systems/edge, CV/geospatial, security, research/scientific
  computing. Learning: LLMs, RAG, LangChain, inference optimization.
- **Team Ardra** — Software & R&D, autonomous drones, Sep 2025–present. Jetson Orin Nano, Raspberry Pi,
  embedded Linux, onboard ML, FastAPI, PyTorch, HF DETR, threaded inference, live streaming.
- **AegisFlight** — ML drone intrusion detection, IIT Bombay TechFest 2026 / PUSHPAK Grand Challenge,
  **Stage 1 submitted / ONGOING (never "completed")**. 4 detectors, 11 online features, benign-only Isolation
  Forest + Mahalanobis, session-level splits, 6 seeds × 7 scenarios, **23k+ decisions**, ML-off ablation,
  **81 public real-flight logs**, KS tests, FastAPI/WebSockets + React dashboard, **44-test pytest suite**.
- **GeoAI** — rooftop mapping from drone orthophotos, **IIT Bombay TechFest 2025 — FINALIST (verified this
  session)**. YOLOv8, SegFormer, OpenCV, rasterio, Shapely, Docker; 640×640 tiling, CRS alignment,
  shapefile→labels, 70/20/10, detection/segmentation, Dockerized inference.
- **Hubble constant** (Type Ia SNe + Planck 2018), India Space Academy. **Infinity-Snap** (Python/OpenCV/
  MediaPipe gesture→file automation). **NTR** co-authored paper. **SIEM-Lite**, **VTOP GPA Calculator**.
- Pinnacle Labs cybersecurity intern (Feb–Mar 2026). Links: github.com/RajTib ·
  linkedin.com/in/raj-tibarewala · raj-tib.vercel.app.

## 6. Agent team

- Global Agent OS (`~/.claude/CLAUDE.md` + `~/.claude/agents/`) — used this session: **ui-ux-reviewer**
  (interaction/IA spec) and **code-reviewer** (diff review). A **content/brand audit** ran via a
  general-purpose agent carrying the `portfolio-editor` brief.
- Project-specific config exists at `.claude/CLAUDE.md` + `.claude/agents/portfolio-editor.md`, BUT the user
  added `.claude` to `.gitignore` this session, so it is **local-only / untracked** (works for the local
  Agent OS; not version-controlled). The custom `portfolio-editor` subagent type is **not registered by this
  harness** (project `.claude/agents/` needs a CC restart to load) — use general-purpose with the brief until then.

## 7. Work completed this session (session 2)

Files changed (all working tree): `index.html`, `style.css`, `script.js` (+ pre-existing polish already in
tree from session 1; `.gitignore` +`.claude` by user; `resume.html`/`.vercelignore` pre-existing).

- **Positioning copy**: broadened `<head>` meta/og/twitter/JSON-LD descriptions off "drones + intrusion
  detection"; title + JSON-LD jobTitle → "AI / ML & Software Engineer" (matches hero eyebrow); hero statement
  names ML + backend; Focus readout adds "backend"; About para 1 no longer leads with cyber security and adds
  backend; research given its own beat; About section title → "…software, systems and research."
- **Proof band** (`.proof`, between hero and Work): TechFest 2025 · GeoAI **Finalist** (award badge) · with
  Team Ardra; Autonomous drones R&D · Team Ardra · Jetson Orin Nano; B.Tech CSE · CGPA 8.65/10.
- **Genre lens** (`.work-lens` in `.section-head`): 6 pills, buttons + `aria-pressed` + `role=group` +
  `.sr-only aria-live` count; authored `hidden`, revealed by JS. Filters `.case` ×3 + `.also-list li` ×2 via
  the `hidden` attribute; hides the `.also` block when empty; live `N / 5 shown` count; matching `.genre`
  tokens light amber; survivors replay `rise` with staggered `animation-delay` (auto-neutralized under
  reduced-motion). Wrap layout, 44px pills, `--control-line` resting border, `--accent-soft/-line` active.
- **Genre tags** (`.genres`): visible per-project focus areas (mono, ` · ` separators). AegisFlight bridge
  sentence added; GeoAI status de-duplicated ("Finalist · Completed 2025", kicker adds "· Finalist").
- **Intersections** rewritten to 6 tiles in ladder order (AI/ML → Software/Backend → Systems/Edge →
  Computer Vision → Research → Security).

## 8. Verification performed (session 2)

Served locally (`python -m http.server 8123`), driven in Chrome via DOM/JS assertions (screenshots blocked
by a CDP `captureScreenshot` timeout in this environment — a tooling issue, not a page fault; JS/DOM ran fine):
- **Lens correctness**: aiml→{AegisFlight,GeoAI}; software→all 5; systems→{AegisFlight}; cv→{GeoAI,
  Infinity-Snap}; security→{AegisFlight,SIEM-Lite}; all→5. ✓
- Also-built block hides when empty (aiml); shows with only SIEM under security. ✓
- Count text + `aria-live` status update correctly; `aria-pressed` toggles; genre highlight toggles; clears on All. ✓
- No console errors. No horizontal overflow (full width). Pills 44px. All internal anchors resolve. Genre
  tags render below `.also-desc` and left of links. Native `<button>`s focusable. Nav (6 links) intact. ✓
- **Not visually confirmed**: pixel-level mobile rendering (viewport couldn't be forced <1920 via the
  extension; layout verified overflow-free + flex-wrap/grid with no fixed widths, so risk is low). Reduced-
  motion path verified by code (uses existing global reduced-motion block + `rise`).

## 9. Known issues / open items

- **P0 candidate (being addressed post-review):** a hero link to `#aegisflight` ("Read the case study")
  won't scroll if AegisFlight is hidden under the **Computer Vision** lens (hidden elements aren't scroll
  targets). Fix planned: internal-anchor clicks targeting a filtered-out project reset the lens to All. Verify.
- Code-review (code-reviewer agent) findings pending consolidation at time of writing — apply, then re-verify.
- Mobile rendering not visually confirmed (see §8) — do a real mobile screenshot pass when tooling allows.
- resume.html tagline already AI/ML-first & consistent; left unchanged to avoid desyncing from the PDF.
- `readme.md` still promises projects not on the site (cross-artifact drift) — future hygiene pass.
- UniNav not added (needs link + specifics from Raj).

## 10. Git state

Branch `feat/portfolio-redesign-2026` (not main — safe to commit). All changes uncommitted at time of writing.
Working tree mixes (a) session-1 last-mile polish and (b) session-2 positioning+lens work in the same files;
they cannot be cleanly hunk-separated (no interactive add in this env) and are both "portfolio refinement,"
so they'll go in one honest, well-described commit after the code review is applied. `.claude/` is gitignored
(user choice) → not committed. `favicon.ico` untracked (session-1). NO destructive git ops used.

## 11. EXACT recommended next action

1. Consolidate the code-reviewer findings; apply the anchor-reset fix (§9 P0) + any P0/P1 issues.
2. Re-verify in the browser via DOM/JS assertions (server: `python -m http.server 8123`, load
   `http://127.0.0.1:8123/index.html`, **hard-reload Ctrl+Shift+R** — python's server sends no Cache-Control
   so sub-resources cache; bust with that or a `?v=` query).
3. Commit the refinement on `feat/portfolio-redesign-2026` with a message documenting both layers.
4. Then (future): real mobile screenshot pass; README rewrite; ask Raj for UniNav link to add a Software card.
