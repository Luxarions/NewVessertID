/**
 * @file Keymap parser.
 * @module parsers/KeymapParser
 */

import { Keymap } from '../input/Keymap.js';

/** Parses keymap JSON. */
class KeymapParser {
  /** @param {Object|string} json @returns {Keymap} */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return new Keymap(json);
  }
  /** @param {Object[]} list @returns {Keymap[]} */
  static parseMany(list) { return list.map(KeymapParser.parse); }
}

export { KeymapParser };
