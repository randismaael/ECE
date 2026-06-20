---
title: Ideal Switches
subtitle: Before transistors, before logic — the basic primitive every digital circuit is built from. Two terminals, two states.
order: 0
course: ECE 2020
tags: ["Foundations", "Module 2"]
hasSim: true
simTitle: SWITCH SIMULATOR
quiz:
  - q: "What is the ideal resistance of a switch in the ON state?"
    opts: ["1 Ω", "0 Ω exactly", "Depends on current", "∞"]
    ans: 1
    exp: "An ideal switch has R_ON = 0 exactly — no voltage drop, no power loss."
  - q: "Two switches in series behave like which logic gate?"
    opts: ["OR", "AND", "XOR", "NOT"]
    ans: 1
    exp: "Series: current only flows if BOTH switches are ON — that's exactly AND logic."
  - q: "Two switches in parallel behave like which logic gate?"
    opts: ["AND", "NOT", "OR", "NAND"]
    ans: 2
    exp: "Parallel: current flows if EITHER switch is ON — that's OR logic."
  - q: "What does '0' represent in switch-based logic?"
    opts: ["Supply voltage", "Ground / 0V", "Floating node", "Negative voltage"]
    ans: 1
    exp: "0 = ground (GND), V = 0. 1 = supply (Vcc/VDD)."
  - q: "In the input-selector example, what happens if both select switches are ON simultaneously?"
    opts: ["Output is the average", "Output is always 1", "Output is indeterminate (crowbarred)", "Circuit short-circuits permanently"]
    ans: 2
    exp: "Both inputs trying to drive the output at once creates an indeterminate ('crowbarred') logic level — something circuit design must avoid."
---

Any digital circuit, no matter how complex, comes down to one question: **is there a connection between two points, or not?** That's a switch.

The setup: a circuit has a **supply** rail (V = Vcc, this is logic **1**) and a **ground** rail (V = 0, this is logic **0**). The output of any circuit ends up connected to either supply or ground, depending on the inputs — and switches are what decide which one.

<div class="switch-demo">
  <div class="switch-state-card">
    <div class="switch-state-title on">● SWITCH IS ON</div>
    <div class="switch-facts">
      <strong>Resistance:</strong> low, R<sub>ON</sub> ≈ 0<br>
      <strong>Current:</strong> flows freely N1 → N2<br>
      <strong>Ideal value:</strong> R<sub>ON</sub> = 0 exactly
    </div>
  </div>
  <div class="switch-state-card">
    <div class="switch-state-title off">○ SWITCH IS OFF</div>
    <div class="switch-facts">
      <strong>Resistance:</strong> high, R<sub>OFF</sub> = ∞<br>
      <strong>Current:</strong> no flow<br>
      <strong>Ideal value:</strong> R<sub>OFF</sub> = ∞ exactly
    </div>
  </div>
</div>

<div class="key-facts">
  <h4>Key Facts</h4>
  <div class="key-fact"><span class="key-fact-label">Voltage map</span><span class="key-fact-val">Supply / Vcc / VDD → logic 1. Ground / GND → logic 0</span></div>
  <div class="key-fact"><span class="key-fact-label">Series = AND</span><span class="key-fact-val">Current flows only if S1 AND S2 are both ON</span></div>
  <div class="key-fact"><span class="key-fact-label">Parallel = OR</span><span class="key-fact-val">Current flows if S1 OR S2 (or both) are ON</span></div>
  <div class="key-fact"><span class="key-fact-label">Crowbar problem</span><span class="key-fact-val">If two switches both connect to the output at once with conflicting values, the output is indeterminate — must be avoided by design</span></div>
</div>

<div style="background:var(--bg1);border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px 20px;">
  <h4 style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:10px;">Why this matters</h4>
  <div style="font-size:13px;color:var(--muted2);line-height:1.75;">
    Series/parallel switch behavior is the entire reason logic gates work the way they do. An AND gate is, underneath, just two switches in series. An OR gate is two switches in parallel. <strong style="color:var(--text)">You already understand gate logic — you just haven't connected it to switches yet.</strong> The next topic (nMOS/pMOS) shows how an ideal switch gets built electronically, with a third terminal to control it.
  </div>
</div>
