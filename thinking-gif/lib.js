(function(global) {
  'use strict';

  const DEFAULT_STEPS = [
    { id: 'step-1', text: 'Thinking…' },
    { id: 'step-2', text: 'Gathering receipts…' },
    { id: 'step-3', text: 'Consulting the vibes…' },
    { id: 'step-4', text: 'Finalizing response…' }
  ];

  const DEFAULT_CONFIG = {
    width: 480,
    height: 270,
    fps: 20,
    stepDurationMs: 1200,
    transitionMs: 250,
    transitionStyle: 'fade',
    mode: 'single',
    theme: 'dark',
    fontSize: 20,
    padding: 24,
    shimmer: {
      enabled: true,
      speed: 90,
      intensity: 0.6,
      width: 140
    },
    cursor: {
      enabled: true,
      style: 'bar',
      blinkMs: 600
    },
    loop: true,
    loopPauseMs: 450
  };

  const FONT_STACK = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';

  function sanitizeSteps(steps) {
    if (!Array.isArray(steps)) {
      return [];
    }
    return steps
      .map(step => ({
        id: step.id || `step-${Math.random().toString(16).slice(2)}`,
        text: String(step.text || '').trim()
      }))
      .filter(step => step.text.length > 0);
  }

  function clampNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function mergeConfig(config) {
    const merged = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    if (!config || typeof config !== 'object') {
      return merged;
    }
    Object.keys(merged).forEach(key => {
      if (typeof merged[key] === 'object' && merged[key] !== null) {
        merged[key] = { ...merged[key], ...(config[key] || {}) };
      } else if (config[key] !== undefined) {
        merged[key] = config[key];
      }
    });
    merged.width = clampNumber(merged.width, DEFAULT_CONFIG.width);
    merged.height = clampNumber(merged.height, DEFAULT_CONFIG.height);
    merged.fps = clampNumber(merged.fps, DEFAULT_CONFIG.fps);
    merged.stepDurationMs = clampNumber(merged.stepDurationMs, DEFAULT_CONFIG.stepDurationMs);
    merged.transitionMs = clampNumber(merged.transitionMs, DEFAULT_CONFIG.transitionMs);
    merged.fontSize = clampNumber(merged.fontSize, DEFAULT_CONFIG.fontSize);
    merged.padding = clampNumber(merged.padding, DEFAULT_CONFIG.padding);
    merged.loopPauseMs = clampNumber(merged.loopPauseMs, DEFAULT_CONFIG.loopPauseMs);
    merged.shimmer.speed = clampNumber(merged.shimmer.speed, DEFAULT_CONFIG.shimmer.speed);
    merged.shimmer.intensity = clampNumber(merged.shimmer.intensity, DEFAULT_CONFIG.shimmer.intensity);
    merged.shimmer.width = clampNumber(merged.shimmer.width, DEFAULT_CONFIG.shimmer.width);
    merged.cursor.blinkMs = clampNumber(merged.cursor.blinkMs, DEFAULT_CONFIG.cursor.blinkMs);
    return merged;
  }

  function getStepState(timeMs, stepCount, config) {
    if (!stepCount) {
      return {
        index: 0,
        nextIndex: 0,
        inTransition: false,
        transitionProgress: 0,
        isPause: false,
        localTime: 0
      };
    }

    const stepSpan = config.stepDurationMs + config.transitionMs;
    const sequenceDuration = stepSpan * stepCount;
    const totalDuration = config.loop
      ? sequenceDuration + config.loopPauseMs
      : sequenceDuration;

    let time = timeMs;
    if (config.loop && totalDuration > 0) {
      time = time % totalDuration;
    } else if (!config.loop && totalDuration > 0) {
      time = Math.min(time, totalDuration - 1);
    }

    if (config.loop && config.loopPauseMs > 0 && time >= sequenceDuration) {
      return {
        index: stepCount - 1,
        nextIndex: 0,
        inTransition: false,
        transitionProgress: 0,
        isPause: true,
        localTime: sequenceDuration
      };
    }

    const index = Math.floor(time / stepSpan);
    const stepTime = time - index * stepSpan;
    const inTransition = stepTime >= config.stepDurationMs;
    const transitionProgress = inTransition
      ? (stepTime - config.stepDurationMs) / Math.max(config.transitionMs, 1)
      : 0;
    const nextIndex = (index + 1) % stepCount;

    return {
      index,
      nextIndex,
      inTransition,
      transitionProgress,
      isPause: false,
      localTime: stepTime
    };
  }

  function wrapTextLines(ctx, text, maxWidth, maxLines) {
    const words = text.split(/\s+/).filter(Boolean);
    if (!words.length) {
      return [''];
    }

    const lines = [];
    let currentLine = words[0];

    if (ctx.measureText(currentLine).width > maxWidth) {
      const chunks = splitLongWord(ctx, currentLine, maxWidth);
      lines.push(...chunks);
      currentLine = lines.pop() || '';
      if (lines.length >= maxLines) {
        return lines.slice(0, maxLines);
      }
    }

    for (let i = 1; i < words.length; i += 1) {
      const word = words[i];
      if (ctx.measureText(word).width > maxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
          if (lines.length === maxLines) {
            break;
          }
        }
        const chunks = splitLongWord(ctx, word, maxWidth);
        chunks.forEach(chunk => {
          if (lines.length < maxLines) {
            lines.push(chunk);
          }
        });
        if (lines.length >= maxLines) {
          currentLine = '';
          break;
        }
        continue;
      }
      const testLine = `${currentLine} ${word}`;
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
        if (lines.length === maxLines - 1) {
          break;
        }
      }
    }

    if (lines.length < maxLines) {
      lines.push(currentLine);
    }

    if (lines.length > maxLines) {
      lines.length = maxLines;
    }

    if (lines.length === maxLines && words.length > 1) {
      const lastIndex = lines.length - 1;
      let lastLine = lines[lastIndex];
      if (ctx.measureText(lastLine).width > maxWidth) {
        while (lastLine.length && ctx.measureText(`${lastLine}…`).width > maxWidth) {
          lastLine = lastLine.slice(0, -1);
        }
      }
      if (lastLine !== lines[lastIndex] || words.length > lines.join(' ').split(/\s+/).length) {
        lines[lastIndex] = `${lastLine}…`;
      }
    }

    return lines;
  }

  function splitLongWord(ctx, word, maxWidth) {
    const chars = Array.from(word);
    const segments = [];
    let segment = '';

    chars.forEach(char => {
      const test = segment + char;
      if (ctx.measureText(test).width > maxWidth && segment) {
        segments.push(segment);
        segment = char;
      } else {
        segment = test;
      }
    });

    if (segment) {
      segments.push(segment);
    }

    return segments;
  }

  function renderFrame(ctx, timeMs, steps, config) {
    const { width, height, padding } = config;
    const theme = config.theme === 'light'
      ? { bg: '#f8fafc', text: '#1f2937', muted: 'rgba(31,41,55,0.45)' }
      : { bg: '#0b0c0f', text: '#e5e7eb', muted: 'rgba(229,231,235,0.35)' };

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.textBaseline = 'top';
    ctx.font = `${config.fontSize}px ${FONT_STACK}`;

    if (!steps.length) {
      ctx.fillStyle = theme.text;
      ctx.fillText('Add a step to begin.', padding, padding);
      return;
    }

    const stepState = getStepState(timeMs, steps.length, config);
    const lineHeight = Math.round(config.fontSize * 1.4);
    const maxWidth = width - padding * 2;
    const shimmerOffset = (timeMs / 1000) * config.shimmer.speed;
    const shimmerWidth = config.shimmer.width;
    const shimmerX = (shimmerOffset % (width + shimmerWidth)) - shimmerWidth;

    const activeLines = wrapTextLines(ctx, steps[stepState.index].text, maxWidth, 2);
    const nextLines = wrapTextLines(ctx, steps[stepState.nextIndex].text, maxWidth, 2);

    if (config.mode === 'log') {
    drawLogMode({
      ctx,
      steps,
      stepState,
      activeLines,
      nextLines,
      padding,
      maxWidth,
      lineHeight,
      theme,
      shimmerX,
      shimmerWidth,
      config,
      timeMs
    });
    return;
  }

    const yStart = (height - activeLines.length * lineHeight) / 2;
    const transitionStyle = config.transitionStyle;

    if (!stepState.inTransition) {
      drawLines({
        ctx,
        lines: activeLines,
        x: padding,
        y: yStart,
        lineHeight,
        color: theme.text,
        alpha: 1,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: config.shimmer.enabled,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: true,
        timeMs
      });
      return;
    }

    if (transitionStyle === 'fade') {
      drawLines({
        ctx,
        lines: activeLines,
        x: padding,
        y: yStart,
        lineHeight,
        color: theme.text,
        alpha: 1 - stepState.transitionProgress,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: false,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: false,
        timeMs
      });
      drawLines({
        ctx,
        lines: nextLines,
        x: padding,
        y: yStart,
        lineHeight,
        color: theme.text,
        alpha: stepState.transitionProgress,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: config.shimmer.enabled,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: true,
        timeMs
      });
      return;
    }

    if (transitionStyle === 'slide') {
      const offset = lineHeight * 0.6;
      drawLines({
        ctx,
        lines: activeLines,
        x: padding,
        y: yStart - offset * stepState.transitionProgress,
        lineHeight,
        color: theme.text,
        alpha: 1 - stepState.transitionProgress,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: false,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: false,
        timeMs
      });
      drawLines({
        ctx,
        lines: nextLines,
        x: padding,
        y: yStart + offset * (1 - stepState.transitionProgress),
        lineHeight,
        color: theme.text,
        alpha: stepState.transitionProgress,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: config.shimmer.enabled,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: true,
        timeMs
      });
      return;
    }

    const typeCount = Math.max(1, Math.ceil(nextLines.join(' ').length * stepState.transitionProgress));
    const typeText = nextLines.join(' ').slice(0, typeCount);
    const typedLines = wrapTextLines(ctx, typeText, maxWidth, 2);

    drawLines({
      ctx,
      lines: activeLines,
      x: padding,
      y: yStart,
      lineHeight,
      color: theme.text,
      alpha: 1 - stepState.transitionProgress,
      shimmerX,
      shimmerWidth,
      shimmerEnabled: false,
      shimmerIntensity: config.shimmer.intensity,
      cursor: config.cursor,
      cursorActive: false,
      timeMs
    });
    drawLines({
      ctx,
      lines: typedLines,
      x: padding,
      y: yStart,
      lineHeight,
      color: theme.text,
      alpha: 1,
      shimmerX,
      shimmerWidth,
      shimmerEnabled: config.shimmer.enabled,
      shimmerIntensity: config.shimmer.intensity,
      cursor: config.cursor,
      cursorActive: true,
      timeMs
    });
  }

  function drawLogMode({
    ctx,
    steps,
    stepState,
    activeLines,
    nextLines,
    padding,
    maxWidth,
    lineHeight,
    theme,
    shimmerX,
    shimmerWidth,
    config,
    timeMs
  }) {
    const maxLines = Math.floor((config.height - padding * 2) / lineHeight);
    const entries = [];
    const startIndex = Math.max(0, stepState.index - 3);

    for (let i = startIndex; i < stepState.index; i += 1) {
      const lines = wrapTextLines(ctx, steps[i].text, maxWidth, 2);
      lines.forEach(line => entries.push({
        text: line,
        alpha: 0.3,
        shimmer: false
      }));
    }

    if (stepState.inTransition) {
      activeLines.forEach(line => entries.push({
        text: line,
        alpha: 1 - stepState.transitionProgress,
        shimmer: false
      }));
      nextLines.forEach(line => entries.push({
        text: line,
        alpha: stepState.transitionProgress,
        shimmer: true
      }));
    } else {
      activeLines.forEach(line => entries.push({
        text: line,
        alpha: 1,
        shimmer: true
      }));
    }

    const visibleEntries = entries.slice(Math.max(0, entries.length - maxLines));
    const yStart = padding;

    visibleEntries.forEach((entry, index) => {
      const y = yStart + index * lineHeight;
      drawLines({
        ctx,
        lines: [entry.text],
        x: padding,
        y,
        lineHeight,
        color: entry.shimmer ? theme.text : theme.muted,
        alpha: entry.alpha,
        shimmerX,
        shimmerWidth,
        shimmerEnabled: entry.shimmer && config.shimmer.enabled,
        shimmerIntensity: config.shimmer.intensity,
        cursor: config.cursor,
        cursorActive: entry.shimmer && index === visibleEntries.length - 1,
        timeMs
      });
    });
  }

  function drawLines({
    ctx,
    lines,
    x,
    y,
    lineHeight,
    color,
    alpha,
    shimmerX,
    shimmerWidth,
    shimmerEnabled,
    shimmerIntensity,
    cursor,
    cursorActive,
    timeMs
  }) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    lines.forEach((line, index) => {
      const lineY = y + index * lineHeight;
      ctx.fillText(line, x, lineY);

      if (shimmerEnabled && shimmerIntensity > 0) {
        const lineWidth = ctx.measureText(line).width;
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        const gradient = ctx.createLinearGradient(shimmerX, 0, shimmerX + shimmerWidth, 0);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.5, `rgba(255,255,255,${0.25 + shimmerIntensity * 0.55})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillText(line, x, lineY);
        ctx.restore();
      }
    });

    if (cursorActive && cursor && cursor.enabled) {
      const lastLine = lines[lines.length - 1] || '';
      const lineWidth = ctx.measureText(lastLine).width;
      const cursorX = x + lineWidth + 4;
      const cursorY = y + (lines.length - 1) * lineHeight;
      const blinkOn = (timeMs % cursor.blinkMs) < cursor.blinkMs / 2;
      if (blinkOn) {
        ctx.fillStyle = color;
        if (cursor.style === 'block') {
          ctx.fillRect(cursorX, cursorY, lineHeight * 0.55, lineHeight * 0.85);
        } else {
          ctx.fillRect(cursorX, cursorY + lineHeight * 0.1, 2, lineHeight * 0.8);
        }
      }
    }

    ctx.restore();
  }

  function encodeGif({ width, height, frames, loop }) {
    const output = [];
    const writeShort = value => {
      output.push(value & 0xff, (value >> 8) & 0xff);
    };
    const writeString = value => {
      for (let i = 0; i < value.length; i += 1) {
        output.push(value.charCodeAt(i));
      }
    };

    writeString('GIF89a');
    writeShort(width);
    writeShort(height);
    output.push(0xf7, 0x00, 0x00);

    for (let i = 0; i < 256; i += 1) {
      output.push(i, i, i);
    }

    if (loop) {
      output.push(0x21, 0xff, 0x0b);
      writeString('NETSCAPE2.0');
      output.push(0x03, 0x01, 0x00, 0x00, 0x00);
    }

    frames.forEach(frame => {
      const delayCs = Math.max(1, Math.round(frame.delayMs / 10));
      output.push(0x21, 0xf9, 0x04, 0x00, delayCs & 0xff, (delayCs >> 8) & 0xff, 0x00, 0x00);
      output.push(0x2c, 0x00, 0x00, 0x00, 0x00);
      writeShort(width);
      writeShort(height);
      output.push(0x00);
      output.push(0x08);

      const indexed = mapToGrayscale(frame.data);
      const lzwData = lzwEncode(indexed, 8);
      let offset = 0;
      while (offset < lzwData.length) {
        const blockSize = Math.min(255, lzwData.length - offset);
        output.push(blockSize);
        for (let i = 0; i < blockSize; i += 1) {
          output.push(lzwData[offset + i]);
        }
        offset += blockSize;
      }
      output.push(0x00);
    });

    output.push(0x3b);
    return new Uint8Array(output);
  }

  function mapToGrayscale(data) {
    const length = data.length / 4;
    const indexed = new Uint8Array(length);
    for (let i = 0; i < length; i += 1) {
      const offset = i * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const luma = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
      indexed[i] = luma;
    }
    return indexed;
  }

  function lzwEncode(indices, minCodeSize) {
    const clearCode = 1 << minCodeSize;
    const endCode = clearCode + 1;
    let codeSize = minCodeSize + 1;
    let dictSize = endCode + 1;
    let dict = createLzwDictionary(clearCode);

    const output = [];
    let bitBuffer = 0;
    let bitCount = 0;

    const pushCode = code => {
      bitBuffer |= code << bitCount;
      bitCount += codeSize;
      while (bitCount >= 8) {
        output.push(bitBuffer & 0xff);
        bitBuffer >>= 8;
        bitCount -= 8;
      }
    };

    pushCode(clearCode);

    let prefix = String.fromCharCode(indices[0]);

    for (let i = 1; i < indices.length; i += 1) {
      const char = String.fromCharCode(indices[i]);
      const key = prefix + char;
      if (dict.has(key)) {
        prefix = key;
      } else {
        pushCode(dict.get(prefix));
        dict.set(key, dictSize++);
        prefix = char;

        if (dictSize === (1 << codeSize) && codeSize < 12) {
          codeSize += 1;
        }

        if (dictSize >= 4096) {
          pushCode(clearCode);
          dict = createLzwDictionary(clearCode);
          dictSize = endCode + 1;
          codeSize = minCodeSize + 1;
        }
      }
    }

    pushCode(dict.get(prefix));
    pushCode(endCode);

    if (bitCount > 0) {
      output.push(bitBuffer & 0xff);
    }

    return output;
  }

  function createLzwDictionary(clearCode) {
    const dict = new Map();
    for (let i = 0; i < clearCode; i += 1) {
      dict.set(String.fromCharCode(i), i);
    }
    return dict;
  }

  const ThinkingGif = {
    DEFAULT_STEPS,
    DEFAULT_CONFIG,
    FONT_STACK,
    sanitizeSteps,
    mergeConfig,
    getStepState,
    wrapTextLines,
    renderFrame,
    encodeGif
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThinkingGif;
  }

  global.ThinkingGif = ThinkingGif;
})(typeof window !== 'undefined' ? window : globalThis);
