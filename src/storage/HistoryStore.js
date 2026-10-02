/**
 * @file Bounded history store.
 * @module storage/HistoryStore
 */

/** Bounded history of arbitrary items. */
class HistoryStore {
  /** @param {number} [max=1000] */
  constructor(max = 1000) { this.max = max; /** @type {*[]} */ this.items = []; }
  /** @param {*} item @returns {void} */
  push(item) { this.items.push(item); if (this.items.length > this.max) this.items.shift(); }
  /** @returns {*[]} */ all() { return [...this.items]; }
  /** @returns {void} */ clear() { this.items = []; }
}

export { HistoryStore };
