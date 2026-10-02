/**
 * @file JSON exporter.
 * @module export/JSONExporter
 */

/** Exports entries as JSON. */
class JSONExporter {
  /** @param {Object[]} entries @returns {string} */
  export(entries) {
    return JSON.stringify(entries.map((e) => ({ level: e.level, message: e.message, timestamp: e.timestamp })), null, 2);
  }
}

export { JSONExporter };
