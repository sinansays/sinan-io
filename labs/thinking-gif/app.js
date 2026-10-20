(function () {
  'use strict';

  const TG = window.ThinkingGif;
  if (!TG) return;

  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'thinkingTrace.v2';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- state ---------------- */

  let state = loadInitialState();
  let view = /(^|[#&])edit\b/.test(location.hash) || /(^|[#&])s=/.test(location.hash) ? 'editor' : 'grid';
  let playing = !reduceMotion;
  let startTime = performance.now();
  let pausedAt = 0;
  let exporting = false;
  let lastResultUrl = null;
  const layoutCache = new Map();

  function loadInitialState() {
    const fromHash = TG.decodeShareHash(location.hash);
    if (fromHash) return fromHash;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return TG.normalizeState(JSON.parse(saved));
    } catch (e) { /* storage unavailable or corrupt: use defaults */ }
    return TG.normalizeState({});
  }

  let saveTimer = null;
  function commit(patch, opts) {
    state = TG.normalizeState(Object.assign({}, state, patch));
    layoutCache.clear();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
      if (view === 'editor') history.replaceState(null, '', shareHash());
    }, 250);
    if (!opts || opts.sync !== false) syncControls();
    if (opts && opts.restart) restart();
  }

  function shareHash() {
    const h = TG.encodeShareHash(state);
    return '#edit' + (h ? '&' + h : '');
  }

  function restart() {
    startTime = performance.now();
    pausedAt = 0;
  }

  function now() {
    return playing ? performance.now() - startTime : pausedAt;
  }

  /* ---------------- fonts ---------------- */

  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all([
        document.fonts.load('400 20px Inter'),
        document.fonts.load('600 20px Inter'),
        document.fonts.load('400 20px "JetBrains Mono"'),
        document.fonts.load('600 20px "JetBrains Mono"')
      ]).catch(() => null)
    : Promise.resolve();
  fontsReady.then(() => layoutCache.clear());

  /* ---------------- rendering helpers ---------------- */

  function layoutFor(ctx, s) {
    const key = JSON.stringify([s.theme, s.scheme, s.steps, s.seed, s.verbCount, s.size, s.textScale, s.meta, s.finish, s.stepMs, s.transMs, s.transition, s.loop, s.finishMs]);
    let L = layoutCache.get(key);
    if (!L) {
      const theme = TG.resolveTheme(s);
      const steps = TG.resolveSteps(s, theme);
      const hasDone = s.finish && typeof theme.done === 'function' && steps.length > 0;
      const doneRow = hasDone ? theme.done(TG.meta(TG.timeline(steps.length, s, false).duration)) : null;
      L = { steps, layout: TG.computeLayout(ctx, s, theme, steps, doneRow && doneRow.text) };
      layoutCache.set(key, L);
    }
    return L;
  }

  // Size a canvas to its CSS box × devicePixelRatio, keeping the preset's aspect.
  function fitCanvas(canvas, logicalW, logicalH, boxW, boxH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scale = Math.min(boxW / logicalW, boxH / logicalH);
    const cssW = Math.max(1, Math.floor(logicalW * scale));
    const cssH = Math.max(1, Math.floor(logicalH * scale));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    return pxW / logicalW;
  }

  function draw(canvas, s, t, scale) {
    const ctx = canvas.getContext('2d');
    const L = layoutFor(ctx, s);
    TG.renderFrame(ctx, t, s, { layout: L.layout, steps: L.steps, scale });
  }

  /* ---------------- grid view ---------------- */

  const grid = $('grid');
  const tiles = TG.THEMES.map(theme => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tile';
    btn.setAttribute('role', 'listitem');
    btn.dataset.theme = theme.id;
    btn.setAttribute('aria-label', `Edit the ${theme.name} style`);
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 270;
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.innerHTML = `<b></b><span></span>`;
    cap.querySelector('b').textContent = theme.name;
    cap.querySelector('span').textContent = theme.group;
    btn.append(canvas, cap);
    btn.addEventListener('click', () => {
      // Opening a style resets the colour mode so each app shows in its native look.
      commit({ theme: theme.id, scheme: 'auto', display: 'auto' });
      setView('editor', true);
    });
    grid.appendChild(btn);
    return { theme, btn, canvas, visible: true };
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const tile = tiles.find(t => t.btn === e.target);
        if (tile) tile.visible = e.isIntersecting;
      });
    });
    tiles.forEach(t => io.observe(t.btn));
  }

  function tileState(theme) {
    return TG.normalizeState(Object.assign({}, state, {
      theme: theme.id, scheme: 'auto', size: 'chat', bg: 'theme', display: 'auto', align: 'center', textScale: 1
    }));
  }

  const quick = $('quick-line');
  quick.addEventListener('input', () => {
    const v = quick.value.trim();
    commit({ steps: v ? [v] : null }, { restart: true });
  });
  $('quick-clear').addEventListener('click', () => {
    quick.value = '';
    commit({ steps: null }, { restart: true });
    quick.focus();
  });

  /* ---------------- editor view ---------------- */

  const preview = $('preview');
  const stage = $('stage');
  let previewScale = 1;

  function sizePreview() {
    const size = TG.resolveSize(state);
    const rect = stage.getBoundingClientRect();
    const styles = getComputedStyle(stage);
    const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    previewScale = fitCanvas(preview, size.w, size.h, Math.max(40, rect.width - padX), Math.max(40, rect.height - padY - 24));
    $('dims').textContent = `${size.w} × ${size.h}`;
  }
  window.addEventListener('resize', () => { if (view === 'editor') sizePreview(); else sizeTiles(); });

  function sizeTiles() {
    tiles.forEach(t => {
      const w = t.btn.clientWidth || 300;
      fitCanvas(t.canvas, 480, 270, w, w * 9 / 16);
    });
  }

  // theme pills
  const pills = $('theme-pills');
  TG.THEMES.forEach(theme => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'pill';
    b.dataset.theme = theme.id;
    b.textContent = theme.name;
    b.addEventListener('click', () => selectTheme(theme.id));
    pills.appendChild(b);
  });
  function selectTheme(id) {
    commit({ theme: id, scheme: 'auto', display: 'auto' }, { restart: true });
    sizePreview();
    const pill = pills.querySelector(`[data-theme="${id}"]`);
    if (pill && pill.scrollIntoView) pill.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  function cycleTheme(dir) {
    const i = TG.THEMES.findIndex(t => t.id === state.theme);
    const next = TG.THEMES[(i + dir + TG.THEMES.length) % TG.THEMES.length];
    selectTheme(next.id);
  }
  $('prev-theme').addEventListener('click', () => cycleTheme(-1));
  $('next-theme').addEventListener('click', () => cycleTheme(1));

  // tabs
  const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));
  function selectTab(tab) {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      e.stopPropagation();
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // steps list
  const stepsEl = $('steps');
  function renderSteps() {
    const theme = TG.resolveTheme(state);
    const list = state.steps ? state.steps : TG.resolveSteps(state, theme);
    $('steps-source').textContent = state.steps ? 'your lines' : `${theme.name} defaults`;
    stepsEl.innerHTML = '';
    list.forEach((text, i) => {
      const li = document.createElement('li');
      const n = document.createElement('span');
      n.className = 'n';
      n.textContent = i + 1;
      const input = document.createElement('input');
      input.className = 'field';
      input.type = 'text';
      input.maxLength = 140;
      input.value = text;
      input.setAttribute('aria-label', `Line ${i + 1}`);
      input.addEventListener('input', () => {
        const next = materialize();
        next[i] = input.value;
        commit({ steps: next }, { sync: false, restart: false });
        $('steps-source').textContent = 'your lines';
      });
      input.addEventListener('change', () => renderSteps());
      const up = iconButton('↑', `Move line ${i + 1} up`, i === 0, () => move(i, -1));
      const down = iconButton('↓', `Move line ${i + 1} down`, i === list.length - 1, () => move(i, 1));
      const del = iconButton('✕', `Remove line ${i + 1}`, list.length <= 1, () => {
        const next = materialize();
        next.splice(i, 1);
        commit({ steps: next }, { restart: true });
      });
      li.append(n, input, up, down, del);
      stepsEl.appendChild(li);
    });
    $('add-step').disabled = list.length >= 12;
  }
  // The visible list as editable strings (theme ellipses removed, so they aren't doubled).
  function materialize() {
    if (state.steps) return state.steps.slice();
    const theme = TG.resolveTheme(state);
    const raw = theme.randomVerbs ? TG.pickVerbs(state.seed, state.verbCount) : theme.steps.slice();
    return raw;
  }
  function move(i, dir) {
    const next = materialize();
    const j = i + dir;
    [next[i], next[j]] = [next[j], next[i]];
    commit({ steps: next }, { restart: true });
    const inputs = stepsEl.querySelectorAll('input');
    if (inputs[j]) inputs[j].focus();
  }
  function iconButton(label, aria, disabled, fn) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'icon-btn';
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.disabled = disabled;
    b.addEventListener('click', fn);
    return b;
  }
  $('add-step').addEventListener('click', () => {
    const next = materialize();
    next.push('New line…');
    commit({ steps: next }, { restart: true });
    const inputs = stepsEl.querySelectorAll('input');
    const last = inputs[inputs.length - 1];
    if (last) { last.focus(); last.select(); }
  });
  function rerollVerbs() {
    const seed = Math.floor(Math.random() * 2147483646);
    const theme = TG.resolveTheme(state);
    const count = state.steps ? Math.min(8, Math.max(1, state.steps.length)) : state.verbCount;
    if (theme.randomVerbs && !state.steps) commit({ seed }, { restart: true });
    else commit({ steps: TG.pickVerbs(seed, count).map(v => v + '…'), seed }, { restart: true });
  }
  $('random-verbs').addEventListener('click', rerollVerbs);
  $('reset-steps').addEventListener('click', () => commit({ steps: null }, { restart: true }));

  // segmented controls
  document.querySelectorAll('.seg[data-key]').forEach(seg => {
    const key = seg.dataset.key;
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-v]');
      if (!b || b.disabled) return;
      const v = key === 'fps' ? Number(b.dataset.v) : b.dataset.v;
      commit({ [key]: v }, { restart: ['transition', 'display'].includes(key) });
      if (key === 'format') $('result').hidden = true;
    });
  });

  // ranges
  const ranges = {
    stepMs: v => (v / 1000).toFixed(1) + 's',
    transMs: v => (v / 1000).toFixed(2) + 's',
    shimmerMs: v => (v / 1000).toFixed(1) + 's',
    shimmerStrength: v => Math.round(v * 100) + '%',
    finishMs: v => (v / 1000).toFixed(1) + 's',
    textScale: v => Math.round(v * 100) + '%',
    mp4Repeats: v => v + '×'
  };
  Object.keys(ranges).forEach(key => {
    const input = $(key);
    input.addEventListener('input', () => {
      $(key + '-out').textContent = ranges[key](Number(input.value));
      commit({ [key]: Number(input.value) }, { sync: false, restart: ['stepMs', 'transMs', 'finishMs'].includes(key) });
    });
  });

  // checkboxes
  ['finish', 'meta', 'shimmer', 'loop'].forEach(key => {
    $(key).addEventListener('change', e => commit({ [key]: e.target.checked }, { restart: true }));
  });

  $('bgColor').addEventListener('input', e => commit({ bgColor: e.target.value }, { sync: false }));
  $('matte').addEventListener('input', e => commit({ matte: e.target.value }, { sync: false }));
  document.querySelectorAll('[data-matte]').forEach(b => b.addEventListener('click', () => commit({ matte: b.dataset.matte })));

  // sizes
  const sizesEl = $('sizes');
  TG.SIZE_PRESETS.forEach(p => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'size';
    b.dataset.size = p.id;
    const k = 18 / Math.max(p.w, p.h);
    b.innerHTML = `<span class="shape" style="width:${Math.max(6, p.w * k)}px;height:${Math.max(6, p.h * k)}px"></span><b></b><small></small>`;
    b.querySelector('b').textContent = `${p.label} · ${p.note}`;
    b.querySelector('small').textContent = `${p.w}×${p.h}`;
    b.addEventListener('click', () => {
      commit({ size: p.id }, { restart: false });
      sizePreview();
    });
    sizesEl.appendChild(b);
  });

  // play/pause
  $('play').addEventListener('click', () => setPlaying(!playing));
  function setPlaying(on) {
    if (on === playing) return;
    if (on) startTime = performance.now() - pausedAt;
    else pausedAt = performance.now() - startTime;
    playing = on;
    $('play').textContent = on ? 'Pause' : 'Play';
    $('play').setAttribute('aria-pressed', String(on));
  }
  if (!playing) {
    pausedAt = 700;
    $('play').textContent = 'Play';
    $('play').setAttribute('aria-pressed', 'false');
  }

  /* ---------------- capability detection ---------------- */

  const support = {
    webp: (() => {
      try {
        const c = document.createElement('canvas');
        c.width = c.height = 2;
        return c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch (e) { return false; }
    })(),
    webcodecs: typeof window.VideoEncoder === 'function' && typeof window.VideoFrame === 'function',
    recorder: typeof window.MediaRecorder === 'function' && !!HTMLCanvasElement.prototype.captureStream
  };

  /* ---------------- syncing UI from state ---------------- */

  function syncControls() {
    const theme = TG.resolveTheme(state);
    document.querySelectorAll('.seg[data-key]').forEach(seg => {
      const v = String(state[seg.dataset.key]);
      seg.querySelectorAll('button[data-v]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
    });
    Object.keys(ranges).forEach(key => {
      $(key).value = state[key];
      $(key + '-out').textContent = ranges[key](state[key]);
    });
    ['finish', 'meta', 'shimmer', 'loop'].forEach(k => { $(k).checked = state[k]; });
    $('meta').disabled = typeof theme.tail !== 'function';
    $('meta').closest('.toggle').style.opacity = typeof theme.tail === 'function' ? '' : '.45';
    $('finish').disabled = typeof theme.done !== 'function';
    $('finish').closest('.toggle').style.opacity = typeof theme.done === 'function' ? '' : '.45';
    $('bgColor').value = state.bgColor;
    $('bg-custom').hidden = state.bg !== 'custom';
    $('bg-hint').hidden = state.bg !== 'transparent';
    stage.classList.toggle('checker', state.bg === 'transparent');
    const matte = state.matte === 'auto' ? TG.resolveScheme(state).bg : state.matte;
    $('matte').value = matte;
    $('matte-opts').hidden = !(state.format === 'gif' && state.bg === 'transparent');
    $('mp4-opts').hidden = state.format !== 'mp4';
    sizesEl.querySelectorAll('.size').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === state.size)));
    pills.querySelectorAll('.pill').forEach(p => p.setAttribute('aria-pressed', String(p.dataset.theme === state.theme)));
    tiles.forEach(t => t.btn.classList.toggle('current', t.theme.id === state.theme));

    // format availability
    const fmt = $('format');
    fmt.querySelector('[data-v="webp"]').disabled = !support.webp;
    fmt.querySelector('[data-v="mp4"]').disabled = !support.webcodecs && !support.recorder;
    const hints = {
      gif: 'Plays everywhere. Largest file, 256 colours, on/off transparency.',
      mp4: support.webcodecs
        ? 'Smallest and sharpest. Best for X, LinkedIn and Slack uploads. No transparency.'
        : 'This browser records the video in real time, as MP4 or WebM depending on support.',
      webp: support.webp
        ? 'Animated WebP: smaller than GIF, full colour, smooth transparency. Discord, Telegram and browsers play it.'
        : 'This browser cannot encode WebP. Try Chrome, Edge or Firefox.'
    };
    $('format-hint').textContent = hints[state.format];
    $('export').textContent = exporting ? 'Exporting…' : `Export ${state.format.toUpperCase()}`;

    $('random-verbs').hidden = false;
    $('verbs-hint').hidden = !theme.randomVerbs;
    $('reset-steps').disabled = !state.steps;
    if (document.activeElement !== quick) {
      quick.value = state.steps && state.steps.length === 1 ? state.steps[0] : '';
      quick.placeholder = state.steps && state.steps.length > 1
        ? `${state.steps.length} custom lines (editor)`
        : "Leave blank to use each style's defaults";
    }
    $('quick-clear').hidden = !state.steps;
    if (!stepsEl.contains(document.activeElement)) renderSteps();
    preview.setAttribute('aria-label', TG.altText(state));
  }

  /* ---------------- views ---------------- */

  function setView(v, push) {
    view = v;
    $('grid-view').hidden = v !== 'grid';
    $('editor-view').hidden = v !== 'editor';
    $('to-grid').hidden = v !== 'editor';
    if (push) history.pushState(null, '', v === 'editor' ? shareHash() : location.pathname + location.search);
    if (v === 'editor') {
      sizePreview();
      const pill = pills.querySelector(`[aria-pressed="true"]`);
      if (pill && pill.scrollIntoView) pill.scrollIntoView({ block: 'nearest', inline: 'center' });
    } else {
      sizeTiles();
    }
    restart();
    window.scrollTo(0, 0);
  }
  $('to-grid').addEventListener('click', () => setView('grid', true));
  window.addEventListener('popstate', () => {
    const fromHash = TG.decodeShareHash(location.hash);
    if (fromHash) { state = fromHash; layoutCache.clear(); syncControls(); }
    setView(/(^|[#&])(edit|s=)/.test(location.hash) ? 'editor' : 'grid', false);
  });

  /* ---------------- share ---------------- */

  $('share').addEventListener('click', async () => {
    const url = location.origin + location.pathname + shareHash();
    history.replaceState(null, '', shareHash());
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied. It opens with these exact settings.');
    } catch (e) {
      window.prompt('Copy this link:', url);
    }
  });

  let toastTimer = null;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------------- keyboard ---------------- */

  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable)) return;
    if (view === 'editor') {
      if (e.key === 'ArrowRight') { cycleTheme(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { cycleTheme(-1); e.preventDefault(); }
      else if (e.key === 'Escape') setView('grid', true);
      else if (e.key === 'r' || e.key === 'R') rerollVerbs();
      else if (e.key === 'e' || e.key === 'E') runExport();
      else if (e.key === ' ' && e.target === document.body) { setPlaying(!playing); e.preventDefault(); }
    }
  });

  /* ---------------- animation loop ---------------- */

  function loop() {
    const t = now();
    try {
      if (view === 'editor') {
        draw(preview, state, t, previewScale);
      } else {
        tiles.forEach(tile => {
          if (!tile.visible) return;
          const s = tileState(tile.theme);
          const scale = tile.canvas.width / 480;
          draw(tile.canvas, s, t, scale);
        });
      }
    } catch (err) {
      // never let one bad frame kill the loop
      console.error(err);
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- export ---------------- */

  $('export').addEventListener('click', runExport);

  function setProgress(p, msg) {
    $('progress').style.width = Math.round(p * 100) + '%';
    if (msg) $('status').textContent = msg;
  }
  const yieldFrame = () => new Promise(r => setTimeout(r, 0));

  async function runExport() {
    if (exporting) return;
    selectTab($('tab-export'));
    exporting = true;
    $('export').disabled = true;
    syncControls();
    $('result').hidden = true;
    await fontsReady;
    const s = state;
    const theme = TG.resolveTheme(s);
    const size = TG.resolveSize(s);
    const steps = TG.resolveSteps(s, theme);
    const plan = TG.frameTimes(s, steps, theme);
    const canvas = document.createElement('canvas');
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext('2d', { willReadFrequently: s.format === 'gif' });
    const L = layoutFor(ctx, s);
    const renderAt = (t, forceOpaque) => {
      const st = forceOpaque && s.bg === 'transparent' ? Object.assign({}, s, { bg: 'theme' }) : s;
      TG.renderFrame(ctx, t, st, { layout: L.layout, steps: L.steps, scale: 1 });
    };
    const started = performance.now();
    try {
      let blob;
      if (s.format === 'gif') blob = await exportGif(ctx, renderAt, plan, s, size);
      else if (s.format === 'webp') blob = await exportWebp(canvas, ctx, renderAt, plan, s, size);
      else blob = await exportMp4(canvas, renderAt, plan, s, size);
      showResult(blob, s, size, plan, performance.now() - started);
    } catch (err) {
      console.error(err);
      setProgress(0, `Export failed: ${err && err.message ? err.message : err}`);
    } finally {
      exporting = false;
      $('export').disabled = false;
      syncControls();
    }
  }

  async function exportGif(ctx, renderAt, plan, s, size) {
    const transparent = s.bg === 'transparent';
    const matte = s.matte === 'auto' ? TG.resolveScheme(s).bg : s.matte;
    const pixels = size.w * size.h;
    // Pass 1: colour histogram (subsampled for big frames)
    const pb = new TG.PaletteBuilder(transparent ? 128 : null);
    const stride = pixels > 400000 ? 3 : 1;
    const m = TG.hexToRgb(matte);
    for (let i = 0; i < plan.times.length; i += 1) {
      renderAt(plan.times[i]);
      const d = ctx.getImageData(0, 0, size.w, size.h).data;
      flatten(d, m);
      pb.add(d, stride);
      if (i % 4 === 0) { setProgress(0.3 * i / plan.times.length, 'Choosing colours…'); await yieldFrame(); }
    }
    const enc = new TG.GifEncoder({ width: size.w, height: size.h, palette: pb.build(transparent ? 255 : 256), loop: s.loop, transparent, matte });
    // Pass 2: encode
    for (let i = 0; i < plan.times.length; i += 1) {
      renderAt(plan.times[i]);
      enc.addFrame(ctx.getImageData(0, 0, size.w, size.h).data, plan.frameMs);
      if (i % 2 === 0) { setProgress(0.3 + 0.7 * i / plan.times.length, `Encoding GIF… frame ${i + 1} of ${plan.times.length}`); await yieldFrame(); }
    }
    return new Blob([enc.finish()], { type: 'image/gif' });
  }

  function flatten(d, m) {
    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a === 255) continue;
      const f = a / 255;
      d[i] = d[i] * f + m[0] * (1 - f);
      d[i + 1] = d[i + 1] * f + m[1] * (1 - f);
      d[i + 2] = d[i + 2] * f + m[2] * (1 - f);
    }
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Canvas encoding failed'))), type, quality));
  }

  async function exportWebp(canvas, ctx, renderAt, plan, s, size) {
    const frames = [];
    let prev = null;
    for (let i = 0; i < plan.times.length; i += 1) {
      renderAt(plan.times[i]);
      const data = ctx.getImageData(0, 0, size.w, size.h).data;
      if (prev && sameData(prev, data)) {
        frames[frames.length - 1].delayMs += plan.frameMs;
      } else {
        const blob = await canvasToBlob(canvas, 'image/webp', 0.92);
        frames.push({ webp: new Uint8Array(await blob.arrayBuffer()), delayMs: plan.frameMs });
        prev = data;
      }
      if (i % 2 === 0) { setProgress(i / plan.times.length, `Encoding WebP… frame ${i + 1} of ${plan.times.length}`); await yieldFrame(); }
    }
    // Round durations cumulatively so the loop length stays exact.
    let clock = 0;
    frames.forEach(f => {
      const start = Math.round(clock);
      clock += f.delayMs;
      f.delayMs = Math.round(clock) - start;
    });
    const bytes = TG.muxAnimatedWebp({ width: size.w, height: size.h, frames, loop: s.loop, hasAlpha: s.bg === 'transparent' });
    return new Blob([bytes], { type: 'image/webp' });
  }

  function sameData(a, b) {
    if (a.length !== b.length) return false;
    // compare as 32-bit words for speed
    const A = new Uint32Array(a.buffer, a.byteOffset, a.length >> 2);
    const B = new Uint32Array(b.buffer, b.byteOffset, b.length >> 2);
    for (let i = 0; i < A.length; i += 1) if (A[i] !== B[i]) return false;
    return true;
  }

  async function pickAvcCodec(w, h, fps, bitrate) {
    const candidates = ['avc1.640034', 'avc1.640028', 'avc1.4d0034', 'avc1.4d0028', 'avc1.42e01f', 'avc1.42001f'];
    for (const codec of candidates) {
      try {
        const cfg = { codec, width: w, height: h, bitrate, framerate: fps, avc: { format: 'avc' } };
        const r = await VideoEncoder.isConfigSupported(cfg);
        if (r.supported) return cfg;
      } catch (e) { /* try next */ }
    }
    // Browsers without an H.264 encoder (e.g. Chromium builds): VP9 in an MP4 container.
    for (const codec of ['vp09.00.31.08', 'vp09.00.10.08']) {
      try {
        const cfg = { codec, width: w, height: h, bitrate, framerate: fps };
        const r = await VideoEncoder.isConfigSupported(cfg);
        if (r.supported) return cfg;
      } catch (e) { /* try next */ }
    }
    return null;
  }

  async function exportMp4(canvas, renderAt, plan, s, size) {
    const repeats = s.loop ? s.mp4Repeats : 1;
    const total = plan.times.length * repeats;
    const bitrate = Math.max(600000, Math.min(12000000, Math.round(size.w * size.h * s.fps * 0.12)));
    if (support.webcodecs && window.Mp4Muxer) {
      const cfg = await pickAvcCodec(size.w, size.h, s.fps, bitrate);
      if (cfg) {
        const muxer = new Mp4Muxer.Muxer({
          target: new Mp4Muxer.ArrayBufferTarget(),
          video: { codec: cfg.codec.indexOf('vp09') === 0 ? 'vp9' : 'avc', width: size.w, height: size.h, frameRate: s.fps },
          fastStart: 'in-memory'
        });
        let encodeError = null;
        const encoder = new VideoEncoder({
          output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
          error: e => { encodeError = e; }
        });
        encoder.configure(cfg);
        const frameUs = Math.round(1e6 / s.fps);
        for (let i = 0; i < total; i += 1) {
          if (encodeError) throw encodeError;
          renderAt(plan.times[i % plan.times.length], true);
          const frame = new VideoFrame(canvas, { timestamp: i * frameUs, duration: frameUs });
          encoder.encode(frame, { keyFrame: i % (s.fps * 2) === 0 });
          frame.close();
          if (encoder.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
          if (i % 3 === 0) { setProgress(i / total, `Encoding MP4… frame ${i + 1} of ${total}`); await yieldFrame(); }
        }
        await encoder.flush();
        encoder.close();
        if (encodeError) throw encodeError;
        muxer.finalize();
        return new Blob([muxer.target.buffer], { type: 'video/mp4' });
      }
    }
    return recordRealtime(canvas, renderAt, plan, s, repeats);
  }

  // Fallback for browsers without WebCodecs: record the canvas in real time.
  async function recordRealtime(canvas, renderAt, plan, s, repeats) {
    const types = ['video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'];
    const mime = types.find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
    renderAt(0, true);
    const stream = canvas.captureStream(s.fps);
    const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 6000000 } : undefined);
    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const done = new Promise(r => { rec.onstop = r; });
    rec.start();
    const duration = plan.duration * repeats;
    const t0 = performance.now();
    await new Promise(resolve => {
      const tick = () => {
        const t = performance.now() - t0;
        renderAt(t % plan.duration, true);
        setProgress(Math.min(1, t / duration), `Recording video in real time… ${Math.ceil((duration - t) / 1000)}s left`);
        if (t >= duration) resolve();
        else requestAnimationFrame(tick);
      };
      tick();
    });
    rec.stop();
    await done;
    return new Blob(chunks, { type: (rec.mimeType || mime || 'video/webm').split(';')[0] });
  }

  function showResult(blob, s, size, plan, elapsed) {
    if (lastResultUrl) URL.revokeObjectURL(lastResultUrl);
    const url = URL.createObjectURL(blob);
    lastResultUrl = url;
    const ext = blob.type === 'video/webm' ? 'webm' : blob.type.split('/')[1];
    const theme = TG.resolveTheme(s);
    const name = `thinking-${theme.id}-${size.w}x${size.h}.${ext}`;
    const media = $('result-media');
    media.innerHTML = '';
    let el;
    if (blob.type.indexOf('video/') === 0) {
      el = document.createElement('video');
      el.src = url; el.muted = true; el.loop = true; el.autoplay = true; el.playsInline = true; el.controls = true;
    } else {
      el = document.createElement('img');
      el.src = url;
      el.alt = TG.altText(s);
    }
    media.appendChild(el);
    const dl = $('download');
    dl.href = url;
    dl.download = name;
    dl.textContent = `Download .${ext}`;
    const meta = $('result-meta');
    meta.innerHTML = '';
    const add = (text, cls) => {
      const span = document.createElement('span');
      span.textContent = text;
      if (cls) span.className = cls;
      meta.appendChild(span);
    };
    add(TG.formatBytes(blob.size));
    add(`${size.w}×${size.h}`);
    add(`${(plan.duration / 1000).toFixed(1)}s loop`);
    if (s.size === 'emoji') {
      add(blob.size <= 128 * 1024 ? '✓ fits Slack emoji (128 KB)' : '✗ over Slack’s 128 KB emoji limit', blob.size <= 128 * 1024 ? 'ok' : 'warn');
      add(blob.size <= 256 * 1024 ? '✓ fits Discord emoji (256 KB)' : '✗ over Discord’s 256 KB emoji limit', blob.size <= 256 * 1024 ? 'ok' : 'warn');
    } else if (s.format === 'gif' && blob.size > 15 * 1024 * 1024) {
      add('Large GIF: try MP4, a smaller size, or 15 fps', 'warn');
    }
    if (ext === 'webm') add('Saved as WebM (this browser cannot record MP4)', 'warn');
    $('result').hidden = false;
    setProgress(1, `Done in ${(elapsed / 1000).toFixed(1)}s.`);
    setTimeout(() => setProgress(0), 600);
  }

  $('copy-alt').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(TG.altText(state));
      toast('Alt text copied');
    } catch (e) {
      window.prompt('Alt text:', TG.altText(state));
    }
  });

  /* ---------------- boot ---------------- */

  syncControls();
  setView(view, false);
  fontsReady.then(() => { if (view === 'editor') sizePreview(); else sizeTiles(); });
  requestAnimationFrame(loop);
})();
