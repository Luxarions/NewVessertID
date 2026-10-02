/**
 * @file Per-line renderer.
 * @module renderers/LineRenderer
 */

/** Appends individual line elements. */
class LineRenderer {
  /** @param {HTMLElement} container - Container element. */
  constructor(container) {
    /** @type {HTMLElement} */ this.container = container;
    /** @type {HTMLElement[]} */ this.lines = [];
  }

  /** @param {Object} entry @returns {void} */
  push(entry) {
    const el = document.createElement('div');
    el.className = `vessert-line vessert-${entry.level}`;
    el.textContent = entry.message;
    this.container.appendChild(el);
    this.lines.push(el);
  }

  /** @returns {void} */ clear() { this.lines.forEach((el) => el.remove()); this.lines = []; }
  /** @returns {number} */ count() { return this.lines.length; }
}

export { LineRenderer };
