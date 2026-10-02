/**
 * @file Time helpers.
 * @module utils/TimeUtils
 */

/** Time helpers. @constant {Object} */
export const TimeUtils = {
  /** @returns {number} */ now() { return Date.now(); },
  /** @param {number} [ts=Date.now()] @returns {string} */ iso(ts = Date.now()) { return new Date(ts).toISOString(); },
  /** @param {number} ts @param {string} [pattern='HH:mm:ss.SSS'] @returns {string} */
  format(ts, pattern = 'HH:mm:ss.SSS') {
    const d = new Date(ts);
    const pad = (n, l = 2) => String(n).padStart(l, '0');
    return pattern.replace('HH', pad(d.getHours())).replace('mm', pad(d.getMinutes())).replace('ss', pad(d.getSeconds())).replace('SSS', pad(d.getMilliseconds(), 3));
  }
};
