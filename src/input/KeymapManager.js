/**
 * @file Keymap manager.
 * @module input/KeymapManager
 */

import { Keymap } from './Keymap.js';
import { KeymapParser } from '../parsers/KeymapParser.js';

/** Stores keymaps and tracks the active one. */
class KeymapManager {
  constructor() {
    /** @type {Map<string, Keymap>} */ this.keymaps = new Map();
    /** @type {Keymap|null} */ this.active = null;
  }
  /** @param {Object} json @returns {Keymap} */
  register(json) { const k = KeymapParser.parse(json); this.keymaps.set(k.name, k); return k; }
  /** @param {string|Object} nameOrJson @returns {Keymap|null} */
  load(nameOrJson) {
    if (typeof nameOrJson === 'object') this.active = this.register(nameOrJson);
    else this.active = this.keymaps.get(nameOrJson) ?? null;
    return this.active;
  }
  /** @returns {Keymap|null} */ current() { return this.active; }
  /** @param {string} name @returns {Keymap|undefined} */ get(name) { return this.keymaps.get(name); }
  /** @returns {string[]} */ list() { return Array.from(this.keymaps.keys()); }
}

export { KeymapManager };
