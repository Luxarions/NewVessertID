class DebugHelper {
  constructor(console) { this.console = console; }
  wrap(fn, label = 'fn') {
    return (...args) => {
      const t0 = performance.now();
      try {
        const r = fn(...args);
        this.console.debug(`${label} ${(performance.now() - t0).toFixed(2)}ms`);
        return r;
      } catch (err) {
        this.console.error(`${label} failed: ${err.message}`);
        throw err;
      }
    };
  }
}

export { DebugHelper };
