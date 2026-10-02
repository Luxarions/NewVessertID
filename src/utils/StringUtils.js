/**
 * @file String helpers.
 * @module utils/StringUtils
 */

/** String helpers. @constant {Object} */
export const StringUtils = {
  /** @param {*} str @param {number} len @param {string} [fill=' '] @returns {string} */
  padEnd(str, len, fill = ' ') { return String(str).padEnd(len, fill); },
  /** @param {*} str @param {number} max @param {string} [suffix='…'] @returns {string} */
  truncate(str, max, suffix = '…') { const s = String(str); return s.length <= max ? s : s.slice(0, max - suffix.length) + suffix; },
  /** @param {*} str @returns {string} */
  stripAnsi(str) { return String(str).replace(/\x1b\[[0-9;]*m/g, ''); },
  /** @param {*} str @returns {string} */
  escapeHtml(str) { return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
};
