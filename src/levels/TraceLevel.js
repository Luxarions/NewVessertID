/**
 * @file Trace level preset.
 * @module levels/TraceLevel
 */

import { Level } from './Level.js';

/** Preset "trace" level. */
class TraceLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('trace', { color: '#6e7681', prefix: '[TRACE]', underline: true, icon: 'debug', ...config }); }
}
export { TraceLevel };
