---
description: Build one numbered section from docs/build-spec.md
argument-hint: <section number>
---

Build section $1 from `docs/build-spec.md`.

Follow this sequence exactly:

1. Read `CLAUDE.md` and the section $1 entry in `docs/build-spec.md`.
2. Pull any copy for this section from `docs/content.md`. Do not write project
   descriptions yourself. If the content file has a `TODO:` that this section
   needs, stop and ask rather than inventing a placeholder.
3. Restate in two or three lines what you're about to build, including any
   ambiguity you found in the spec. Wait for my go-ahead.
4. Build it. One section only — do not touch other sections, and do not
   refactor code outside this section's files.
5. Run `npm run build` and fix anything it surfaces.
6. Check the quality floor from `CLAUDE.md`: 375/768/1440px, keyboard focus,
   contrast, reduced motion, no hydration warnings.
7. Report back: files changed, anything you guessed, anything in the spec that
   turned out to be wrong or underspecified.

Do not add dependencies beyond the stack table in `CLAUDE.md`. If you think one
is genuinely needed, ask first and say what it replaces.
