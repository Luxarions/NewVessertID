/**
 * @file Minimal DOM-like event dispatcher.
 * @module events/EventDispatcher
 */

/**
 * Dispatches typed events to registered listeners.
 */
class EventDispatcher {
  /** Creates a new dispatcher. */
  constructor() {
    /**
     * @type {Map<string, Set<Function>>}
     * @private
     */
    this.listeners = new Map();
  }

  /**
   * Registers a listener.
   *
   * @param {string} type - Event type.
   * @param {(event: {type: string}) => void} fn - Listener.
   * @returns {() => void} Unsubscribe function.
   */
  on(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
    return () => this.off(type, fn);
  }

  /**
   * Removes a listener.
   *
   * @param {string} type - Event type.
   * @param {Function} fn - Listener.
   * @returns {void}
   */
  off(type, fn) {
    this.listeners.get(type)?.delete(fn);
  }

  /**
   * Registers a one-shot listener.
   *
   * @param {string} type - Event type.
   * @param {Function} fn - Listener.
   * @returns {() => void} Unsubscribe function.
   */
  once(type, fn) {
    const unsub = this.on(type, (e) => { unsub(); fn(e); });
    return unsub;
  }

  /**
   * Dispatches an event.
   *
   * @param {{type: string}} event - Event object.
   * @returns {void}
   */
  dispatchEvent(event) {
    this.listeners.get(event.type)?.forEach((fn) => fn(event));
  }

  /**
   * Checks whether a type has listeners.
   *
   * @param {string} type - Event type.
   * @returns {boolean} True if listeners exist.
   */
  hasEvent(type) {
    return (this.listeners.get(type)?.size ?? 0) > 0;
  }
}

export { EventDispatcher };
