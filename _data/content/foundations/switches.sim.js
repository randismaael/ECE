// Switches simulator — mounts into #sim-mount on the topic page.
// This file is passthrough-copied as-is; edit freely without touching the layout.

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('sim-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="sim-switch-wrap">
      <div class="switch-toggle-area" id="switch-toggle-area">
        <div id="switch-svg-container"></div>
      </div>
      <div class="resistance-readout">
        <div class="r-box"><div class="r-label">RESISTANCE</div><div class="r-val" id="r-readout" style="color:var(--red)">∞</div></div>
        <div class="r-box"><div class="r-label">CURRENT</div><div class="r-val" id="i-readout" style="color:var(--red)">0 A</div></div>
        <div class="r-box"><div class="r-label">LOGIC</div><div class="r-val" id="logic-readout" style="color:var(--muted)">OFF</div></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--muted)">click the switch to toggle</div>
    </div>

    <div class="series-parallel-grid">
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:10px">Series → AND</div>
        <div class="sim-switch-wrap" style="gap:10px">
          <div style="display:flex;gap:10px">
            <button class="toggle-btn" id="series-s1">S1</button>
            <button class="toggle-btn" id="series-s2">S2</button>
          </div>
          <div id="series-result" style="font-family:var(--font-mono);font-size:12px;color:var(--muted);padding:8px 14px;border-radius:6px;background:var(--bg2);border:1px solid var(--border)">no current</div>
        </div>
      </div>
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:10px">Parallel → OR</div>
        <div class="sim-switch-wrap" style="gap:10px">
          <div style="display:flex;gap:10px">
            <button class="toggle-btn" id="parallel-s1">S1</button>
            <button class="toggle-btn" id="parallel-s2">S2</button>
          </div>
          <div id="parallel-result" style="font-family:var(--font-mono);font-size:12px;color:var(--muted);padding:8px 14px;border-radius:6px;background:var(--bg2);border:1px solid var(--border)">no current</div>
        </div>
      </div>
    </div>
  `;

  function switchSVG(isOn) {
    const color = isOn ? 'var(--green)' : 'var(--red)';
    return `<svg width="220" height="80" viewBox="0 0 220 80">
      <line x1="20" y1="40" x2="90" y2="40" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="130" y1="40" x2="200" y2="40" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="90" cy="40" r="4" fill="${color}"/>
      <circle cx="130" cy="40" r="4" fill="${color}"/>
      <line x1="90" y1="40" x2="${isOn ? 128 : 122}" y2="${isOn ? 40 : 18}" stroke="${color}" stroke-width="3" stroke-linecap="round" style="transition:all .2s"/>
      <text x="20" y="62" font-family="monospace" font-size="13" fill="var(--muted)">N1</text>
      <text x="190" y="62" font-family="monospace" font-size="13" fill="var(--muted)">N2</text>
    </svg>`;
  }

  let switchOn = false;
  function toggleSwitch() {
    switchOn = !switchOn;
    document.getElementById('switch-svg-container').innerHTML = switchSVG(switchOn);
    document.getElementById('r-readout').textContent = switchOn ? '≈ 0Ω' : '∞';
    document.getElementById('r-readout').style.color = switchOn ? 'var(--green)' : 'var(--red)';
    document.getElementById('i-readout').textContent = switchOn ? '5 A' : '0 A';
    document.getElementById('i-readout').style.color = switchOn ? 'var(--green)' : 'var(--red)';
    document.getElementById('logic-readout').textContent = switchOn ? 'ON / 1' : 'OFF / 0';
    document.getElementById('logic-readout').style.color = switchOn ? 'var(--green)' : 'var(--muted)';
  }
  document.getElementById('switch-toggle-area').onclick = toggleSwitch;

  let series = { 1: false, 2: false };
  function toggleSeries(n) {
    series[n] = !series[n];
    document.getElementById(`series-s${n}`).className = 'toggle-btn' + (series[n] ? ' hi' : '');
    const flows = series[1] && series[2];
    const result = document.getElementById('series-result');
    result.textContent = flows ? 'current flows ✓' : 'no current';
    result.style.color = flows ? 'var(--green)' : 'var(--muted)';
    result.style.borderColor = flows ? 'var(--green)' : 'var(--border)';
  }
  document.getElementById('series-s1').onclick = () => toggleSeries(1);
  document.getElementById('series-s2').onclick = () => toggleSeries(2);

  let parallel = { 1: false, 2: false };
  function toggleParallel(n) {
    parallel[n] = !parallel[n];
    document.getElementById(`parallel-s${n}`).className = 'toggle-btn' + (parallel[n] ? ' hi' : '');
    const flows = parallel[1] || parallel[2];
    const result = document.getElementById('parallel-result');
    result.textContent = flows ? 'current flows ✓' : 'no current';
    result.style.color = flows ? 'var(--green)' : 'var(--muted)';
    result.style.borderColor = flows ? 'var(--green)' : 'var(--border)';
  }
  document.getElementById('parallel-s1').onclick = () => toggleParallel(1);
  document.getElementById('parallel-s2').onclick = () => toggleParallel(2);

  document.getElementById('switch-svg-container').innerHTML = switchSVG(false);
});
