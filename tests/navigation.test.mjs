import { test } from 'node:test';
import assert from 'node:assert/strict';
import { visibleNavigationCount, sectionHighlight } from '../src/lib/navigation.ts';
test('navigation reserves the overflow control and never loses the remaining links', () => {
  assert.equal(visibleNavigationCount([70, 80, 60], 250, 20, 60), 3);
  assert.equal(visibleNavigationCount([70, 80, 60], 249, 20, 60), 1);
  assert.equal(visibleNavigationCount([70, 80], 80, 20, 60), 0);
});
test('neighbouring sections crossfade left to right without retaining previous selection', () => {
  assert.deepEqual(sectionHighlight(-400, 186, 86, 900, false), {
    start: 50,
    end: 100,
    current: false,
  });
  assert.deepEqual(sectionHighlight(186, 900, 86, 900, false), {
    start: 0,
    end: 50,
    current: true,
  });
  assert.equal(sectionHighlight(-900, -10, 86, 900, false).start, 100);
  assert.equal(sectionHighlight(950, 1500, 86, 900, false).end, 0);
});
test('reduced motion selects a section without a partial wipe', () => {
  assert.deepEqual(sectionHighlight(186, 900, 86, 900, true), {
    start: 0,
    end: 100,
    current: true,
  });
});
