
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { makeCounter, memoize } from '../src/closures.js';

test('makeCounter increments and decrements correctly', () => {
  const counter = makeCounter(5);

  assert.equal(counter.value, 5);

  assert.equal(counter.inc(), 6);
  assert.equal(counter.inc(), 7);

  assert.equal(counter.dec(), 6);
  assert.equal(counter.value, 6);
});

test('makeCounter uses zero as the default starting value', () => {
  const counter = makeCounter();

  assert.equal(counter.value, 0);
  assert.equal(counter.inc(), 1);
});

test('memoize caches results and avoids repeated function calls', () => {
  let calls = 0;

  const square = memoize((n) => {
    calls++;
    return n * n;
  });

  assert.equal(square(5), 25);
  assert.equal(square(5), 25);

  // Function should execute only once for the same argument.
  assert.equal(calls, 1);

  assert.equal(square(3), 9);
  assert.equal(calls, 2);
});
