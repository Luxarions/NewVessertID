/**
 * @file Pub/sub stream.
 * @module output/OutputStream
 */

/** Emits entries to subscribers. */
class OutputStream {
  constructor() { /** @type {Set<Function>} */ this.listeners = new Set(); }
  /** @param {Function} fn @returns {() => void} */
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  /** @param {Object} entry @returns {void} */
  emit(entry) { this.listeners.forEach((fn) => fn(entry)); }
}

export { OutputStream };
