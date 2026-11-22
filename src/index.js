import { sleep } from './async-utils.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
console.log('start');
await sleep(100); // top-level await works in ESM
console.log('done after 100ms');
const { add } = require('./legacy.cjs');

console.log(add(10, 20));


