/**
 * @file Level filter.
 * @module filters/LevelFilter
 */

/** Filters entries by level. */
class LevelFilter {
  /** @param {Set<string>} [enabled] - Enabled levels. */
  constructor(enabled = new Set(['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'])) {
    /** @type {Set<string>} */ this.enabled = enabled;
  }
  /** @param {Object} entry @returns {boolean} */ pass(entry) { return this.enabled.has(entry.level); }
  /** @param {string} level @returns {void} */ enable(level) { this.enabled.add(level); }
  /** @param {string} level @returns {void} */ disable(level) { this.enabled.delete(level); }
  /** @param {string[]} levels @returns {void} */ set(levels) { this.enabled = new Set(levels); }
  /** @returns {string[]} */ list() { return Array.from(this.enabled); }
}

export { LevelFilter };
