/**
 * @file Filter chain.
 * @module filters/FilterChain
 */

import { LevelFilter } from './LevelFilter.js';
import { TextFilter } from './TextFilter.js';
import { RegexFilter } from './RegexFilter.js';

/** Chains level/text/regex filters. */
class FilterChain {
  constructor() {
    /** @type {LevelFilter} */ this.level = new LevelFilter();
    /** @type {TextFilter} */  this.text = new TextFilter();
    /** @type {RegexFilter} */ this.regex = new RegexFilter();
  }
  /** @param {string} q @returns {void} */ setText(q) { this.text.set(q); }
  /** @param {string} q @returns {void} */ setRegex(q) { this.regex.set(q); }
  /** @param {string[]} l @returns {void} */ setLevels(l) { this.level.set(l); }
  /** @param {Object} entry @returns {boolean} */
  pass(entry) { return this.level.pass(entry) && this.text.pass(entry) && this.regex.pass(entry); }
}

export { FilterChain };
