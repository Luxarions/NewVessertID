/**
 * @file HTML exporter.
 * @module export/HTMLExporter
 */

/** Exports entries as HTML. */
class HTMLExporter {
  /** @param {Object[]} entries @returns {string} */
  export(entries) {
    const rows = entries.map((e) =>
      `<div class="vessert-line vessert-${e.level}"><span class="vessert-ts">${new Date(e.timestamp).toISOString()}</span> <span class="vessert-lvl">[${e.level.toUpperCase()}]</span> <span class="vessert-msg">${escapeHtml(e.message)}</span></div>`
    ).join('\n');
    return `<div class="vessert-console">\n${rows}\n</div>`;
  }
}

/**
 * @param {*} s - Input.
 * @returns {string} Escaped HTML.
 */
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export { HTMLExporter };
