module.exports = {
  courses: [
    { id: "ece2020", name: "ECE 2020", color: "var(--c0)", desc: "Digital Design", unlocks: "Switches, MOSFETs, CMOS, Logic Gates + Math (Boolean, Number Systems, K-Maps)" },
    { id: "ece2031", name: "ECE 2031", color: "var(--c2)", desc: "Digital Design Lab", unlocks: "Combinational + Sequential Circuits, VHDL" },
    { id: "ece2035", name: "ECE 2035", color: "var(--c4)", desc: "Processor Design", unlocks: "ISA, Datapath, ALU" },
    { id: "ece3058", name: "ECE 3058", color: "var(--c5)", desc: "Architecture", unlocks: "Pipeline, Cache, Memory, Interrupts" },
  ],
  tiers: [
    { id: "physical", name: "Physical layer", desc: "switches & transistors" },
    { id: "logic", name: "Logic layer", desc: "gates & circuits" },
  ],
  // Math topics not yet written as content/math/*.md files.
  // Once a contributor adds e.g. content/math/boolean-algebra.md, remove it from this list —
  // it'll then show up automatically via the mathTopics collection instead.
  mathStubs: [
    { name: "Boolean Algebra", short: "Laws, identities, DeMorgan's" },
    { name: "SOP / POS", short: "Sum of products, product of sums" },
    { name: "K-Maps", short: "Karnaugh map minimization, don't-cares" },
    { name: "Number Systems", short: "Binary, hex, decimal notation" },
    { name: "Two's Complement", short: "Signed representation, overflow" },
  ],
};
