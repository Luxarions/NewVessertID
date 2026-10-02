/**
 * @file Text exporter.
 * @module export/TextExporter
 */

/** Exports entries as plaintext. */
class TextExporter {
  /** @param {Object[]} entries @returns {string} */
  export(entries) {
    return entries.map((e) => `${new Date(e.timestamp).toISOString()} [${e.level.toUpperCase()}] ${e.message}`).join('\n');
  }
}

export { TextExporter };
