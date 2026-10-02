/**
 * @file Log level preset.
 * @module levels/LogLevel
 */

import { Level } from './Level.js';

/** Preset "log" level. */
class LogLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('log', { color: '#c9d1d9', prefix: '', icon: 'log', ...config }); }
}
export { LogLevel };
