/**
 * @file Multi-target log sink router.
 * Dispatches console events to UI, Browser DevTools, Memory buffer, and Custom Telemetry.
 * @module core/SinkRouter
 */

export class SinkRouter {
  constructor() {
    /** @type {boolean} */
    this.browserMirror = false;
    /** @type {Set<Function>} */
    this.sinks = new Set();
  }

  /**
   * Enable or disable native browser console mirroring.
   * @param {boolean} enabled
   */
  setBrowserMirror(enabled) {
    this.browserMirror = Boolean(enabled);
  }

  /**
   * Register a custom telemetry / log sink subscriber.
   * @param {Function} sinkFn - Callback receiving entry: (entry) => void
   * @returns {Function} Unsubscribe function
   */
  addSink(sinkFn) {
    if (typeof sinkFn === 'function') {
      this.sinks.add(sinkFn);
      return () => this.sinks.delete(sinkFn);
    }
    return () => {};
  }

  /**
   * Route entry to all active sinks.
   * @param {Object} entry - Log record entry.
   */
  route(entry) {
    // 1. Browser Native Console Mirroring
    if (this.browserMirror && typeof window !== 'undefined' && window.console) {
      const level = entry.level === 'fatal' ? 'error' : (entry.level || 'log');
      const nativeMethod = window.console[level] || window.console.log;
      const tag = entry.channel ? `[${entry.channel}]` : '';
      if (typeof nativeMethod === 'function') {
        nativeMethod.call(window.console, `%c${tag}%c ${entry.message}`, 'color: #38bdf8; font-weight: bold;', 'color: inherit;');
      }
    }

    // 2. Custom Subscribers / Remote Telemetry Sinks
    for (const sink of this.sinks) {
      try {
        sink(entry);
      } catch (err) {
        // Prevent sink errors from crashing the console engine
      }
    }
  }
}
