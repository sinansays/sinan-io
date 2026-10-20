// Page-level checks: the Labs piece is self-contained and carries the required metadata.
// Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'labs', 'thinking-gif', 'index.html'), 'utf-8');

test('has its own head metadata (title, description, Open Graph)', () => {
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) assert.match(html, new RegExp(`property="${prop}"`));
});

test('has the absolute back-link to sinanLabs', () => {
  assert.match(html, /<a[^>]+href="https:\/\/sinan\.io\/labs\/"[^>]*>← sinanLabs<\/a>/);
});

test('uses no shared core assets (styles.css, includes, /assets/js or /assets/css)', () => {
  assert.doesNotMatch(html, /styles\.css/);
  assert.doesNotMatch(html, /includes(\.js|\/)/);
  assert.doesNotMatch(html, /\/assets\/(js|css)\//);
  assert.doesNotMatch(html, /class="site-header"|class="site-footer"/);
});

test('loads only its own scripts, by relative path', () => {
  const srcs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
  assert.ok(srcs.length > 0);
  for (const src of srcs) assert.match(src, /^\.\//, src);
  for (const src of srcs) assert.ok(fs.existsSync(path.join(root, 'labs', 'thinking-gif', src)), `${src} exists`);
});

test('key UI hooks and the unofficial disclaimer are present', () => {
  for (const id of ['grid', 'preview', 'steps', 'export', 'share', 'theme-pills', 'sizes']) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(html, /Unofficial meme generator/);
});

test('thumbnail exists and the Labs index card points at it', () => {
  assert.ok(fs.existsSync(path.join(root, 'labs', 'thumbs', 'thinking-gif.webp')));
  const index = fs.readFileSync(path.join(root, 'labs', 'index.html'), 'utf-8');
  assert.match(index, /href="\/labs\/thinking-gif\/"/);
  assert.match(index, /\/labs\/thumbs\/thinking-gif\.webp/);
});

test('AGENTS.md no longer lists the thinking-gif exception', () => {
  const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf-8');
  assert.doesNotMatch(agents, /Known exception/);
});
