/**
 * @file Storage adapter.
 * @module storage/StoreAdapter
 */

import { SessionStore } from './SessionStore.js';
import { LocalStore } from './LocalStore.js';

/** Adapter over session/local storage. */
class StoreAdapter {
  /** @param {string} [mode='session'] - 'session' or 'local'. */
  constructor(mode = 'session') {
    /** @type {SessionStore|LocalStore} */
    this.store = mode === 'local' ? new LocalStore() : new SessionStore();
  }
  /** @param {Object} state @returns {void} */ save(state) { this.store.save(state); }
  /** @returns {Object|null} */ load() { return this.store.load(); }
  /** @returns {void} */ clear() { this.store.clear(); }
}

export { StoreAdapter };
