# Thinking Trace GIF Generator

A lightweight, client-side tool for generating animated “AI assistant status line” GIFs.

## Usage

1. Open `/labs/thinking-gif/` in a browser.
2. Edit the step list to match the status lines you want.
3. Adjust timing, visual, and canvas controls in the editor panel.
4. Click **Export GIF** to download the animation.

### Tips

- Use short phrases for the crispiest typewriter and shimmer effects.
- Log mode keeps prior steps faintly visible for a “system transcript” feel.
- If the GIF download doesn’t trigger on iOS Safari, tap the GIF preview and choose **Save Image**.

## Files

- `labs/thinking-gif/index.html`: Tool UI and layout
- `labs/thinking-gif/app.js`: UI logic, state, and export orchestration
- `labs/thinking-gif/lib.js`: Canvas renderer and GIF encoder

## Research

- `research-2026-10.md`: an October 2026 check of whether this tool is still original (competitors, genre trends, and ranked upgrade ideas). Read it before redesigning the tool.
