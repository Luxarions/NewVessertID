/**
 * @file Engine lifecycle tracker.
 * @module core/ConsoleLifecycle
 */

import { EVENTS } from '../constants.js';

/**
 * Tracks lifecycle transitions.
 */
class ConsoleLifecycle {
  /**
   * @param {import('./ConsoleEngine.js').ConsoleEngine} engine - Engine.
   */
  constructor(engine) {
    /** @type {import('./ConsoleEngine.js').ConsoleEngine} */
    this.engine = engine;
    /** @type {string[]} */
    this.stages = ['created', 'mounted', 'ready', 'destroyed'];
    /** @type {string} */
    this.current = 'created';
  }

  /**
   * Transitions to a stage.
   *
   * @param {string} stage - Target stage.
   * @returns {void}
   */
  transition(stage) {
    if (!this.stages.includes(stage)) return;
    const from = this.current;
    this.current = stage;
    this.engine.dispatchEvent({ type: `lifecycle:${stage}`, from, to: stage });
  }

  /** @param {Function} fn @returns {void} */
  onReady(fn) { this.engine.on(EVENTS.READY, fn); }

  /** @param {Function} fn @returns {void} */
  onDestroy(fn) { this.engine.on(EVENTS.DESTROY, fn); }
}

export { ConsoleLifecycle };
