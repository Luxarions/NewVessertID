class HistoryNavigator {
  constructor(console_, { max = 500 } = {}) {
    this.console = console_;
    this.max = max;
    this.items = [];
    this.cursor = -1;
  }
  push(cmd) { this.items.push(cmd); if (this.items.length > this.max) this.items.shift(); this.cursor = this.items.length; }
  prev() { if (this.cursor > 0) this.cursor--; return this.items[this.cursor]; }
  next() { if (this.cursor < this.items.length - 1) this.cursor++; return this.items[this.cursor]; }
}

export { HistoryNavigator };
