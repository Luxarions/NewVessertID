/**
 * @file Object formatter.
 * @module formatters/ObjectFormatter
 */

/** Converts values into printable strings. */
class ObjectFormatter {
  /** @param {*} value - Value. @returns {string} Formatted. */
  format(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    const t = typeof value;
    if (t === 'string') return value;
    if (t === 'number' || t === 'boolean' || t === 'bigint') return String(value);
    if (t === 'function') return `[Function ${value.name || 'anonymous'}]`;
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (value instanceof Date) return value.toISOString();
    if (value instanceof Map) return `Map(${value.size})`;
    if (value instanceof Set) return `Set(${value.size})`;
    try { return JSON.stringify(value, null, 2); }
    catch { return String(value); }
  }
}

export { ObjectFormatter };
