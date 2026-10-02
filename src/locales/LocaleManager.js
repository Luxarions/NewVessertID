/**
 * @file Locale manager.
 * @module locales/LocaleManager
 */

import { Locale } from './Locale.js';
import { LocaleParser } from '../parsers/LocaleParser.js';

/** Stores locales and tracks the active one. */
class LocaleManager {
  constructor() {
    /** @type {Map<string, Locale>} */ this.locales = new Map();
    /** @type {Locale|null} */ this.active = null;
  }
  /** @param {Object} json @returns {Locale} */
  register(json) { const l = LocaleParser.parse(json); this.locales.set(l.name, l); return l; }
  /** @param {string|Object} nameOrJson @returns {Locale|null} */
  load(nameOrJson) {
    if (typeof nameOrJson === 'object') this.active = this.register(nameOrJson);
    else this.active = this.locales.get(nameOrJson) ?? null;
    return this.active;
  }
  /** @param {string} key @param {string} [fallback] @returns {string} */
  t(key, fallback) { return this.active?.t(key, fallback) ?? fallback ?? key; }
  /** @returns {Locale|null} */ current() { return this.active; }
  /** @param {string} name @returns {Locale|undefined} */ get(name) { return this.locales.get(name); }
  /** @returns {string[]} */ list() { return Array.from(this.locales.keys()); }
}

export { LocaleManager };
