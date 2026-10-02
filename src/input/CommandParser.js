/**
 * @file Keyboard event parser.
 * @module input/CommandParser
 */

/** Parses key events into actions. */
class CommandParser {
  /** @param {Keymap} keymap - Keymap. */
  constructor(keymap) { /** @type {Keymap} */ this.keymap = keymap; }

  /** @param {KeyboardEvent} event @returns {{combo:string,action:string|undefined}} */
  parse(event) {
    const combo = this.combo(event);
    return { combo, action: this.keymap?.actionFor(combo) };
  }

  /** @param {KeyboardEvent} event @returns {string} */
  combo(event) {
    const parts = [];
    if (event.ctrlKey)  parts.push('Ctrl');
    if (event.shiftKey) parts.push('Shift');
    if (event.altKey)   parts.push('Alt');
    if (event.metaKey)  parts.push('Meta');
    parts.push(event.key.length === 1 ? event.key.toUpperCase() : event.key);
    return parts.join('+');
  }
}

export { CommandParser };
