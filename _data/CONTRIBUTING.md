# Contributing to ECE Reference

This site is a layer-by-layer interactive reference for the GT ECE stack —
switches up through a working CPU. **Contributions are content-only**:
explanations, key facts, quiz questions, and cross-references, written in
plain Markdown. Interactive simulators are maintained separately and aren't
something contributors need to build or touch.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:8080`. Edit any file in `content/` and the page
reloads automatically — no build step, no push required to see your changes.

## What you can contribute

- **New topics** in the Building Blocks chain or the Math reference section
- **Improvements to existing explanations** — clearer wording, missing
  context, a better example
- **Quiz questions** — new ones, or fixes to existing ones
- **Cross-references** — links between topics that should connect but don't yet

## What you can't contribute (yet)

- New interactive simulators — these involve shared rendering code and are
  built by maintainers. If a topic needs one and doesn't have it, open an
  issue describing what it should do; don't submit JS for it.
- Layout, navigation, or styling changes — open an issue first so we can
  discuss before you spend time on it.

## Adding a new topic to the Building Blocks chain

1. Create `content/foundations/your-topic.md`:

```markdown
---
title: Your Topic Name
subtitle: One sentence describing what this covers.
order: 6              # position in the chain — see _data/chain.js
course: ECE 2031
tags: ["Some Tag"]
hasSim: false          # leave false unless a maintainer has built a sim for this
quiz:
  - q: "Question text?"
    opts: ["A", "B", "C", "D"]
    ans: 1             # zero-indexed correct answer
    exp: "Explanation shown after answering."
---

Your prose content here, in plain Markdown. Use **bold**, lists, etc.
Raw HTML is allowed for the styled boxes (key-facts, why-this-matters) —
copy the pattern from an existing topic like `content/foundations/cmos.md`.
```

2. Add a matching entry to `_data/chain.js` so it appears in the side rail
   and gets correct prev/next links:

```js
{ order: 6, slug: "your-topic", name: "Your Topic Name", built: true, tier: "logic", course: "ece2031" },
```

That's it. The layout (`_includes/layouts/topic.njk`) automatically handles
the nav bar, header, tabs, side rail, and up/down layer arrows — you don't
edit that file for a content contribution, and you don't need to write any
JavaScript or CSS.

## Adding a Math reference topic

Same pattern, but in `content/math/` instead, and no `order`/chain entry
needed — math topics aren't part of the linear chain. Once you add the
file, remove the corresponding entry from `mathStubs` in `_data/site.js`
so it doesn't show up twice.

## Style guidelines

- Keep prose tight — this is a reference, not a textbook. Prefer the
  `key-facts` box pattern over long paragraphs for anything list-like.
- Quiz questions should test understanding of *why*, not just recall —
  see existing quizzes for the tone we're going for.
- If your topic previews where it leads (the "why this matters" box),
  keep that preview lighter than the destination topic's own explanation.
- Cite the source course/module when relevant (e.g. "per the Module 6
  syllabus") so readers know this maps to real coursework, not just a
  general explanation.

## Project structure

```
_data/            structural data — chain.js (topic order/slugs), site.js (courses, tiers)
_includes/        shared layout — maintainers only
content/
  foundations/    the Building Blocks chain (.md content; .sim.js are maintainer-only)
  math/           reference math topics (.md content; .sim.js are maintainer-only)
assets/
  css/style.css   shared styling, including all sim styles — maintainers only
  js/site.js      shared nav/rail/quiz logic — maintainers only
index.njk         landing page (motherboard + expandable stack)
math/index.njk    math reference landing page
```

## Submitting changes

1. Fork the repo, create a branch
2. `npm run dev` and verify your topic renders correctly
3. Open a PR — a GitHub Action will build the site to confirm nothing's broken
4. Tag a maintainer for content review (accuracy matters more than prose style)
