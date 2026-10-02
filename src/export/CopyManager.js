/**
 * @file Clipboard copy manager.
 * @module export/CopyManager
 */

/** Copies buffer contents to clipboard. */
class CopyManager {
  /** @param {import('../output/OutputBuffer.js').OutputBuffer} buffer */
  constructor(buffer) { /** @type {import('../output/OutputBuffer.js').OutputBuffer} */ this.buffer = buffer; }
  /** @returns {Promise<void>} */
  async copyAll() {
    const text = this.buffer.snapshot().map((e) => `[${e.level.toUpperCase()}] ${e.message}`).join('\n');
    return this.copy(text);
  }
  /** @param {string} text @returns {Promise<void>} */
  async copy(text) {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    if (typeof document !== 'undefined') {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
  }
}

export { CopyManager };
