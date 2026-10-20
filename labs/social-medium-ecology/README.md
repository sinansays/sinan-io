# Social Medium Ecology

A static microsite for sinanLabs: an interactive field guide to 17 social platforms through media theory, with a two-mode self-assessment.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Landing page |
| `atlas.html` | The Atlas: lens map, drift chart, clusters, tetrads, Doctorow curve, thinkers |
| `quiz.html` | Self-assessment (`quiz.html#values` and `quiz.html#presence` open each mode directly) |
| `method.html` | Methods, trait coding table, user-figure sources, bibliography, citation |

## Hosting

This is a sinanLabs piece on sinan.io (Cloudflare Pages), served at `/labs/social-medium-ecology/`. It follows the Labs-piece rules in the repo's `AGENTS.md`: its own design and files, no shared site CSS or includes, an absolute "← sinanLabs" back-link, a thumbnail at `/labs/thumbs/social-medium-ecology.webp`, a social image at `/labs/social-medium-ecology-og.jpg`, and a card on `/labs/index.html`.

Internal links are relative, so the folder also works when saved or opened from disk. The only external requests are Google Fonts (with fallbacks) and the site favicon. There are no analytics, cookies or trackers. Quiz answers stay in the visitor's browser (`localStorage`).

Data-integrity tests live in `/tests/social-medium-ecology.test.js` (`node --test tests/*.test.js`).

## Updating the numbers

All user figures live in `data/platforms.js`:

1. Change `SME.AS_OF` (shown across the site).
2. Update each platform's `users` block: `value` (millions, drives bubble size), `label`, `kind` (`reported`, `claimed`, `estimate`, `proxy`), `date`, `src`, and optional `note`.
3. Add or update the matching entry in `SME.SOURCES`.

Natural times to update: after the quarterly earnings reports of Meta, Snap, Pinterest and Reddit (late January, April, July and October).

## Editing the content

- `data/platforms.js`: trait codes, McLuhan positions, Doctorow stages and reasoning, tetrads, playbooks, drift estimates.
- `data/atlas.js`: lens definitions, cluster essays and readings, thinkers, "Where the lenses break".
- `data/quiz.js`: questions, weights, off-platform archetypes, result essays, sample answers.
- `data/refs.js`: bibliography. Cite with `[refKey, "ch. 2"]` arrays in the content files; the methods page builds the bibliography from this file.

Changing the shape of the quiz (adding or removing questions) automatically discards visitors' saved progress.

## Credits

By Michael Sinanian. Built with the help of Claude (Anthropic), including an AI fact-checking pass against primary sources; see the methods page. Code is covered by the repository's MIT license.
