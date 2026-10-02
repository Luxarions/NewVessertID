/**
 * @file Subsystem Channel / Scoped Logger.
 * @module core/Channel
 */

/**
 * Dedicated subsystem channel logger that automatically prefixes and tags logs.
 * Enables engine subsystem filtering (e.g. RENDERER, PHYSICS, AUDIO, CORE).
 */
export class Channel {
  /**
   * @param {string} name - Channel / Subsystem name (e.g. 'RENDERER').
   * @param {import('./Console.js').Console} consoleInstance - Root console instance.
   */
  constructor(name, consoleInstance) {
    this.name = String(name || 'GENERAL').toUpperCase();
    this.console = consoleInstance;
  }

  /**
   * Internal write method tagging entries with channel metadata.
   * @private
   */
  _write(level, args) {
    const prefix = `[${this.name}]`;
    const formattedArgs = typeof args[0] === 'string'
      ? [`${prefix} ${args[0]}`, ...args.slice(1)]
      : [prefix, ...args];

    return this.console.engine.write(level, formattedArgs, { channel: this.name });
  }

  log(...args) { return this._write('log', args); }
  info(...args) { return this._write('info', args); }
  warn(...args) { return this._write('warn', args); }
  error(...args) { return this._write('error', args); }
  fatal(...args) { return this._write('fatal', args); }
  debug(...args) { return this._write('debug', args); }
  trace(...args) { return this._write('trace', args); }

  /**
   * Tabular data output tagged with channel.
   * @param {Array<Object>} data
   * @param {string[]} [columns]
   */
  table(data, columns) {
    return this.console.table(data, columns, { channel: this.name });
  }

  /**
   * Object inspection tagged with channel.
   * @param {Object} obj
   */
  dir(obj) {
    return this.console.dir(obj, { channel: this.name });
  }

  /**
   * Starts a profiling timer in this channel.
   * @param {string} label
   */
  time(label) {
    return this.console.time(`${this.name}:${label}`);
  }

  /**
   * Ends a profiling timer in this channel.
   * @param {string} label
   */
  timeEnd(label) {
    return this.console.timeEnd(`${this.name}:${label}`);
  }

  /**
   * Asserts a condition with channel tag.
   * @param {boolean} condition
   * @param {...*} args
   */
  assert(condition, ...args) {
    if (!condition) {
      this._write('error', [`Assertion failed:`, ...args]);
    }
  }
}
