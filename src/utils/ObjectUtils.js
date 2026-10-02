/**
 * @file Object helpers.
 * @module utils/ObjectUtils
 */

/** Object helpers. @constant {Object} */
export const ObjectUtils = {
  /** @param {Object} a @param {Object} b @returns {Object} */
  deepMerge(a, b) {
    const out = { ...a };
    for (const key of Object.keys(b)) {
      if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key])) out[key] = ObjectUtils.deepMerge(a[key] ?? {}, b[key]);
      else out[key] = b[key];
    }
    return out;
  },
  /** @param {Object} obj @param {string[]} keys @returns {Object} */
  pick(obj, keys) { return keys.reduce((acc, k) => { if (k in obj) acc[k] = obj[k]; return acc; }, {}); },
  /** @param {Object} obj @param {string[]} keys @returns {Object} */
  omit(obj, keys) { const out = { ...obj }; keys.forEach((k) => delete out[k]); return out; },
  /** @param {Object} obj @returns {Object} */ clone(obj) { return JSON.parse(JSON.stringify(obj)); }
};
