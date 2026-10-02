/**
 * @file Runtime configuration state.
 * @module core/ConsoleState
 */

import { DEFAULTS } from '../constants.js';

/**
 * Encapsulates mutable runtime configuration.
 */
class ConsoleState {
  /**
   * @param {Object} [config={}] - Partial configuration.
   */
  constructor(config = {}) {
    /** @type {string} */
    this.name = config.name ?? 'default';
    /** @type {string} */
    this.version = config.version ?? '1.0.0';
    /** @type {string} */
    this.author = config.author ?? '';
    /** @type {string} */
    this.license = config.license ?? 'MIT';
    /** @type {string} */
    this.theme = config.theme ?? DEFAULTS.THEME;
    /** @type {string} */
    this.layout = config.layout ?? DEFAULTS.LAYOUT;
    /** @type {string} */
    this.keymap = config.keymap ?? DEFAULTS.KEYMAP;
    /** @type {string} */
    this.locale = config.locale ?? DEFAULTS.LOCALE;
    /** @type {{family: string, size: number, lineHeight: number, weight: number}} */
    this.font = config.font ?? {
      family: DEFAULTS.FONT_FAMILY, size: DEFAULTS.FONT_SIZE,
      lineHeight: DEFAULTS.LINE_HEIGHT, weight: 400
    };
    /** @type {Record<string, Object>} */
    this.levels = config.levels ?? {};
    /** @type {Object} */
    this.features = { ...ConsoleState.defaultFeatures(), ...(config.features ?? {}) };
    /** @type {Record<string, string>} */
    this.shortcuts = config.shortcuts ?? {};
    /** @type {number} */
    this.maxLines = this.features.maxLines ?? DEFAULTS.MAX_LINES;
    /** @type {number} */
    this.maxHistory = this.features.maxHistory ?? DEFAULTS.MAX_HISTORY;
  }

  /**
   * Returns default feature flags.
   *
   * @returns {Object} Default features.
   */
  static defaultFeatures() {
    return {
      timestamp: true, timestampFormat: 'HH:mm:ss.SSS', stackTrace: true,
      groupIndent: DEFAULTS.GROUP_INDENT, clearOnReload: false,
      maxLines: DEFAULTS.MAX_LINES, maxHistory: DEFAULTS.MAX_HISTORY,
      autoScroll: true, wrapLines: true, showLineNumbers: true, showSource: true,
      filterable: true, searchable: true, exportable: true, copyable: true
    };
  }

  /**
   * Merges a patch into the state.
   *
   * @param {Object} patch - Patch object.
   * @returns {ConsoleState} This instance.
   */
  merge(patch) {
    Object.assign(this, patch);
    Object.assign(this.features, patch.features ?? {});
    return this;
  }
}

export { ConsoleState };
