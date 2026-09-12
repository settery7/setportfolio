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

**Credentials** — two, both verified.

- IBM Full Stack Developer Professional Certificate —
  https://www.coursera.org/account/accomplishments/professional-cert/CBEGXGF2N74J
- Developing AI Applications with Python and Flask (IBM) —
  https://www.coursera.org/account/accomplishments/verify/FK33G0AW51Q0

Python for Data Science, AI & Development is **not** held. An earlier draft of
this file listed it; it has been removed. Do not reinstate it.

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
- **Cover:** the profile screen works well — sidebar, project card with the
  garden mid-sprout, and a typed post all visible at once. Capture it at
  1600×1000 or wider, logged in, with the email-verification banner dismissed.
  Save to `to-import/`. A still frame from `docs/demo.gif` is the fallback.
- **Hosting.** Production is split across two free tiers, which is not what the
  repository alone suggests and is worth stating plainly in the case study:
  - Frontend — Cloudflare Workers, https://pykes.settery.workers.dev/
  - Backend — Render, https://pykes.onrender.com (Express, routes under `/api`)

  The Docker Compose setup in the repo, with Caddy, Nginx and MinIO, is the
  local development environment. Production does not run that stack. Do not
  describe Compose as if it were the deployment.

- **Links:** live https://pykes.settery.workers.dev/ · repo above · demo gif in
  `docs/demo.gif`

  Verified working: the frontend returns 200 and serves the app, the backend
  answers `/api/health` with `{"status":"ok"}`, and `/api/projects` correctly
  returns 401 without an Authorization header.

  **How to present it.** The live link leads, because it works. Keep the demo
  gif beside it as a fallback — Render free-tier services spin down after
  roughly 15 minutes idle, so a visitor arriving cold may wait, and
  `docs/build-spec.md` §6 covers exactly this case. A short label such as
  "live demo — the backend sleeps when idle, give it a moment" sets the
  expectation honestly without undercutting the link.

**Problem.** I wanted a platform where developers could share the work they
were doing — updates tied to actual projects rather than scattered across
social platforms nobody controls. Nothing that existed did that without
charging for it, so the whole thing was built to run on free infrastructure.

**What I built.** A build-in-public platform for developers. You register a
project, post updates against it, and the project grows a pixel-art garden as
you go. Posts are typed — update, idea, bug, shipped, release — and only a
shipped post grows the garden, which is the rule the whole thing turns on.
Projects carry a growth stage, so a garden visibly moves from sprouting
onward as real work lands. There is a follower graph, comments, photo
attachments, and an explore feed.

Underneath: a React frontend, an Express API with WebSocket support,
PostgreSQL for relational data under versioned migrations, Redis for caching
and rate limiting, and MinIO for S3-compatible object storage. Account
handling is complete rather than demo-grade — email verification, password
reset, and per-route rate limiting. Eight Playwright end-to-end specs cover
the flows that matter, including who is allowed to make a garden grow.

Locally the whole thing comes up as one Docker Compose stack behind Caddy,
with Kubernetes manifests and a GitHub Actions pipeline. Production is split
across two hosts — see the hard part below.

Include the architecture diagram here: Caddy → frontend / API → Postgres,
Redis, MinIO. This is the diagram that earns the most on the whole site.

**The hard part.** Running PostgreSQL and Redis together inside Render's
free-tier resource limits. The zero-cost constraint was not a preference, it
was the whole design brief, and it decided the shape of the backend: what could
be kept in memory, what had to be persisted, and how much of either the host
would tolerate before falling over.

Draft — Clayne to review for voice and accuracy before it ships:

> Pykes runs on two hosts, and the split came down to what each platform can
> actually do. The frontend is a static React bundle, so it belongs on
> Cloudflare Workers: served from the edge, nothing to keep warm, and it loads
> the same whether you open it from Cebu or anywhere else. The backend cannot
> live there. Workers is an edge runtime without long-lived TCP connections,
> and the API needs pooled, persistent connections to PostgreSQL and Redis.
> Render gives me that — an ordinary container that holds those connections
> open.
>
> Keeping everything on Render would have been simpler: one origin, no CORS,
> one deploy to think about. But then the interface would inherit the
> backend's cold start, and a visitor would wait on a sleeping free-tier
> service just to see the page render. Splitting it means the data waits, not
> the interface.

TODO: confirm the CORS claim matches what you actually hit, and correct the
voice anywhere it does not sound like you. If there was a specific moment this
broke — a request failing across origins, a connection pool exhausting — one
concrete sentence about it would make this paragraph considerably better than
it currently is.

**Result.** A working hobby project. It is feature-complete for what it set out
to do, and the honest constraint is that going further means paying for
infrastructure — the zero-cost requirement that shaped the architecture is also
the ceiling on it.

TODO: adjust this once the deployment question above is settled. If it is live,
say so and link it. If it is not, "feature-complete and reproducible with one
`docker compose up`" is a real result and needs no user numbers.

---

### 2. Whaloo — `whaloo`

A team project carried to release readiness. 101 commits.

- **Role:** Project manager, and wrote most of the code. Lead both ways, which
  is the strongest version of this claim — say it in that order, because
  "project manager" alone would undersell the engineering.
- **Team size:** TODO
- **Year:** 2025
- **Tech:** Flutter, Dart
- **Repo:** https://github.com/settery7/whaloo
- **Cover:** TODO. The Subjects screen — folders for Math, Science and English
  with the bottom navigation — reads clearly and shows what the app is for.
  Two problems with it as a cover: a phone screenshot is portrait and the grid
  wants 1600×1000 landscape, so it needs composing on a background or in a
  device frame; and the version supplied looks low-fidelity next to the Pykes
  screenshot. If a higher-fidelity build exists, capture from that. Two or
  three screens side by side — subjects, a flashcard, the schedule — would
  fill the tile better than one.
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

**The hard part.** Responsiveness. Everything else came together, but one
Flutter layout working across phone and tablet meant a constant stream of
overflow warnings — the striped bars that appear the moment a row or column
asks for more space than the screen will give it.

TODO: expand to about 150 words. Name the screen that fought hardest — the
schedule and to-do pages are the biggest files in the repo, so probably one of
those — and describe the fix. The `Responsive/` directory with
`dimensions.dart` and `responsive_layout.dart` is the approach you landed on;
say what you were doing before that and why it did not hold.

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
  A team project. Unfinished and barely playable — label it as an abandoned
  prototype and let the concept do the work. TODO: what was your part on the
  team?
- **anito** — https://github.com/settery7/anito — Godot, GDScript. An RPG built
  around mythical creatures. Early prototype, needs substantial work. The name
  is well chosen and worth a line: *anito* are the ancestral spirits of
  pre-colonial Philippine belief. TODO: confirm that reading is what you
  intended before it goes on the page.

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
  Professional Certificate and the Developing AI Applications with Python and
  Flask certificate, and completed the Dealership capstone. Built Pykes.
- **2025** — Whaloo, a Flutter study app built with a team over 101 commits,
  where I ran the project and wrote most of the code. Computer Engineering
  coursework including a CPU simulation.
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
