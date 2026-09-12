# Content

The single source of truth for every word on the site. Fill in the `TODO:`
items before building — writing the copy first is what makes the build fast.

Claude Code: pull project descriptions from this file. Do not improvise them.

Every project below was verified against `github.com/settery7` before it was
written in. Nothing here is aspirational. If a project is not on this list, it
does not go on the site.

---

## Identity

- **Name:** Clayne Cezclark Nable
- **Handle:** settery7
- **Location:** Cebu, Philippines
- **Education:** BS Computer Engineering, Cebu Institute of Technology –
  University. TODO: graduation year, or expected year
- **One-liner:** Computer Engineering graduate building full-stack web and
  mobile applications — React, Node, PostgreSQL, Flutter — and self-hosting
  them end to end with Docker.

The one-liner deliberately makes no AI or LLM claim. There is no LLM work in
any repository, and a claim without an artifact gets cut.

**Credentials**

- IBM Full Stack Developer Professional Certificate —
  https://www.coursera.org/account/accomplishments/professional-cert/CBEGXGF2N74J
- Developing AI Applications with Python and Flask (IBM) —
  https://www.coursera.org/account/accomplishments/verify/FK33G0AW51Q0
  TODO: confirm the exact title printed on the certificate. This entry used to
  read "IBM Python for Data Science, AI & Development", which is a different
  course — say which one you hold, or supply the second URL if you hold both.
  `docs/build-spec.md` §3 names this credential too; keep the two in sync.

**Links**

- GitHub: https://github.com/settery7
- LinkedIn: https://www.linkedin.com/in/settery/
- Email: n.cezclayne@gmail.com
- CV: `public/clayne-nable-cv.pdf` — TODO: export current version

---

## Featured projects

Three projects, in this order. The order is the argument: a self-hosted
platform, a shipped mobile app, a credentialed capstone.

### 1. Pykes — `pykes`

The flagship. A product with an idea behind it, built to completion with tests
and deployment, rather than a tutorial followed to the end.

- **Role:** Solo build
- **Year:** 2026
- **Tech:** React, Vite, Node, Express, WebSockets, PostgreSQL, Redis, MinIO,
  Caddy, Docker, Kubernetes, GitHub Actions, Playwright
- **Repo:** https://github.com/settery7/pykes
- **Cover:** `docs/demo.gif` exists in the repo — export a still frame from it,
  or capture the feed screen at 1600×1000
- **Links:** repo above · demo TODO: is this deployed anywhere public, or is
  the gif the only demo?

**Problem.** Indie developers building in public have to choose between
scattering updates across social platforms they do not control, or paying for a
hosted service. TODO: replace this with your own reason for starting it — what
you personally wanted that did not exist. One paragraph, plain terms.

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

**The hard part.** Pick one and explain the decision and why the alternative
was worse, in about 150 words. TODO — strong candidates visible in the repo:

- Garden-growth ownership. `e2e/tests/garden-growth-ownership.spec.js` exists
  as a dedicated spec, which suggests the rule of who is allowed to make a
  garden grow was genuinely difficult to get right.
- Zero paid services as a hard constraint. Choosing MinIO over S3 and Caddy
  over a managed certificate service is a real architectural tradeoff with real
  costs — say what you gave up.
- The edit-history migration. You added `edit-history` as its own migration
  after the baseline schema, so post editing was a decision made mid-build.

**Result.** TODO — what state is it in? Running somewhere, used by anyone, or
complete but unhosted? Say so honestly. "Feature-complete and reproducible with
one `docker compose up`" is a real result and needs no user numbers.

---

### 2. Whaloo — `whaloo`

Proof of a mobile application carried to release readiness. 101 commits.

- **Role:** TODO — solo, or a team project?
- **Year:** 2025
- **Tech:** Flutter, Dart
- **Repo:** https://github.com/settery7/whaloo
- **Cover:** TODO — screenshot of the flashcard or schedule screen from a
  device or emulator
- **Links:** TODO — was this published to Play Store or TestFlight? The repo
  contains a Terms and Conditions page, which suggests a release was intended

**Problem.** TODO — one paragraph. Students juggling study material across
separate flashcard, calendar, and to-do apps, in your own words. Who were you
building this for?

**What I built.** A Flutter study application combining four tools students
normally keep in separate apps: a flashcard system with create, edit, and
review flows backed by a local database; schedule management; a to-do list with
its own create and edit screens; and a file viewer for study materials. The
layout is responsive, adapting to tablet as well as phone. Terms and conditions
are included, as the app was built for distribution rather than as an exercise.

**The hard part.** TODO. Good candidates given the code: the local database
schema for flashcards, the responsive layout split across phone and tablet, or
state management across four largely independent feature areas.

**Result.** TODO — was it released, and to whom? If it was never published, say
that plainly. An honest "built to release readiness, never submitted" is
stronger than a vague implication that it shipped.

---

### 3. Dealership Application — `xrwvm-fullstack_developer_capstone`

The end-to-end pipeline proof: auth, services, containers, CI, deployment.
Labelled as a capstone in the role field, openly.

- **Role:** IBM Skills Network capstone. TODO: confirm which parts you wrote
  versus which the course scaffolded — the case study should describe only your
  work, and being specific about that boundary is more impressive than
  blurring it
- **Year:** 2026
- **Tech:** Django, React, Node/Express, MongoDB, Docker, Kubernetes, GitHub
  Actions
- **Repo:** https://github.com/settery7/xrwvm-fullstack_developer_capstone
  (forked from the IBM Skills Network course repository)

**Problem.** Frame it as the product problem — dealer reviews and inventory —
not as "a course requirement."

**What I built.** Django authentication, Express API endpoints, a sentiment
analysis microservice on IBM Code Engine, containerized and deployed to
Kubernetes with GitHub Actions CI.

**The hard part.** The service boundary — why sentiment analysis lives as its
own deployable rather than inside the Django app.

**Result.** TODO.

---

## Secondary projects

Grid only, no case studies.

- **Simple CPU Simulation** — JavaScript.
  https://github.com/settery7/Simple-CPU-Simulation — Computer Engineering
  coursework, and it supports the BSCpE identity rather than diluting it.
- **Number system conversion** — decimal, binary, octal, hex.
  https://github.com/settery7/Decimal-Binary-Octal-Hex-Conversion — same
  reasoning. Label both as coursework.

**Cut, and why.** The following were in an earlier draft of this file and are
not on the site: AI Lead Qualifier and the travel support website, which do not
exist; the BOSS 2026 Forma LMS work and the Tally-to-Gmail automation, which
have no artifact; and `e-plantShopping`, `expressBookReviews`, and
`oaqjp-final-project-emb-ai`, which are forks of IBM course lab repositories
rather than original builds. The certificates already evidence that coursework
more credibly than the forks do.

TODO: `tfjzl-final-cloud-app-with-database` is also a course fork, a Django
app. Currently cut. Reinstate only if you extended it well beyond the lab.

---

## `/play` track — game development

This is the personal track, and it now has real substance. Four projects across
two engines.

- **gamigo-exam** — https://github.com/settery7/gamigo-exam — Unity, C# with
  custom shader work (ShaderLab and HLSL). TODO: what was this assessment for,
  and what did the shaders do? Shader work is the most technically distinctive
  thing here and deserves the most space.
- **Tek-Trails (Teknoy Trails)** — https://github.com/settery7/Tek-Trails —
  Unity, C#. A Pou-inspired virtual pet game that merges study sessions with
  pet care, with campus navigation to help students learn their way around
  CIT-U buildings. TODO: confirm this was a team project — the README says
  "our project" — and say what you were responsible for.
- **anito** — https://github.com/settery7/anito — Godot, GDScript. TODO: one or
  two sentences on what it is.
- **How To Swim Your Fish** — https://github.com/settery7/HowToSwimYourFish —
  Godot. TODO: one sentence.

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
  Caddy, GitHub Actions CI. Proof: Pykes, and the Dealership capstone.
- **Testing** — Playwright end-to-end suites covering auth, permissions, and
  account recovery. Proof: Pykes.

The "AI and automation" card is gone: no repository contains LLM work. The
"client delivery" card is gone with it — its only proof was the travel support
site, which does not exist.

---

## Timeline

Reverse chronological. Two to three sentences each. TODO: fill in and pick one
or two images per entry.

- **2026** — Pykes. IBM Full Stack Developer Professional Certificate and the
  Flask certificate. The Dealership capstone. TODO: expand into prose, and add
  anything else from this year.
- **2025** — Whaloo, across 101 commits. Computer Engineering coursework
  including the CPU simulation. TODO: expand.
- **2024 and earlier** — Tek-Trails at Cebu Institute of Technology. TODO:
  Ferret9 — is this real? It was in an earlier draft of this file as client
  communication, documentation, and technical support for local and
  international clients, but that draft also contained two invented projects, so
  it needs confirming before it goes on the site.

---

## Contact page copy

**Heading.** Get in touch

**Body.** I'm looking for full-stack or mobile development work. The fastest way
to reach me is email, and I read everything that arrives.

TODO: edit this into your own voice, and only name a response time if you will
actually honour it.

---

## Copy rules

- First person, plain language, no "passionate about crafting."
- Every capability claim points at an artifact. No artifact, no claim.
- No invented metrics, client names, or dates. `TODO:` is better than a guess.
- Sentence case throughout. No all-caps labels.
- Nothing goes in this file that cannot be verified against a repository.
