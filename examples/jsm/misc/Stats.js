class Stats {
  constructor() { this.frames = 0; this.start = performance.now(); }
  tick() {
    this.frames++;
    const now = performance.now();
    if (now - this.start >= 1000) {
      const fps = this.frames * 1000 / (now - this.start);
      this.frames = 0;
      this.start = now;
      return fps;
    }
    return null;
  }
}

export { Stats };
