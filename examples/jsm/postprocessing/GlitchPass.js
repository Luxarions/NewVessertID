import { Pass } from './Pass.js';

class GlitchPass extends Pass {
  constructor({ chance = 0.05 } = {}) { super(); this.chance = chance; }
  run(entries) {
    if (Math.random() < this.chance) return entries.map((e) => ({ ...e, message: glitch(e.message) }));
    return entries;
  }
}

function glitch(s) { return String(s).split('').map((c) => Math.random() < 0.05 ? '#' : c).join(''); }

export { GlitchPass };
