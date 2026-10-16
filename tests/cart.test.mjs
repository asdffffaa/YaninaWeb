import { test } from 'node:test';
import assert from 'node:assert/strict';
import { restoreCart, itemCountLabel } from '../src/lib/cart.ts';
const a = { id: 'a', price: 1490 },
  b = { id: 'b', price: 190 };
const products = new Map([
  ['a', a],
  ['b', b],
]);
test('cart restoration rejects obsolete IDs, duplicates and untrusted product objects', () => {
  assert.deepEqual(
    restoreCart('["a","missing","a",null,42,{"id":"b","price":0},"b"]', products, []),
    [a, b],
  );
});
test('empty cart stays empty, malformed or missing storage preserves defaults', () => {
  assert.deepEqual(restoreCart('[]', products, [a]), []);
  for (const raw of [null, '{broken', '{}', 'false'])
    assert.deepEqual(restoreCart(raw, products, [a]), [a]);
});
test('Ukrainian item count handles teen and compound endings', () => {
  for (const [n, label] of [
    [0, 'товарів'],
    [1, 'товар'],
    [2, 'товари'],
    [4, 'товари'],
    [5, 'товарів'],
    [11, 'товарів'],
    [14, 'товарів'],
    [21, 'товар'],
    [24, 'товари'],
    [111, 'товарів'],
  ])
    assert.equal(itemCountLabel(n), `${n} ${label}`);
});
