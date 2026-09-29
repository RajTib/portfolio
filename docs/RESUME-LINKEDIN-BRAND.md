# Resume, LinkedIn & Personal Brand Review

Scope note: LinkedIn profiles sit behind a login wall, so this review is based on your three
resume PDFs, the portfolio, your public GitHub (`github.com/RajTib`), and the LinkedIn facts
referenced in the portfolio (e.g. the VTOP post metrics). Where I suggest LinkedIn changes,
check them against what's actually on your profile.

---

## 1. The three-resume question

You asked directly: *"I have 3 domains — what's the way I should have my resume?"*

**Recommendation: one master resume, two targeted variants, and only the master goes public.**

- **Master ("Combined") — the public one.** This is what lives on the portfolio, in your
  LinkedIn featured section, and what you hand over when someone says "send me your resume"
  with no role attached. Your story is coherent: *security-minded systems builder who also
  ships ML.* One document can carry that.
- **Cybersecurity variant** — for SOC/security-engineering internships. Lead with Honeypot,
  SIEM-Lite, Keylogger, Encryption. Keep it.
- **SDE variant** — for general software roles. Lead with VTOP, Infinity-Snap (gesture
  automation), portfolio. Keep it.

Why not publish all three: a recruiter who finds three resumes doesn't see versatility, they
see indecision — and worse, they can diff them (see inconsistencies below). Targeted variants
are an *application* tool, not a *branding* tool. The site now embeds only the Combined
resume for exactly this reason.

**The rule that keeps you safe: every fact must be identical across all three.** Dates, titles,
CGPA, tech stacks. Only the *selection and ordering* of projects should change.

### Inconsistencies to fix right now (recruiters diff these)

| Fact | Combined | Cybersecurity | SDE | Portfolio |
|---|---|---|---|---|
| Year of study | (none stated) | "2nd Year" | "2nd Year" | "3rd Year" |
| VTOP stack | — | — | **React** | **Vanilla JS/HTML5** |
| Certifications | 2 listed | 3 listed | 3 listed | 5 listed |
| Team Ardra bullets | 3 bullets, past tense | 4 bullets, present tense | 4 bullets, present tense | different again |

- "2nd Year" is stale — you're a 3rd-year in the 2026–27 academic year. Update both variants.
- VTOP is either React or it isn't. The repo will settle the argument; whichever is true, make
  resume and portfolio agree.
- Pick one Team Ardra description (the Combined one is tightest) and reuse it everywhere,
  adjusting only length.
- Certifications: the Combined resume undersells you. It should carry all five that the
  portfolio lists (Google ×2 with credential IDs, TryHackMe, Pinnacle, ISA).

---

## 2. Resume wording — line-level improvements

Only rewording. No invented achievements. Additions in brackets are facts you already state
elsewhere (portfolio/LinkedIn post) that belong on the resume.

### Header
- "2nd Year B.Tech Computer Science (Cyber Security)" → drop the year from the *title line*
  entirely; it belongs in Education ("Expected May 2028" already implies it and won't go stale).
- Make "GitHub | LinkedIn" hyperlinks *also* show the handle in plain text —
  `github.com/RajTib` — because ATS text-extraction frequently drops link targets, leaving
  the bare word "GitHub" pointing nowhere.
- Add a location line ("Vellore, India · open to remote") — many ATkeyword filters use it.

### Experience — Team Ardra
Current: "Worked on embedded Linux platforms (Raspberry Pi, Jetson Orin Nano) for autonomous
drone systems."
- "Worked on / Assisted in / Supporting" are the three weakest openers in the stack. Each
  bullet should name the *outcome* of the work, not your proximity to it:
  - "Worked on embedded Linux platforms…" → **"Set up, debugged, and validated onboard
    compute modules (Raspberry Pi, Jetson Orin Nano) for autonomous drone flight systems."**
  - "Assisted in deploying edge ML pipelines optimized for latency, power, and compute
    limits." → **"Deployed edge ML inference pipelines within strict latency, power, and
    compute budgets on Jetson-class hardware."** (You already claim "deployed" on the
    portfolio — the resume should match.)

### Projects
- **SIEM-Lite** — bullets are good and specific. One upgrade: "Built a lightweight SIEM
  pipeline to monitor Linux authentication logs" → **"Built a SIEM pipeline monitoring Linux
  auth logs in real time, detecting SSH brute-force and privilege-escalation patterns via a
  correlation-based rule engine."** Merges two bullets, frees a line.
- **VTOP GPA Calculator (SDE)** — this is your best resume line and it's missing its numbers.
  You publicly claimed 13,000+ impressions and 240 reactions on the launch post; usage numbers
  are stronger still if you have Vercel analytics. Add: **"Launched publicly; announcement
  reached 13k+ impressions [and N active users] among VIT students."** Concrete adoption beats
  any adjective.
- **GeoAI Hack** — say what placed where, if it placed at all. If not, "Built at the GeoAI
  National Hackathon (IIT Bombay TechFest)" is still worth stating as context — national
  hackathon + deployed pipeline is the story.
- **Honeypot** — "Analyzed attack patterns to understand automated bot behavior" →
  **"Logged and analyzed real attacker interactions (credential attempts, injected commands)
  to characterize automated intrusion behavior."** ("Understand" is a study verb; "characterize"
  is a research verb.)
- **Keylogger (Pinnacle Labs)** — reframe defensively, as the portfolio already does:
  **"Built an OS-level input-capture research tool to study how keyloggers operate and how
  endpoint security detects them."** As written on the resume ("capture and log user
  keystrokes… potential misuse") it reads offensive-only — risky phrasing for security
  hiring filters.
- **Publications** — "Assisted in structuring technical content and supporting manuscript
  preparation" is two prepositional hedges deep. **"Co-authored literature review and
  background sections; structured the manuscript for submission."**

### ATS compatibility
- Single-column layout: ✓ good, keep.
- The Skills block in the CS/SDE variants renders as two disjoint text runs (labels first,
  values after) in text extraction — I saw this in the actual PDF text layer. That means an
  ATS may read "Programming Languages: Cyber Security:" with no values. Rebuild that section
  as simple `Label: value` lines rather than a two-column table.
- Spell out acronyms once: "SIEM (Security Information and Event Management)" — keyword
  matchers look for both forms.
- File naming: `Raj_Tibarewala_Resume.pdf` — no spaces, no "Combined"/"SDE" suffix on the
  version you send (the suffix leaks your targeting strategy).

---

## 3. LinkedIn recommendations

- **Headline** — the default "Student at VIT" pattern wastes the single highest-visibility
  field you have. Suggested (uses only verifiable facts):
  `B.Tech CSE (Cyber Security) @ VIT Vellore · SIEM & security tooling · Edge ML @ Team Ardra · Built VTOP GPA Calculator (13k+ reach)`
- **About section** — you already own a great opening line; it's sitting in your GitHub
  README: *"I break systems to understand them — then build better ones."* Lead with it, then
  three short paragraphs: (1) what you build (security tooling, ML pipelines, embedded
  systems — with SIEM-Lite and GeoAI named), (2) proof you ship (VTOP numbers, hackathon,
  publication), (3) what you're looking for (security/systems internships). No skills list
  dump — the Skills section does that.
- **Experience entries** — copy the resume bullets *after* the rewording above, so profile
  and resume agree word-for-word. Recruiters treat divergence as embellishment.
- **Featured section** — pin: the portfolio, the VTOP launch post (it's social proof), and
  the paper. This is the closest thing LinkedIn has to your projects grid.
- **Custom URL** — you have `/in/raj-tibarewala`; the portfolio previously linked
  `/in/rajtibarewala` in the hero (now fixed). Make sure no old links survive anywhere else
  (email signature, GitHub profile).

---

## 4. Personal brand — one person across four surfaces

**The umbrella that fits all three domains:** *security-minded systems builder.* Cybersecurity
is the spine; ML and space/astro work are evidence of range, not competing identities. The
portfolio already frames it exactly right ("Security-First. Systems Thinker."). Extend that
framing outward:

| Surface | Current state | Fix |
|---|---|---|
| Portfolio title | "Cybersecurity & Systems Engineer" | Fine as aspiration, but you're introduced as a student everywhere else. Safer and still strong: keep the title, and let the hero tag ("B.Tech CSE — Cyber Security · VIT Vellore") do the grounding — which it now does. Just be consistent: use the same phrase on LinkedIn's headline. |
| GitHub README (repo) | Mentions **SnapScript**, **Smart Smoke & Gas Detector**, **Borderline** as "highlight projects" | None of these are on the site; SnapScript appears to be the `Infinity-Snap` repo under a different name. Pick one name per project and use it everywhere. Either add them to the site or remove them from the README — a README that promises projects the site doesn't show reads as abandoned. |
| Resume | Honeypot + Infinity-Snap present | Both are missing from the portfolio. The honeypot in particular is your most distinctive security artifact ("deployed a honeypot and analyzed real attackers" is a conversation starter) — it should be project #2 on the site. Listed under future ideas. |
| GitHub profile | 30+ public repos, mixed quality visible | Pin the six repos the portfolio showcases. Ensure each pinned repo has a README with one screenshot — recruiters click through from the portfolio modal, and an empty README undoes the modal's polish. |
| Naming | GitHub `RajTib` · LinkedIn `raj-tibarewala` · site `raj-tib.vercel.app` · logo `RT.dev` | Acceptable spread, but note `rt.dev`-style domains (`rajtib.dev`, ~$12/yr) would unify site + logo and look sharper on a resume than `.vercel.app`. Optional. |
| Voice | README is punchy; site was drifting formal | The poetry/spell-bee/abacus material in the README is genuinely differentiating ("I work with patterns") — consider a single quiet line on the site's About section. It's the most *human* thing in your entire brand and it's currently invisible on the site. |

**One sentence to standardize everywhere** (site meta, LinkedIn about, GitHub profile bio):
> Security tooling, ML pipelines, and embedded systems — built to ship. B.Tech CSE (Cyber Security), VIT Vellore.

---

*This document pairs with `docs/IMPROVEMENTS.md` (what changed on the site and why) and
`docs/AUDIT.md` (the pre-change audit).*
