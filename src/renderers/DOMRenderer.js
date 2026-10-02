/**
 * @file DOM renderer.
 * @module renderers/DOMRenderer
 */

/** Renders entries into the DOM. */
class DOMRenderer {
  /** @param {Object} state - Console state. */
  constructor(state) {
    this.state = state;
    /** @type {HTMLElement|null} */ this.root = null;
    /** @type {HTMLElement|null} */ this.list = null;
  }

  /** @param {HTMLElement} [parent] @returns {void} */
  mount(parent = null) {
    if (typeof document === 'undefined') return;
    const targetParent = parent || document.body;
    if (!targetParent) return;
    this.root = document.createElement('div');
    this.root.className = 'vessert-console';
    this.list = document.createElement('div');
    this.list.className = 'vessert-console-list';
    this.root.appendChild(this.list);
    targetParent.appendChild(this.root);
  }

  /** @returns {void} */
  unmount() { this.root?.remove(); this.root = null; this.list = null; }

  /** @param {Object} entry @returns {void} */
  append(entry) {
    if (!this.list) return;
    const line = document.createElement('div');
    line.className = `vessert-line vessert-${entry.level}`;
    line.textContent = entry.message;
    this.list.appendChild(line);
  }

  /** @param {Object[]} entries @returns {void} */
  replaceAll(entries) { if (!this.list) return; this.list.innerHTML = ''; entries.forEach((e) => this.append(e)); }

  /** @returns {void} */
  clear() { if (this.list) this.list.innerHTML = ''; }

  /** @param {Object[]} _results @returns {void} */
  highlight(_results) { /* handled by addon */ }

  /** @param {Object} css @returns {void} */
  setStyles(css) {
    if (!this.root || !css) return;
    Object.entries(css).forEach(([k, v]) => this.root.style.setProperty(k, v));
  }

  /** @param {Object} css @returns {void} */
  setLayout(css) {
    if (!this.root || !css) return;
    Object.entries(css).forEach(([k, v]) => this.root.style.setProperty(k, v));
  }
}

export { DOMRenderer };
