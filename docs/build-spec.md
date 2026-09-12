# Build spec — `/dev` track

Component-by-component. Build in this order. Each section lists what it is,
what goes in it, how it behaves, and what "done" means.

Shared vocabulary: **section** = a full-width band on the page. **tile** = a
card inside a bento grid. **proof** = a link to a real artifact.

---

## 0. Fork screen — `app/page.tsx`

**Purpose.** The one bold moment on the site. Everything else stays quiet.

**Layout.** Full viewport, split into two panels. Desktop: vertical split,
50/50. Mobile: stacked, each panel 50vh.

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│  Clayne Cezclark     │                      │
│  Nable               │                      │
│  Full-stack dev,     │                      │
│  Cebu                │                      │
│                      │                      │
│  ── Hire me ───────► │  ── Wander around ─► │
│  Projects, stack, CV │  The non-work stuff  │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**Content.** Name and one-line identity live in the left panel, above the two
doors, so they read regardless of which side the eye lands on. Door labels are
verbs, not nouns. Suggested: `I'm hiring / I'm curious` — pick the pair that
sounds like him, not like a template.

**Behaviour.**
- Panels are `<Link>` elements, keyboard focusable, with a visible focus ring.
- Hover or focus expands the active panel to roughly 60% and dims the other.
  Transform-based, 300ms, `ease-out`. This is the orchestrated moment.
- On mount, a single staggered reveal: name, then tagline, then doors. Runs
  once, ~600ms total. Never repeats.
- A small "skip to professional" text link at the bottom for anyone who does
  not want to choose.
- On selection, write `localStorage.track`. On subsequent visits to `/`,
  redirect to the stored track client-side after mount (never server-side —
  crawlers must always see the fork).

**Done when.** Both panels reachable by Tab, reduced-motion disables the
expansion, the page is under 100KB of JS, and `/` is indexable.

---

## 1. Nav — `components/sections/nav.tsx`

**Purpose.** Orientation and the track toggle.

**Content.** Wordmark on the left (`Clayne.` — links to `/dev`). Links:
Projects, About, Contact. A track toggle on the right, labelled with the
*other* track, not the current one.

**Behaviour.** Sticky, translucent with a backdrop blur over `--ink`. Hairline
bottom border in `--edge` that only appears after 40px of scroll. Mobile:
collapses to a sheet from `shadcn/ui`.

**Done when.** Toggle switches tracks and updates `localStorage`, active link
has a non-colour-only indicator, and the mobile sheet traps focus correctly.

---

## 2. Hero — `components/sections/hero.tsx`

**Purpose.** Say who he is and what he does, once, clearly.

**Content.**
- H1: name.
- One sentence, taken verbatim from the one-liner in `docs/content.md`:
  Computer Engineering graduate building full-stack web and mobile
  applications — React, Node, PostgreSQL, Flutter — and self-hosting them end
  to end with Docker. Based in Cebu.
  Do not reintroduce an AI or LLM claim here. No repository contains LLM work.
- Two actions: `View projects` (scrolls to projects) and `Download CV` (PDF in
  `public/`, opens in a new tab). Only the first carries `--signal`.
- Portrait, right side on desktop, above the text on mobile. Real photo,
  not an avatar illustration.

**Behaviour.** Static. No typewriter effect, no rotating job titles, no
particle background. The hero earns attention through the sentence, not the
animation.

**Done when.** The H1 is the only `<h1>` on the page and the CV link resolves.

---

## 3. Proof strip — `components/sections/proof.tsx`

**Purpose.** This replaces the reference site's stats tiles. Those tiles reward
years of experience; this one rewards range and evidence, which is the stronger
hand here.

**Content.** A single row, four items, each with a label and a proof link:

| Item | Proof |
| --- | --- |
| IBM Full Stack Developer Professional Certificate | Credential URL |
| Developing AI Applications with Python and Flask (IBM) | Credential URL |
| BSc Computer Engineering — Cebu Institute of Technology | — |
| Open source / GitHub | `github.com/settery7` |

**Behaviour.** Static. Horizontal scroll on mobile, snap-aligned.

**Done when.** Every credential link opens the real verification page. A dead
credential link is worse than no strip at all.

---

## 4. Featured projects — `components/sections/featured.tsx`

**Purpose.** The most important section on the site.

**Content.** Three projects, sourced from `data/projects.ts`. Each card:
cover image, title, one-line outcome, three to five tech chips, and two links —
`Case study` (internal, always present) and `Live` or `Repo` (external, when
one exists).

**Data shape.**

```ts
export type Project = {
  slug: string;
  title: string;
  outcome: string;          // one line, what changed for the user
  role: string;             // "Solo build", "Freelance", "Capstone"
  year: string;
  tech: string[];
  cover: string;            // /public path
  links: { live?: string; repo?: string; video?: string };
  featured: boolean;
  track: "dev" | "play";
};
```

**Layout.** Bento grid, not a uniform 3-up. The first project gets a tile twice
the width of the other two. Hierarchy in the layout is doing work here: the
biggest tile is the strongest project.

**Behaviour.** Aceternity-style glow border on hover, one property animated
(border colour), 200ms. Cards are links in full — the whole tile is clickable,
not just the title.

**Done when.** Every card links somewhere real, no card shows a placeholder
image, and the grid reflows sensibly at 375px.

---

## 5. Case study template — `app/dev/projects/[slug]/page.tsx`

**Purpose.** Where a serious reader goes. The most convincing content on the
site lives here.

**Content.** MDX from `content/projects/*.mdx`, rendered into five blocks in
this fixed order:

1. **Problem** — one paragraph, in the client's terms, not technical terms.
2. **What I built** — architecture. Include a diagram whenever there is more
   than one moving part.
3. **The hard part** — one specific technical decision and the reasoning. This
   block is the point of the page. It is what separates this from a tutorial
   portfolio.
4. **Result** — what changed for the user.
5. **Links** — live, repo, or an embedded demo video.

Target 300–500 words. A frontmatter block carries the typed `Project` fields.

**Behaviour.** Sticky table of contents on desktop, above 1024px only.
Previous/next project links at the foot.

**Done when.** All five blocks are present in every case study, and no case
study contains a `TODO:`.

---

## 6. Demo video embed — `components/demo-video.tsx`

**Purpose.** Backend-heavy projects have no permanently free host. A recorded
demo beats a cold-starting free-tier deployment and costs nothing.

**Behaviour.** Poster frame with a play control. Loads the video only on click,
never autoplays, never preloads. Self-host short clips in `public/` if under
10MB; otherwise embed an unlisted YouTube video through a lite-embed wrapper so
the player script is not loaded on page load.

**Done when.** Page weight with a video on the page is unchanged until click.

---

## 7. Capability cards — `components/sections/capabilities.tsx`

**Purpose.** The reference site calls this "Experience". Rename it, because the
content here is capability backed by evidence rather than a job history.

**Content.** Four cards:

- **Full-stack web** — React, Node/Express, PostgreSQL, Redis, WebSockets
- **Mobile** — Flutter and Dart, local persistence, responsive layouts
- **Deployment and infrastructure** — Docker, Docker Compose, Kubernetes,
  Caddy, CI with GitHub Actions
- **Testing** — Playwright end-to-end suites covering auth, permissions, and
  account recovery

The earlier "AI & automation" and "client delivery" cards were removed: their
only proofs were projects that do not exist. See `docs/content.md`.

Each card carries one proof link to a project that demonstrates it. A card with
no proof link gets deleted, not padded.

**Layout.** 2×2 on desktop, stacked on mobile. Equal weight — this is genuinely
a set, so uniform tiles are correct here.

---

## 8. Range section — `components/sections/range.tsx`

**Purpose.** Game development lives here. It signals breadth without competing
with the full-stack headline, which is the primary identity.

**Content.** One compact band: C#/Unity and Godot, with a link to the public
C#/Unity assessment repo. Two sentences at most.

**Behaviour.** Visually quieter than everything above it. No accent colour.

---

## 9. Timeline — `components/sections/timeline.tsx`

**Purpose.** Shows trajectory, which matters more than headcount for someone
early in their career.

**Content.** Reverse-chronological entries in `data/timeline.ts`. Each: year,
two-to-three-sentence summary, and up to two supporting images.

**Behaviour.** Vertical rail with year markers. This *is* a genuine sequence,
so numbered or dated markers are appropriate here — unlike anywhere else on the
site. Entries reveal on scroll, one property (opacity), staggered by 60ms.

---

## 10. Contact — `app/dev/contact/page.tsx`

**Content.** Three fields: name, email, message. A copy-email button as an
alternative. Links to GitHub and LinkedIn.

**Behaviour.** Web3Forms free tier. Client-side validation before submit,
inline errors that say what to fix, a disabled state while sending, and a
success state that replaces the form rather than firing a toast that disappears.

Never use a raw `<form>` action to a third party without a honeypot field.

**Done when.** A test submission arrives in his inbox and the error state is
reachable by unplugging the network.

---

## 11. Footer — `components/sections/footer.tsx`

**Content.** Name, the link to the other track, social links, year. Nothing
else.

---

## 12. Metadata and SEO

- Per-route `metadata` exports: title, description, OG image, canonical.
- One OG image for the site, one per case study. Generate with
  `next/og` at build time, never by hand.
- `app/sitemap.ts` and `app/robots.ts` covering both tracks.
- JSON-LD `Person` schema on `/dev` with `name`, `jobTitle`, `url`, `sameAs`.
- The `<title>` on `/dev` must contain the full name. Recruiters search it.

---

## Acceptance checklist before launch

- [ ] Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] Every external link opens the intended page (no 404s, no dead demos)
- [ ] CV PDF is current and downloads
- [ ] OG preview renders correctly when pasted into LinkedIn
- [ ] Both tracks indexed and directly linkable
- [ ] Tested on a real phone, not just a resized browser window
- [ ] No `TODO:` strings remain in any rendered copy
