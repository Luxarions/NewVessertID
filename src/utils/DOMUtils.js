/**
 * @file DOM helpers.
 * @module utils/DOMUtils
 */

/** DOM helpers. @constant {Object} */
export const DOMUtils = {
  /** @param {string} tag @param {Object} [attrs={}] @param {(Node|string)[]} [children=[]] @returns {HTMLElement} */
  el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return node;
  },
  /** @param {EventTarget} target @param {string} event @param {Function} handler @param {Object} [options] @returns {() => void} */
  on(target, event, handler, options) { target.addEventListener(event, handler, options); return () => target.removeEventListener(event, handler, options); },
  /** @param {Function} fn @returns {void} */
  ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn, { once: true }); }
};
