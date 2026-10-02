/**
 * @file Debug level preset.
 * @module levels/DebugLevel
 */

import { Level } from './Level.js';

/** Preset "debug" level. */
class DebugLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('debug', { color: '#8b949e', prefix: '[DEBUG]', italic: true, icon: 'debug', ...config }); }
}
export { DebugLevel };
