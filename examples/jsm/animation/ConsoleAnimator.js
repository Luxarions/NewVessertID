import { EventDispatcher } from '../../../src/events/EventDispatcher.js';

class ConsoleAnimator extends EventDispatcher {
  constructor(console) { super(); this.console = console; this.running = false; }
  async run(frames, interval = 16) {
    this.running = true;
    for (const frame of frames) {
      if (!this.running) break;
      this.console.log(frame);
      await new Promise((r) => setTimeout(r, interval));
    }
    this.running = false;
  }
  stop() { this.running = false; }
}

export { ConsoleAnimator };
