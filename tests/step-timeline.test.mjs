import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceStep,
  selectStep,
  stepProgress,
  AUTO_STEP_MS,
} from '../src/components/mobile/stepTimeline.ts';

test('automatic steps advance at five seconds and wrap after the fourth', () => {
  const timeline = { step: 0, elapsed: 0, duration: AUTO_STEP_MS };
  advanceStep(timeline, 4999);
  assert.equal(timeline.step, 0);
  advanceStep(timeline, 1);
  assert.equal(timeline.step, 1);
  advanceStep(timeline, 15000);
  assert.equal(timeline.step, 0);
});
test('manual selection and subsequent steps each wait five seconds', () => {
  const timeline = selectStep(1);
  advanceStep(timeline, 4999);
  assert.equal(timeline.step, 1);
  advanceStep(timeline, 1);
  assert.equal(timeline.step, 2);
  advanceStep(timeline, 4999);
  assert.equal(timeline.step, 2);
  advanceStep(timeline, 1);
  assert.equal(timeline.step, 3);
});
test('selecting again resets the delay and connector position', () => {
  const previous = selectStep(2);
  advanceStep(previous, 2000);
  const selected = selectStep(0);
  assert.equal(selected.elapsed, 0);
  assert.equal(selected.duration, 5000);
  assert.equal(stepProgress(selected), 90 / 402);
  assert.ok(stepProgress(selected) < stepProgress(previous));
});
test('connector progresses continuously up to the next circle', () => {
  const timeline = selectStep(0),
    start = stepProgress(timeline);
  advanceStep(timeline, 2500);
  const half = stepProgress(timeline);
  advanceStep(timeline, 2500);
  const next = stepProgress(timeline);
  assert.ok(start < half && half < next);
  const nextLeftEdge = (32 + 280 / 3) / 402;
  assert.ok(Math.abs(half - (start + nextLeftEdge) / 2) < 1e-10);
  assert.equal(timeline.step, 1);
  assert.ok(Math.abs(next - (90 + 280 / 3) / 402) < 1e-10);
  assert.ok(stepProgress(selectStep(3)) < 1);
});

test('responsive connector stays between the circle edges at native font sizes', () => {
  for (const width of [280, 322, 362, 600]) {
    const timeline = selectStep(0);
    const firstEdge = 70 / width;
    assert.equal(stepProgress(timeline, width, 12), firstEdge);
    advanceStep(timeline, 2500);
    const nextEdge = (12 + (width - 24 - 58) / 3) / width;
    assert.ok(Math.abs(stepProgress(timeline, width, 12) - (firstEdge + nextEdge) / 2) < 1e-10);
  }
});
