/**
 * @file Named-channel pub/sub bus.
 * @module events/EventBus
 */

/**
 * Multi-channel event bus.
 */
class EventBus {
  /** Creates an empty bus. */
  constructor() {
    /**
     * @type {Map<string, Set<Function>>}
     * @private
     */
    this.channels = new Map();
  }

  /**
   * Returns the channel set for a name.
   *
   * @param {string} name - Channel name.
   * @returns {Set<Function>} The channel's listeners.
   */
  channel(name) {
    if (!this.channels.has(name)) this.channels.set(name, new Set());
    return this.channels.get(name);
  }

  /**
   * Subscribes to a channel.
   *
   * @param {string} name - Channel name.
   * @param {(payload: *) => void} fn - Listener.
   * @returns {() => void} Unsubscribe function.
   */
  on(name, fn) {
    this.channel(name).add(fn);
    return () => this.off(name, fn);
  }

  /**
   * Unsubscribes.
   *
   * @param {string} name - Channel name.
   * @param {Function} fn - Listener.
   * @returns {void}
   */
  off(name, fn) { this.channels.get(name)?.delete(fn); }

  /**
   * Emits a payload.
   *
   * @param {string} name - Channel name.
   * @param {*} payload - Payload.
   * @returns {void}
   */
  emit(name, payload) { this.channels.get(name)?.forEach((fn) => fn(payload)); }

  /** @returns {void} */
  clear() { this.channels.clear(); }
}

export { EventBus };
