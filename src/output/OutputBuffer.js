/**
 * @file Bounded entry buffer.
 * @module output/OutputBuffer
 */

/** Bounded FIFO buffer. */
class OutputBuffer {
  /** @param {number} [maxLines=10000] - Max size. */
  constructor(maxLines = 10000) { this.maxLines = maxLines; /** @type {Object[]} */ this.entries = []; }
  /** @param {Object} entry @returns {void} */
  push(entry) {
    this.entries.push(entry);
    if (this.entries.length > this.maxLines) this.entries.splice(0, this.entries.length - this.maxLines);
  }
  /** @returns {Object[]} */ snapshot() { return [...this.entries]; }
  /** @param {number} [n=1] @returns {Object[]} */ last(n = 1) { return this.entries.slice(-n); }
  /** @returns {void} */ clear() { this.entries = []; }
  /** @returns {number} */ size() { return this.entries.length; }
}

export { OutputBuffer };
