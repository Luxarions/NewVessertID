class Clock {
  constructor(autoStart = true) { this.running = false; this.startTime = 0; this.elapsed = 0; if (autoStart) this.start(); }
  start() { this.running = true; this.startTime = performance.now(); return this; }
  stop() { this.elapsed = this.getElapsed(); this.running = false; return this; }
  getElapsed() { return this.running ? (performance.now() - this.startTime) / 1000 : this.elapsed; }
}

export { Clock };
