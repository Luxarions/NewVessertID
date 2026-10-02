/**
 * @file Lazy locale resolver.
 * @module locales/LocaleResolver
 */

import { LocaleManager } from './LocaleManager.js';
import { JSONLoader } from '../loaders/JSONLoader.js';
import { PATHS } from '../constants.js';

/** Loads locales on demand. */
class LocaleResolver {
  /** @param {LocaleManager} [manager] */
  constructor(manager = new LocaleManager()) {
    /** @type {LocaleManager} */ this.manager = manager;
    /** @type {JSONLoader} */ this.loader = new JSONLoader();
  }
  /** @param {string} name @returns {Promise<Locale>} */
  async resolve(name) {
    if (this.manager.get(name)) return this.manager.get(name);
    const json = await this.loader.load(`${PATHS.LOCALES}/${name}.json`);
    return this.manager.register(json);
  }
}

export { LocaleResolver };
