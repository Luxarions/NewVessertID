class Interval {
  constructor(fn, ms) { this.fn = fn; this.ms = ms; this.id = null; }
  start() { this.stop(); this.id = setInterval(this.fn, this.ms); }
  stop() { if (this.id) clearInterval(this.id); this.id = null; }
}

export { Interval };
