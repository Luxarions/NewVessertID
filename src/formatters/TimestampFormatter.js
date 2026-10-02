/**
 * @file Timestamp formatter.
 * @module formatters/TimestampFormatter
 */

/** Formats timestamps using HH/mm/ss/SSS tokens. */
class TimestampFormatter {
  /** @param {string} [pattern='HH:mm:ss.SSS'] - Pattern. */
  constructor(pattern = 'HH:mm:ss.SSS') { /** @type {string} */ this.pattern = pattern; }

  /** @returns {string} Now formatted. */
  now() { return this.format(new Date()); }

  /**
   * @param {Date} date - Date.
   * @returns {string} Formatted string.
   */
  format(date) {
    const pad = (n, len = 2) => String(n).padStart(len, '0');
    return this.pattern
      .replace('HH', pad(date.getHours()))
      .replace('mm', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()))
      .replace('SSS', pad(date.getMilliseconds(), 3));
  }
}

export { TimestampFormatter };
