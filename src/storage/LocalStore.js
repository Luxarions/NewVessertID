/**
 * @file localStorage wrapper.
 * @module storage/LocalStore
 */

/** Persists state to localStorage. */
class LocalStore {
  /** @param {string} [key='vessert-console'] */
  constructor(key = 'vessert-console') { /** @type {string} */ this.key = key; }
  /** @param {Object} state @returns {void} */
  save(state) { try { localStorage.setItem(this.key, JSON.stringify(state)); } catch { /* ignore */ } }
  /** @returns {Object|null} */
  load() { try { const raw = localStorage.getItem(this.key); return raw ? JSON.parse(raw) : null; } catch { return null; } }
  /** @returns {void} */ clear() { try { localStorage.removeItem(this.key); } catch { /* ignore */ } }
}

export { LocalStore };
