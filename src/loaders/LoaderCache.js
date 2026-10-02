/**
 * @file In-memory URL cache.
 * @module loaders/LoaderCache
 */

/** Simple URL keyed cache. */
class LoaderCache {
  constructor() { /** @type {Map<string, *>} */ this.map = new Map(); }
  /** @param {string} key @returns {boolean} */ has(key) { return this.map.has(key); }
  /** @param {string} key @returns {*} */ get(key) { return this.map.get(key); }
  /** @param {string} key @param {*} value @returns {void} */ set(key, value) { this.map.set(key, value); }
  /** @param {string} key @returns {void} */ delete(key) { this.map.delete(key); }
  /** @returns {void} */ clear() { this.map.clear(); }
  /** @returns {number} */ size() { return this.map.size; }
}

export { LoaderCache };
