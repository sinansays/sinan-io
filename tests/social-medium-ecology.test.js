// Data integrity for the Social Medium Ecology Labs piece (/labs/social-medium-ecology/).
// The data files are plain browser scripts that attach to window.SME; load them into a sandbox.
// Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const dir = path.join(__dirname, '..', 'labs', 'social-medium-ecology');
const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['platforms.js', 'refs.js', 'atlas.js', 'quiz.js']) {
  vm.runInContext(fs.readFileSync(path.join(dir, 'data', f), 'utf-8'), ctx, { filename: f });
}
const S = ctx.SME;
const refKeys = new Set(Object.keys(S.REFS));

function citations(node, out = []) {
  if (Array.isArray(node)) {
    if (node.length && typeof node[0] === 'string' && Array.isArray(node) && node.length <= 2 && /^[a-z][a-z-]*\d{4}$|^hist-/.test(node[0])) out.push(node[0]);
    node.forEach(n => citations(n, out));
  } else if (node && typeof node === 'object') Object.values(node).forEach(n => citations(n, out));
  return out;
}

test('every citation resolves to a bibliography entry', () => {
  const used = citations([S.LENSES, S.CLUSTER_TEXT, S.VALUES_Q, S.ARCHETYPES, S.RESULT_LENS]);
  S.THINKERS.forEach(t => used.push(...t.refs));
  S.DRIFT_EVENTS.forEach(e => used.push(...[].concat(e.src)));
  assert.ok(used.length > 40, `only ${used.length} citations found`);
  for (const k of used) assert.ok(refKeys.has(k), `missing reference: ${k}`);
});

test('every platform has a dated, sourced user figure and complete trait codes', () => {
  const traitKeys = Object.keys(S.TRAITS).concat(Object.keys(S.FORMATS));
  assert.equal(S.PLATFORMS.length, 17);
  for (const p of S.PLATFORMS) {
    assert.ok(S.SOURCES[p.users.src], `${p.id}: unknown source ${p.users.src}`);
    assert.ok(p.users.date && p.users.label && p.users.value > 0, `${p.id}: incomplete figure`);
    assert.ok(['reported', 'claimed', 'estimate', 'proxy'].includes(p.users.kind), `${p.id}: bad kind`);
    for (const k of traitKeys) {
      const v = p.traits[k];
      assert.ok(typeof v === 'number' && v >= 0 && v <= 4, `${p.id}: trait ${k} = ${v}`);
    }
    assert.ok(p.doctorow >= 0 && p.doctorow <= 3, `${p.id}: Doctorow stage`);
    for (const q of ['e', 'o', 'r', 'v']) assert.ok(p.tetrad[q], `${p.id}: tetrad ${q}`);
    assert.ok(S.DRIFT[p.id], `${p.id}: drift series`);
    assert.ok(S.CLUSTER_LAYOUT[p.id] && p.mcluhan, `${p.id}: positions`);
  }
});

test('sample answers match the shape of the questions', () => {
  const check = (qs, ans, label) => {
    assert.equal(ans.length, qs.length, `${label}: length`);
    qs.forEach((q, i) => {
      const n = q.platforms ? S.PLATFORMS.length : q.opts.length;
      const picks = q.multi ? ans[i] : [ans[i]];
      assert.ok(Array.isArray(picks), `${label} q${i}: multi answer must be an array`);
      picks.forEach(a => assert.ok(Number.isInteger(a) && a >= 0 && a < n, `${label} q${i}: option ${a} out of range`));
    });
  };
  check(S.VALUES_Q, S.SAMPLES.values, 'values');
  check(S.PRESENCE_Q, S.SAMPLES.presence.you, 'presence/you');
  check(S.PRESENCE_Q, S.SAMPLES.presence.org, 'presence/org');
});

test('values questions only reference known traits and formats', () => {
  const known = new Set(Object.keys(S.TRAITS).concat(Object.keys(S.FORMATS)));
  for (const q of S.VALUES_Q) {
    if (q.special) continue;
    for (const o of q.opts) for (const d of Object.keys(o[2])) assert.ok(known.has(d), `unknown dimension ${d} in "${q.t}"`);
  }
});

test('presence weights only reference known platforms; archetypes exist', () => {
  const ids = new Set(S.PLATFORMS.map(p => p.id));
  for (const q of S.PRESENCE_Q) {
    if (q.platforms) continue;
    for (const o of q.opts) {
      if (q.special === 'archetype') { assert.ok(S.ARCHETYPES[o[2].a], `archetype ${o[2].a}`); continue; }
      for (const id of Object.keys(o[2])) assert.ok(ids.has(id), `unknown platform ${id} in "${q.t}"`);
    }
  }
});

test('pages are self-contained Labs pages with a back-link and no shared site code', () => {
  for (const f of ['index.html', 'atlas.html', 'quiz.html', 'method.html']) {
    const html = fs.readFileSync(path.join(dir, f), 'utf-8');
    assert.match(html, /href="https:\/\/sinan\.io\/labs\/">← sinanLabs</, `${f}: back-link`);
    assert.match(html, /<meta name="description"/, `${f}: description`);
    assert.match(html, /property="og:image" content="https:\/\/sinan\.io\//, `${f}: absolute og:image`);
    assert.doesNotMatch(html, /\/assets\/(css|js)\/|\/includes\//, `${f}: must not use shared site assets`);
  }
});
