/**
 * @file High-level asset loader.
 * @module loaders/AssetLoader
 */

import { JSONLoader } from './JSONLoader.js';
import { SVGLoader } from './SVGLoader.js';
import { PATHS } from '../constants.js';

/** Loads assets by category. */
class AssetLoader {
  constructor() {
    /** @type {JSONLoader} */ this.json = new JSONLoader();
    /** @type {SVGLoader} */  this.svg  = new SVGLoader();
  }

  /** @param {string} name @returns {Promise<*>} */ console(name) { return this.json.load(`${PATHS.CONSOLE}/${name}/${name}.console.json`); }
  /** @param {string} name @returns {Promise<*>} */ theme(name)   { return this.json.load(`${PATHS.THEMES}/${name}.json`); }
  /** @param {string} name @returns {Promise<*>} */ layout(name)  { return this.json.load(`${PATHS.LAYOUTS}/${name}.json`); }
  /** @param {string} name @returns {Promise<*>} */ keymap(name)  { return this.json.load(`${PATHS.KEYMAPS}/${name}.json`); }
  /** @param {string} name @returns {Promise<*>} */ locale(name)  { return this.json.load(`${PATHS.LOCALES}/${name}.json`); }
  /** @param {string} name @returns {Promise<*>} */ preset(name)  { return this.json.load(`${PATHS.PRESETS}/${name}.console.json`); }
  /** @param {string} name @returns {Promise<string>} */ icon(name) { return this.svg.load(`${PATHS.ICONS}/${name}.svg`); }
}

export { AssetLoader };
