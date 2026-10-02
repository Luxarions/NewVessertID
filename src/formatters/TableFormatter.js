/**
 * @file Table formatter.
 * @module formatters/TableFormatter
 */

/** Renders array-of-objects as a plaintext table. */
class TableFormatter {
  /** @param {Object[]} rows - Rows. @returns {string} Table. */
  format(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return '';
    const keys = Object.keys(rows[0]);
    const widths = keys.map((k) => Math.max(k.length, ...rows.map((r) => String(r[k] ?? '').length)));
    const header = keys.map((k, i) => k.padEnd(widths[i])).join(' | ');
    const divider = widths.map((w) => '-'.repeat(w)).join('-+-');
    const body = rows.map((r) => keys.map((k, i) => String(r[k] ?? '').padEnd(widths[i])).join(' | ')).join('\n');
    return `${header}\n${divider}\n${body}`;
  }
}

export { TableFormatter };
