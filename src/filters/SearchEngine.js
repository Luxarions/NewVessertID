/**
 * @file Search engine.
 * @module filters/SearchEngine
 */

/** Substring search over entries. */
class SearchEngine {
  constructor() { /** @type {string} */ this.query = ''; /** @type {boolean} */ this.caseSensitive = false; }
  /** @param {string} query @returns {void} */ setQuery(query) { this.query = query; }
  /** @param {Object[]} entries @returns {{index:number,entry:Object}[]} */
  results(entries) {
    if (!this.query) return [];
    const q = this.caseSensitive ? this.query : this.query.toLowerCase();
    return entries.map((e, i) => ({ index: i, entry: e })).filter(({ entry }) => {
      const m = this.caseSensitive ? entry.message : entry.message.toLowerCase();
      return m.includes(q);
    });
  }
}

export { SearchEngine };
