---
title: Ideal Switches
subtitle: The core logic every computer depends on
order: 0
course: ECE 2020
tags: ["Foundations", "Module 2"]
hasSim: true
simInline: true
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

<div style="margin-top: -32px"></div>

One of the most basic components of digital circuits are switches. If you create a basic circuit consisting of a power source (Vcc), a switch, and a ground rail, you can model basic logic. When the switch is **closed**, current flows from Vcc to the output, propagating a **1**. When **open**, the only path is to ground, propagating a **0**. So, our basic circuit can be in one of two states:

<div style="margin-top: 8px"></div>

  - **Closed (ON):** current flows freely, resistance ≈ 0
  - **Open (OFF):** no current flows, resistance = ∞

<div style="margin-top: 16px"></div>

<div id="sim-single-switch"></div>

<div style="margin-top: 16px"></div>

## Modeling Logic with Switches 
Depending on how you place the switches in the circuit, you can model one of two core logic behaviors:
- **Series switches → AND:** Placing two switches end-to-end in series models **AND** logic. Current can only flow if **both** are closed.

<div style="margin-top: 16px"></div>

<div id="sim-series"></div>

<div style="margin-top: 16px"></div>

- **Parallel switches → OR:** Placing two switches side-by-side in parallel models **OR** logic. Current flows if **either** switch is closed, since there's at least one path from supply to output.

<div style="margin-top: 16px"></div>

<div id="sim-parallel"></div>

<div style="margin-top: 16px"></div>

## Why this matters

All computer logic can be broken down to **AND** or **OR** logic, which is perfectly modeled by *ideal* switches. This is the core that everything from here builds on!

<div style="margin-top: 16px"></div>

***The next topic (nMOS/pMOS) shows how (and why) an ideal switch gets built electronically.***

*Please note that the stack builds upward, from simplest to most complex, so scroll up for next page.*

<div style="margin-top: -16px"></div>