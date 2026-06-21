// Switches simulator — inline mode.
// Mounts three independent components into #sim-single-switch, #sim-series, #sim-parallel.

document.addEventListener('DOMContentLoaded', () => {

  // ── Single switch ──────────────────────────────────────────────────────────
  const singleMount = document.getElementById('sim-single-switch');
  if (singleMount) {
    singleMount.innerHTML = `
      <div class="sim-wrap">
        <div class="sim-toolbar"><span class="sim-toolbar-title">SWITCH SIMULATOR</span></div>
        <div class="sim-body">
          <div class="sim-switch-wrap">
            <div class="switch-toggle-area" id="switch-toggle-area">
              <div id="switch-svg-container"></div>
            </div>
            <div class="resistance-readout">
              <div class="r-box"><div class="r-label">RESISTANCE</div><div class="r-val" id="r-readout" style="color:var(--red)">∞</div></div>
              <div class="r-box"><div class="r-label">CURRENT</div><div class="r-val" id="i-readout" style="color:var(--red)">0 A</div></div>
              <div class="r-box"><div class="r-label">LOGIC</div><div class="r-val" id="logic-readout" style="color:var(--muted)">OFF / 0</div></div>
            </div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--muted)">click the switch to toggle</div>
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
        <text x="10" y="30" font-family="monospace" font-size="11" fill="var(--muted)">Vcc</text>
        <text x="185" y="30" font-family="monospace" font-size="11" fill="var(--muted)">Out</text>
      </svg>`;
    }

    let switchOn = false;
    function toggleSwitch() {
      switchOn = !switchOn;
      document.getElementById('switch-svg-container').innerHTML = switchSVG(switchOn);
      document.getElementById('r-readout').textContent = switchOn ? '≈ 0 Ω' : '∞';
      document.getElementById('r-readout').style.color = switchOn ? 'var(--green)' : 'var(--red)';
      document.getElementById('i-readout').textContent = switchOn ? 'flows' : '0 A';
      document.getElementById('i-readout').style.color = switchOn ? 'var(--green)' : 'var(--red)';
      document.getElementById('logic-readout').textContent = switchOn ? 'ON / 1' : 'OFF / 0';
      document.getElementById('logic-readout').style.color = switchOn ? 'var(--green)' : 'var(--muted)';
    }
    document.getElementById('switch-toggle-area').onclick = toggleSwitch;
    document.getElementById('switch-svg-container').innerHTML = switchSVG(false);
  }

  // ── Series (AND) ───────────────────────────────────────────────────────────
  const seriesMount = document.getElementById('sim-series');
  if (seriesMount) {
    seriesMount.innerHTML = `
      <div class="sim-wrap">
        <div class="sim-toolbar"><span class="sim-toolbar-title">SERIES — AND</span></div>
        <div class="sim-body">
          <div class="sim-split">
            <div class="sim-split-left">
              <div id="series-svg"></div>
              <div style="display:flex;gap:10px;justify-content:center;margin-top:10px">
                <button class="toggle-btn" id="series-s1">S1</button>
                <button class="toggle-btn" id="series-s2">S2</button>
              </div>
              <div id="series-result" class="sim-result" style="margin-top:10px">no current — output = 0</div>
            </div>
            <div class="sim-split-right">
              <table class="truth-table">
                <thead><tr><th>S1</th><th>S2</th><th>Out</th></tr></thead>
                <tbody>
                  <tr id="series-row-0" class="tt-active"><td>0</td><td>0</td><td class="out-0">0</td></tr>
                  <tr id="series-row-1"><td>1</td><td>0</td><td class="out-0">0</td></tr>
                  <tr id="series-row-2"><td>0</td><td>1</td><td class="out-0">0</td></tr>
                  <tr id="series-row-3"><td>1</td><td>1</td><td class="out-1">1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    function seriesSVG(s1, s2) {
      const c1 = s1 ? 'var(--green)' : 'var(--red)';
      const c2 = s2 ? 'var(--green)' : 'var(--red)';
      const wire = (s1 && s2) ? 'var(--green)' : 'var(--border2)';
      return `<svg width="300" height="70" viewBox="0 0 300 70">
        <line x1="10" y1="35" x2="70" y2="35" stroke="${wire}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="70" cy="35" r="3" fill="${c1}"/>
        <circle cx="110" cy="35" r="3" fill="${c1}"/>
        <line x1="70" y1="35" x2="${s1 ? 108 : 104}" y2="${s1 ? 35 : 18}" stroke="${c1}" stroke-width="2.5" stroke-linecap="round" style="transition:all .15s"/>
        <line x1="110" y1="35" x2="170" y2="35" stroke="${wire}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="170" cy="35" r="3" fill="${c2}"/>
        <circle cx="210" cy="35" r="3" fill="${c2}"/>
        <line x1="170" y1="35" x2="${s2 ? 208 : 204}" y2="${s2 ? 35 : 18}" stroke="${c2}" stroke-width="2.5" stroke-linecap="round" style="transition:all .15s"/>
        <line x1="210" y1="35" x2="290" y2="35" stroke="${wire}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="4" y="22" font-family="monospace" font-size="10" fill="var(--muted)">Vcc</text>
        <text x="268" y="22" font-family="monospace" font-size="10" fill="var(--muted)">Out</text>
        <text x="82" y="60" font-family="monospace" font-size="10" fill="var(--muted)">S1</text>
        <text x="183" y="60" font-family="monospace" font-size="10" fill="var(--muted)">S2</text>
      </svg>`;
    }

    function seriesHighlight(s1, s2) {
      const row = (s1 ? 1 : 0) + (s2 ? 2 : 0);
      for (let i = 0; i < 4; i++)
        document.getElementById(`series-row-${i}`).className = i === row ? 'tt-active' : '';
    }

    let series = { 1: false, 2: false };
    function toggleSeries(n) {
      series[n] = !series[n];
      document.getElementById(`series-s${n}`).className = 'toggle-btn' + (series[n] ? ' hi' : '');
      const flows = series[1] && series[2];
      const result = document.getElementById('series-result');
      result.textContent = flows ? 'current flows — output = 1' : 'no current — output = 0';
      result.className = 'sim-result' + (flows ? ' sim-result-on' : '');
      document.getElementById('series-svg').innerHTML = seriesSVG(series[1], series[2]);
      seriesHighlight(series[1], series[2]);
    }
    document.getElementById('series-s1').onclick = () => toggleSeries(1);
    document.getElementById('series-s2').onclick = () => toggleSeries(2);
    document.getElementById('series-svg').innerHTML = seriesSVG(false, false);
  }

  // ── Parallel (OR) ──────────────────────────────────────────────────────────
  const parallelMount = document.getElementById('sim-parallel');
  if (parallelMount) {
    parallelMount.innerHTML = `
      <div class="sim-wrap">
        <div class="sim-toolbar"><span class="sim-toolbar-title">PARALLEL — OR</span></div>
        <div class="sim-body">
          <div class="sim-split">
            <div class="sim-split-left">
              <div id="parallel-svg"></div>
              <div style="display:flex;gap:10px;justify-content:center;margin-top:10px">
                <button class="toggle-btn" id="parallel-s1">S1</button>
                <button class="toggle-btn" id="parallel-s2">S2</button>
              </div>
              <div id="parallel-result" class="sim-result" style="margin-top:10px">no current — output = 0</div>
            </div>
            <div class="sim-split-right">
              <table class="truth-table">
                <thead><tr><th>S1</th><th>S2</th><th>Out</th></tr></thead>
                <tbody>
                  <tr id="parallel-row-0" class="tt-active"><td>0</td><td>0</td><td class="out-0">0</td></tr>
                  <tr id="parallel-row-1"><td>1</td><td>0</td><td class="out-1">1</td></tr>
                  <tr id="parallel-row-2"><td>0</td><td>1</td><td class="out-1">1</td></tr>
                  <tr id="parallel-row-3"><td>1</td><td>1</td><td class="out-1">1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    function parallelSVG(s1, s2) {
      const c1 = s1 ? 'var(--green)' : 'var(--red)';
      const c2 = s2 ? 'var(--green)' : 'var(--red)';
      const flow = s1 || s2;
      const wireIn = flow ? 'var(--green)' : 'var(--border2)';
      const wire1 = s1 ? 'var(--green)' : 'var(--border2)';
      const wire2 = s2 ? 'var(--green)' : 'var(--border2)';
      return `<svg width="280" height="100" viewBox="0 0 280 100">
        <line x1="10" y1="50" x2="60" y2="50" stroke="${wireIn}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="60" y1="50" x2="60" y2="25" stroke="${wire1}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="60" y1="50" x2="60" y2="75" stroke="${wire2}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="60" cy="25" r="3" fill="${c1}"/>
        <circle cx="100" cy="25" r="3" fill="${c1}"/>
        <line x1="60" y1="25" x2="${s1 ? 98 : 94}" y2="${s1 ? 25 : 12}" stroke="${c1}" stroke-width="2.5" stroke-linecap="round" style="transition:all .15s"/>
        <circle cx="60" cy="75" r="3" fill="${c2}"/>
        <circle cx="100" cy="75" r="3" fill="${c2}"/>
        <line x1="60" y1="75" x2="${s2 ? 98 : 94}" y2="${s2 ? 75 : 62}" stroke="${c2}" stroke-width="2.5" stroke-linecap="round" style="transition:all .15s"/>
        <line x1="100" y1="25" x2="220" y2="25" stroke="${wire1}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="100" y1="75" x2="220" y2="75" stroke="${wire2}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="220" y1="25" x2="220" y2="50" stroke="${wireIn}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="220" y1="75" x2="220" y2="50" stroke="${wireIn}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="220" y1="50" x2="270" y2="50" stroke="${wireIn}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="4" y="43" font-family="monospace" font-size="10" fill="var(--muted)">Vcc</text>
        <text x="248" y="43" font-family="monospace" font-size="10" fill="var(--muted)">Out</text>
        <text x="40" y="22" font-family="monospace" font-size="10" fill="var(--muted)">S1</text>
        <text x="40" y="79" font-family="monospace" font-size="10" fill="var(--muted)">S2</text>
      </svg>`;
    }

    function parallelHighlight(s1, s2) {
      const row = (s1 ? 1 : 0) + (s2 ? 2 : 0);
      for (let i = 0; i < 4; i++)
        document.getElementById(`parallel-row-${i}`).className = i === row ? 'tt-active' : '';
    }

    let parallel = { 1: false, 2: false };
    function toggleParallel(n) {
      parallel[n] = !parallel[n];
      document.getElementById(`parallel-s${n}`).className = 'toggle-btn' + (parallel[n] ? ' hi' : '');
      const flows = parallel[1] || parallel[2];
      const result = document.getElementById('parallel-result');
      result.textContent = flows ? 'current flows — output = 1' : 'no current — output = 0';
      result.className = 'sim-result' + (flows ? ' sim-result-on' : '');
      document.getElementById('parallel-svg').innerHTML = parallelSVG(parallel[1], parallel[2]);
      parallelHighlight(parallel[1], parallel[2]);
    }
    document.getElementById('parallel-s1').onclick = () => toggleParallel(1);
    document.getElementById('parallel-s2').onclick = () => toggleParallel(2);
    document.getElementById('parallel-svg').innerHTML = parallelSVG(false, false);
  }

});
