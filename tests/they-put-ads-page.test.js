// Labs piece: They Put Ads In The Intelligence (a comic). Checks that every panel
// image exists, carries real alt text and intrinsic size, and that the page follows
// the Labs-piece rules in AGENTS.md. Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const dir = path.join(__dirname, '..', 'labs', 'they-put-ads-in-the-intelligence');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]).filter(t => /src="panels\//.test(t)); // comic panels (the progress rider is decorative)
const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}="([^"]*)"`)) || [])[1];

test('one continuous strip: page anchors kept, no page sheets or folios', () => {
  for (let p = 1; p <= 10; p++) assert.match(html, new RegExp(`<div class="row[^"]*" id="p${p}"`));
  assert.doesNotMatch(html, /class="page"|class="folio"/);
  assert.ok(imgs.length >= 100, `found ${imgs.length} panels`);
});

test('progress track: markers point at real beats, rider image exists', () => {
  const targets = [...html.matchAll(/data-target="([^"]+)"/g)].map(m => m[1]);
  assert.ok(targets.includes('coda') && targets.length >= 5, `markers: ${targets}`);
  for (const t of targets) assert.match(html, new RegExp(`id="${t}"`), `no anchor for ${t}`);
  assert.ok(fs.existsSync(path.join(dir, 'aliens.webp')));
});

test('every panel exists, has alt text and intrinsic size', () => {
  for (const tag of imgs) {
    const src = attr(tag, 'src');
    assert.ok(fs.existsSync(path.join(dir, src)), `missing ${src}`);
    assert.ok((attr(tag, 'alt') || '').length > 8, `${src} lacks alt text`);
    assert.ok(+attr(tag, 'width') > 0 && +attr(tag, 'height') > 0, `${src} lacks width/height`);
  }
});

test('every panel has a sharpened 2x version for high-resolution screens', () => {
  for (const tag of imgs) {
    const set = attr(tag, 'srcset') || '';
    const two = (set.match(/(\S+) 2x/) || [])[1];
    assert.ok(two && fs.existsSync(path.join(dir, two)), `${attr(tag, 'src')} lacks a 2x file`);
  }
});

test('the transcript lives in the repo, not on the page', () => {
  assert.doesNotMatch(html, /id="transcript"|Read the transcript/);
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'tools', 'they-put-ads-in-the-intelligence', 'transcript.md')));
});

test('only the opening panels load eagerly', () => {
  const eager = imgs.filter(t => attr(t, 'loading') === 'eager');
  assert.ok(eager.length <= 4, `${eager.length} eager images`);
});

test('follows the Labs-piece rules', () => {
  assert.match(html, /href="https:\/\/sinan\.io\/labs\/"[^>]*>← sinanLabs</);
  assert.match(html, /<meta property="og:image" content="https:\/\/sinan\.io\/labs\/they-put-ads-in-the-intelligence-og\.jpg">/);
  assert.doesNotMatch(html, /\/assets\/(css|js)\/|\/includes\//);
  assert.ok(fs.existsSync(path.join(dir, '..', 'they-put-ads-in-the-intelligence-og.jpg')));
  assert.ok(fs.existsSync(path.join(dir, '..', 'thumbs', 'they-put-ads-in-the-intelligence.webp')));
});
