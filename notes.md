
# JavaScript Fundamentals - Assignment 1.1

## Part C: Event Loop Ordering Lab

### Predicted Output

```text
1 sync start
2 sync inside async fn (before first await)
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
5b microtask: after await
3 nextTick
6 macrotask: setTimeout 0
7 macrotask: setImmediate
```

### Actual Output

```text
1 sync start
2 sync inside async fn (before first await)
2b sync end
4 microtask: promise.then
5 microtask: queueMicrotask
5b microtask: after await
3 nextTick
6 macrotask: setTimeout 0
7 macrotask: setImmediate
```

Note: The order of setTimeout and setImmediate can vary.

### Starvation Output

```text
microtasks done
timer never fires while microtasks recurse
```

### Explanation

Microtasks are processed before timer callbacks. Continuous microtask execution delays the timer. This is called Microtask Starvation.

## Short Answers

### 1. CommonJS vs ES Modules

- CommonJS uses require() and module.exports, whereas ES Modules use import and export.
- CommonJS loads modules at runtime, whereas ES Modules support static analysis and tree-shaking.

### 2. Why doesn't await block the thread?

Await pauses the execution of the current async function until a Promise settles. It does not block the JavaScript thread, allowing other tasks to execute.

### 3. Why do microtasks run before setTimeout(0)?

JavaScript processes the microtask queue after the current job finishes and before moving to the next event-loop task, such as a timer callback.
