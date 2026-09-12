# Content

The single source of truth for every word on the site.

Claude Code: pull project descriptions from this file. Do not improvise them.

Every project below was verified against `github.com/settery7`. Nothing here is
aspirational. If a project is not on this list, it does not go on the site.

---

## Identity

- **Name:** Clayne Cezclark Nable
- **Handle:** settery7
- **Location:** Cebu, Philippines
- **Education:** BS Computer Engineering, Cebu Institute of Technology –
  University. Graduated May 2026.
- **One-liner:** Computer Engineering graduate building full-stack web and
  mobile applications — React, Node, PostgreSQL, Flutter — and self-hosting
  them end to end with Docker.

The one-liner makes no AI or LLM claim. There is no LLM work in any
repository, and a claim without an artifact gets cut.

**Credentials** — both are held.

- IBM Full Stack Developer Professional Certificate —
  https://www.coursera.org/account/accomplishments/professional-cert/CBEGXGF2N74J
- Developing AI Applications with Python and Flask (IBM) —
  https://www.coursera.org/account/accomplishments/verify/FK33G0AW51Q0
- Python for Data Science, AI & Development (IBM) —
  TODO: credential URL. Confirmed held, but the verification link is still
  missing. `docs/build-spec.md` §3 lists the proof strip; a third row goes in
  once this URL exists.

**Links**

- GitHub: https://github.com/settery7
- LinkedIn: https://www.linkedin.com/in/settery/
- Email: n.cezclayne@gmail.com
- CV: `public/clayne-nable-cv.pdf` — TODO: export current version

---

## Featured projects

Two projects, not three. The Dealership capstone moved to coursework because it
was built by following course steps, and a case study with no technical
decision behind it fails the test in `docs/build-spec.md` §5.

The order is the argument: one solo build carried to deployment, one team
delivery.

### 1. Pykes — `pykes`

The flagship. Solo, deployed, tested.

- **Role:** Solo build
- **Year:** 2026
- **Tech:** React, Vite, Node, Express, WebSockets, PostgreSQL, Redis, MinIO,
  Caddy, Docker, Kubernetes, GitHub Actions, Playwright
- **Repo:** https://github.com/settery7/pykes
- **Cover:** `docs/demo.gif` exists in the repo — export a still frame, or
  capture the feed screen at 1600×1000
- **Links:** repo above · live TODO: deployed on a free tier — which host, and
  what is the URL? A live link is worth more than any other single item on the
  site

**Problem.** I wanted a platform where developers could share the work they
were doing — updates tied to actual projects rather than scattered across
social platforms nobody controls. Nothing that existed did that without
charging for it, so the whole thing was built to run on free infrastructure.

**What I built.** A self-hosted build-in-public platform. Developers post
updates tied to specific projects, and each project renders a pixel-art
"garden" that grows every time its owner ships. The stack is six services
behind Caddy, which handles automatic HTTPS: a React frontend served static via
Nginx, an Express API with WebSocket support, PostgreSQL for relational data
under versioned migrations, Redis for caching and rate limiting, and MinIO as
S3-compatible object storage for media. Everything runs in Docker Compose, with
Kubernetes manifests for both services and a GitHub Actions CI pipeline.
Account handling is complete rather than demo-grade — email verification,
password reset, and per-route rate limiting. Eight Playwright end-to-end specs
cover the flows that matter, including garden-growth ownership.

Include the architecture diagram here: Caddy → frontend / API → Postgres,
Redis, MinIO. This is the diagram that earns the most on the whole site.

**The hard part.** The data layer — PostgreSQL and Redis, and how much of the
backend had to be shaped around them. TODO: this needs the specific decision
and the alternative you rejected, in about 150 words. Answer these three and
the paragraph writes itself:

1. What did you put in Redis, and why not PostgreSQL? The repo shows it doing
   both caching and rate limiting, which are different jobs.
2. Why four separate migrations rather than one schema? `edit-history` and
   `email-verification-and-digest` arrived after the baseline, so the schema
   changed mid-build — what forced that?
3. What broke, or nearly did, before you settled on the current split?

**Result.** A working hobby project, deployed and running on a free tier. It is
feature-complete for what it set out to do, and the honest constraint is that
going further means paying for infrastructure — the zero-cost requirement that
shaped the architecture is also the ceiling on it.

---

### 2. Whaloo — `whaloo`

A team project carried to release readiness. 101 commits.

- **Role:** Project manager on a team build. TODO: this must be precise. What
  did you personally write? The site presents this to developers, so "project
  manager" without a code contribution named reads as padding, while "I managed
  the team and built X and Y" is a genuinely strong claim. If you mostly
  coordinated, say that — it is still worth showing, just framed as delivery
  rather than as a code sample.
- **Team size:** TODO
- **Year:** 2025
- **Tech:** Flutter, Dart
- **Repo:** https://github.com/settery7/whaloo
- **Cover:** TODO — screenshot of the flashcard or schedule screen from a
  device or emulator
- **Links:** none. Never published.

**Problem.** Students keep their study material spread across separate
flashcard, calendar, and to-do apps, and none of them talk to each other.
TODO: one paragraph in your own words — who on the team wanted this, and why.

**What I built.** A Flutter note-taking and study application that combines
four tools students normally keep in separate apps: a flashcard system with
create, edit, and review flows backed by a local database; schedule management;
a to-do list with its own create and edit screens; and a file viewer for study
materials. The layout adapts to tablet as well as phone. Terms and conditions
are included, as the app was built for distribution rather than as an exercise.

**The hard part.** Responsiveness. Everything else came together, but making a
single Flutter layout work properly across phone and tablet was the real test.
TODO: expand to about 150 words — what specifically broke at tablet width, what
you tried first, and what the fix was. The repo has a `Responsive/` directory
with `dimensions.dart` and `responsive_layout.dart`, so there is a concrete
approach in there to describe.

**Result.** Built to release readiness but never submitted to the Play Store or
TestFlight. Say that plainly — it is a more credible ending than implying a
launch that did not happen.

---

## Coursework

Shown openly as coursework, in a grid, with no case studies. The certificates
already evidence this work; the value here is honesty about what it is.

- **Dealership Application** —
  https://github.com/settery7/xrwvm-fullstack_developer_capstone — IBM Skills
  Network capstone, built by following the course. Django, React, Node/Express,
  MongoDB, Docker, Kubernetes, GitHub Actions. Labelled as a capstone.
- **Simple CPU Simulation** —
  https://github.com/settery7/Simple-CPU-Simulation — Computer Engineering
  coursework. Supports the BSCpE identity rather than diluting it.
- **Number system conversion** —
  https://github.com/settery7/Decimal-Binary-Octal-Hex-Conversion — same.

**Cut, and why.** AI Lead Qualifier and the travel support website do not
exist. BOSS 2026 and the Tally-to-Gmail automation have no artifact.
`e-plantShopping`, `expressBookReviews`, `oaqjp-final-project-emb-ai`, and
`tfjzl-final-cloud-app-with-database` are forks of IBM lab repositories. The
Ferret9 experience is not being used. `gamigo-exam` is excluded at your
request.

---

## `/play` track — game development

The personal track. These are prototypes and experiments, and the page says so
in as many words. An unfinished prototype presented as a prototype is honest
and interesting; the same thing presented as a finished game is not.

Suggested framing for the top of the page: *"Things I build when nobody is
grading them. Mostly unfinished, which is the point."*

- **How To Swim Your Fish** — https://github.com/settery7/HowToSwimYourFish —
  Godot. Casual game where you guide a fish using feed to reach the objective.
  The most complete of the three, so it leads.
- **Tek-Trails (Teknoy Trails)** — https://github.com/settery7/Tek-Trails —
  Unity, C#. A Pou-inspired virtual pet that merges study sessions with pet
  care, plus campus navigation for finding your way around CIT-U buildings.
  Unfinished and barely playable — label it as an abandoned prototype and let
  the concept do the work. TODO: team project or solo, and what was your part?
- **anito** — https://github.com/settery7/anito — Godot, GDScript. Early
  prototype, needs substantial work. TODO: one sentence on what it is meant to
  be — the concept is the interesting part when the build is not finished.

Tone here is looser than `/dev`, but the honesty rules still apply.

---

## Capability cards

Four cards, each pointing at a project that demonstrates it. A card without a
proof link gets deleted, not padded.

- **Full-stack web** — React, Node/Express, PostgreSQL, Redis, WebSockets.
  Proof: Pykes.
- **Mobile** — Flutter and Dart, local persistence, responsive layouts.
  Proof: Whaloo.
- **Deployment and infrastructure** — Docker, Docker Compose, Kubernetes,
  Caddy, GitHub Actions CI. Proof: Pykes.
- **Testing** — Playwright end-to-end suites covering auth, permissions, and
  account recovery. Proof: Pykes.

The "AI and automation" and "client delivery" cards were removed: their only
proofs were projects that do not exist.

---

## Timeline

Reverse chronological, two to three sentences each.

- **2026** — Graduated BS Computer Engineering from Cebu Institute of
  Technology – University in May. Earned the IBM Full Stack Developer
  Professional Certificate along with the Flask and Data Science certificates,
  and completed the Dealership capstone. Built Pykes and deployed it.
- **2025** — Whaloo, a Flutter study app built with a team over 101 commits,
  where I worked as project manager. Computer Engineering coursework including
  a CPU simulation.
- **2024 and earlier** — Tek-Trails at Cebu Institute of Technology, a Unity
  virtual pet game built around study sessions and campus navigation.

TODO: pick one or two images per entry.

---

## Contact page copy

**Heading.** Get in touch

**Body.** I'm looking for full-stack or mobile development work. The fastest
way to reach me is email, and I read everything that arrives.

Approved. No response time is named, which is correct — do not add one unless
it will actually be honoured.

---

## Copy rules

- First person, plain language, no "passionate about crafting."
- Every capability claim points at an artifact. No artifact, no claim.
- No invented metrics, client names, or dates. `TODO:` is better than a guess.
- Sentence case throughout. No all-caps labels.
- Nothing goes in this file that cannot be verified against a repository.
