# Thinking Trace Generator (Labs piece)

A client-side maker for looping AI-style "thinking…" status animations, in the style of Claude Code, Codex CLI, Claude, ChatGPT, DeepSeek, Gemini, Grok, Meta AI, Hermes Agent, a generic agent log, and a plain shimmer. Live at `/labs/thinking-gif/`. It is a standalone Labs piece: its own design, no shared site assets (see AGENTS.md → "Page Classes").

## Features

- **Specimen grid → editor.** The landing view renders every style live. Click one to open the stage-and-dock editor; ← and → cycle styles.
- **Claude Code spinner verbs.** The default spinner-verb list, picked at random with a seed so share links reproduce them. **Random verbs** or the R key rerolls them.
- **Exports:** GIF (median-cut colour palette, changed-rectangle frames, merged duplicate frames), MP4 (WebCodecs H.264 via the vendored `mp4-muxer`, VP9-in-MP4 if H.264 isn't available, real-time `MediaRecorder` as a last resort), and animated WebP (still WebPs from `canvas.toBlob`, combined by our own RIFF muxer).
- **Transparent backgrounds.** Real alpha in WebP. In GIF, transparency is on/off per pixel with a chosen edge (matte) colour.
- **Sizes:** emoji 128×128 (shows whether the file fits Slack's 128 KB and Discord's 256 KB limits), sticker, chat, 16:9, 1:1, 4:5, 9:16, banner.
- **Share links.** `#edit&s=…` holds only the settings that differ from the defaults, as base64url JSON. Nothing is stored on a server.
- **Accessibility.** Reduced motion starts paused; there's a copyable alt text, a keyboard-operable tab panel, and visible focus styles.

## Files

- `labs/thinking-gif/index.html`: markup and all CSS (neutral greyscale shell, light/dark)
- `labs/thinking-gif/app.js`: UI, state, the preview loop, and export orchestration
- `labs/thinking-gif/lib.js`: pure engine (themes, timeline, layout, renderer, GIF encoder, WebP muxer, share-link codec). Works in browsers and Node.
- `labs/thinking-gif/vendor/mp4-muxer-5.2.2.min.js`: MIT, pinned, minified from the npm package
- `tests/thinking-gif.test.js`, `tests/thinking-gif-page.test.js`: run with `node --test tests/*.test.js`

## Adding or adjusting a style

Add an entry to `THEMES` in `lib.js`. Each entry needs light and dark palettes (`bg`, `text`, `hi` (shimmer highlight), `dim`, `accent`), a `font` (`sans` or `mono`), a `prefix` icon (drawn procedurally, never a logo), default `steps`, and optionally a `tail(meta)` (timer/tokens) and a `done(meta)` row. Product UIs drift, so re-check them against the real apps every few months.

## Research

- `research-2026-10.md`: an October 2026 check of whether this tool is still original (competitors, genre trends, and ranked upgrade ideas).
