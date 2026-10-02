/**
 * @file Bounded command history.
 * @module input/CommandHistory
 */

/** Bounded history with cursor navigation. */
class CommandHistory {
  /** @param {number} [max=1000] - Max entries. */
  constructor(max = 1000) {
    this.max = max;
    /** @type {string[]} */ this.items = [];
    /** @type {number} */ this.cursor = -1;
  }
  /** @param {string} cmd @returns {void} */
  push(cmd) {
    this.items.push(cmd);
    if (this.items.length > this.max) this.items.shift();
    this.cursor = this.items.length;
  }
  /** @returns {string} */ prev() { if (this.cursor > 0) this.cursor--; return this.items[this.cursor]; }
  /** @returns {string} */ next() { if (this.cursor < this.items.length - 1) this.cursor++; return this.items[this.cursor]; }
  /** @returns {void} */ clear() { this.items = []; this.cursor = -1; }
}

export { CommandHistory };
