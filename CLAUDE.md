# CLAUDE.md

Project context for Claude Code. Read this before making any change.

## What this is

The personal portfolio site of **Clayne Cezclark Nable** (GitHub: `settery7`), a
full-stack developer based in Cebu, Philippines, currently job hunting.

The site's job: make a recruiter or client want to start a conversation within
30 seconds of landing.

## The core concept: a two-track site

Visitors land on a **fork screen** and choose a track:

- **`/dev`** — the professional track. Everything a recruiter or client needs.
- **`/play`** — the personal track. Hobby work, looser and more expressive.

The fork is a **fork, not a gate**. Rules that must never be broken:

1. Both tracks are real, indexable routes. The fork lives at `/`, but `/dev`
   and `/play` are directly linkable, and `/dev` is what goes on the CV and
   LinkedIn.
2. The fork screen itself shows the name, a one-line identity, and both doors.
   A visitor who never clicks still learns who this is.
3. The chosen track persists in `localStorage` under key `track`. A returning
   visitor is redirected straight into their track, with a visible way back.
   That way back is the **Menu** control in the nav, which links to `/?stay=1`
   — the `stay` parameter suppresses the redirect, or the fork would bounce
   them straight back out again.
4. **Changed 13 September 2026, at Clayne's request.** This previously read
   "a track toggle is always present in the nav". It no longer is. `/play` is
   reachable from the fork screen only, so `/dev` carries nothing a recruiter
   did not come for. Rule 1 still holds in full: both tracks remain real,
   indexable, directly linkable routes, so nothing is hidden from a crawler
   or from anyone holding the URL. Do not reinstate a cross-track toggle
   without asking.
5. Contact details are reachable from both tracks. On `/dev` contact is a
   section at the foot of the page rather than its own route; `/dev/contact`
   still resolves and redirects to `/dev#contact`, because that URL has been
   shared and a 404 is worse than an extra hop.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS |
| Components | shadcn/ui as the base layer |
| Effects | Aceternity UI + Magic UI (copy-paste, MIT) |
| Motion | Framer Motion |
| Icons | Lucide |
| Content | MDX files in `content/`, no CMS, no database |
| Forms | Web3Forms (free tier), no backend route needed |
| Analytics | Vercel Web Analytics |
| Hosting | Vercel Hobby (free) |

Everything above has a free tier that covers this project permanently.
**Do not introduce a paid dependency without asking.**

## Design tokens

Define these in `app/globals.css` as CSS custom properties on `:root`, then map
them into Tailwind through the `@theme inline` block in that same file. Never
hardcode a hex value in a component.

The project runs **Tailwind v4**, which has no `tailwind.config.ts` — v4 moved
configuration into CSS. Earlier drafts of this file and of `README.md` referred
to that config file; it does not exist and should not be created. The `@theme`
block generates the utilities: `bg-ink`, `text-sand`, `border-edge`,
`text-signal`, `font-display`, `font-body`, `font-mono`.

```css
--ink:        #04211D;  /* page base — deep teal-black, not a tinted grey */
--surface:    #0A302A;  /* raised cards and panels */
--edge:       #174A41;  /* hairlines, card borders */
--sand:       #EDE6D8;  /* primary text */
--muted:      #7E9A93;  /* secondary text, captions */
--signal:     #F2A93B;  /* the single accent — amber */
```

One accent. `--signal` marks exactly one thing per screen: the primary action,
the active state, or the single number worth looking at. If two things on a
screen are amber, one of them is wrong.

### Typography

- **Display** — Bricolage Grotesque (variable, Google Fonts). Headings only.
- **Body** — Karla (Google Fonts). Everything else.
- **Mono** — JetBrains Mono. Actual code snippets only, never as decoration
  for small labels.

Load via `next/font/google`. Body line length caps at 72 characters.

### Things this project deliberately does not do

The reference site (radnaabazar.com) uses acid green on pure black. We are not
copying that, because that combination is now the default look of every
generated dark portfolio. Neither do we use:

- All-caps tracked-out eyebrow labels above headings
- Meta strings joined with middle dots (`A · B · C`)
- A fade-and-slide-up entrance on every single section
- Numbered markers (01 / 02 / 03) on anything that is not genuinely a sequence
- Accenting one word inside a headline in a different color

Motion budget: **one orchestrated moment on the fork screen**, and after that
only motion that responds to a user action. Respect `prefers-reduced-motion`
everywhere.

## Content rules

The copy is as important as the code. When generating or editing copy:

- Write in the first person, plain and specific. No "passionate developer
  crafting elegant solutions."
- Every capability claim must point at a real artifact — a repo, a live URL, a
  client deliverable. If there is no artifact, cut the claim.
- Never invent metrics, client names, user counts, or dates. If a number is
  needed and unknown, leave `TODO:` in the copy and flag it in your summary.
- Stats tiles like "years of experience" are off the table. The proof strip
  shows certifications and shipped work instead.

Real content lives in `docs/content.md`. Pull from there; do not improvise
project descriptions.

## Conventions

- `app/` — routes. `components/ui/` — shadcn primitives. `components/sections/`
  — page sections. `components/effects/` — Aceternity/Magic UI pieces.
  `content/` — MDX. `lib/` — helpers. `data/` — typed content arrays.
- Server Components by default. Add `"use client"` only where a hook or an
  event handler genuinely requires it, and keep those components small.
- One section per file. If a section file passes ~150 lines, split it.
- Tailwind classes only. No CSS modules, no styled-components.
- Images go in `public/`, pre-optimized (WebP, under 300KB), always through
  `next/image` with real `alt` text.
- Conventional commits: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.

## Quality floor — check before saying a section is done

- Renders correctly at 375px, 768px, and 1440px
- Keyboard reachable with a visible focus ring
- Colour contrast at least 4.5:1 for body text
- `prefers-reduced-motion` honoured
- No console errors or hydration warnings
- `npm run build` passes clean

## Build order

Ship something deployable at the end of every phase. Do not start a phase
before the previous one is on Vercel and working.

1. **Skeleton** — Next scaffold, tokens, fonts, nav, footer, `/dev` with real
   content and zero animation. Deploy.
2. **Fork** — the `/` fork screen, track persistence, `/play` shell. Deploy.
3. **Projects** — the projects grid and the MDX case-study template. Deploy.
4. **Motion** — bento grid, spotlight, marquee, scroll reveals. Deploy.
5. **Polish** — OG images, metadata, sitemap, Lighthouse pass, domain. Deploy.

The full component-by-component spec for the `/dev` track is in
`docs/build-spec.md`. Work through it in order and stop after each section for
review.

## Working agreement

- Before building a section, restate what you understood from the spec in two
  or three lines and wait for a go-ahead.
- Build one section at a time. Do not scaffold six sections in a single pass.
- After each section: run the build, list what you changed, and name anything
  you had to guess.
- If the spec and this file disagree, this file wins. If something here seems
  wrong, say so instead of quietly working around it.
- Do not add dependencies, analytics, or third-party scripts that are not
  listed above.
