/**
 * @file Theme parser.
 * @module parsers/ThemeParser
 */

import { Theme } from '../themes/Theme.js';

/** Parses theme JSON. */
class ThemeParser {
  /** @param {Object|string} json @returns {Theme} */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return new Theme(json);
  }
  /** @param {Object[]} list @returns {Theme[]} */
  static parseMany(list) { return list.map(ThemeParser.parse); }
}

export { ThemeParser };
