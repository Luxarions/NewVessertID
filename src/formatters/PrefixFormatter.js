/**
 * @file Prefix formatter.
 * @module formatters/PrefixFormatter
 */

/** Returns the configured prefix for a level. */
class PrefixFormatter {
  /** @param {Object} levels - Levels map. */
  constructor(levels) { /** @type {Object} */ this.levels = levels; }
  /** @param {string} level - Level. @returns {string} Prefix. */
  for(level) { return this.levels?.[level]?.prefix ?? ''; }
}

export { PrefixFormatter };
