/**
 * @file Array helpers.
 * @module utils/ArrayUtils
 */

/** Array helpers. @constant {Object} */
export const ArrayUtils = {
  /** @param {*[]} arr @param {number} [n=1] @returns {*[]} */ last(arr, n = 1) { return arr.slice(-n); },
  /** @param {*[]} arr @param {number} [n=1] @returns {*[]} */ first(arr, n = 1) { return arr.slice(0, n); },
  /** @param {*[]} arr @returns {*[]} */ unique(arr) { return Array.from(new Set(arr)); },
  /** @param {*[]} arr @param {number} size @returns {*[][]} */
  chunk(arr, size) { const out = []; for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size)); return out; },
  /** @param {*[]} arr @param {Function} fn @returns {Object} */
  groupBy(arr, fn) { return arr.reduce((acc, item) => { const key = fn(item); (acc[key] ??= []).push(item); return acc; }, {}); }
};
