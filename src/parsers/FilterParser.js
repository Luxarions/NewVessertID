/**
 * @file Filter parser.
 * @module parsers/FilterParser
 */

/** Parses filter JSON. */
class FilterParser {
  /** @param {Object|string} json @returns {Object} */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return {
      name: json.name,
      filters: json.filters ?? [],
      search: json.search ?? {},
      preserveLog: json.preserveLog ?? false,
      showTimestamp: json.showTimestamp ?? false
    };
  }
}

export { FilterParser };
