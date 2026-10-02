/**
 * @file Regex filter.
 * @module filters/RegexFilter
 */

/** Filters entries by regex. */
class RegexFilter {
  /** @param {string} [pattern=''] @param {string} [flags='i'] */
  constructor(pattern = '', flags = 'i') {
    this.pattern = pattern;
    this.flags = flags;
    /** @type {RegExp|null} */ this.regex = pattern ? new RegExp(pattern, flags) : null;
  }
  /** @param {string} pattern @returns {void} */
  set(pattern) { this.pattern = pattern; this.regex = pattern ? new RegExp(pattern, this.flags) : null; }
  /** @param {Object} entry @returns {boolean} */
  pass(entry) { return !this.regex ? true : this.regex.test(entry.message); }
}

export { RegexFilter };
