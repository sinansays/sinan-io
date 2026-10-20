// Core pages must each have their own <title> and meta description: duplicates
// read as low-value to search engines and make every search result look alike.
// Labs pieces are checked by their own tests. Run: node --test tests/*.test.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');

function corePages(dir = root, rel = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = path.join(rel, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'includes', 'assets', 'tests', 'tools', 'src'].includes(entry.name)) continue;
      if (relPath === 'labs') { out.push('labs/index.html'); continue; } // the Labs index is core; pieces are not
      out.push(...corePages(path.join(dir, entry.name), relPath));
    } else if (entry.name.endsWith('.html')) {
      out.push(relPath);
    }
  }
  return out;
}

function head(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf-8');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  return { title: title && title.replace(/\s+/g, ' ').trim(), desc };
}

const pages = corePages().filter(f => /<main/.test(fs.readFileSync(path.join(root, f), 'utf-8')));

test('there are core pages to check', () => {
  assert.ok(pages.length >= 20, `found ${pages.length}`);
});

for (const [field, label] of [['title', '<title>'], ['desc', 'meta description']]) {
  test(`every core page has a unique ${label}`, () => {
    const seen = new Map();
    for (const file of pages) {
      const value = head(file)[field];
      assert.ok(value, `${file} has no ${label}`);
      assert.ok(!seen.has(value), `${file} repeats the ${label} of ${seen.get(value)}: "${value}"`);
      seen.set(value, file);
    }
  });
}
