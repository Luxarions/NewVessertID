/**
 * @file Locale model.
 * @module locales/Locale
 */

/** Represents a locale. */
class Locale {
  /** @param {Object} json - Locale JSON. */
  constructor(json) { /** @type {string} */ this.name = json.name; /** @type {Object} */ this.strings = json.strings ?? {}; }
  /** @param {string} key @param {string} [fallback] @returns {string} */
  t(key, fallback = key) { return this.strings[key] ?? fallback; }
}

export { Locale };
