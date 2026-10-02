/**
 * @file Warn level preset.
 * @module levels/WarnLevel
 */

import { Level } from './Level.js';

/** Preset "warn" level. */
class WarnLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('warn', { color: '#d29922', prefix: '[WARN]', icon: 'warn', ...config }); }
}
export { WarnLevel };
