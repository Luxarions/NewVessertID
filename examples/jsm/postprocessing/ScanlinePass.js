import { Pass } from './Pass.js';

class ScanlinePass extends Pass {
  constructor({ interval = 2 } = {}) { super(); this.interval = interval; }
  run(entries) { return entries.map((e, i) => ({ ...e, message: i % this.interval === 0 ? e.message : ` ${e.message}` })); }
}

export { ScanlinePass };
