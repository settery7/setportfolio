---
description: Critique the current state of the site against the spec
---

Review the site as it stands. Be direct — I want problems found, not
reassurance. A review that says everything looks good is a failed review.

Check, in order:

**Against the spec.** Where does the build diverge from `docs/build-spec.md`
and `CLAUDE.md`? Name the section and the divergence.

**Generic design tells.** Go through the "things this project deliberately does
not do" list in `CLAUDE.md` and flag every violation you find. Then look wider:
does any part of this read as a template rather than a deliberate choice? Would
this be distinguishable from the other dark developer portfolios shipped this
month? Say so plainly if not.

**Copy.** Any claim without a supporting artifact. Any invented metric, date,
or client detail. Any remaining `TODO:` in rendered text. Any sentence that
could appear on any developer's portfolio unchanged.

**Accessibility.** Contrast failures, missing focus states, images without
meaningful alt text, motion that ignores `prefers-reduced-motion`, heading
order.

**Code.** Client components that could be server components. Section files over
150 lines. Hardcoded hex values that should be tokens. Unused dependencies.

Output a single prioritized list, worst first, with the file and line for each.
No summary paragraph, no praise section.
