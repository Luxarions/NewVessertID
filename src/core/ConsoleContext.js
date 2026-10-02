/**
 * @file Read-only service context.
 * @module core/ConsoleContext
 */

/**
 * Wraps resolved services for access.
 */
class ConsoleContext {
  /**
   * @param {Object} state - Console state.
   * @param {Object} [services={}] - Services map.
   */
  constructor(state, services = {}) {
    /** @type {Object} */
    this.state = state;
    /** @type {Object} */
    this.services = services;
    /** @type {number} */
    this.createdAt = Date.now();
  }

  /** @returns {Object|undefined} */ get theme() { return this.services.themes?.current(); }
  /** @returns {Object|undefined} */ get layout() { return this.services.layouts?.current(); }
  /** @returns {Object|undefined} */ get keymap() { return this.services.keymaps?.current(); }
  /** @returns {Object|undefined} */ get locale() { return this.services.locales?.current(); }
  /** @returns {Object|undefined} */ get levels() { return this.services.levels; }
  /** @returns {Object|undefined} */ get buffer() { return this.services.buffer; }
  /** @returns {Object|undefined} */ get renderer() { return this.services.renderer; }

  /**
   * Resolves a dotted path.
   *
   * @param {string} path - Dotted path.
   * @returns {*} Resolved value.
   */
  resolve(path) {
    return path.split('.').reduce((acc, key) => acc?.[key], this.services);
  }
}

export { ConsoleContext };
