/**
 * @file Native Browser Console Sink.
 * Bridges in-engine console stream to browser DevTools (F12).
 * @module sinks/BrowserSink
 */

export class BrowserSink {
  /**
   * @param {import('../../../src/core/Console.js').Console} consoleInstance
   */
  constructor(consoleInstance) {
    this.console = consoleInstance;
    this.unsubscribe = null;
    this.enabled = false;
  }

  /**
   * Enable mirroring to browser console.
   */
  enable() {
    if (this.enabled) return;
    this.enabled = true;
    this.console.setBrowserMirror(true);
  }

  /**
   * Disable mirroring to browser console.
   */
  disable() {
    this.enabled = false;
    this.console.setBrowserMirror(false);
  }

  /**
   * Toggle current mirroring state.
   * @returns {boolean} New state
   */
  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.enabled;
  }
}
