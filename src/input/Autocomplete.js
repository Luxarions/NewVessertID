/**
 * @file Prefix autocomplete.
 * @module input/Autocomplete
 */

/** Simple prefix autocomplete. */
class Autocomplete {
  /** @param {string[]} [commands=[]] - Commands. */
  constructor(commands = []) { /** @type {string[]} */ this.commands = commands; }
  /** @param {string[]} cmds @returns {void} */ setCommands(cmds) { this.commands = cmds; }
  /** @param {string} input @returns {string[]} */
  suggest(input) {
    const q = input.toLowerCase();
    return this.commands.filter((c) => c.toLowerCase().startsWith(q));
  }
}

export { Autocomplete };
