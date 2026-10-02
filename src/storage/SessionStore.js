/**
 * @file sessionStorage wrapper.
 * @module storage/SessionStore
 */

/** Persists state to sessionStorage. */
class SessionStore {
  /** @param {string} [key='vessert-console'] */
  constructor(key = 'vessert-console') { /** @type {string} */ this.key = key; }
  /** @param {Object} state @returns {void} */
  save(state) { try { sessionStorage.setItem(this.key, JSON.stringify(state)); } catch { /* ignore */ } }
  /** @returns {Object|null} */
  load() { try { const raw = sessionStorage.getItem(this.key); return raw ? JSON.parse(raw) : null; } catch { return null; } }
  /** @returns {void} */ clear() { try { sessionStorage.removeItem(this.key); } catch { /* ignore */ } }
}

export { SessionStore };
