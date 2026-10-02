/**
 * @file Keymap model.
 * @module input/Keymap
 */

/** Represents a keymap. */
class Keymap {
  /** @param {Object} json - Keymap JSON. */
  constructor(json) { /** @type {string} */ this.name = json.name; /** @type {Object} */ this.bindings = json.bindings ?? {}; }
  /** @param {string} combo @returns {string|undefined} */
  actionFor(combo) { return this.bindings[combo]; }
  /** @returns {{key:string,action:string}[]} */
  list() { return Object.entries(this.bindings).map(([key, action]) => ({ key, action })); }
}

export { Keymap };
