/**
 * @file Exporter facade.
 * @module export/Exporter
 */

import { JSONExporter } from './JSONExporter.js';
import { TextExporter } from './TextExporter.js';
import { HTMLExporter } from './HTMLExporter.js';

/** Dispatches to format-specific exporters. */
class Exporter {
  /** @param {import('../output/OutputBuffer.js').OutputBuffer} buffer */
  constructor(buffer) {
    /** @type {import('../output/OutputBuffer.js').OutputBuffer} */ this.buffer = buffer;
    /** @type {JSONExporter} */ this.json = new JSONExporter();
    /** @type {TextExporter} */ this.text = new TextExporter();
    /** @type {HTMLExporter} */ this.html = new HTMLExporter();
  }
  /** @param {string} [format='json'] @returns {string} */
  export(format = 'json') {
    const entries = this.buffer.snapshot();
    switch (format) {
      case 'json': return this.json.export(entries);
      case 'text': return this.text.export(entries);
      case 'html': return this.html.export(entries);
      default: throw new Error(`Unknown export format: ${format}`);
    }
  }
}

export { Exporter };
