import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectWindowStarts } from '../src/spreadsheet/state.ts';
test('direct jumps load the anchor of an intersecting merge without all intermediate windows', () => {
  const windows = collectWindowStarts({ startRow: 5000, endRow: 5010, direction: 1, totalRows: 10000, merges: [{ row: 700, rowspan: 5000 }] });
  assert.ok(windows.includes(500));
  assert.ok(!windows.includes(1000));
  assert.ok(windows.length <= 6);
});
test('nonintersecting merges do not add work', () => {
  const args = { startRow: 5000, endRow: 5010, direction: 1, totalRows: 10000 };
  assert.deepEqual(collectWindowStarts({ ...args, merges: [{ row: 700, rowspan: 20 }] }), collectWindowStarts(args));
});
