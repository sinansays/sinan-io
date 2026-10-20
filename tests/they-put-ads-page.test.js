// Labs piece: They Put Ads In The Intelligence (a comic). Checks that every panel
// image exists, carries real alt text and intrinsic size, and that the page follows
// the Labs-piece rules in AGENTS.md. Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const dir = path.join(__dirname, '..', 'labs', 'they-put-ads-in-the-intelligence');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}="([^"]*)"`)) || [])[1];

test('ten pages of panels', () => {
  assert.equal((html.match(/<section class="page"/g) || []).length, 10);
  assert.ok(imgs.length >= 100, `found ${imgs.length} panels`);
});

test('every panel exists, has alt text and intrinsic size', () => {
  for (const tag of imgs) {
    const src = attr(tag, 'src');
    assert.ok(fs.existsSync(path.join(dir, src)), `missing ${src}`);
    assert.ok((attr(tag, 'alt') || '').length > 8, `${src} lacks alt text`);
    assert.ok(+attr(tag, 'width') > 0 && +attr(tag, 'height') > 0, `${src} lacks width/height`);
  }
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
