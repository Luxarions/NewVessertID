import { Pass } from './Pass.js';

class BloomPass extends Pass {
  constructor({ threshold = 5 } = {}) { super(); this.threshold = threshold; }
  run(entries) { return entries.map((e) => ({ ...e, glow: e.message.length > this.threshold })); }
}

export { BloomPass };
