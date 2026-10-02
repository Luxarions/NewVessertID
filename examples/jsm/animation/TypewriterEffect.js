import { ConsoleAnimator } from './ConsoleAnimator.js';

class TypewriterEffect {
  constructor(console, { speed = 30 } = {}) {
    this.console = console;
    this.speed = speed;
    this.animator = new ConsoleAnimator(console);
  }
  async type(text) {
    const frames = text.split('').map((_, i) => text.slice(0, i + 1));
    return this.animator.run(frames, this.speed);
  }
}

export { TypewriterEffect };
