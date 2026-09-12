# Portfolio site — starter kit

A two-track portfolio: visitors choose between the professional track (`/dev`)
and the personal track (`/play`) at a fork screen.

This kit is documentation and Claude Code configuration. The app itself does
not exist yet — the first session builds it.

## What's in here

```
CLAUDE.md                      project context, read automatically by Claude Code
README.md                      this file
docs/build-spec.md             component-by-component spec for the /dev track
docs/content.md                every word on the site, with TODOs to fill in
.claude/commands/section.md    /section — build one section from the spec
.claude/commands/review.md     /review — critique the current state
```

## Before the first session

**1. Fill in `docs/content.md`.** Every `TODO:` you leave becomes a guess later
or a gap in the finished site. An hour here saves a day of rework. This is the
only step you cannot delegate.

**2. Gather assets** into a `to-import/` folder:

- A portrait photo, well lit, minimum 1200px on the short edge
- Screenshots of each featured project, 1600×1000 or wider
- Your CV as PDF
- Credential URLs for both IBM certificates

**3. Check your tooling:**

```bash
node --version    # 20 or later
git --version
claude --version  # npm i -g @anthropic-ai/claude-code
```

## Setting up the repo

```bash
mkdir portfolio && cd portfolio
git init
# copy CLAUDE.md, README.md, docs/ and .claude/ into this folder
git add -A && git commit -m "docs: project spec and Claude Code config"
```

Then start Claude Code in that folder:

```bash
claude
```

It picks up `CLAUDE.md` automatically. Confirm with `/memory`.

## First session

Paste this:

> Read CLAUDE.md and docs/build-spec.md. Scaffold Phase 1 only: a Next.js App
> Router project with TypeScript and Tailwind, the design tokens from CLAUDE.md
> wired into globals.css and tailwind.config.ts, the two fonts loaded via
> next/font, and the folder structure from the conventions section. No sections
> yet, no animation. Then stop and show me what you made.

Then work through the spec one section at a time:

```
/section 2          # builds the hero from docs/build-spec.md §2
```

## Working with Claude Code on this

**One section per session.** The spec is ordered deliberately. Asking for six
sections at once produces six mediocre ones and a diff too big to review.

**Commit after every section.** `git commit` before starting the next one. When
something goes wrong three sections later, you want a clean point to return to.

**Review the copy yourself.** Claude Code will happily write plausible-sounding
project descriptions. Anything it writes about your own work needs your eyes on
it before it ships — an invented detail in a case study is the one mistake a
technical interviewer will definitely catch.

**Use `/clear` between sections.** A fresh context reads the spec properly
instead of drifting from what it built an hour ago.

**Push back when the output is generic.** "This looks like every other dark
portfolio" is a legitimate and useful instruction. `CLAUDE.md` lists the
specific patterns to avoid; point at that list.

## Running it

```bash
npm run dev      # http://localhost:3000
npm run build    # must pass before any deploy
npm run lint
```

## Deploying

### Where to deploy, and why

**Use Vercel.** It is the right answer for this project and it is not close.

| Host | Verdict |
| --- | --- |
| **Vercel** | Built by the Next.js team. Every Next feature works on day one — image optimisation, route handlers, `next/og`, ISR. Zero configuration. **Pick this.** |
| Netlify | Works, via an adapter that trails Next releases. No reason to take that risk here. |
| Cloudflare Pages | Fast and generous, but Next on Workers needs `@opennextjs/cloudflare` and some features still have rough edges. |
| GitHub Pages | Static export only. Fine today, but it blocks `next/image` optimisation and any future server route. |
| Render | Good for containers and databases — it hosts the Pykes backend. Overkill for a static front end, and its free tier sleeps. |

This site is fully prerendered today (five static routes), so almost anything
would serve it. Vercel is still the pick, because the moment you add an OG
image route or a server action, everything else needs reworking and Vercel
does not.

### Steps

```bash
git remote add origin git@github.com:settery7/<repo>.git
git push -u origin main
```

1. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   The Next.js preset is detected — change nothing.
2. Before the first deploy, open **Environment Variables** and add:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY = <your key from web3forms.com>
   ```

   This is the one variable the site needs. `.env.local` is gitignored and
   never reaches Vercel, so without this the contact form fails in production
   while working perfectly on your machine. It is the single most common way
   this deploy goes wrong.
3. Deploy.

Every push to `main` redeploys. Every pull request gets its own preview URL,
which is the safe way to look at a change before it is live.

### After the first deploy

- Open the live contact form and send yourself one real message. Localhost
  working does not prove production works — different origin, different env.
- Check `/dev`, `/play`, and `/dev/contact` all load, and that the track
  toggle moves between them.
- Paste the URL into LinkedIn's post composer to see the link preview. Fixing
  that is Phase 5.

### Domain

`claynenable.com` is about $10/year and worth it — a real name domain is what
a non-technical recruiter searches for. Buy it anywhere (Namecheap,
Cloudflare), then add it under the project's **Domains** tab and follow the
DNS instructions.

The free fallback is a `.is-a.dev` subdomain, claimed by opening a pull
request against `github.com/is-a-dev/register`.

Until you have either, the `*.vercel.app` URL is a perfectly respectable thing
to put on a CV.

## Cost

| | |
| --- | --- |
| Hosting (Vercel Hobby) | free |
| Forms (Web3Forms) | free |
| Analytics (Vercel) | free |
| Components (shadcn, Aceternity, Magic UI) | free |
| Fonts (Google Fonts) | free |
| Domain | $0 on `.is-a.dev`, ~$10/yr for `.com` |

Vercel's Hobby tier is limited to personal, non-commercial use. A portfolio is
fine; adding payments or advertising is not.

## Phases

Each phase ends with a working deployment. Do not start the next one until the
current one is live.

1. Skeleton — tokens, fonts, nav, footer, `/dev` with real content, no motion
2. Fork — `/` fork screen, track persistence, `/play` shell
3. Projects — grid and MDX case studies
4. Motion — bento grid, spotlight, marquee, scroll reveals
5. Polish — OG images, sitemap, Lighthouse, domain

Roughly three to four weeks part-time. Phase 1 alone is a site you could send
to an employer, which is the point of the ordering.
