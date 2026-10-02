/**
 * @file Layout parser.
 * @module parsers/LayoutParser
 */

import { Layout } from '../layouts/Layout.js';

/** Parses layout JSON. */
class LayoutParser {
  /** @param {Object|string} json @returns {Layout} */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return new Layout(json);
  }
  /** @param {Object[]} list @returns {Layout[]} */
  static parseMany(list) { return list.map(LayoutParser.parse); }
}

export { LayoutParser };
