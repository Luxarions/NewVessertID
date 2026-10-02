/**
 * @file Locale parser.
 * @module parsers/LocaleParser
 */

import { Locale } from '../locales/Locale.js';

/** Parses locale JSON. */
class LocaleParser {
  /** @param {Object|string} json @returns {Locale} */
  static parse(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return new Locale(json);
  }
  /** @param {Object[]} list @returns {Locale[]} */
  static parseMany(list) { return list.map(LocaleParser.parse); }
}

export { LocaleParser };
