// ══════════ Shared runtime — rail nav, layer arrows, tab switching ══════════
// This file is intentionally generic: it reads chain data from a global
// `window.CHAIN_DATA` object injected by the page template, so it works
// for any topic without modification. Content contributors should never
// need to edit this file.

function buildRail(currentId, chain, basePath) {
  const overlay = document.createElement('div');
  overlay.className = 'rail-overlay';
  overlay.id = 'rail-overlay';
  overlay.onclick = closeRail;

  const rail = document.createElement('div');
  rail.className = 'side-rail';
  rail.id = 'side-rail';

  const header = document.createElement('div');
  header.className = 'rail-header';
  header.innerHTML = `
    <div class="rail-group-name">Building Blocks</div>
    <div class="rail-group-title">Foundations</div>
  `;

  const list = document.createElement('div');
  list.className = 'rail-list';
  chain.forEach((t, i) => {
    if (i > 0) {
      const line = document.createElement('div');
      line.className = 'rail-line';
      list.appendChild(line);
    }
    const isCurrent = t.slug === currentId;
    const el = document.createElement(t.built ? 'a' : 'div');
    el.className = 'rail-item' + (isCurrent ? ' current' : '') + (!t.built ? ' locked' : '');
    if (t.built) el.href = isCurrent ? '#' : `${basePath}${t.slug}/`;
    el.innerHTML = `
      <div class="rail-num">${i + 1}</div>
      <div class="rail-item-name">${t.name}${!t.built ? ' <span style="opacity:.6">(soon)</span>' : ''}</div>
    `;
    list.appendChild(el);
  });

  const footer = document.createElement('div');
  footer.className = 'rail-footer';
  footer.innerHTML = `<a class="rail-back" href="/">← all groups</a>`;

  rail.appendChild(header);
  rail.appendChild(list);
  rail.appendChild(footer);

  const toggle = document.createElement('div');
  toggle.className = 'rail-toggle';
  toggle.id = 'rail-toggle';
  toggle.innerHTML = '›';
  toggle.onclick = toggleRail;

  document.body.appendChild(overlay);
  document.body.appendChild(rail);
  document.body.appendChild(toggle);
  document.body.classList.add('has-rail');
}

function toggleRail() {
  document.getElementById('side-rail').classList.toggle('open');
  document.getElementById('rail-overlay').classList.toggle('open');
  const toggle = document.getElementById('rail-toggle');
  toggle.innerHTML = document.getElementById('side-rail').classList.contains('open') ? '‹' : '›';
}
function closeRail() {
  document.getElementById('side-rail').classList.remove('open');
  document.getElementById('rail-overlay').classList.remove('open');
  document.getElementById('rail-toggle').innerHTML = '›';
}

function buildLayerArrows(currentId, prev, next, basePath) {
  const wrap = document.querySelector('.topic-wrap');
  const header = document.querySelector('.topic-header');
  if (!wrap || !header) return;

  const upBar = document.createElement(next && next.built ? 'a' : 'div');
  upBar.className = 'layer-arrow up' + (!next || !next.built ? ' disabled' : '');
  if (next && next.built) upBar.href = `${basePath}${next.slug}/`;
  upBar.innerHTML = next
    ? `<span class="layer-arrow-icon">↑</span><span class="layer-arrow-text"><span class="layer-arrow-label">up — more advanced</span><span class="layer-arrow-name">${next.name}</span></span>`
    : `<span class="layer-arrow-icon">↑</span><span class="layer-arrow-text"><span class="layer-arrow-label">top of chain</span><span class="layer-arrow-name">more layers coming</span></span>`;
  header.parentNode.insertBefore(upBar, header);

  const downBar = document.createElement(prev ? (prev.built ? 'a' : 'div') : 'a');
  downBar.className = 'layer-arrow down' + (prev && !prev.built ? ' disabled' : '');
  if (prev && prev.built) downBar.href = `${basePath}${prev.slug}/`;
  else if (!prev) downBar.href = '/';
  downBar.innerHTML = prev
    ? `<span class="layer-arrow-text"><span class="layer-arrow-label">down — more basic</span><span class="layer-arrow-name">${prev.name}</span></span><span class="layer-arrow-icon">↓</span>`
    : `<span class="layer-arrow-text"><span class="layer-arrow-label">⏚ ground</span><span class="layer-arrow-name">back to the stack</span></span><span class="layer-arrow-icon">↓</span>`;
  wrap.appendChild(downBar);
}

function showTab(id, el) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  if (el) el.classList.add('active');
}

function showToast(msg) {
  const ex = document.getElementById('toast');
  if (ex) ex.remove();
  const t = document.createElement('div');
  t.id = 'toast';
  t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid var(--border2);color:var(--muted2);font-family:var(--font-mono);font-size:12px;padding:10px 18px;border-radius:10px;z-index:999;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// Quiz runner — generic, reads QUIZ_QS defined per-page (in the .sim.js file or inline)
let quizAnswered = 0, quizCorrect = 0;
function buildQuiz(questions) {
  const c = document.getElementById('quiz-container');
  if (!c) return;
  c.innerHTML = '';
  questions.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-q';
    div.innerHTML = `<div class="quiz-q-text">${qi + 1}. ${q.q}</div>
      <div class="quiz-options">${q.opts.map((o, oi) => `<div class="quiz-opt" data-qi="${qi}" data-oi="${oi}" onclick="answerQuiz(${qi},${oi})">${o}</div>`).join('')}</div>
      <div class="quiz-feedback" id="feedback-${qi}"></div>`;
    c.appendChild(div);
  });
  window.__quizQuestions = questions;
}
function answerQuiz(qi, oi) {
  const q = window.__quizQuestions[qi];
  document.querySelectorAll(`[data-qi="${qi}"]`).forEach(o => o.onclick = null);
  document.querySelectorAll(`[data-qi="${qi}"]`)[q.ans].classList.add('correct');
  if (oi !== q.ans) document.querySelectorAll(`[data-qi="${qi}"]`)[oi].classList.add('wrong');
  const fb = document.getElementById(`feedback-${qi}`);
  fb.textContent = (oi === q.ans ? '✓ ' : '✗ ') + q.exp;
  fb.classList.add('show');
  fb.style.color = oi === q.ans ? 'var(--green)' : 'var(--red)';
  quizAnswered++; if (oi === q.ans) quizCorrect++;
  const score = document.getElementById('quiz-score');
  if (score) score.textContent = `${quizCorrect} / ${quizAnswered} correct`;
}
function resetQuiz() {
  quizAnswered = 0; quizCorrect = 0;
  const score = document.getElementById('quiz-score');
  if (score) score.textContent = '0 / 0 correct';
  if (window.__quizQuestions) buildQuiz(window.__quizQuestions);
}

// Call once per topic page load — reads window.CHAIN_DATA injected by the layout
function initTopicPage() {
  const data = window.CHAIN_DATA;
  if (!data) return;
  buildRail(data.currentId, data.chain, data.basePath);
  buildLayerArrows(data.currentId, data.prev, data.next, data.basePath);
}
