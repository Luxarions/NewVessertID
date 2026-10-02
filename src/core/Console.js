/**
 * @file User-facing Console class.
 * @module core/Console
 */

import { ConsoleEngine } from './ConsoleEngine.js';
import { ConsoleState } from './ConsoleState.js';
import { EventDispatcher } from '../events/EventDispatcher.js';
import { EVENTS } from '../constants.js';

/**
 * Primary user-facing class wrapping ConsoleEngine.
 * @extends EventDispatcher
 */
class Console extends EventDispatcher {
  /**
   * @param {Object} [config={}] - Configuration.
   */
  constructor(config = {}) {
    super();
    /** @type {ConsoleState} */
    this.state = new ConsoleState(config);
    /** @type {ConsoleEngine} */
    this.engine = new ConsoleEngine(this.state);
    this.engine.on(EVENTS.LOG, (e) => this.dispatchEvent({ type: EVENTS.LOG, data: e }));
    this.engine.on(EVENTS.ERROR, (e) => this.dispatchEvent({ type: EVENTS.ERROR, data: e }));
    this.engine.init();
  }

  /** @param {...*} args @returns {void} */ log(...args) { return this.engine.write('log', args); }
  /** @param {...*} args @returns {void} */ info(...args) { return this.engine.write('info', args); }
  /** @param {...*} args @returns {void} */ warn(...args) { return this.engine.write('warn', args); }
  /** @param {...*} args @returns {void} */ error(...args) { return this.engine.write('error', args); }
  /** @param {...*} args @returns {void} */ debug(...args) { return this.engine.write('debug', args); }
  /** @param {...*} args @returns {void} */ trace(...args) { return this.engine.write('trace', args); }

  /** @returns {void} */ clear() { return this.engine.clear(); }
  /** @param {string} query @returns {void} */ filter(query) { return this.engine.filter(query); }
  /** @param {string} query @returns {void} */ search(query) { return this.engine.search(query); }
  /** @param {string} format @returns {string} */ export(format) { return this.engine.export(format); }
  /** @returns {Promise<void>} */ copy() { return this.engine.copy(); }

  /** @param {string} name @returns {void} */ setTheme(name) { return this.engine.setTheme(name); }
  /** @param {string} name @returns {void} */ setLayout(name) { return this.engine.setLayout(name); }
  /** @param {string} name @returns {void} */ setKeymap(name) { return this.engine.setKeymap(name); }
  /** @param {string} name @returns {void} */ setLocale(name) { return this.engine.setLocale(name); }

  /** @returns {void} */
  destroy() {
    this.engine.destroy();
    this.dispatchEvent({ type: EVENTS.DESTROY });
  }
}

export { Console };
