class TimestampHelper {
  constructor(console, { interval = 1000 } = {}) {
    this.console = console;
    this.interval = interval;
    this.timer = null;
  }
  start() { this.stop(); this.timer = setInterval(() => this.console.log(new Date().toISOString()), this.interval); }
  stop() { if (this.timer) clearInterval(this.timer); this.timer = null; }
}

export { TimestampHelper };
