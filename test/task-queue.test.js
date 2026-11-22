
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { TaskQueue } from '../src/task-queue.js';

test('TaskQueue executes tasks in order', async () => {
  const queue = new TaskQueue('Test Queue');

  const order = [];

  queue.push(async () => {
    order.push(1);
    return 'First';
  });

  queue.push(async () => {
    order.push(2);
    return 'Second';
  });

  queue.push(async () => {
    order.push(3);
    return 'Third';
  });

  const results = await queue.runAll();

  assert.deepEqual(order, [1, 2, 3]);

  assert.deepEqual(results, [
    'First',
    'Second',
    'Third',
  ]);
});

test('TaskQueue size becomes zero after runAll', async () => {
  const queue = new TaskQueue('Size Test');

  queue.push(async () => 'Task 1');
  queue.push(async () => 'Task 2');

  assert.equal(queue.size, 2);

  await queue.runAll();

  assert.equal(queue.size, 0);
});
