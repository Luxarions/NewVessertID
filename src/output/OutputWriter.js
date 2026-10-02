/**
 * @file Output writer.
 * @module output/OutputWriter
 */

/** Writes entries into an OutputStream. */
class OutputWriter {
  /** @param {OutputStream} stream - Stream. */
  constructor(stream) { /** @type {OutputStream} */ this.stream = stream; }
  /** @param {Object} entry @returns {void} */ write(entry) { this.stream.emit(entry); }
  /** @param {Object[]} entries @returns {void} */ writeMany(entries) { entries.forEach((e) => this.write(e)); }
}

export { OutputWriter };
