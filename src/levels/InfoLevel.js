/**
 * @file Info level preset.
 * @module levels/InfoLevel
 */

import { Level } from './Level.js';

/** Preset "info" level. */
class InfoLevel extends Level {
  /** @param {Object} [config] */ constructor(config) { super('info', { color: '#58a6ff', prefix: '[INFO]', icon: 'info', ...config }); }
}
export { InfoLevel };
