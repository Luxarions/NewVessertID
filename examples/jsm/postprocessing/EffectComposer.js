import { Pass } from './Pass.js';

class EffectComposer {
  constructor(renderer) { this.renderer = renderer; this.passes = []; }
  addPass(pass) { if (!(pass instanceof Pass)) throw new Error('Not a Pass'); this.passes.push(pass); return this; }
  render(entries) {
    let buf = entries;
    for (const pass of this.passes) buf = pass.run(buf);
    return buf;
  }
}

export { EffectComposer };
