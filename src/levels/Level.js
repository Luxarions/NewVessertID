/**
 * @file Level model.
 * @module levels/Level
 */

/** Represents a single log level. */
class Level {
  /** @param {string} name @param {Object} [config={}] */
  constructor(name, config = {}) {
    /** @type {string} */  this.name = name;
    /** @type {string} */  this.color = config.color ?? '#ffffff';
    /** @type {string} */  this.background = config.background ?? 'transparent';
    /** @type {string} */  this.prefix = config.prefix ?? '';
    /** @type {string} */  this.suffix = config.suffix ?? '';
    /** @type {boolean} */ this.bold = config.bold ?? false;
    /** @type {boolean} */ this.italic = config.italic ?? false;
    /** @type {boolean} */ this.underline = config.underline ?? false;
    /** @type {string} */  this.icon = config.icon ?? name;
    /** @type {boolean} */ this.enabled = true;
  }
}

export { Level };
