// The chain order is structural, not content — so it lives here rather than
// being re-derived from frontmatter scattered across markdown files.
// When adding a new foundation topic, add one line here AND create the .md file.
// `built` should match whether content/foundations/<slug>.md actually exists with real content.
module.exports = [
  { order: 0, slug: "switches", name: "Ideal Switches", built: true, tier: "physical", course: "ece2020" },
  { order: 1, slug: "mosfets", name: "nMOS / pMOS", built: true, tier: "physical", course: "ece2020" },
  { order: 2, slug: "cmos", name: "CMOS", built: true, tier: "physical", course: "ece2020" },
  { order: 3, slug: "gates", name: "Logic Gates", built: true, tier: "logic", course: "ece2020" },
  { order: 4, slug: "combinational", name: "Combinational Circuits", built: true, tier: "logic", course: "ece2031" },
  { order: 5, slug: "sequential", name: "Sequential Circuits", built: true, tier: "logic", course: "ece2031" },
];
