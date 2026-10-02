/**
 * @file Error level preset.
 * @module levels/ErrorLevel
 */

import { Level } from './Level.js';

/** Preset "error" level. */
class ErrorLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('error', { color: '#f85149', prefix: '[ERROR]', bold: true, icon: 'error', ...config }); }
}
export { ErrorLevel };
