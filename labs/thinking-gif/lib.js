/*
 * Thinking Trace: rendering and encoding engine.
 * Pure functions where possible so the Node tests can require this file.
 * Browser: window.ThinkingGif. Node: module.exports.
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Constants                                                           */
  /* ------------------------------------------------------------------ */

  const FONT_SANS = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

  const SIZE_PRESETS = [
    { id: 'emoji', label: 'Emoji', w: 128, h: 128, note: 'Slack, Discord' },
    { id: 'sticker', label: 'Sticker', w: 320, h: 320, note: 'Chat sticker' },
    { id: 'chat', label: 'Chat', w: 480, h: 270, note: 'Inline in chat' },
    { id: 'wide', label: '16:9', w: 1280, h: 720, note: 'X, LinkedIn, slides' },
    { id: 'square', label: '1:1', w: 1080, h: 1080, note: 'Feed post' },
    { id: 'portrait', label: '4:5', w: 1080, h: 1350, note: 'Instagram feed' },
    { id: 'story', label: '9:16', w: 1080, h: 1920, note: 'Stories, Reels' },
    { id: 'banner', label: 'Banner', w: 1500, h: 500, note: 'X header' }
  ];

  const TRANSITIONS = ['fade', 'slide', 'typewriter', 'cut'];
  const FPS_OPTIONS = [15, 20, 25, 30];
  const FORMATS = ['gif', 'mp4', 'webp'];

  // Claude Code's default spinner verbs, as shipped in v2.1.304 (Oct 2026).
  const CLAUDE_CODE_VERBS = ["Accomplishing", "Actioning", "Actualizing", "Architecting", "Baking", "Beaming", "Beboppin'", "Befuddling", "Billowing", "Blanching", "Bloviating", "Boogieing", "Boondoggling", "Booping", "Bootstrapping", "Brewing", "Bunning", "Burrowing", "Calculating", "Canoodling", "Caramelizing", "Cascading", "Catapulting", "Cerebrating", "Channeling", "Choreographing", "Churning", "Clauding", "Coalescing", "Cogitating", "Combobulating", "Composing", "Computing", "Concocting", "Considering", "Contemplating", "Cooking", "Crafting", "Creating", "Crunching", "Crystallizing", "Cultivating", "Deciphering", "Deliberating", "Determining", "Dilly-dallying", "Discombobulating", "Doing", "Doodling", "Drizzling", "Ebbing", "Effecting", "Elucidating", "Embellishing", "Enchanting", "Envisioning", "Fermenting", "Fiddle-faddling", "Finagling", "Flambéing", "Flibbertigibbeting", "Flowing", "Flummoxing", "Fluttering", "Forging", "Forming", "Frolicking", "Frosting", "Gallivanting", "Galloping", "Garnishing", "Generating", "Gesticulating", "Germinating", "Gitifying", "Grooving", "Gusting", "Harmonizing", "Hashing", "Hatching", "Herding", "Honking", "Hullaballooing", "Hyperspacing", "Ideating", "Imagining", "Improvising", "Incubating", "Inferring", "Infusing", "Ionizing", "Jitterbugging", "Julienning", "Kerfuffling", "Kneading", "Leavening", "Levitating", "Lollygagging", "Manifesting", "Marinating", "Meandering", "Metamorphosing", "Misting", "Moonwalking", "Moseying", "Mulling", "Mustering", "Nebulizing", "Nesting", "Newspapering", "Noodling", "Nucleating", "Onioning", "Orbiting", "Orchestrating", "Osmosing", "Perambulating", "Percolating", "Perusing", "Philosophizing", "Photosynthesizing", "Polishing", "Pollinating", "Pondering", "Pontificating", "Pouncing", "Precipitating", "Prestidigitating", "Processing", "Proofing", "Propagating", "Puttering", "Puzzling", "Quantumizing", "Razzle-dazzling", "Razzmatazzing", "Recombobulating", "Reticulating", "Roosting", "Ruminating", "Sautéing", "Scampering", "Schlepping", "Scurrying", "Seasoning", "Shenaniganing", "Shimmying", "Simmering", "Skedaddling", "Sketching", "Slithering", "Smooshing", "Sock-hopping", "Spelunking", "Spinning", "Sprouting", "Stewing", "Sublimating", "Swirling", "Swooping", "Symbioting", "Synthesizing", "Tempering", "Thinking", "Thundering", "Tinkering", "Tomfoolering", "Topsy-turvying", "Transfiguring", "Transmogrifying", "Transmuting", "Twisting", "Undulating", "Unfurling", "Unraveling", "Vibing", "Waddling", "Wandering", "Warping", "Whatchamacalliting", "Whirlpooling", "Whirring", "Whisking", "Wibbling", "Working", "Wrangling", "Zesting", "Zigzagging"];
  const CC_DONE_VERBS = ['Baked', 'Brewed', 'Churned', 'Cogitated', 'Cooked', 'Crunched', 'Sautéed', 'Worked'];
  const EXTRA_VERBS = ['Consulting the vibes', 'Gathering receipts', 'Overthinking', 'Yak-shaving', 'Bikeshedding', 'Rubber-ducking'];

  /* ------------------------------------------------------------------ */
  /* Themes                                                              */
  /* ------------------------------------------------------------------ */
  // Each theme: palette per scheme, font, prefix icon, tail/meta, done state.
  // Colours are approximations of each product's UI. Unofficial, no logos.

  const THEMES = [
    {
      id: 'claude-code', name: 'Claude Code', group: 'Terminal', font: 'mono', weight: 400,
      defaultScheme: 'dark',
      schemes: {
        dark: { bg: '#141413', text: '#d77757', hi: '#eb9f7f', dim: '#999999', accent: '#d77757' },
        light: { bg: '#ffffff', text: '#d77757', hi: '#f59575', dim: '#666666', accent: '#d77757' }
      },
      prefix: 'cc-spinner', ellipsis: true, randomVerbs: true,
      steps: null, // random verbs
      tail: m => `(${m.sec}s · ↓ ${m.tokens} tokens · thinking)`,
      done: m => ({ prefix: 'cc-done', text: `${CC_DONE_VERBS[m.sec % CC_DONE_VERBS.length]} for ${m.sec}s`, dimText: true })
    },
    {
      id: 'codex', name: 'Codex CLI', group: 'Terminal', font: 'mono', weight: 400,
      defaultScheme: 'dark',
      schemes: {
        dark: { bg: '#0c0c0c', text: '#7a7a7a', hi: '#e8e8e8', dim: '#6b6b6b', accent: '#e8e8e8' },
        light: { bg: '#ffffff', text: '#8c8c8c', hi: '#1a1a1a', dim: '#8c8c8c', accent: '#1a1a1a' }
      },
      prefix: 'pulse-dot', boldText: true,
      steps: ['Working', 'Mapping the app structure', 'Running the test suite', 'Applying the patch'],
      tail: m => `(${m.sec}s • esc to interrupt)`,
      done: m => ({ prefix: 'none', text: `Worked for ${m.sec}s`, dimText: true })
    },
    {
      id: 'claude', name: 'Claude', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'light',
      schemes: {
        light: { bg: '#faf9f5', text: '#83827d', hi: '#3d3d3a', dim: '#a3a29c', accent: '#d97757' },
        dark: { bg: '#262624', text: '#9c9a92', hi: '#f5f4ee', dim: '#73726c', accent: '#d97757' }
      },
      prefix: 'burst',
      steps: ['Thinking', 'Pondering the question', 'Weighing a few approaches', 'Drafting a reply'],
      tail: null,
      done: m => ({ prefix: 'none', text: `Thought for ${m.sec}s`, chevron: true, dimText: true })
    },
    {
      id: 'chatgpt', name: 'ChatGPT', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'light',
      schemes: {
        light: { bg: '#ffffff', text: '#8f8f8f', hi: '#0d0d0d', dim: '#8f8f8f', accent: '#0d0d0d' },
        dark: { bg: '#212121', text: '#9b9b9b', hi: '#ffffff', dim: '#8f8f8f', accent: '#ffffff' }
      },
      prefix: 'none',
      steps: ['Thinking', 'Searching the web', 'Reading sources', 'Putting it together'],
      tail: null,
      done: m => ({ prefix: 'none', text: `Thought for ${m.sec}s`, chevron: true, dimText: true })
    },
    {
      id: 'deepseek', name: 'DeepSeek', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'light',
      schemes: {
        light: { bg: '#ffffff', text: '#4c4c4c', hi: '#a8a8a8', dim: '#8b8b8b', accent: '#4d6bfe', chip: '#f5f5f5' },
        dark: { bg: '#292a2d', text: '#d4d4d4', hi: '#ffffff', dim: '#8b8b8b', accent: '#4d6bfe', chip: '#3a3a3d' }
      },
      prefix: 'think-icon', chip: true,
      steps: ['Thinking…', 'Hmm, let me reconsider…', 'Wait, double-checking…', 'Okay, that holds…'],
      tail: null,
      done: m => ({ prefix: 'think-icon', text: `Thought for ${m.sec} seconds`, chevron: true, chip: true })
    },
    {
      id: 'gemini', name: 'Gemini', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'light',
      schemes: {
        light: { bg: '#ffffff', text: '#1f1f1f', hi: '#444746', dim: '#444746', accent: '#1f1f1f' },
        dark: { bg: '#131314', text: '#e3e3e3', hi: '#c4c7c5', dim: '#c4c7c5', accent: '#e3e3e3' }
      },
      prefix: 'three-dots', shimmer: false,
      steps: ['Thinking…', 'Thinking it through…', 'Comparing a few sources…', 'Checking the details…'],
      tail: null,
      done: m => ({ prefix: 'none', text: 'Finished thinking', chevron: true, dimText: true })
    },
    {
      id: 'grok', name: 'Grok', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'dark',
      schemes: {
        dark: { bg: '#050505', text: '#858585', hi: '#ffffff', dim: '#858585', accent: '#299fff' },
        light: { bg: '#ffffff', text: '#858585', hi: '#050505', dim: '#858585', accent: '#0890ff' }
      },
      prefix: 'none', trailingDots: true,
      steps: ['Thinking', 'Searching posts', 'Cross-checking', 'Composing'],
      tail: null,
      done: m => ({ prefix: 'none', text: `Thought for ${m.sec}s`, chevron: true, dimText: true })
    },
    {
      id: 'meta', name: 'Meta AI', group: 'Chat', font: 'sans', weight: 400,
      defaultScheme: 'light',
      schemes: {
        light: { bg: '#ffffff', text: '#65676b', hi: '#050505', dim: '#8a8d91', accent: '#0866ff', accent2: '#a33ee6' },
        dark: { bg: '#18191a', text: '#b0b3b8', hi: '#ffffff', dim: '#8a8d91', accent: '#0866ff', accent2: '#a33ee6' }
      },
      prefix: 'ring-gradient',
      steps: ['Thinking', 'Reasoning it through', 'Checking the details', 'Almost there'],
      tail: null,
      done: m => ({ prefix: 'none', text: `Thought for ${m.sec}s`, chevron: true, dimText: true })
    },
    {
      id: 'hermes', name: 'Hermes Agent', group: 'Terminal', font: 'mono', weight: 400,
      defaultScheme: 'dark',
      schemes: {
        dark: { bg: '#1a1a2e', text: '#fff8dc', hi: '#ffffff', dim: '#b8860b', accent: '#ffd700' },
        light: { bg: '#fdfbf3', text: '#3d3420', hi: '#000000', dim: '#b8860b', accent: '#d89b04' }
      },
      prefix: 'kaomoji', ellipsis: '...', shimmer: false,
      steps: ['pondering', 'contemplating', 'ruminating', 'synthesizing'],
      tail: m => `(${m.secf}s)`,
      done: m => ({ prefix: 'none', text: `done in ${m.sec}s`, dimText: true })
    },
    {
      id: 'agent-log', name: 'Agent log', group: 'Generic', font: 'sans', weight: 400,
      defaultScheme: 'light', defaultDisplay: 'log',
      schemes: {
        light: { bg: '#ffffff', text: '#6b6b6b', hi: '#111111', dim: '#9a9a9a', accent: '#16a34a' },
        dark: { bg: '#141414', text: '#a3a3a3', hi: '#ffffff', dim: '#6b6b6b', accent: '#4ade80' }
      },
      prefix: 'ring', donePrefix: 'check',
      steps: ['Searching 14 sites', 'Reading 6 sources', 'Comparing the numbers', 'Writing it up'],
      tail: null,
      done: m => ({ prefix: 'check', text: `Done in ${m.sec}s`, dimText: true })
    },
    {
      id: 'plain', name: 'Plain', group: 'Generic', font: 'sans', weight: 500,
      defaultScheme: 'dark',
      schemes: {
        dark: { bg: '#0b0c0f', text: '#8b8f98', hi: '#ffffff', dim: '#5b5f68', accent: '#ffffff' },
        light: { bg: '#f8fafc', text: '#7a808a', hi: '#0b0c0f', dim: '#a0a5ad', accent: '#0b0c0f' }
      },
      prefix: 'none',
      steps: ['Thinking…', 'Gathering receipts…', 'Consulting the vibes…', 'Finalizing response…'],
      tail: null,
      done: null
    }
  ];

  const THEME_MAP = Object.fromEntries(THEMES.map(t => [t.id, t]));

  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */

  const DEFAULT_STATE = {
    theme: 'claude-code',
    scheme: 'auto',      // auto (theme default) | light | dark
    steps: null,         // null = theme defaults; otherwise array of strings
    seed: 7,             // random-verb seed (for reproducible share links)
    verbCount: 4,
    size: 'chat',
    bg: 'theme',         // theme | transparent | custom
    bgColor: '#ffffff',
    matte: 'auto',       // GIF transparency edge colour: auto | #hex
    align: 'center',     // center | left
    textScale: 1,
    display: 'auto',     // auto | single | log
    transition: 'fade',
    stepMs: 1600,
    transMs: 320,
    finish: true,        // end the loop on the theme's "done" line
    finishMs: 1400,
    loop: true,
    shimmer: true,
    shimmerMs: 1800,     // one sweep across the line
    shimmerStrength: 1,
    meta: true,          // timer / token tail
    cursor: 'none',      // none | bar | block
    fps: 20,
    format: 'gif',
    mp4Repeats: 3
  };

  function isHex(v) { return typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v); }
  function num(v, lo, hi, fallback) {
    const n = Number(v);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(hi, Math.max(lo, n));
  }
  function pick(v, list, fallback) { return list.includes(v) ? v : fallback; }

  function sanitizeSteps(steps) {
    if (!Array.isArray(steps)) return [];
    return steps
      .map(s => (s && typeof s === 'object' ? s.text : s))
      .map(s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, 140))
      .filter(Boolean)
      .slice(0, 12);
  }

  // Validate any partial/untrusted state (URL, localStorage) into a full state.
  function normalizeState(input) {
    const s = input && typeof input === 'object' ? input : {};
    const d = DEFAULT_STATE;
    const out = {
      theme: THEME_MAP[s.theme] ? s.theme : d.theme,
      scheme: pick(s.scheme, ['auto', 'light', 'dark'], d.scheme),
      steps: Array.isArray(s.steps) ? sanitizeSteps(s.steps) : null,
      seed: Math.floor(num(s.seed, 0, 2147483646, d.seed)),
      verbCount: Math.round(num(s.verbCount, 1, 8, d.verbCount)),
      size: SIZE_PRESETS.some(p => p.id === s.size) ? s.size : d.size,
      bg: pick(s.bg, ['theme', 'transparent', 'custom'], d.bg),
      bgColor: isHex(s.bgColor) ? s.bgColor.toLowerCase() : d.bgColor,
      matte: s.matte === 'auto' || isHex(s.matte) ? s.matte : d.matte,
      align: pick(s.align, ['center', 'left'], d.align),
      textScale: num(s.textScale, 0.5, 2, d.textScale),
      display: pick(s.display, ['auto', 'single', 'log'], d.display),
      transition: pick(s.transition, TRANSITIONS, d.transition),
      stepMs: Math.round(num(s.stepMs, 300, 10000, d.stepMs)),
      transMs: Math.round(num(s.transMs, 0, 3000, d.transMs)),
      finish: typeof s.finish === 'boolean' ? s.finish : d.finish,
      finishMs: Math.round(num(s.finishMs, 300, 10000, d.finishMs)),
      loop: typeof s.loop === 'boolean' ? s.loop : d.loop,
      shimmer: typeof s.shimmer === 'boolean' ? s.shimmer : d.shimmer,
      shimmerMs: Math.round(num(s.shimmerMs, 400, 6000, d.shimmerMs)),
      shimmerStrength: num(s.shimmerStrength, 0, 1, d.shimmerStrength),
      meta: typeof s.meta === 'boolean' ? s.meta : d.meta,
      cursor: pick(s.cursor, ['none', 'bar', 'block'], d.cursor),
      fps: pick(Number(s.fps), FPS_OPTIONS, d.fps),
      format: pick(s.format, FORMATS, d.format),
      mp4Repeats: Math.round(num(s.mp4Repeats, 1, 10, d.mp4Repeats))
    };
    if (out.steps && out.steps.length === 0) out.steps = null;
    return out;
  }

  /* ---- Share links: only the fields that differ from defaults, base64url JSON ---- */

  function diffState(state) {
    const n = normalizeState(state);
    const out = {};
    Object.keys(DEFAULT_STATE).forEach(k => {
      const a = n[k];
      const b = DEFAULT_STATE[k];
      if (JSON.stringify(a) !== JSON.stringify(b)) out[k] = a;
    });
    return out;
  }

  function b64urlEncode(str) {
    const bytes = utf8Encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
    const b64 = typeof btoa === 'function' ? btoa(bin) : Buffer.from(bin, 'binary').toString('base64');
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function b64urlDecode(str) {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const bin = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary');
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    return utf8Decode(bytes);
  }

  function utf8Encode(str) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(str);
    return Uint8Array.from(Buffer.from(str, 'utf8'));
  }
  function utf8Decode(bytes) {
    if (typeof TextDecoder !== 'undefined') return new TextDecoder().decode(bytes);
    return Buffer.from(bytes).toString('utf8');
  }

  function encodeShareHash(state) {
    const diff = diffState(state);
    if (!Object.keys(diff).length) return '';
    return 's=' + b64urlEncode(JSON.stringify(diff));
  }

  function decodeShareHash(hash) {
    if (typeof hash !== 'string') return null;
    const m = hash.replace(/^#/, '').match(/(?:^|&)s=([A-Za-z0-9_-]+)/);
    if (!m) return null;
    try {
      return normalizeState(JSON.parse(b64urlDecode(m[1])));
    } catch (e) {
      return null;
    }
  }

  /* ---- Random verbs (seeded, so a share link reproduces them) ---- */

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickVerbs(seed, count, list) {
    const pool = (list || VERB_LIST).slice();
    const rand = mulberry32(seed);
    const out = [];
    const n = Math.min(count, pool.length);
    for (let i = 0; i < n; i += 1) {
      const j = Math.floor(rand() * pool.length);
      out.push(pool.splice(j, 1)[0]);
    }
    return out;
  }

  function resolveTheme(state) {
    return THEME_MAP[state.theme] || THEMES[0];
  }

  function resolveScheme(state, theme) {
    const t = theme || resolveTheme(state);
    const key = state.scheme === 'auto' ? t.defaultScheme : state.scheme;
    return { key, ...(t.schemes[key] || t.schemes[t.defaultScheme]) };
  }

  function resolveSize(state) {
    return SIZE_PRESETS.find(p => p.id === state.size) || SIZE_PRESETS[2];
  }

  function resolveDisplay(state, theme) {
    if (state.display !== 'auto') return state.display;
    return (theme || resolveTheme(state)).defaultDisplay || 'single';
  }

  // The lines the animation cycles through, already decorated for the theme.
  function resolveSteps(state, theme) {
    const t = theme || resolveTheme(state);
    let steps;
    if (state.steps && state.steps.length) steps = state.steps.slice();
    else if (t.randomVerbs) steps = pickVerbs(state.seed, state.verbCount);
    else steps = t.steps.slice();
    if (t.ellipsis) {
      const e = typeof t.ellipsis === 'string' ? t.ellipsis : '…';
      steps = steps.map(s => (/[…\.!?]$/.test(s) ? s : s + e));
    }
    return steps;
  }

  /* ------------------------------------------------------------------ */
  /* Timeline                                                            */
  /* ------------------------------------------------------------------ */
  // Items = steps (+ a "done" item when finish is on). Each item holds, then
  // transitions to the next. When looping, the last item transitions back to
  // the first, so frame 0 and the end of the loop line up seamlessly.

  function timeline(stepCount, cfg, hasDone) {
    const items = Math.max(0, stepCount) + (hasDone && stepCount > 0 ? 1 : 0);
    const holds = [];
    for (let i = 0; i < items; i += 1) {
      holds.push(hasDone && i === items - 1 ? cfg.finishMs : cfg.stepMs);
    }
    const trans = cfg.transition === 'cut' ? 0 : cfg.transMs;
    const transitions = cfg.loop ? items : Math.max(0, items - 1);
    const duration = holds.reduce((a, b) => a + b, 0) + trans * transitions;
    return { items, holds, trans, duration };
  }

  function getStepState(timeMs, stepCount, cfg, hasDone) {
    const tl = timeline(stepCount, cfg, hasDone);
    const empty = { index: 0, next: 0, inTransition: false, progress: 0, local: 0, items: tl.items, duration: tl.duration };
    if (!tl.items || !(tl.duration > 0)) return empty;
    let t = Number(timeMs);
    if (!Number.isFinite(t) || t < 0) t = 0;   // rAF timestamps can precede the start time
    t = cfg.loop ? t % tl.duration : Math.min(t, tl.duration);
    let acc = 0;
    for (let i = 0; i < tl.items; i += 1) {
      const hold = tl.holds[i];
      if (t < acc + hold) {
        return { index: i, next: (i + 1) % tl.items, inTransition: false, progress: 0, local: t - acc, items: tl.items, duration: tl.duration };
      }
      acc += hold;
      const hasTrans = cfg.loop || i < tl.items - 1;
      if (hasTrans && tl.trans > 0 && t < acc + tl.trans) {
        return { index: i, next: (i + 1) % tl.items, inTransition: true, progress: (t - acc) / tl.trans, local: t - acc + hold, items: tl.items, duration: tl.duration };
      }
      if (hasTrans) acc += tl.trans;
    }
    const last = tl.items - 1;
    return { index: last, next: last, inTransition: false, progress: 0, local: tl.holds[last], items: tl.items, duration: tl.duration };
  }

  /* ------------------------------------------------------------------ */
  /* Text layout                                                         */
  /* ------------------------------------------------------------------ */

  // Word-wrap to maxWidth. A single token wider than the line (a URL, a long
  // unbroken word) is split by character so nothing is ever drawn off-canvas;
  // `fits` is false in that case so the layout tries a smaller font first.
  function wrapText(measure, text, maxWidth, maxLines) {
    const words = String(text).split(/\s+/).filter(Boolean);
    if (!words.length) return { lines: [''], fits: true };
    const lines = [];
    let line = '';
    let fits = true;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (measure(test) <= maxWidth) {
        line = test;
        continue;
      }
      if (line) lines.push(line);
      line = word;
      if (measure(word) > maxWidth) {
        fits = false;
        const chunks = splitWord(measure, word, maxWidth);
        line = chunks.pop();
        lines.push(...chunks);
      }
    }
    lines.push(line);
    if (lines.length > maxLines) {
      fits = false;
      const kept = lines.slice(0, maxLines);
      let last = kept[maxLines - 1];
      while (last.length > 1 && measure(last + '…') > maxWidth) last = Array.from(last).slice(0, -1).join('');
      kept[maxLines - 1] = last + '…';
      return { lines: kept, fits };
    }
    return { lines, fits };
  }

  function splitWord(measure, word, maxWidth) {
    const chunks = [];
    let cur = '';
    for (const ch of Array.from(word)) {
      if (cur && measure(cur + ch) > maxWidth) {
        chunks.push(cur);
        cur = ch;
      } else {
        cur += ch;
      }
    }
    chunks.push(cur);
    return chunks;
  }

  function fontFor(theme, px, weight) {
    return `${weight || theme.weight || 400} ${px.toFixed(2)}px ${theme.font === 'mono' ? FONT_MONO : FONT_SANS}`;
  }

  // Work out a font size that fits every step on the canvas, and a stable block width.
  // The timer tail goes inline if it fits, otherwise on its own line, otherwise it's hidden.
  function computeLayout(ctx, state, theme, steps, doneText) {
    const size = resolveSize(state);
    const W = size.w;
    const H = size.h;
    const small = W < 400 || H < 200;
    const pad = Math.max(8, Math.round(Math.min(W, H) * (small ? 0.07 : 0.08)));
    let u = state.textScale * (small ? Math.min(H / 5.2, W / 7) : Math.min(H / 9, W / 22));
    const minU = Math.max(6, u * 0.5);
    const maxLines = small ? 4 : 3;
    const wantTail = state.meta && typeof theme.tail === 'function' && !small;
    const hasDone = state.finish && typeof theme.done === 'function' && steps.length > 0;
    const tailSample = wantTail ? theme.tail(meta(timeline(steps.length, state, hasDone).duration + 9000)) : '';
    const texts = steps.concat(doneText ? [doneText] : []);
    const prefixUnits = theme.prefix === 'none' ? 0 : (theme.prefix === 'kaomoji' ? 5.4 : 1.5);

    let result = null;
    for (let tries = 0; tries < 40; tries += 1) {
      const measure = s => ctx.measureText(s).width;
      ctx.font = fontFor(theme, u * 0.86, 400);
      const tailW = wantTail ? measure(tailSample) + u * 0.5 : 0;
      ctx.font = fontFor(theme, u, theme.boldText ? 600 : undefined);
      const prefixW = prefixUnits * u;
      const chipW = (theme.chip ? u * 1.6 : 0) + (theme.trailingDots ? u * 1.0 : 0);
      const avail = W - pad * 2;
      const maxW = avail - prefixW - chipW - u * 1.2;
      let ok = maxW > u * 2;
      let blockW = 0;
      let maxH = 0;
      let tailMode = wantTail ? 'inline' : 'none';
      const rows = texts.map(text => {
        const wrapped = wrapText(measure, text, maxW, maxLines);
        if (!wrapped.fits) ok = false;
        return wrapped.lines;
      });
      const rowW = lines => prefixW + Math.max(...lines.map(measure)) + chipW + u * 1.2;
      if (wantTail) {
        const inlineFits = rows.slice(0, steps.length).every(lines => prefixW + measure(lines[lines.length - 1]) + tailW <= avail);
        if (!inlineFits) tailMode = prefixW + tailW <= avail ? 'below' : 'none';
      }
      rows.forEach((lines, i) => {
        let w = rowW(lines);
        if (i < steps.length && tailMode === 'inline') w = Math.max(w, prefixW + measure(lines[lines.length - 1]) + tailW);
        if (i < steps.length && tailMode === 'below') w = Math.max(w, prefixW + tailW);
        blockW = Math.max(blockW, w);
        const extra = i < steps.length && tailMode === 'below' ? 0.9 : 0;
        maxH = Math.max(maxH, (lines.length + extra) * u * 1.4);
      });
      if (maxH > H - pad * 2) ok = false;
      result = { W, H, pad, u, lh: u * 1.4, rows, prefixW, blockW: Math.min(blockW, avail), showTail: tailMode !== 'none', tailMode, small, maxLines };
      if (ok || u <= minU) break;
      u = Math.max(minU, u * 0.93);
    }
    return result;
  }

  /* ------------------------------------------------------------------ */
  /* Drawing                                                             */
  /* ------------------------------------------------------------------ */

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function mix(a, b, t) {
    const A = hexToRgb(a);
    const B = hexToRgb(b);
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
  }

  // Text with a moving highlight band: one fillText with a gradient fill, so it
  // works the same on opaque and transparent backgrounds.
  function fillShimmerText(ctx, text, x, y, base, hi, band) {
    if (!band || band.strength <= 0) {
      ctx.fillStyle = base;
      ctx.fillText(text, x, y);
      return;
    }
    const g = ctx.createLinearGradient(band.center - band.width, 0, band.center + band.width, 0);
    const peak = mix(base, hi, band.strength);
    g.addColorStop(0, base);
    g.addColorStop(0.5, peak);
    g.addColorStop(1, base);
    ctx.fillStyle = g;
    ctx.fillText(text, x, y);
  }

  const CC_FRAMES = ['·', '✢', '✳', '✶', '✻', '✽'];

  function drawPrefix(ctx, kind, cx, cy, u, pal, t) {
    ctx.save();
    switch (kind) {
      case 'cc-spinner': {
        const seq = CC_FRAMES.concat(CC_FRAMES.slice(1, -1).reverse());
        const frame = seq[Math.floor(t / 120) % seq.length];
        drawCcGlyph(ctx, frame, cx, cy, u, pal.accent);
        break;
      }
      case 'cc-done':
        ctx.fillStyle = pal.dim;
        drawCcGlyph(ctx, '✻', cx, cy, u, pal.dim);
        break;
      case 'pulse-dot': {
        const a = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos((t / 900) * Math.PI * 2));
        ctx.globalAlpha *= a;
        ctx.fillStyle = pal.accent;
        ctx.beginPath();
        ctx.arc(cx, cy, u * 0.16, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'burst': {
        const rays = 12;
        const rot = (t / 2400) * Math.PI * 2;
        ctx.strokeStyle = pal.accent;
        ctx.lineCap = 'round';
        ctx.lineWidth = u * 0.1;
        for (let i = 0; i < rays; i += 1) {
          const ang = rot + (i / rays) * Math.PI * 2;
          const wobble = 0.72 + 0.28 * Math.sin(t / 260 + i * 1.7);
          const r0 = u * 0.08;
          const r1 = u * 0.46 * wobble;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
          ctx.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
          ctx.stroke();
        }
        break;
      }
      case 'sparkle':
      case 'sparkle-still': {
        const anim = kind === 'sparkle';
        const s = u * 0.48 * (anim ? 0.85 + 0.15 * Math.sin(t / 300) : 1);
        const rot = anim ? (t / 3000) * Math.PI * 2 : 0;
        const g = ctx.createLinearGradient(cx - s, cy + s, cx + s, cy - s);
        g.addColorStop(0, pal.accent);
        g.addColorStop(0.6, pal.accent2 || pal.accent);
        g.addColorStop(1, pal.accent3 || pal.accent);
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.fillStyle = g;
        ctx.beginPath();
        for (let i = 0; i < 4; i += 1) {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
          ctx.quadraticCurveTo(0, 0, Math.cos(a + Math.PI / 2) * s, Math.sin(a + Math.PI / 2) * s);
        }
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'ring':
      case 'ring-gradient': {
        const r = u * 0.32;
        const start = (t / 900) * Math.PI * 2;
        ctx.lineWidth = u * 0.1;
        ctx.lineCap = 'round';
        ctx.strokeStyle = pal.dim;
        ctx.globalAlpha *= 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha /= 0.35;
        if (kind === 'ring-gradient') {
          const g = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
          g.addColorStop(0, pal.accent);
          g.addColorStop(1, pal.accent2 || pal.accent);
          ctx.strokeStyle = g;
        } else {
          ctx.strokeStyle = pal.hi;
        }
        ctx.beginPath();
        ctx.arc(cx, cy, r, start, start + Math.PI * 0.6);
        ctx.stroke();
        break;
      }
      case 'three-dots': {
        // Three small rounded dots orbiting a centre point (generic loader).
        const rot = (t / 1600) * Math.PI * 2;
        ctx.fillStyle = pal.accent;
        for (let i = 0; i < 3; i += 1) {
          const a = rot + (i / 3) * Math.PI * 2;
          const r = u * (0.2 + 0.06 * Math.sin(t / 300 + i));
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, u * 0.085, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case 'think-icon': {
        // Generic "reasoning" glyph: a small atom-like orbit, not a logo.
        ctx.strokeStyle = pal.text;
        ctx.lineWidth = u * 0.07;
        const r = u * 0.36;
        for (let i = 0; i < 2; i += 1) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * 0.42, (i ? 1 : -1) * Math.PI / 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = pal.text;
        ctx.beginPath();
        ctx.arc(cx, cy, u * 0.07, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'check': {
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = u * 0.11;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - u * 0.26, cy + u * 0.02);
        ctx.lineTo(cx - u * 0.06, cy + u * 0.22);
        ctx.lineTo(cx + u * 0.28, cy - u * 0.2);
        ctx.stroke();
        break;
      }
      case 'kaomoji': {
        const faces = KAOMOJI;
        const face = faces[Math.floor(t / 1600) % faces.length];
        ctx.fillStyle = pal.accent;
        ctx.textAlign = 'center';
        ctx.fillText(face, cx, cy);
        break;
      }
      default:
        break;
    }
    ctx.restore();
  }

  // Hermes Agent's default-skin faces (a subset that common fonts render).
  const KAOMOJI = ['(◔_◔)', '(¬‿¬)', '(⌐■_■)', '(°ロ°)', '(⊙_⊙)', '(¬_¬)', 'ಠ_ಠ', '(｡◕‿◕｡)', '(≧◡≦)'];

  // Procedural versions of the terminal spinner glyphs (font-independent).
  function drawCcGlyph(ctx, glyph, cx, cy, u, color) {
    ctx.fillStyle = color;
    const spec = {
      '·': null,
      '✢': { arms: 4, len: 0.42, w: 0.16, rot: 0 },
      '✳': { arms: 8, len: 0.42, w: 0.08, rot: 0 },
      '✶': 'star',
      '✻': { arms: 8, len: 0.44, w: 0.15, rot: Math.PI / 8 },
      '✽': { arms: 8, len: 0.47, w: 0.2, rot: 0 }
    }[glyph];
    if (spec === null) {
      ctx.beginPath();
      ctx.arc(cx, cy, u * 0.09, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (spec === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 12; i += 1) {
        const r = (i % 2 ? 0.2 : 0.46) * u;
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      return;
    }
    for (let i = 0; i < spec.arms; i += 1) {
      const a = spec.rot + (i / spec.arms) * Math.PI * 2 - Math.PI / 2;
      const L = spec.len * u;
      ctx.beginPath();
      ctx.ellipse(cx + Math.cos(a) * L / 2, cy + Math.sin(a) * L / 2, L / 2, (spec.w * u) / 2, a, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawChip(ctx, x, y, w, h, color) {
    const r = Math.min(h / 2, 999);
    ctx.fillStyle = color;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
    ctx.fill();
  }

  function drawChevron(ctx, x, cy, u, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, u * 0.08);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, cy - u * 0.2);
    ctx.lineTo(x + u * 0.2, cy);
    ctx.lineTo(x, cy + u * 0.2);
    ctx.stroke();
    ctx.restore();
  }

  function meta(timeMs) {
    const sec = Math.max(1, Math.floor(timeMs / 1000) + 1);
    const tok = Math.round(timeMs * 0.21);
    const tokens = tok >= 1000 ? (tok / 1000).toFixed(1) + 'k' : String(tok);
    return { sec, secf: (Math.max(0.1, timeMs / 1000)).toFixed(1), tokens };
  }

  // One row: [prefix][text lines][tail | chevron], optionally in a chip.
  function drawRow(ctx, L, theme, pal, row, x, yTop, opts) {
    const { u, lh } = L;
    const lines = opts.lines;
    ctx.save();
    ctx.globalAlpha *= opts.alpha;
    ctx.textBaseline = 'middle';
    ctx.font = fontFor(theme, u, theme.boldText && !row.dimText ? 600 : undefined);
    const textX = x + (row.prefix && row.prefix !== 'none' ? L.prefixW : 0) + (row.chip ? u * 0.8 : 0);
    const firstMid = yTop + lh / 2;

    if (row.chip) {
      const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
      const w = (textX - x) + widest + (row.chevron ? u * 0.9 : 0) + u * 0.8;
      drawChip(ctx, x, yTop + lh * 0.08, w, lh * lines.length - lh * 0.16, pal.chip || pal.dim);
    }
    if (row.prefix && row.prefix !== 'none') {
      const pcx = x + (row.chip ? u * 0.8 : 0) + (row.prefix === 'kaomoji' ? L.prefixW / 2 - u * 0.3 : u * 0.5);
      drawPrefix(ctx, row.prefix, pcx, firstMid, u, pal, opts.t);
    }

    const base = row.dimText ? pal.dim : pal.text;
    let lastW = 0;
    lines.forEach((line, i) => {
      const y = yTop + i * lh + lh / 2;
      const w = ctx.measureText(line).width;
      const band = opts.shimmer
        ? { center: textX + ((opts.shimmerPhase * (w + u * 6)) - u * 3), width: u * 2.4, strength: opts.shimmerStrength }
        : null;
      fillShimmerText(ctx, line, textX, y, base, pal.hi, band);
      lastW = w;
    });

    const lastMid = yTop + (lines.length - 1) * lh + lh / 2;
    let endX = textX + lastW;
    if (opts.cursor && opts.cursor !== 'none' && opts.cursorOn) {
      ctx.fillStyle = pal.hi;
      if (opts.cursor === 'block') ctx.fillRect(endX + u * 0.15, lastMid - u * 0.5, u * 0.55, u);
      else ctx.fillRect(endX + u * 0.12, lastMid - u * 0.55, Math.max(1, u * 0.08), u * 1.1);
      endX += u * 0.7;
    }
    if (row.dots) {
      for (let i = 0; i < 3; i += 1) {
        const ph = ((opts.t / 1000) - 0.2 * (i + 1)) % 1;
        const lift = ph >= 0 && ph < 0.4 ? Math.sin((ph / 0.4) * Math.PI) : 0;
        ctx.fillStyle = base;
        ctx.globalAlpha = opts.alpha * (0.4 + 0.6 * lift);
        ctx.beginPath();
        ctx.arc(endX + u * (0.2 + i * 0.28), lastMid + u * 0.28 - lift * u * 0.18, u * 0.065, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = opts.alpha;
      endX += u * 0.95;
    }
    if (row.chevron) {
      drawChevron(ctx, endX + u * 0.35, lastMid, u, base);
    }
    if (row.tail) {
      ctx.font = fontFor(theme, u * 0.86, 400);
      ctx.fillStyle = pal.dim;
      if (L.tailMode === 'below') ctx.fillText(row.tail, textX, lastMid + lh * 0.9);
      else ctx.fillText(row.tail, endX + u * 0.5, lastMid);
    }
    ctx.restore();
  }

  function bandPhase(localMs, state) {
    return (localMs % state.shimmerMs) / state.shimmerMs;
  }

  /*
   * Render one frame.
   * ctx: 2D context sized to the preset; timeMs: time since loop start.
   * opts.layout: cached computeLayout result; opts.transparent overrides bg.
   */
  function renderFrame(ctx, timeMs, state, opts) {
    const o = opts || {};
    const theme = resolveTheme(state);
    const pal = resolveScheme(state, theme);
    const steps = o.steps || resolveSteps(state, theme);
    const display = resolveDisplay(state, theme);
    const hasDone = state.finish && typeof theme.done === 'function' && steps.length > 0;
    const doneRow = hasDone ? theme.done(meta(timeline(steps.length, state, false).duration)) : null;
    const L = o.layout || computeLayout(ctx, state, theme, steps, doneRow && doneRow.text);
    const { W, H } = L;

    ctx.save();
    ctx.setTransform(o.scale || 1, 0, 0, o.scale || 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (state.bg === 'theme') {
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, W, H);
    } else if (state.bg === 'custom') {
      ctx.fillStyle = state.bgColor;
      ctx.fillRect(0, 0, W, H);
    }

    if (!steps.length) {
      ctx.restore();
      return;
    }

    const st = getStepState(timeMs, steps.length, state, hasDone);
    const x0 = state.align === 'left' ? L.pad : Math.round((W - L.blockW) / 2);
    const tMs = Math.max(0, Number(timeMs) || 0);
    const mt = meta(state.loop ? tMs % (st.duration || 1) : tMs);

    const itemRow = i => {
      if (hasDone && i === steps.length) return Object.assign({ chip: false }, doneRow, { lines: L.rows[i], live: false });
      return {
        prefix: theme.prefix,
        lines: L.rows[i],
        chip: !!theme.chip,
        tail: L.showTail && theme.tail ? theme.tail(mt) : null,
        dots: !!theme.trailingDots,
        live: true
      };
    };

    const common = { t: tMs, cursor: state.cursor, shimmerStrength: state.shimmer ? state.shimmerStrength : 0 };

    if (display === 'log') {
      drawLog(ctx, L, theme, pal, st, itemRow, x0, state, common);
      ctx.restore();
      return;
    }

    const rowH = r => (r.lines.length + (r.tail && L.tailMode === 'below' ? 0.9 : 0)) * L.lh;
    const draw = (row, alpha, dy, extra) => {
      const y = Math.round((H - rowH(row)) / 2 + dy);
      drawRow(ctx, L, theme, pal, row, x0, y, Object.assign({}, common, {
        alpha,
        lines: (extra && extra.lines) || row.lines,
        shimmer: row.live && state.shimmer && theme.shimmer !== false,
        shimmerPhase: bandPhase(extra && extra.local != null ? extra.local : st.local, state),
        cursorOn: row.live && (Math.floor(tMs / 530) % 2 === 0)
      }));
    };

    const cur = itemRow(st.index);
    if (!st.inTransition) {
      draw(cur, 1, 0);
    } else {
      const nxt = itemRow(st.next);
      const p = st.progress;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (state.transition === 'slide') {
        draw(cur, 1 - ease, -L.lh * 0.7 * ease);
        draw(nxt, ease, L.lh * 0.7 * (1 - ease), { local: 0 });
      } else if (state.transition === 'typewriter') {
        if (p < 0.12) draw(cur, 1 - p / 0.12, 0);
        const full = nxt.lines.join(' ');
        const count = Math.ceil(full.length * Math.min(1, Math.max(0, (p - 0.08) / 0.92)));
        if (count > 0) {
          const lines = retypeLines(nxt.lines, count);
          draw(Object.assign({}, nxt, { chevron: nxt.chevron && p > 0.98, tail: p > 0.98 ? nxt.tail : null }), 1, 0, { lines, local: 0 });
        }
      } else if (state.transition === 'cut') {
        draw(p < 0.5 ? cur : nxt, 1, 0);
      } else {
        draw(cur, 1 - ease, 0);
        draw(nxt, ease, 0, { local: 0 });
      }
    }
    ctx.restore();
  }

  // Typewriter: keep the final line breaks so text doesn't reflow while typing.
  function retypeLines(lines, count) {
    const out = [];
    let left = count;
    for (let i = 0; i < lines.length && left > 0; i += 1) {
      out.push(lines[i].slice(0, left));
      left -= lines[i].length + 1;
    }
    return out.length ? out : [''];
  }

  function drawLog(ctx, L, theme, pal, st, itemRow, x0, state, common) {
    const { H, lh, pad } = L;
    const gap = lh * 0.3;
    const wrap = st.inTransition && st.next < st.index;
    const ease = st.progress;

    const stack = (upto, alpha, local, entering) => {
      const rows = [];
      for (let i = 0; i <= upto; i += 1) {
        const r = itemRow(i);
        const isCurrent = i === upto;
        if (!isCurrent && r.live) {
          rows.push(Object.assign({}, r, { prefix: theme.donePrefix || r.prefix, tail: null, live: false, faded: true }));
        } else {
          rows.push(Object.assign({}, r, { live: r.live && isCurrent }));
        }
      }
      // keep only what fits, newest at the bottom
      let total = 0;
      let first = rows.length;
      while (first > 0) {
        const r = rows[first - 1];
        const h = (r.lines.length + (r.live && r.tail && L.tailMode === 'below' ? 0.9 : 0)) * lh + gap;
        if (total + h > H - pad * 2) break;
        total += h;
        first -= 1;
      }
      const visible = rows.slice(first);
      let y = Math.round((H - total + gap) / 2);
      visible.forEach((r, idx) => {
        const isLast = idx === visible.length - 1;
        const a = alpha * (isLast && entering != null ? entering : 1);
        drawRow(ctx, L, theme, pal, r.faded ? Object.assign({}, r, { dimText: true }) : r, x0, y, Object.assign({}, common, {
          alpha: r.faded ? a * 0.75 : a,
          lines: r.lines,
          shimmer: r.live && state.shimmer && theme.shimmer !== false,
          shimmerPhase: bandPhase(local, state),
          cursorOn: r.live && isLast && (Math.floor(common.t / 530) % 2 === 0)
        }));
        y += (r.lines.length + (r.live && r.tail && L.tailMode === 'below' ? 0.9 : 0)) * lh + gap;
      });
    };

    if (!st.inTransition) {
      stack(st.index, 1, st.local);
    } else if (wrap) {
      stack(st.index, 1 - ease, st.local);
      stack(st.next, ease, 0);
    } else {
      stack(st.next, 1, 0, ease);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Frame planning                                                      */
  /* ------------------------------------------------------------------ */

  function frameTimes(state, steps, theme) {
    const t = theme || resolveTheme(state);
    const hasDone = state.finish && typeof t.done === 'function' && steps.length > 0;
    const tl = timeline(steps.length, state, hasDone);
    const step = 1000 / state.fps;
    const count = Math.max(1, Math.round(tl.duration / step));
    const times = [];
    for (let i = 0; i < count; i += 1) times.push(i * step);
    return { times, frameMs: step, duration: tl.duration };
  }

  /* ------------------------------------------------------------------ */
  /* GIF encoder (colour, optional 1-bit transparency, frame diffing)    */
  /* ------------------------------------------------------------------ */

  // 15-bit colour histogram, fed frame by frame (stride > 1 subsamples big frames).
  function PaletteBuilder(alphaCut) {
    this.hist = new Uint32Array(32768);
    this.alphaCut = alphaCut;
  }
  PaletteBuilder.prototype.add = function (data, stride) {
    const step = 4 * Math.max(1, stride || 1);
    const hist = this.hist;
    const cut = this.alphaCut;
    for (let i = 0; i < data.length; i += step) {
      if (cut != null && data[i + 3] < cut) continue;
      hist[((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3)] += 1;
    }
  };
  PaletteBuilder.prototype.build = function (maxColors) {
    return medianCut(this.hist, maxColors);
  };

  function buildPalette(frames, maxColors, alphaCut) {
    const pb = new PaletteBuilder(alphaCut);
    frames.forEach(d => pb.add(d));
    return pb.build(maxColors);
  }

  // Median cut over a 15-bit histogram.
  function medianCut(hist, maxColors) {
    const colors = [];
    for (let c = 0; c < 32768; c += 1) if (hist[c]) colors.push(c);
    if (!colors.length) colors.push(0);
    if (colors.length <= maxColors) {
      return colors.map(c => [((c >> 10) & 31) * 8 + 4, ((c >> 5) & 31) * 8 + 4, (c & 31) * 8 + 4]);
    }
    const boxes = [colors];
    while (boxes.length < maxColors) {
      let best = -1;
      let bestScore = -1;
      boxes.forEach((box, i) => {
        if (box.length < 2) return;
        const r = channelRanges(box);
        const pop = box.reduce((a, c) => a + hist[c], 0);
        const score = Math.max(r[0], r[1], r[2]) * Math.sqrt(pop);
        if (score > bestScore) { bestScore = score; best = i; }
      });
      if (best < 0) break;
      const box = boxes[best];
      const r = channelRanges(box);
      const ch = r[0] >= r[1] && r[0] >= r[2] ? 0 : (r[1] >= r[2] ? 1 : 2);
      const shift = [10, 5, 0][ch];
      box.sort((a, b) => ((a >> shift) & 31) - ((b >> shift) & 31));
      const total = box.reduce((a, c) => a + hist[c], 0);
      let acc = 0;
      let cut = box.length - 1;
      for (let i = 0; i < box.length - 1; i += 1) {
        acc += hist[box[i]];
        if (acc >= total / 2) { cut = i + 1; break; }
      }
      boxes.splice(best, 1, box.slice(0, cut), box.slice(cut));
    }
    return boxes.map(box => {
      let n = 0, r = 0, g = 0, b = 0;
      box.forEach(c => {
        const w = hist[c];
        n += w;
        r += (((c >> 10) & 31) * 8 + 4) * w;
        g += (((c >> 5) & 31) * 8 + 4) * w;
        b += ((c & 31) * 8 + 4) * w;
      });
      return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
    });
  }

  function channelRanges(box) {
    const lo = [31, 31, 31];
    const hi = [0, 0, 0];
    box.forEach(c => {
      const v = [(c >> 10) & 31, (c >> 5) & 31, c & 31];
      for (let k = 0; k < 3; k += 1) {
        if (v[k] < lo[k]) lo[k] = v[k];
        if (v[k] > hi[k]) hi[k] = v[k];
      }
    });
    return [hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]];
  }

  function makeMapper(palette) {
    const cache = new Int16Array(32768).fill(-1);
    return (r, g, b) => {
      const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
      const hit = cache[key];
      if (hit >= 0) return hit;
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < palette.length; i += 1) {
        const p = palette[i];
        const dr = p[0] - r, dg = p[1] - g, db = p[2] - b;
        const d = dr * dr * 3 + dg * dg * 4 + db * db * 2;
        if (d < bestD) { bestD = d; best = i; }
      }
      cache[key] = best;
      return best;
    };
  }

  // Un-premultiplied canvas RGBA → flatten partially transparent pixels onto the matte.
  function flattenInPlace(d, m) {
    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a === 255) continue;
      const f = a / 255;
      d[i] = d[i] * f + m[0] * (1 - f);
      d[i + 1] = d[i + 1] * f + m[1] * (1 - f);
      d[i + 2] = d[i + 2] * f + m[2] * (1 - f);
    }
  }

  /*
   * Streaming GIF encoder.
   *   const enc = new GifEncoder({ width, height, palette, loop, transparent, matte });
   *   enc.addFrame(rgba, delayMs) ... enc.finish() → Uint8Array
   * transparent: alpha < 50% → transparent index; edges are flattened onto `matte`.
   * Opaque GIFs encode only the changed rectangle of each frame; identical frames merge.
   */
  function GifEncoder(opts) {
    this.width = opts.width;
    this.height = opts.height;
    this.transparent = !!opts.transparent;
    this.matte = hexToRgb(opts.matte || '#ffffff');
    const pal = opts.palette.slice(0, this.transparent ? 255 : 256);
    this.mapColor = makeMapper(pal);
    this.transIndex = this.transparent ? pal.length : -1;
    if (this.transparent) pal.push(this.matte.slice());
    this.palette = pal;
    let bits = 1;
    while ((1 << bits) < pal.length) bits += 1;
    this.palBits = bits;
    this.clock = 0;
    this.prev = null;     // last written indexed frame
    this.pending = null;  // { px, delayMs } waiting for its final duration
    const w = new ByteWriter();
    w.str('GIF89a');
    w.u16(this.width); w.u16(this.height);
    w.byte(0x80 | (7 << 4) | (bits - 1));
    w.byte(this.transparent ? this.transIndex : 0);
    w.byte(0);
    for (let i = 0; i < (1 << bits); i += 1) {
      const c = pal[i] || [0, 0, 0];
      w.byte(c[0]); w.byte(c[1]); w.byte(c[2]);
    }
    if (opts.loop) {
      w.byte(0x21); w.byte(0xff); w.byte(0x0b); w.str('NETSCAPE2.0');
      w.byte(0x03); w.byte(0x01); w.u16(0); w.byte(0x00);
    }
    this.w = w;
  }

  GifEncoder.prototype.addFrame = function (rgba, delayMs) {
    const d = rgba;
    flattenInPlace(d, this.matte);
    const px = new Uint8Array(this.width * this.height);
    const map = this.mapColor;
    const ti = this.transIndex;
    const tr = this.transparent;
    for (let i = 0, p = 0; i < d.length; i += 4, p += 1) {
      px[p] = tr && d[i + 3] < 128 ? ti : map(d[i], d[i + 1], d[i + 2]);
    }
    if (this.pending && equalBytes(this.pending.px, px)) {
      this.pending.delayMs += delayMs;
      return;
    }
    if (this.pending) this.writeFrame(this.pending);
    this.pending = { px, delayMs };
  };

  GifEncoder.prototype.writeFrame = function (frame) {
    const { width, height, w } = this;
    const startCs = Math.round(this.clock / 10);
    this.clock += frame.delayMs;
    const delayCs = Math.max(2, Math.round(this.clock / 10) - startCs);
    let rect = { x: 0, y: 0, w: width, h: height };
    if (!this.transparent && this.prev) rect = diffRect(this.prev, frame.px, width, height) || { x: 0, y: 0, w: 1, h: 1 };
    const disposal = this.transparent ? 2 : 1;
    w.byte(0x21); w.byte(0xf9); w.byte(0x04);
    w.byte((disposal << 2) | (this.transparent ? 1 : 0));
    w.u16(delayCs);
    w.byte(this.transparent ? this.transIndex : 0);
    w.byte(0x00);
    w.byte(0x2c);
    w.u16(rect.x); w.u16(rect.y); w.u16(rect.w); w.u16(rect.h);
    w.byte(0x00);
    let sub = frame.px;
    if (rect.w !== width || rect.h !== height) {
      sub = new Uint8Array(rect.w * rect.h);
      for (let y = 0; y < rect.h; y += 1) {
        const o = (rect.y + y) * width + rect.x;
        sub.set(frame.px.subarray(o, o + rect.w), y * rect.w);
      }
    }
    const minCode = Math.max(2, this.palBits);
    w.byte(minCode);
    const lzw = lzwEncode(sub, minCode);
    for (let off = 0; off < lzw.length; off += 255) {
      const n = Math.min(255, lzw.length - off);
      w.byte(n);
      w.bytes(lzw.subarray(off, off + n));
    }
    w.byte(0x00);
    this.prev = frame.px;
  };

  GifEncoder.prototype.finish = function () {
    if (this.pending) this.writeFrame(this.pending);
    this.pending = null;
    this.w.byte(0x3b);
    return this.w.result();
  };

  // One-shot helper (used by tests): frames = [{ data, delayMs }]
  function encodeGif({ width, height, frames, loop, transparent, matte }) {
    const m = hexToRgb(matte || '#ffffff');
    const copies = frames.map(f => {
      const d = new Uint8ClampedArray(f.data);
      flattenInPlace(d, m);
      return d;
    });
    const palette = buildPalette(copies, transparent ? 255 : 256, transparent ? 128 : null);
    const enc = new GifEncoder({ width, height, palette, loop, transparent, matte });
    copies.forEach((d, i) => enc.addFrame(d, frames[i].delayMs));
    return enc.finish();
  }

  function equalBytes(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
    return true;
  }

  function diffRect(a, b, width, height) {
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y += 1) {
      const row = y * width;
      for (let x = 0; x < width; x += 1) {
        if (a[row + x] !== b[row + x]) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return null;
    return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }

  // GIF LZW (variable code size, clear at 4096), same scheme as omggif.
  function lzwEncode(indices, minCodeSize) {
    const out = new ByteWriter();
    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;
    let nextCode = eoiCode + 1;
    let codeSize = minCodeSize + 1;
    let cur = 0;
    let curShift = 0;
    let table = new Map();

    const emit = code => {
      cur |= code << curShift;
      curShift += codeSize;
      while (curShift >= 8) {
        out.byte(cur & 0xff);
        cur >>>= 8;
        curShift -= 8;
      }
    };

    emit(clearCode);
    if (!indices.length) {
      emit(eoiCode);
      if (curShift > 0) out.byte(cur & 0xff);
      return out.result();
    }
    let ib = indices[0];
    for (let i = 1; i < indices.length; i += 1) {
      const k = indices[i];
      const key = (ib << 8) | k;
      const found = table.get(key);
      if (found === undefined) {
        emit(ib);
        if (nextCode === 4096) {
          emit(clearCode);
          nextCode = eoiCode + 1;
          codeSize = minCodeSize + 1;
          table = new Map();
        } else {
          if (nextCode >= (1 << codeSize)) codeSize += 1;
          table.set(key, nextCode);
          nextCode += 1;
        }
        ib = k;
      } else {
        ib = found;
      }
    }
    emit(ib);
    emit(eoiCode);
    if (curShift > 0) out.byte(cur & 0xff);
    return out.result();
  }

  function ByteWriter() {
    this.buf = new Uint8Array(1 << 16);
    this.len = 0;
  }
  ByteWriter.prototype.ensure = function (n) {
    if (this.len + n <= this.buf.length) return;
    let size = this.buf.length * 2;
    while (size < this.len + n) size *= 2;
    const next = new Uint8Array(size);
    next.set(this.buf.subarray(0, this.len));
    this.buf = next;
  };
  ByteWriter.prototype.byte = function (b) { this.ensure(1); this.buf[this.len++] = b & 0xff; };
  ByteWriter.prototype.u16 = function (v) { this.byte(v & 0xff); this.byte((v >> 8) & 0xff); };
  ByteWriter.prototype.u24 = function (v) { this.byte(v & 0xff); this.byte((v >> 8) & 0xff); this.byte((v >> 16) & 0xff); };
  ByteWriter.prototype.u32 = function (v) { this.u16(v & 0xffff); this.u16((v >>> 16) & 0xffff); };
  ByteWriter.prototype.str = function (s) { for (let i = 0; i < s.length; i += 1) this.byte(s.charCodeAt(i)); };
  ByteWriter.prototype.bytes = function (arr) { this.ensure(arr.length); this.buf.set(arr, this.len); this.len += arr.length; };
  ByteWriter.prototype.result = function () { return this.buf.slice(0, this.len); };

  /* ------------------------------------------------------------------ */
  /* Animated WebP muxer (wraps still WebPs from canvas.toBlob)          */
  /* ------------------------------------------------------------------ */

  function readChunks(bytes) {
    const str = (o, n) => String.fromCharCode.apply(null, bytes.subarray(o, o + n));
    if (str(0, 4) !== 'RIFF' || str(8, 4) !== 'WEBP') throw new Error('Not a WebP file');
    const chunks = [];
    let off = 12;
    while (off + 8 <= bytes.length) {
      const id = str(off, 4);
      const size = bytes[off + 4] | (bytes[off + 5] << 8) | (bytes[off + 6] << 16) | (bytes[off + 7] << 24);
      chunks.push({ id, data: bytes.subarray(off + 8, off + 8 + size) });
      off += 8 + size + (size & 1);
    }
    return chunks;
  }

  // frames: [{ webp: Uint8Array (a still WebP), delayMs }]
  function muxAnimatedWebp({ width, height, frames, loop, hasAlpha }) {
    const w = new ByteWriter();
    const chunk = (id, writeBody) => {
      const body = new ByteWriter();
      writeBody(body);
      const data = body.result();
      w.str(id);
      w.u32(data.length);
      w.bytes(data);
      if (data.length & 1) w.byte(0);
    };
    w.str('RIFF'); w.u32(0); w.str('WEBP');
    chunk('VP8X', b => {
      b.byte(0x02 | (hasAlpha ? 0x10 : 0)); b.byte(0); b.byte(0); b.byte(0);
      b.u24(width - 1); b.u24(height - 1);
    });
    chunk('ANIM', b => { b.u32(0); b.u16(loop ? 0 : 1); });
    frames.forEach(f => {
      const parts = readChunks(f.webp).filter(c => c.id === 'ALPH' || c.id === 'VP8 ' || c.id === 'VP8L');
      chunk('ANMF', b => {
        b.u24(0); b.u24(0); b.u24(width - 1); b.u24(height - 1);
        b.u24(Math.max(1, Math.round(f.delayMs)));
        b.byte(0x02); // do not blend; no dispose (full frames)
        parts.forEach(p => {
          b.str(p.id); b.u32(p.data.length); b.bytes(p.data);
          if (p.data.length & 1) b.byte(0);
        });
      });
    });
    const out = w.result();
    const size = out.length - 8;
    out[4] = size & 0xff; out[5] = (size >> 8) & 0xff; out[6] = (size >> 16) & 0xff; out[7] = (size >>> 24) & 0xff;
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Misc                                                                */
  /* ------------------------------------------------------------------ */

  function altText(state) {
    const theme = resolveTheme(state);
    const steps = resolveSteps(state, theme);
    return `Animated ${theme.name}-style thinking indicator cycling through: ${steps.join(', ')}.`;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB';
    return (n / 1024 / 1024).toFixed(1) + ' MB';
  }

  const VERB_LIST = CLAUDE_CODE_VERBS.concat(EXTRA_VERBS);

  const api = {
    FONT_SANS, FONT_MONO, SIZE_PRESETS, TRANSITIONS, FPS_OPTIONS, FORMATS,
    THEMES, THEME_MAP, DEFAULT_STATE, CLAUDE_CODE_VERBS, EXTRA_VERBS, VERB_LIST,
    sanitizeSteps, normalizeState, diffState, encodeShareHash, decodeShareHash,
    pickVerbs, mulberry32, resolveTheme, resolveScheme, resolveSize, resolveDisplay, resolveSteps,
    timeline, getStepState, wrapText, splitWord, computeLayout, renderFrame, frameTimes,
    PaletteBuilder, GifEncoder, buildPalette, encodeGif, lzwEncode, hexToRgb, muxAnimatedWebp, readChunks, altText, formatBytes, meta
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ThinkingGif = api;
})(typeof window !== 'undefined' ? window : globalThis);
