/**
 * @file Preset parser.
 * @module parsers/PresetParser
 */

import { ConsoleParser } from './ConsoleParser.js';

/** Parses preset JSON. */
class PresetParser {
  /**
   * @param {Object|string} json - Input.
   * @param {Object<string,Object>} [registry={}] - Base registry.
   * @returns {Object} Merged config.
   */
  static parse(json, registry = {}) {
    if (typeof json === 'string') json = JSON.parse(json);
    return ConsoleParser.resolveExtends(json, registry);
  }

  /** @param {Object[]} list @param {Object} [registry={}] @returns {Object[]} */
  static parseMany(list, registry = {}) {
    return list.map((item) => PresetParser.parse(item, registry));
  }
}

export { PresetParser };
