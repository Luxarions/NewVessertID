/**
 * @file Layout manager.
 * @module layouts/LayoutManager
 */

import { Layout } from './Layout.js';
import { LayoutParser } from '../parsers/LayoutParser.js';

/** Stores layouts and tracks the active one. */
class LayoutManager {
  constructor() {
    /** @type {Map<string, Layout>} */ this.layouts = new Map();
    /** @type {Layout|null} */ this.active = null;
  }
  /** @param {Object} json @returns {Layout} */
  register(json) { const l = LayoutParser.parse(json); this.layouts.set(l.name, l); return l; }
  /** @param {string|Object} nameOrJson @returns {Layout|null} */
  load(nameOrJson) {
    if (typeof nameOrJson === 'object') this.active = this.register(nameOrJson);
    else this.active = this.layouts.get(nameOrJson) ?? null;
    return this.active;
  }
  /** @returns {Layout|null} */ current() { return this.active; }
  /** @param {string} name @returns {Layout|undefined} */ get(name) { return this.layouts.get(name); }
  /** @returns {string[]} */ list() { return Array.from(this.layouts.keys()); }
}

export { LayoutManager };
