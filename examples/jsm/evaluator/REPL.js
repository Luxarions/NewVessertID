/**
 * @file Interactive Two-Way REPL Engine.
 * Evaluates JavaScript expressions, queries runtime state, and routes custom commands.
 * @module evaluator/REPL
 */

export class REPL {
  /**
   * @param {import('../../../src/core/Console.js').Console} consoleInstance
   */
  constructor(consoleInstance) {
    this.console = consoleInstance;
    this.history = [];
    this.historyIndex = -1;
    this.scope = {
      Math,
      Date,
      JSON,
      console: consoleInstance
    };
  }

  /**
   * Set additional runtime variables available to REPL expressions.
   * @param {string} name
   * @param {*} value
   */
  bind(name, value) {
    this.scope[name] = value;
  }

  /**
   * Execute input typed into the prompt bar.
   * @param {string} input
   */
  execute(input) {
    const text = String(input || '').trim();
    if (!text) return;

    this.history.push(text);
    this.historyIndex = this.history.length;

    // Delegate to console's evaluate method (handles registered commands + JS expressions)
    this.console.evaluate(text);
  }

  /**
   * Get previous command in history.
   * @returns {string|null}
   */
  getPrevious() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex];
    }
    return null;
  }

  /**
   * Get next command in history.
   * @returns {string|null}
   */
  getNext() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    this.historyIndex = this.history.length;
    return '';
  }
}
