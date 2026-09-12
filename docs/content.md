# Content

The single source of truth for every word on the site. Fill in the `TODO:`
items before building — writing the copy first is what makes the build fast.

Claude Code: pull project descriptions from this file. Do not improvise them.

---

## Identity

- **Name:** Clayne Cezclark Nable
- **Handle:** settery7
- **Location:** Cebu, Philippines
- **Education:** BSc Computer Engineering, Cebu Institute of Technology –
  University
- **One-liner:** Full-stack developer building web apps and AI-powered
  automations — Django, React, Node, and LLM integrations.

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

### 1. AI Lead Qualifier — `ai-lead-qualifier`

The strongest piece. It solves a business problem rather than completing a
tutorial, so it leads.

- **Role:** Solo build, demo for a construction contractor
- **Year:** TODO
- **Tech:** n8n, OpenRouter, Vite, React, webhooks
- **Cover:** TODO — screenshot of the quote form, dark UI
- **Links:** repo TODO · demo video TODO

**Problem.** TODO — one paragraph in the contractor's terms. What was happening
to inbound leads before this existed? Who was doing the work manually?

**What I built.** A quote form that posts to an n8n workflow, which scores and
qualifies the lead through an LLM via OpenRouter and routes the result onward.
Include an architecture diagram: form → webhook → n8n → LLM → output.

**The hard part.** Pick one. Strong candidates from the build: the CORS
handling between the form and the webhook, the payload contract between the
frontend and n8n, or the prompt design for consistent structured scoring.
Explain the decision and why the alternative was worse. 150 words.

**Result.** TODO — what it changes for the contractor. If there are no numbers,
describe the before-and-after workflow honestly instead of inventing a metric.

---

### 2. Travel support website — `travel-support-site`

Proof of paid client delivery for a non-technical stakeholder.

- **Role:** Freelance
- **Year:** TODO
- **Tech:** WordPress, Elementor
- **Links:** live URL TODO (confirm the client is happy to be linked)

**Problem.** A Cebu-based travel support business serving Japanese tourists
needed TODO.

**What I built.** TODO — pages, booking or enquiry flow, any bilingual handling.

**The hard part.** TODO. Good candidates: serving a Japanese-language audience,
performance on mobile connections, or handling requirement changes from a
non-technical client.

**Result.** TODO.

---

### 3. Dealership Application — `dealership-application`

The end-to-end pipeline proof: auth, services, containers, CI, deployment.

- **Role:** IBM Skills Network capstone
- **Year:** TODO
- **Tech:** Django, React, Node/Express, MongoDB, Docker, Kubernetes, GitHub
  Actions
- **Repo:** `xrwvm-fullstack_developer_capstone`

**Problem.** Frame it as the product problem — dealer reviews and inventory —
not as "a course requirement." Label it honestly as a capstone in the role
field; do not hide it, and do not lead with it either.

**What I built.** Django auth, Express API endpoints, a sentiment analysis
microservice on IBM Code Engine, containerized and deployed to Kubernetes with
GitHub Actions CI. This is the architecture diagram that earns the most.

**The hard part.** The service boundary — why sentiment analysis lives as its
own deployable rather than inside the Django app.

**Result.** TODO.

---

## Secondary projects

Grid only, no full case studies unless there is time.

- **BOSS 2026 conference courses** — course setup on a Forma LMS instance.
  Client delivery, systems configuration. TODO: confirm what can be shown
  publicly.
- **E-Plant Shopping** — React and Redux storefront, deployed to GitHub Pages.
  Live link available.
- **Emotion detection service** — Flask and Watson NLP, 10.00/10 Pylint.
- **Book review API** — Node/Express REST API with JWT auth and sessions.
- **Form-to-email automation** — Tally → n8n → LLM → Gmail workflow.

---

## Range — game development

Two sentences, no more. C# and Unity, plus Godot experimentation. Link the
public C#/Unity assessment repo. Framed as breadth, not as a second identity.

---

## Capability cards

- **Full-stack web** — Django, React, Node/Express, PostgreSQL, MongoDB.
  Proof: Dealership Application.
- **AI & automation** — n8n, LLM APIs, webhook integrations, RAG concepts.
  Proof: AI Lead Qualifier.
- **Deployment** — Docker, Kubernetes, GitHub Actions CI. Proof: Dealership
  Application.
- **Client delivery** — requirements, documentation, technical support, working
  with international clients. Proof: travel support site.

---

## Timeline

Reverse chronological. Two to three sentences each. TODO: fill in years and
pick one or two images per entry.

- **2026** — TODO
- **2025** — TODO
- **Earlier** — Computer Engineering at Cebu Institute of Technology; client
  communication, documentation, and technical support at Ferret9 for local and
  international clients.

---

## Contact page copy

Heading and one line inviting a message. Plain and direct. Name the response
time only if it will actually be honoured.

---

## Copy rules

- First person, plain language, no "passionate about crafting."
- Every capability claim points at an artifact. No artifact, no claim.
- No invented metrics, client names, or dates. `TODO:` is better than a guess.
- Sentence case throughout. No all-caps labels.
