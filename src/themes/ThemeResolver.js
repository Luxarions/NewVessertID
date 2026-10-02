/**
 * @file Lazy theme resolver.
 * @module themes/ThemeResolver
 */

import { ThemeManager } from './ThemeManager.js';
import { JSONLoader } from '../loaders/JSONLoader.js';
import { PATHS } from '../constants.js';

/** Loads themes on demand. */
class ThemeResolver {
  /** @param {ThemeManager} [manager] */
  constructor(manager = new ThemeManager()) {
    /** @type {ThemeManager} */ this.manager = manager;
    /** @type {JSONLoader} */ this.loader = new JSONLoader();
  }
  /** @param {string} name @returns {Promise<Theme>} */
  async resolve(name) {
    if (this.manager.get(name)) return this.manager.get(name);
    const json = await this.loader.load(`${PATHS.THEMES}/${name}.json`);
    return this.manager.register(json);
  }
}

export { ThemeResolver };
