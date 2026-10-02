/**
 * @file Console config parser.
 * @module parsers/ConsoleParser
 */

import { ConsoleState } from '../core/ConsoleState.js';

/**
 * Parses raw console config.
 */
class ConsoleParser {
  /**
   * @param {Object|string} json - Input.
   * @returns {ConsoleState} Parsed state.
   */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    if (json.extends) json = ConsoleParser.resolveExtends(json);
    return new ConsoleState(json);
  }

  /**
   * @param {Object} json - Config.
   * @param {Object<string,Object>} [registry={}] - Base registry.
   * @returns {Object} Merged config.
   */
  static resolveExtends(json, registry = {}) {
    if (!json.extends) return json;
    const base = registry[json.extends];
    if (!base) return json;
    return ConsoleParser.deepMerge(base, json);
  }

  /**
   * @param {Object} a - Base.
   * @param {Object} b - Override.
   * @returns {Object} Merged.
   */
  static deepMerge(a, b) {
    const out = { ...a };
    for (const key of Object.keys(b)) {
      if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key])) {
        out[key] = ConsoleParser.deepMerge(a[key] ?? {}, b[key]);
      } else {
        out[key] = b[key];
      }
    }
    return out;
  }
}

export { ConsoleParser };
