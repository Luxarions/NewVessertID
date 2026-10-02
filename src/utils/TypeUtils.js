/**
 * @file Type checkers.
 * @module utils/TypeUtils
 */

/** Type checkers. @constant {Object} */
export const TypeUtils = {
  /** @param {*} v @returns {boolean} */ isString(v) { return typeof v === 'string'; },
  /** @param {*} v @returns {boolean} */ isNumber(v) { return typeof v === 'number' && Number.isFinite(v); },
  /** @param {*} v @returns {boolean} */ isBoolean(v) { return typeof v === 'boolean'; },
  /** @param {*} v @returns {boolean} */ isFunction(v) { return typeof v === 'function'; },
  /** @param {*} v @returns {boolean} */ isArray(v) { return Array.isArray(v); },
  /** @param {*} v @returns {boolean} */ isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); },
  /** @param {*} v @returns {boolean} */ isPromise(v) { return v && typeof v.then === 'function'; },
  /** @param {*} v @returns {boolean} */ isError(v) { return v instanceof Error; }
};
