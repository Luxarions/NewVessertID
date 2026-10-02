/**
 * @file Engine execution profiler & counter manager.
 * @module core/Profiler
 */

export class Profiler {
  constructor() {
    /** @type {Map<string, number>} */
    this.timers = new Map();
    /** @type {Map<string, number>} */
    this.counters = new Map();
  }

  /**
   * Start a performance timer with a unique label.
   * @param {string} [label='default']
   */
  time(label = 'default') {
    this.timers.set(label, performance.now());
  }

  /**
   * Log the elapsed time without clearing the timer.
   * @param {string} [label='default']
   * @param {...*} extraArgs
   * @returns {string} Formatted duration
   */
  timeLog(label = 'default', ...extraArgs) {
    if (!this.timers.has(label)) {
      return `Timer '${label}' does not exist`;
    }
    const elapsed = (performance.now() - this.timers.get(label)).toFixed(3);
    const extra = extraArgs.length > 0 ? ` ${extraArgs.join(' ')}` : '';
    return `${label}: ${elapsed}ms${extra}`;
  }

  /**
   * Stop the timer and return the formatted elapsed time.
   * @param {string} [label='default']
   * @returns {string} Formatted duration
   */
  timeEnd(label = 'default') {
    if (!this.timers.has(label)) {
      return `Timer '${label}' does not exist`;
    }
    const elapsed = (performance.now() - this.timers.get(label)).toFixed(3);
    this.timers.delete(label);
    return `${label}: ${elapsed}ms`;
  }

  /**
   * Increment and return count for a given label.
   * @param {string} [label='default']
   * @returns {string}
   */
  count(label = 'default') {
    const current = (this.counters.get(label) || 0) + 1;
    this.counters.set(label, current);
    return `${label}: ${current}`;
  }

  /**
   * Reset count for a given label.
   * @param {string} [label='default']
   */
  countReset(label = 'default') {
    this.counters.delete(label);
  }

  /**
   * Clear all active timers and counters.
   */
  clear() {
    this.timers.clear();
    this.counters.clear();
  }
}
