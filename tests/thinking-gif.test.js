// Unit tests for the Thinking Trace Labs piece (labs/thinking-gif/lib.js).
// Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const test = require('node:test');
const TG = require('../labs/thinking-gif/lib.js');

const base = TG.normalizeState({});

test('sanitizeSteps trims, collapses whitespace, drops empties, accepts legacy {text} objects', () => {
  assert.deepEqual(TG.sanitizeSteps(['  Hello  ', '   ', { id: 'x', text: 'World\n again' }]), ['Hello', 'World again']);
  assert.deepEqual(TG.sanitizeSteps(null), []);
});

test('getStepState never returns an out-of-range index (regression: rAF time before start)', () => {
  for (const t of [-1000, -1, 0, NaN, undefined, Infinity, 1e9]) {
    const st = TG.getStepState(t, 4, base, true);
    assert.ok(st.index >= 0 && st.index < st.items, `t=${t} → index ${st.index}`);
    assert.ok(st.next >= 0 && st.next < st.items);
  }
});

test('timeline: steps + done line, each followed by a transition when looping', () => {
  const cfg = TG.normalizeState({ stepMs: 1000, transMs: 200, finishMs: 500, loop: true });
  const tl = TG.timeline(3, cfg, true);
  assert.equal(tl.items, 4);
  assert.equal(tl.duration, 3 * 1000 + 500 + 4 * 200);
  const st = TG.getStepState(1100, 3, cfg, true);
  assert.equal(st.index, 0);
  assert.equal(st.inTransition, true);
  assert.ok(Math.abs(st.progress - 0.5) < 1e-9);
  assert.equal(TG.getStepState(tl.duration + 10, 3, cfg, true).index, 0, 'loops back to the start');
});

test('timeline without loop holds the last item', () => {
  const cfg = TG.normalizeState({ loop: false, finish: false });
  const st = TG.getStepState(1e7, 3, cfg, false);
  assert.equal(st.index, 2);
  assert.equal(st.inTransition, false);
});

test('normalizeState rejects junk and clamps numbers', () => {
  const s = TG.normalizeState({ theme: 'nope', fps: 999, stepMs: -5, bgColor: 'red', steps: ['', ' '], format: 'avi', textScale: 9 });
  assert.equal(s.theme, TG.DEFAULT_STATE.theme);
  assert.equal(s.fps, TG.DEFAULT_STATE.fps);
  assert.equal(s.stepMs, 300);
  assert.equal(s.bgColor, TG.DEFAULT_STATE.bgColor);
  assert.equal(s.steps, null);
  assert.equal(s.format, 'gif');
  assert.equal(s.textScale, 2);
});

test('share hash round-trips settings, including unicode, and stays empty for defaults', () => {
  assert.equal(TG.encodeShareHash(base), '');
  const s = TG.normalizeState({ theme: 'chatgpt', steps: ['Überlegen…', 'Thinking 🤔'], size: 'emoji', bg: 'transparent', fps: 25 });
  const hash = TG.encodeShareHash(s);
  assert.match(hash, /^s=[A-Za-z0-9_-]+$/);
  assert.deepEqual(TG.decodeShareHash('#edit&' + hash), s);
  assert.equal(TG.decodeShareHash('#s=!!!'), null);
  assert.equal(TG.decodeShareHash('#s=' + Buffer.from('{"theme":1}').toString('base64url')).theme, TG.DEFAULT_STATE.theme);
});

test('random verbs are seeded (share links reproduce them) and unique', () => {
  const a = TG.pickVerbs(42, 6);
  assert.deepEqual(a, TG.pickVerbs(42, 6));
  assert.equal(new Set(a).size, 6);
  assert.notDeepEqual(a, TG.pickVerbs(43, 6));
  assert.ok(TG.CLAUDE_CODE_VERBS.length >= 150, 'full Claude Code verb list');
  const steps = TG.resolveSteps(TG.normalizeState({ theme: 'claude-code', seed: 42 }));
  assert.ok(steps.every(s => s.endsWith('…')));
});

test('every theme has light and dark palettes with valid colours and default lines', () => {
  const hex = /^#[0-9a-f]{6}$/i;
  for (const t of TG.THEMES) {
    for (const key of ['light', 'dark']) {
      const p = t.schemes[key];
      assert.ok(p, `${t.id} ${key}`);
      for (const c of ['bg', 'text', 'hi', 'dim', 'accent']) assert.match(p[c], hex, `${t.id}.${key}.${c}`);
    }
    assert.ok(t.randomVerbs || (t.steps && t.steps.length), `${t.id} has lines`);
  }
});

test('wrapText wraps, and truncates with an ellipsis past maxLines', () => {
  const measure = s => s.length * 10;
  assert.deepEqual(TG.wrapText(measure, 'aa bb cc', 50, 3).lines, ['aa bb', 'cc']);
  const r = TG.wrapText(measure, 'one two three four five six', 40, 2);
  assert.equal(r.lines.length, 2);
  assert.equal(r.fits, false);
  assert.ok(r.lines[1].endsWith('…'));
});

// Minimal GIF decoder (LZW) so the tests check that the encoder's output really decodes.
function decodeGif(bytes) {
  let p = 6;
  const u16 = () => { const v = bytes[p] | (bytes[p + 1] << 8); p += 2; return v; };
  const width = u16();
  const height = u16();
  const flags = bytes[p++];
  p += 2;
  const gct = [];
  if (flags & 0x80) {
    const n = 1 << ((flags & 7) + 1);
    for (let i = 0; i < n; i += 1) { gct.push([bytes[p], bytes[p + 1], bytes[p + 2]]); p += 3; }
  }
  const frames = [];
  let gce = null;
  let loop = false;
  while (p < bytes.length) {
    const b = bytes[p++];
    if (b === 0x3b) break;
    if (b === 0x21) {
      const label = bytes[p++];
      if (label === 0xf9) { p += 1; gce = { packed: bytes[p], delay: bytes[p + 1] | (bytes[p + 2] << 8), ti: bytes[p + 3] }; p += 5; continue; }
      if (label === 0xff) loop = true;
      while (bytes[p] !== 0) p += bytes[p] + 1;
      p += 1;
      continue;
    }
    if (b === 0x2c) {
      const x = u16(), y = u16(), w = u16(), h = u16();
      p += 1;
      const minCode = bytes[p++];
      const data = [];
      while (bytes[p] !== 0) { const n = bytes[p++]; for (let i = 0; i < n; i += 1) data.push(bytes[p++]); }
      p += 1;
      frames.push({ x, y, w, h, gce, px: lzwDecode(data, minCode, w * h) });
      gce = null;
    }
  }
  return { width, height, gct, frames, loop };
}

function lzwDecode(data, minCode, n) {
  const clear = 1 << minCode;
  const eoi = clear + 1;
  let size, dict, prev;
  const out = [];
  let bit = 0;
  const reset = () => {
    dict = [];
    for (let i = 0; i < clear; i += 1) dict[i] = [i];
    dict[clear] = [];
    dict[eoi] = null;
    size = minCode + 1;
    prev = null;
  };
  reset();
  while (out.length < n) {
    let code = 0;
    for (let i = 0; i < size; i += 1, bit += 1) code |= ((data[bit >> 3] >> (bit & 7)) & 1) << i;
    if (code === clear) { reset(); continue; }
    if (code === eoi) break;
    const entry = code < dict.length && dict[code] ? dict[code] : prev.concat([prev[0]]);
    for (const v of entry) out.push(v);
    if (prev) dict.push(prev.concat([entry[0]]));
    prev = entry;
    if (dict.length === (1 << size) && size < 12) size += 1;
  }
  return out;
}

function solid(w, h, rgba) {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i += 1) d.set(rgba, i * 4);
  return d;
}

test('encodeGif: colour palette, loop, frame merging, changed-rectangle frames', () => {
  const w = 40, h = 20;
  const a = solid(w, h, [217, 119, 87, 255]);
  const b = solid(w, h, [217, 119, 87, 255]);
  for (let x = 5; x < 9; x += 1) b.set([255, 255, 255, 255], (10 * w + x) * 4);
  const gif = TG.encodeGif({ width: w, height: h, loop: true, frames: [{ data: a, delayMs: 50 }, { data: a, delayMs: 50 }, { data: b, delayMs: 50 }] });
  const g = decodeGif(gif);
  assert.equal(g.width, w);
  assert.equal(g.loop, true);
  assert.equal(g.frames.length, 2, 'identical frames merged');
  assert.equal(g.frames[0].gce.delay, 10);
  const c = g.gct[g.frames[0].px[0]];
  assert.ok(Math.abs(c[0] - 217) < 8 && Math.abs(c[1] - 119) < 8 && Math.abs(c[2] - 87) < 8, 'orange survives (not grayscale)');
  assert.deepEqual([g.frames[1].x, g.frames[1].y, g.frames[1].w, g.frames[1].h], [5, 10, 4, 1]);
  assert.deepEqual(g.gct[g.frames[1].px[0]].map(v => v > 240), [true, true, true]);
});

test('encodeGif: transparency uses a transparent index and restore-to-background', () => {
  const w = 16, h = 16;
  const d = solid(w, h, [0, 0, 0, 0]);
  d.set([255, 0, 0, 255], 0);
  const g = decodeGif(TG.encodeGif({ width: w, height: h, loop: false, transparent: true, matte: '#000000', frames: [{ data: d, delayMs: 100 }] }));
  const f = g.frames[0];
  assert.equal(f.gce.packed & 1, 1);
  assert.equal((f.gce.packed >> 2) & 7, 2);
  assert.equal(f.px[5], f.gce.ti);
  assert.notEqual(f.px[0], f.gce.ti);
  assert.equal(g.loop, false);
});

test('lzwEncode round-trips long, high-entropy input across dictionary resets', () => {
  const n = 50000;
  const input = new Uint8Array(n);
  let x = 1;
  for (let i = 0; i < n; i += 1) { x = (x * 1103515245 + 12345) >>> 0; input[i] = (x >>> 16) & 255; }
  const out = lzwDecode(Array.from(TG.lzwEncode(input, 8)), 8, n);
  assert.deepEqual(Uint8Array.from(out), input);
});

test('muxAnimatedWebp writes VP8X + ANIM + one ANMF per frame', () => {
  // A tiny fake still WebP: RIFF/WEBP with a VP8L chunk (the muxer treats its contents as opaque).
  const still = Uint8Array.from([...Buffer.from('RIFF'), 13, 0, 0, 0, ...Buffer.from('WEBP'), ...Buffer.from('VP8L'), 1, 0, 0, 0, 0x2f, 0]);
  const out = TG.muxAnimatedWebp({ width: 128, height: 128, loop: true, hasAlpha: true, frames: [{ webp: still, delayMs: 50 }, { webp: still, delayMs: 70 }] });
  const chunks = TG.readChunks(out);
  assert.deepEqual(chunks.map(c => c.id), ['VP8X', 'ANIM', 'ANMF', 'ANMF']);
  const size = out[4] | (out[5] << 8) | (out[6] << 16) | (out[7] << 24);
  assert.equal(size, out.length - 8);
  assert.equal(chunks[0].data[0] & 0x12, 0x12, 'animation + alpha flags');
});

test('size presets include emoji and social sizes with even dimensions (H.264 needs even)', () => {
  const ids = TG.SIZE_PRESETS.map(p => p.id);
  for (const id of ['emoji', 'square', 'story', 'wide']) assert.ok(ids.includes(id));
  for (const p of TG.SIZE_PRESETS) assert.ok(p.w % 2 === 0 && p.h % 2 === 0, p.id);
});
