/**
 * @file Text filter.
 * @module filters/TextFilter
 */

/** Filters entries by substring. */
class TextFilter {
  /** @param {string} [query=''] @param {boolean} [caseSensitive=false] */
  constructor(query = '', caseSensitive = false) {
    this.query = query;
    this.caseSensitive = caseSensitive;
  }
  /** @param {string} query @returns {void} */ set(query) { this.query = query; }
  /** @param {Object} entry @returns {boolean} */
  pass(entry) {
    if (!this.query) return true;
    const a = this.caseSensitive ? entry.message : entry.message.toLowerCase();
    const b = this.caseSensitive ? this.query : this.query.toLowerCase();
    return a.includes(b);
  }
}

export { TextFilter };
