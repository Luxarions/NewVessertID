/**
 * @file Preset loader.
 * @module loaders/PresetLoader
 */

import { JSONLoader } from './JSONLoader.js';
import { ConsoleParser } from '../parsers/ConsoleParser.js';
import { PATHS } from '../constants.js';

/** Loads presets and resolves `extends`. */
class PresetLoader {
  /** @param {Object} [registry={}] - Base registry. */
  constructor(registry = {}) {
    /** @type {JSONLoader} */ this.loader = new JSONLoader();
    /** @type {Object} */     this.registry = registry;
  }

  /** @param {string} name @returns {Promise<Object>} */
  async load(name) {
    const json = await this.loader.load(`${PATHS.PRESETS}/${name}.console.json`);
    return ConsoleParser.resolveExtends(json, this.registry);
  }
}

export { PresetLoader };
