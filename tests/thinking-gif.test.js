const assert = require('node:assert/strict');
const test = require('node:test');
const { sanitizeSteps, getStepState, DEFAULT_CONFIG } = require('../thinking-gif/lib.js');

test('sanitizeSteps trims and removes empty steps', () => {
  const steps = sanitizeSteps([
    { id: 'a', text: '  Hello  ' },
    { id: 'b', text: '   ' },
    { id: 'c', text: 'World' }
  ]);

  assert.deepEqual(steps, [
    { id: 'a', text: 'Hello' },
    { id: 'c', text: 'World' }
  ]);
});

test('getStepState cycles through steps and transitions', () => {
  const config = { ...DEFAULT_CONFIG, stepDurationMs: 1000, transitionMs: 500, loop: true, loopPauseMs: 0 };
  const state = getStepState(1200, 3, config);

  assert.equal(state.index, 0);
  assert.equal(state.inTransition, true);
  assert.ok(state.transitionProgress > 0);
});
