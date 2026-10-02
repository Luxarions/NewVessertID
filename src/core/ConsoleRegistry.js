/**
 * @file Registry of live console instances.
 * @module core/ConsoleRegistry
 */

/**
 * Tracks Console instances by id.
 */
class ConsoleRegistry {
  /** Creates an empty registry. */
  constructor() {
    /**
     * @type {Map<string, Object>}
     * @private
     */
    this.instances = new Map();
    /**
     * @type {number}
     * @private
     */
    this.counter = 0;
  }

  /**
   * Registers a console.
   *
   * @param {Object} instance - Console instance.
   * @param {string} [name] - Optional id.
   * @returns {string} Assigned id.
   */
  register(instance, name) {
    const id = name ?? `console-${++this.counter}`;
    this.instances.set(id, instance);
    return id;
  }

  /** @param {string} id @returns {Object|undefined} */ get(id) { return this.instances.get(id); }
  /** @param {string} id @returns {boolean} */ has(id) { return this.instances.has(id); }
  /** @param {string} id @returns {void} */ remove(id) { this.instances.delete(id); }
  /** @returns {void} */ clear() { this.instances.clear(); }
  /** @returns {Object[]} */ all() { return Array.from(this.instances.values()); }
  /** @returns {string[]} */ ids() { return Array.from(this.instances.keys()); }
}

/**
 * Shared singleton.
 * @type {ConsoleRegistry}
 */
export const registry = new ConsoleRegistry();

export { ConsoleRegistry };
