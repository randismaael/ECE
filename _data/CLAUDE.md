# Project context for Claude Code

This file is read automatically by Claude Code at the start of every session.
It exists so design decisions made during initial development aren't lost —
read this before making structural changes.

## What this project is

An interactive, layer-by-layer reference site for Georgia Tech's ECE
curriculum — starts at ideal switches, builds up through MOSFETs, CMOS,
logic gates, combinational circuits, and sequential circuits (the
"Building Blocks" chain), with a separate Math reference section for
Boolean algebra / number systems / etc. Eventually intended to grow toward
CPU, Memory, and System layers above the current chain.

Built for Rand (GT Computer Engineering, ECE 2020/2031/2035/3058) originally
as a personal review tool, now being set up for open-source contributions
from other students.

## Why Eleventy, not Astro or a hand-rolled static site

The site started as hand-written HTML files with embedded JS (functional,
but impossible for non-technical contributors to edit, and required a
`git push` to see any change). Eleventy was chosen over Astro specifically
because:

- Zero required build step for the interactive JS — sims are plain
  vanilla JS that mount into a `#sim-mount` div, no JSX/component
  compilation needed. This let the existing sim code port over almost
  unchanged.
- Markdown + frontmatter content model maps directly onto "a contributor
  writes prose, the layout handles everything else."
- Lighter weight / less opinionated than Astro, which would have pushed
  toward component-based thinking and required rewriting every sim.

## Why contributors only write content, never sims

Explicit decision: the interactive simulators are the most valuable and
hardest-to-get-right part of this site, and review burden for JS PRs
(security, correctness, design consistency) is much higher than for
markdown PRs. Contributors write `.md` files only. See `CONTRIBUTING.md`
for the exact boundary — it should stay enforced even as the codebase
evolves; don't quietly start accepting `.sim.js` contributions without
revisiting this decision deliberately.

## Why CSS is one shared file, not scoped per-topic

Originally considered scoping each sim's CSS to live next to its `.sim.js`
file (so a topic's content + styles + script are all co-located). Reversed
this once it was decided contributors never touch sims — if only the
maintainer ever adds sim CSS, there's no collision risk from contributors,
so one shared `assets/css/style.css` is simpler to maintain than many
small scoped files. All six original topics' page-specific `<style>`
blocks were merged into this file in one pass; if you're porting more
topics from the old non-Eleventy build (`ece-ref2/` style), check for the
same pattern — each old topic HTML file had its own inline `<style>` block
that needs merging in, not just the shared one.

## Structural data lives in `_data/`, not scattered in frontmatter

`_data/chain.js` is the single source of truth for the Building Blocks
chain order, slugs, and which course/tier each topic belongs to. This is
deliberately NOT derived from frontmatter scattered across `.md` files,
because the chain's *order* and *existence* needs to be visible/editable
in one place without grep-ing through content. When adding a topic, you
touch both the `.md` file AND add a line to `chain.js` — this duplication
is intentional, not an oversight.

`_data/site.js` holds course metadata (ECE 2020/2031/2035/3058) and the
`mathStubs` list (math topics that don't have content yet — remove an
entry here once you write the corresponding `.md` file).

## Known accepted risk: npm audit

`@11ty/eleventy` → `gray-matter` → `js-yaml` has a moderate-severity
transitive DoS vulnerability (GHSA-h67p-54hq-rp68) with no upstream fix
available as of this writing — `gray-matter@4.0.3` (latest) still pins
the vulnerable `js-yaml@^3.13.1` internally. Confirmed via `npm view` that
no newer `gray-matter` exists and Eleventy 4.x (which might resolve this)
is still alpha. Decision: accept this risk since it only matters if
malicious YAML frontmatter gets built, and PRs are reviewed before merge
anyway. Don't `npm audit fix --force` this — it'll downgrade Eleventy.
Revisit if Eleventy 4 stabilizes or gray-matter patches.

## Migration status (as of last session)

Only `content/foundations/switches.md` + `switches.sim.js` are fully
ported to this Eleventy structure as a proof of concept. The other 5
Building Blocks topics (mosfets, cmos, gates, combinational, sequential)
still need to be migrated from the old hand-written HTML in `ece-ref2/`
(if that folder is present alongside this one) — same pattern as
switches: split the HTML into frontmatter + markdown prose, extract the
sim's JS into a `.sim.js` file, merge any inline `<style>` block into
`assets/css/style.css`. The `index.njk` landing page (motherboard +
expandable Building Blocks stack) and `math/index.njk` are fully ported
and working.

## Deployment

GitHub Pages via `.github/workflows/build.yml` — builds on every push to
`main`, deploys via GitHub Actions (not the legacy branch-deploy method).
Requires repo Settings → Pages → Source → "GitHub Actions" to be set
manually once; the workflow won't do anything until that's configured.
