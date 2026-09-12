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
- **One-liner:** Computer Engineering graduate building full-stack web, mobile
  and embedded systems — React, Node, PostgreSQL, Flutter, ESP32 — and
  self-hosting them end to end with Docker.

**Correction, and why the one-liner changed.** An earlier version of this file
claimed there was no LLM work in any repository, and stripped AI from the
one-liner on that basis. That was wrong once RemGlove came to light:
`remgloves_app/lib/services/ai_summary_service.dart` calls Gemini 2.5 Flash
Lite to turn gesture logs into readable summaries. The earlier removal was
still correct at the time — it cut a claim whose only support was a project
that does not exist — but the reasoning no longer holds.

AI is deliberately still **not** in the one-liner. One Gemini call
summarising logs is real and worth a capability card with a proof link, but it
is not what this work is mostly about, and leading with it would be the same
overclaiming the earlier draft was guilty of. Embedded is in the one-liner
instead, because the thesis is a genuine hardware project and it is the thing
that makes the Computer Engineering degree mean something to a reader.

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

CORS confirmed: Clayne hit it, so the sentence stays. Remaining TODO is voice
only — read it aloud and change anything that does not sound like you. One
concrete sentence about the moment the cross-origin requests started failing
would make this paragraph better still.

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
- **Team size:** four, including me.
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

**Problem.** A reviewer app for studying, built by four of us. Students keep
the things they revise with spread across separate apps — flashcards in one,
the class timetable in another, notes in a third — and none of them know about
each other. We wanted the reviewing and the scheduling in the same place, so
that what you have to study and when you have to study it are not two separate
problems.

TODO: replace the second sentence with the actual reason your team picked this
if it differs. One line in your own voice is worth more than a good guess.

**What I built.** A Flutter note-taking and study application that combines
four tools students normally keep in separate apps: a flashcard system with
create, edit, and review flows backed by a local database; schedule management;
a to-do list with its own create and edit screens; and a file viewer for study
materials. The layout adapts to tablet as well as phone. Terms and conditions
are included, as the app was built for distribution rather than as an exercise.

**The hard part.** Reconstructed from the code in `schedule_widget.dart` and
the abandoned files in `lib/Pages/Responsive/`. Clayne to check it reads true:

> The schedule screen was the one that fought back. It had to draw class
> blocks as rectangles whose height actually means something — a 45-minute
> block and a three-hour block are not the same shape — across seven day
> columns, on both a phone and a tablet.
>
> My first attempt was a breakpoint. A `ResponsiveLayout` widget swapped an
> entire mobile tree for an entire tablet tree at 600px. It doubled the work
> and it did not help, because the problem was never screen width. The blocks
> had no inherent size to begin with. Those files are still in the repo,
> marked for deletion.
>
> What worked was to stop laying the rectangles out and start computing them.
> Every time is normalised to minutes since midnight, so 2:30 PM becomes a
> single number and a schedule crossing midnight stops being a special case.
> The visible window comes from the earliest and latest scheduled item rather
> than a fixed 24 hours, so an empty morning costs no space. One constant
> converts minutes to pixels, every block's height falls out of its duration,
> and the grid gets an exact computed height inside a scroll view. That is
> what finally stopped the overflow warnings.

Everything above is verifiable in the repository: `_timeToMinutes`,
`_findEarliestTime`, `_findLatestTime`, `pixelsPerHour`, and the
`math.max(baseHeight + 30, 300.0)` floor are all real. Nothing is invented.

**Result.** Built to release readiness but never submitted to the Play Store or
TestFlight. Say that plainly — it is a more credible ending than implying a
launch that did not happen.

---

### 3. RemGlove — `RemGloves-Software`

The Computer Engineering project. Everything else on this site is software;
this one has hardware in it, which is what makes the degree mean something to
a reader.

- **Role:** Thesis capstone, team of three. I built the BLE layer and the AI.
  Second-highest contributor at 10 commits of 26.
- **Year:** 2026, March to May
- **Tech:** ESP32, BLE over the Nordic UART service, Flutter, MQTT, Gemini
  API, flex sensors. A Unity hand model is embedded in the Flutter app through
  FlutterUnityIntegration for live visualisation.
- **Repo:** https://github.com/marjorie033/RemGloves-Software
  (owned by a teammate; say so plainly rather than implying it is yours)
- **Cover:** `public/covers/remglove.webp` — the hardware photo. Five flex
  sensors down the fingers, the wiring harness, and the 3D-printed ESP32
  enclosure. This is the only physical object on the site and the only image
  a reader will remember.

**Problem.** Touch screens and voice assistants both assume something about
the person using them — a free hand, or a voice the device recognises.
RemGlove is a glove that reads American Sign Language hand signs through flex
sensors and uses them to control TVs, lights and fans over BLE, hands-free and
contactless, for the people those two interfaces leave out.

TODO: one line on why the team chose this, if there is a story there.

**What I built.** My two pieces were the wireless layer and the AI.

The glove talks to the phone over BLE using the Nordic UART service, with the
ESP32 advertising as `RemGloves`. The Flutter side exposes connection state as
a small state machine — idle, scanning, connecting, connected, disconnected,
error — and publishes three streams: live glove data, status, and calibration.
Each finger arrives both as a raw bend percentage and as a settled bent or
straight state, with calibration handled per glove because no two flex sensors
read alike.

The AI layer summarises gesture logs. It sends aggregate counts — devices
controlled, commands issued, calibrations run, over a date range — to Gemini
2.5 Flash Lite and returns a short readable report rather than a table. It
retries once on failure, and the API key lives in a gitignored
`config/secrets.dart`, so it is not in the public repository.

**The hard part.** Draft from the code — Clayne to confirm it reads true:

> The obvious way to send hand data over BLE is to stream five analog sensor
> values continuously and work out the gesture on the phone. We do not do
> that. The ESP32 decides for itself whether each finger is bent, and packs
> the answer into five bits — bit 0 is the thumb, bit 4 is the pinky — so a
> whole hand position travels as a single number and prints as something like
> `11010`.
>
> That moves the decision to the device and shrinks the payload to almost
> nothing, which matters on a battery-powered board holding a BLE connection.
> It also means the phone never has to guess: thirty-two hand positions are
> possible and each one arrives unambiguous. The cost is that thresholds have
> to be right, so calibration is per glove rather than a constant in the
> firmware.

TODO: confirm, and add what went wrong before you settled on this. If you
first streamed raw values and hit throughput or battery problems, say so — the
version with the failure in it is better than the version without.

**Result.** It works. TODO: what does it control today, and did it pass? One
concrete sentence — "controls a TV, two lights and a fan" is worth more than
an adjective.

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
  Godot. A hypercasual game where you guide a fish using feed to reach the
  objective. Built for a game jam, where it placed **7th for theme
  implementation**. Leads the track: it is the most complete of the three, it
  has the best art in the whole asset set, and it is the only thing on the
  site that placed in a competition.

  **Verified.** Results page:
  https://itch.io/jam/mini-jame-gam-51/rate/4274527 — Mini Jame Gam #51,
  submitted by Settery, Joprax and Rei-sama077, ranked from 14 ratings:

  | Criteria | Rank | Score |
  | --- | --- | --- |
  | Theme Implementation | **#7** | 4.286 |
  | Gameplay | #11 | 3.286 |
  | Fun Factor | #25 | 3.071 |
  | Overall | #32 | 3.262 |
  | Audio | #37 | 3.071 |
  | Visuals | #50 | 3.143 |
  | Special Object Implementation | #72 | 2.714 |

  Theme implementation is by a distance the best category, so that is the one
  to name — and it must always be named *with* its category. "7th in the jam"
  would be false; overall was #32. The badge links to the table above, so a
  sceptical reader can check it in one click, and the precise claim survives
  that click where a loose one would not.

  This was a **team entry**, and the page says so. The jam theme put speakers
  behind the current pushing the fish around, which is a nice concrete detail
  worth keeping.
- **Tek-Trails (Teknoy Trails)** — https://github.com/settery7/Tek-Trails —
  Unity, C#. A Pou-inspired virtual pet that merges study sessions with pet
  care, plus campus navigation for finding your way around CIT-U buildings.
  A team project, where I was lead developer and project manager. Unfinished
  and barely playable — label it as an abandoned prototype and let the concept
  do the work.
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
