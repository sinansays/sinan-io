# Thinking Trace GIF Generator

A lightweight, client-side tool for generating animated “AI assistant status line” GIFs.

## Usage

1. Open `/projects/thinking-gif/` in a browser.
2. Edit the step list to match the status lines you want.
3. Adjust timing, visual, and canvas controls in the editor panel.
4. Click **Export GIF** to download the animation.

### Tips

- Use short phrases for the crispiest typewriter and shimmer effects.
- Log mode keeps prior steps faintly visible for a “system transcript” feel.
- If the GIF download doesn’t trigger on iOS Safari, tap the GIF preview and choose **Save Image**.

## Files

- `projects/thinking-gif/index.html`: Tool UI and layout
- `thinking-gif/app.js`: UI logic, state, and export orchestration
- `thinking-gif/lib.js`: Canvas renderer and GIF encoder
