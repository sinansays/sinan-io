(function() {
  'use strict';

  const {
    DEFAULT_STEPS,
    DEFAULT_CONFIG,
    FONT_STACK,
    sanitizeSteps,
    mergeConfig,
    renderFrame,
    encodeGif
  } = window.ThinkingGif;

  const selectors = {
    canvas: document.getElementById('thinking-gif-canvas'),
    stepsList: document.getElementById('steps-list'),
    addStep: document.getElementById('add-step'),
    stepDuration: document.getElementById('step-duration'),
    transitionStyle: document.getElementById('transition-style'),
    transitionMs: document.getElementById('transition-ms'),
    loopToggle: document.getElementById('loop-toggle'),
    loopPause: document.getElementById('loop-pause'),
    themeSelect: document.getElementById('theme-select'),
    fontSize: document.getElementById('font-size'),
    canvasSize: document.getElementById('canvas-size'),
    shimmerIntensity: document.getElementById('shimmer-intensity'),
    shimmerSpeed: document.getElementById('shimmer-speed'),
    displayMode: document.getElementById('display-mode'),
    cursorToggle: document.getElementById('cursor-toggle'),
    cursorStyle: document.getElementById('cursor-style'),
    exportButton: document.getElementById('export-gif'),
    exportStatus: document.getElementById('export-status'),
    previewMeta: document.getElementById('preview-meta'),
    previewPanel: document.querySelector('.thinking-gif-preview')
  };

  if (!selectors.canvas) {
    return;
  }

  const ctx = selectors.canvas.getContext('2d', { alpha: false });
  let state = loadState();
  let animationStart = performance.now();
  let rafId = null;
  let dragId = null;

  ctx.font = `${state.config.fontSize}px ${FONT_STACK}`;

  renderSteps();
  syncControls();
  updateCanvasSize();
  updatePreviewMeta();
  startAnimation();

  selectors.addStep.addEventListener('click', addStep);
  selectors.stepsList.addEventListener('input', onStepInput);
  selectors.stepsList.addEventListener('click', onStepClick);
  selectors.stepsList.addEventListener('blur', onStepBlur, true);
  selectors.stepsList.addEventListener('dragstart', onDragStart);
  selectors.stepsList.addEventListener('dragover', onDragOver);
  selectors.stepsList.addEventListener('drop', onDrop);
  selectors.stepsList.addEventListener('dragend', onDragEnd);

  selectors.stepDuration.addEventListener('input', event => {
    state.config.stepDurationMs = Math.max(300, Number(event.target.value) * 1000);
    persistState();
  });

  selectors.transitionStyle.addEventListener('change', event => {
    state.config.transitionStyle = event.target.value;
    persistState();
  });

  selectors.transitionMs.addEventListener('input', event => {
    state.config.transitionMs = Math.max(120, Number(event.target.value));
    persistState();
  });

  selectors.loopToggle.addEventListener('change', event => {
    state.config.loop = event.target.checked;
    persistState();
  });

  selectors.loopPause.addEventListener('input', event => {
    state.config.loopPauseMs = Math.max(0, Number(event.target.value));
    persistState();
  });

  selectors.themeSelect.addEventListener('change', event => {
    state.config.theme = event.target.value;
    selectors.previewPanel.dataset.theme = state.config.theme;
    persistState();
  });

  selectors.fontSize.addEventListener('change', event => {
    state.config.fontSize = Number(event.target.value);
    persistState();
  });

  selectors.canvasSize.addEventListener('change', event => {
    const [width, height] = event.target.value.split('x').map(Number);
    state.config.width = width;
    state.config.height = height;
    updateCanvasSize();
    updatePreviewMeta();
    persistState();
  });

  selectors.shimmerIntensity.addEventListener('input', event => {
    state.config.shimmer.intensity = Number(event.target.value);
    persistState();
  });

  selectors.shimmerSpeed.addEventListener('input', event => {
    state.config.shimmer.speed = Number(event.target.value);
    persistState();
  });

  selectors.displayMode.addEventListener('change', event => {
    state.config.mode = event.target.value;
    persistState();
  });

  selectors.cursorToggle.addEventListener('change', event => {
    state.config.cursor.enabled = event.target.checked;
    persistState();
  });

  selectors.cursorStyle.addEventListener('change', event => {
    state.config.cursor.style = event.target.value;
    persistState();
  });

  selectors.exportButton.addEventListener('click', exportGif);

  function loadState() {
    const saved = localStorage.getItem('thinkingGifState');
    if (!saved) {
      return { steps: DEFAULT_STEPS.slice(), config: mergeConfig(DEFAULT_CONFIG) };
    }
    try {
      const parsed = JSON.parse(saved);
      const steps = sanitizeSteps(parsed.steps || DEFAULT_STEPS);
      return {
        steps: steps.length ? steps : DEFAULT_STEPS.slice(),
        config: mergeConfig(parsed.config)
      };
    } catch (error) {
      console.warn('Unable to load saved Thinking GIF state.', error);
      return { steps: DEFAULT_STEPS.slice(), config: mergeConfig(DEFAULT_CONFIG) };
    }
  }

  function persistState() {
    const payload = {
      steps: state.steps,
      config: state.config
    };
    localStorage.setItem('thinkingGifState', JSON.stringify(payload));
  }

  function renderSteps() {
    selectors.stepsList.innerHTML = '';
    state.steps.forEach(step => {
      const item = document.createElement('li');
      item.className = 'thinking-gif-step';
      item.dataset.stepId = step.id;
      item.setAttribute('draggable', 'true');

      const handle = document.createElement('button');
      handle.type = 'button';
      handle.className = 'thinking-gif-drag';
      handle.setAttribute('aria-label', 'Drag to reorder');
      handle.textContent = '⋮⋮';

      const input = document.createElement('input');
      input.type = 'text';
      input.value = step.text;
      input.className = 'thinking-gif-step-input';
      input.setAttribute('aria-label', 'Step text');

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'thinking-gif-delete';
      remove.setAttribute('aria-label', 'Delete step');
      remove.textContent = 'Remove';

      item.append(handle, input, remove);
      selectors.stepsList.appendChild(item);
    });
  }

  function syncControls() {
    selectors.stepDuration.value = (state.config.stepDurationMs / 1000).toFixed(1);
    selectors.transitionStyle.value = state.config.transitionStyle;
    selectors.transitionMs.value = state.config.transitionMs;
    selectors.loopToggle.checked = state.config.loop;
    selectors.loopPause.value = state.config.loopPauseMs;
    selectors.themeSelect.value = state.config.theme;
    selectors.fontSize.value = state.config.fontSize;
    selectors.canvasSize.value = `${state.config.width}x${state.config.height}`;
    selectors.shimmerIntensity.value = state.config.shimmer.intensity;
    selectors.shimmerSpeed.value = state.config.shimmer.speed;
    selectors.displayMode.value = state.config.mode;
    selectors.cursorToggle.checked = state.config.cursor.enabled;
    selectors.cursorStyle.value = state.config.cursor.style;
    selectors.previewPanel.dataset.theme = state.config.theme;
  }

  function updateCanvasSize() {
    selectors.canvas.width = state.config.width;
    selectors.canvas.height = state.config.height;
  }

  function updatePreviewMeta() {
    selectors.previewMeta.textContent = `${state.config.width} × ${state.config.height} · ${state.config.fps} FPS`;
  }

  function addStep() {
    const newStep = {
      id: `step-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2)}`,
      text: 'New status…'
    };
    state.steps.push(newStep);
    renderSteps();
    persistState();
    const lastInput = selectors.stepsList.querySelector('li:last-child input');
    if (lastInput) {
      lastInput.focus();
      lastInput.select();
    }
  }

  function onStepInput(event) {
    const input = event.target.closest('.thinking-gif-step-input');
    if (!input) {
      return;
    }
    const item = input.closest('.thinking-gif-step');
    const stepId = item.dataset.stepId;
    const step = state.steps.find(entry => entry.id === stepId);
    if (step) {
      step.text = input.value;
      persistState();
    }
  }

  function onStepBlur(event) {
    const input = event.target.closest('.thinking-gif-step-input');
    if (!input) {
      return;
    }
    if (input.value.trim() === '' && state.steps.length > 1) {
      const item = input.closest('.thinking-gif-step');
      state.steps = state.steps.filter(step => step.id !== item.dataset.stepId);
      renderSteps();
      persistState();
    }
  }

  function onStepClick(event) {
    const removeButton = event.target.closest('.thinking-gif-delete');
    if (removeButton) {
      const item = removeButton.closest('.thinking-gif-step');
      state.steps = state.steps.filter(step => step.id !== item.dataset.stepId);
      if (state.steps.length === 0) {
        state.steps = DEFAULT_STEPS.slice();
      }
      renderSteps();
      persistState();
      return;
    }
  }

  function onDragStart(event) {
    const handle = event.target.closest('.thinking-gif-drag');
    if (!handle) {
      event.preventDefault();
      return;
    }
    const item = handle.closest('.thinking-gif-step');
    dragId = item.dataset.stepId;
    item.classList.add('is-dragging');
    event.dataTransfer.setData('text/plain', dragId);
    event.dataTransfer.effectAllowed = 'move';
  }

  function onDragOver(event) {
    event.preventDefault();
    const target = event.target.closest('.thinking-gif-step');
    if (!target || target.dataset.stepId === dragId) {
      return;
    }
    const bounds = target.getBoundingClientRect();
    const offset = event.clientY - bounds.top;
    const shouldInsertBefore = offset < bounds.height / 2;
    const draggingEl = selectors.stepsList.querySelector('.is-dragging');
    if (!draggingEl) {
      return;
    }
    if (shouldInsertBefore) {
      selectors.stepsList.insertBefore(draggingEl, target);
    } else {
      selectors.stepsList.insertBefore(draggingEl, target.nextSibling);
    }
  }

  function onDrop(event) {
    event.preventDefault();
    const items = Array.from(selectors.stepsList.querySelectorAll('.thinking-gif-step'));
    state.steps = items.map(item => {
      const id = item.dataset.stepId;
      return state.steps.find(step => step.id === id);
    }).filter(Boolean);
    persistState();
  }

  function onDragEnd() {
    dragId = null;
    const draggingEl = selectors.stepsList.querySelector('.is-dragging');
    if (draggingEl) {
      draggingEl.classList.remove('is-dragging');
    }
  }

  function startAnimation() {
    const loop = time => {
      const elapsed = time - animationStart;
      renderFrame(ctx, elapsed, sanitizeSteps(state.steps), state.config);
      rafId = window.requestAnimationFrame(loop);
    };
    rafId = window.requestAnimationFrame(loop);
  }

  async function exportGif() {
    const steps = sanitizeSteps(state.steps);
    if (steps.length === 0) {
      selectors.exportStatus.textContent = 'Add at least one step before exporting.';
      return;
    }

    selectors.exportButton.disabled = true;
    selectors.exportStatus.textContent = 'Rendering frames…';

    const frameDuration = 1000 / state.config.fps;
    const stepSpan = state.config.stepDurationMs + state.config.transitionMs;
    const totalDuration = state.config.loop
      ? stepSpan * steps.length + state.config.loopPauseMs
      : stepSpan * steps.length;
    const frameCount = Math.ceil(totalDuration / frameDuration);

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = state.config.width;
    exportCanvas.height = state.config.height;
    const exportCtx = exportCanvas.getContext('2d', { alpha: false });

    const frames = [];

    for (let i = 0; i < frameCount; i += 1) {
      const frameTime = i * frameDuration;
      renderFrame(exportCtx, frameTime, steps, state.config);
      const imageData = exportCtx.getImageData(0, 0, state.config.width, state.config.height);
      frames.push({ data: imageData.data, delayMs: frameDuration });

      if (i % 5 === 0) {
        const progress = Math.round((i / frameCount) * 100);
        selectors.exportStatus.textContent = `Rendering frames… ${progress}%`;
        await nextTick();
      }
    }

    selectors.exportStatus.textContent = 'Encoding GIF…';
    await nextTick();

    const gifBytes = encodeGif({
      width: state.config.width,
      height: state.config.height,
      frames,
      loop: state.config.loop
    });

    const blob = new Blob([gifBytes], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'thinking-trace.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    selectors.exportStatus.textContent = 'GIF downloaded. Share away.';
    selectors.exportButton.disabled = false;

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function nextTick() {
    return new Promise(resolve => {
      window.requestAnimationFrame(() => resolve());
    });
  }
})();
