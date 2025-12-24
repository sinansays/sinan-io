const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('thinking gif page includes key elements', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'projects', 'thinking-gif', 'index.html'), 'utf-8');

  assert.match(html, /id="thinking-gif-canvas"/);
  assert.match(html, /id="steps-list"/);
  assert.match(html, /id="export-gif"/);
  assert.match(html, /Unofficial meme generator/);
});
