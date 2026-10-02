/**
 * @file Level manager.
 * @module levels/LevelManager
 */

import { Level } from './Level.js';
import { LEVELS } from '../constants.js';

/** Manages registered levels. */
class LevelManager {
  constructor() { /** @type {Map<string, Level>} */ this.levels = new Map(); }
  /** @returns {void} */
  loadAll() {
    Object.values(LEVELS).forEach((name) => {
      if (!this.levels.has(name)) this.levels.set(name, new Level(name));
    });
  }
  /** @param {string} name @param {Object} config @returns {void} */ define(name, config) { this.levels.set(name, new Level(name, config)); }
  /** @param {string} name @returns {Level|undefined} */ get(name) { return this.levels.get(name); }
  /** @param {string} name @returns {boolean} */ isEnabled(name) { return this.levels.get(name)?.enabled ?? false; }
  /** @param {string} name @returns {void} */ disable(name) { const l = this.get(name); if (l) l.enabled = false; }
  /** @param {string} name @returns {void} */ enable(name) { const l = this.get(name); if (l) l.enabled = true; }
  /** @returns {string[]} */ list() { return Array.from(this.levels.keys()); }
}

export { LevelManager };
