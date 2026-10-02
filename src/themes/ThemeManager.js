/**
 * @file Theme manager.
 * @module themes/ThemeManager
 */

import { Theme } from './Theme.js';
import { ThemeParser } from '../parsers/ThemeParser.js';

/** Stores themes and tracks the active one. */
class ThemeManager {
  constructor() {
    /** @type {Map<string, Theme>} */ this.themes = new Map();
    /** @type {Theme|null} */ this.active = null;
  }
  /** @param {Object} json @returns {Theme} */
  register(json) { const t = ThemeParser.parse(json); this.themes.set(t.name, t); return t; }
  /** @param {string|Object} nameOrJson @returns {Theme|null} */
  load(nameOrJson) {
    if (typeof nameOrJson === 'object') this.active = this.register(nameOrJson);
    else this.active = this.themes.get(nameOrJson) ?? null;
    return this.active;
  }
  /** @returns {Theme|null} */ current() { return this.active; }
  /** @param {string} name @returns {Theme|undefined} */ get(name) { return this.themes.get(name); }
  /** @returns {string[]} */ list() { return Array.from(this.themes.keys()); }
}

export { ThemeManager };
