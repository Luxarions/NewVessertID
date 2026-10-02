/**
 * @file User-facing Console class.
 * Extended with Engine Subsystems, Profiler, Channels, REPL, and Multi-Sink routing.
 * @module core/Console
 */

import { ConsoleEngine } from './ConsoleEngine.js';
import { ConsoleState } from './ConsoleState.js';
import { EventDispatcher } from '../events/EventDispatcher.js';
import { TableFormatter } from '../formatters/TableFormatter.js';
import { Profiler } from './Profiler.js';
import { Channel } from './Channel.js';
import { ApiAuditor } from './ApiAuditor.js';
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
    /** @type {TableFormatter} */
    this.tableFormatter = new TableFormatter();
    /** @type {Profiler} */
    this.profiler = new Profiler();
    /** @type {ApiAuditor} */
    this.auditor = new ApiAuditor(this);
    /** @type {Map<string, Channel>} */
    this.channels = new Map();
    /** @type {Map<string, { handler: Function, description: string }>} */
    this.commands = new Map();
    /** @type {string[]} */
    this.groupStack = [];

    this.engine.on(EVENTS.LOG, (e) => this.dispatchEvent({ type: EVENTS.LOG, data: e }));
    this.engine.on(EVENTS.ERROR, (e) => this.dispatchEvent({ type: EVENTS.ERROR, data: e }));
    this.engine.init();

    // Register built-in default engine commands
    this._registerDefaultCommands();
  }

  /* --------------------------------------------------------------------------
     Core Logging Methods
     -------------------------------------------------------------------------- */
  /** @param {...*} args @returns {void} */ log(...args) { return this._dispatchWrite('log', args); }
  /** @param {...*} args @returns {void} */ info(...args) { return this._dispatchWrite('info', args); }
  /** @param {...*} args @returns {void} */ warn(...args) { return this._dispatchWrite('warn', args); }
  /** @param {...*} args @returns {void} */ error(...args) { return this._dispatchWrite('error', args); }
  /** @param {...*} args @returns {void} */ fatal(...args) { return this._dispatchWrite('fatal', args); }
  /** @param {...*} args @returns {void} */ debug(...args) { return this._dispatchWrite('debug', args); }
  /** @param {...*} args @returns {void} */ trace(...args) { return this._dispatchWrite('trace', args); }

  /**
   * Internal write dispatcher applying active group indentations.
   * @private
   */
  _dispatchWrite(level, args, metadata = {}) {
    let finalArgs = args;
    if (this.groupStack.length > 0) {
      const indent = '  '.repeat(this.groupStack.length);
      finalArgs = typeof args[0] === 'string'
        ? [`${indent}${args[0]}`, ...args.slice(1)]
        : [indent, ...args];
    }
    return this.engine.write(level, finalArgs, metadata);
  }

  /* --------------------------------------------------------------------------
     Subsystem Channels (DSRT / Game Engine Pattern)
     -------------------------------------------------------------------------- */
  /**
   * Acquire a dedicated subsystem channel (e.g. 'RENDERER', 'PHYSICS', 'AUDIO').
   * @param {string} name - Channel identifier.
   * @returns {Channel}
   */
  channel(name) {
    const key = String(name || 'GENERAL').toUpperCase();
    if (!this.channels.has(key)) {
      this.channels.set(key, new Channel(key, this));
    }
    return this.channels.get(key);
  }

  /**
   * Alias for channel()
   * @param {string} name
   * @returns {Channel}
   */
  scope(name) {
    return this.channel(name);
  }

  /* --------------------------------------------------------------------------
     Advanced Console API Operations
     -------------------------------------------------------------------------- */
  /**
   * Display tabular data formatted as an ASCII/HTML grid.
   * @param {Array<Object>|Object} data - Array of record objects.
   * @param {string[]} [columns] - Optional subset of columns.
   * @param {Object} [metadata={}]
   */
  table(data, columns, metadata = {}) {
    let rows = [];
    if (Array.isArray(data)) {
      rows = data;
    } else if (typeof data === 'object' && data !== null) {
      rows = Object.entries(data).map(([key, value]) => ({ '(index)': key, Values: value }));
    }

    if (columns && Array.isArray(columns) && columns.length > 0) {
      rows = rows.map((r) => {
        const filtered = {};
        for (const col of columns) {
          filtered[col] = r[col];
        }
        return filtered;
      });
    }

    const tableStr = this.tableFormatter.format(rows);
    return this.engine.write('log', [tableStr || '(empty table)'], { type: 'table', rawData: rows, ...metadata });
  }

  /**
   * Interactive object property inspector.
   * @param {Object} obj
   * @param {Object} [metadata={}]
   */
  dir(obj, metadata = {}) {
    let repr;
    try {
      repr = JSON.stringify(obj, null, 2);
    } catch {
      repr = String(obj);
    }
    return this.engine.write('debug', [repr], { type: 'dir', rawObj: obj, ...metadata });
  }

  /**
   * Start a performance timer.
   * @param {string} [label='default']
   */
  time(label = 'default') {
    this.profiler.time(label);
  }

  /**
   * Log current timer elapsed duration.
   * @param {string} [label='default']
   * @param {...*} extraArgs
   */
  timeLog(label = 'default', ...extraArgs) {
    const msg = this.profiler.timeLog(label, ...extraArgs);
    this._dispatchWrite('info', [msg], { type: 'time' });
  }

  /**
   * Stop timer and log total elapsed duration.
   * @param {string} [label='default']
   */
  timeEnd(label = 'default') {
    const msg = this.profiler.timeEnd(label);
    this._dispatchWrite('info', [msg], { type: 'time' });
  }

  /**
   * Assert a condition; if false, emit error.
   * @param {boolean} condition
   * @param {...*} args
   */
  assert(condition, ...args) {
    if (!condition) {
      const msg = args.length > 0 ? args : ['Assertion failed'];
      this._dispatchWrite('error', ['Assertion failed:', ...msg], { type: 'assert' });
    }
  }

  /**
   * Increment execution counter for label.
   * @param {string} [label='default']
   */
  count(label = 'default') {
    const msg = this.profiler.count(label);
    this._dispatchWrite('info', [msg], { type: 'count' });
  }

  /**
   * Reset execution counter for label.
   * @param {string} [label='default']
   */
  countReset(label = 'default') {
    this.profiler.countReset(label);
  }

  /**
   * Begin an indented log group.
   * @param {string} [label='console.group']
   */
  group(label = 'console.group') {
    this._dispatchWrite('log', [`▼ ${label}`]);
    this.groupStack.push(label);
  }

  /**
   * Begin a collapsed log group.
   * @param {string} [label='console.groupCollapsed']
   */
  groupCollapsed(label = 'console.groupCollapsed') {
    this._dispatchWrite('log', [`▶ ${label}`]);
    this.groupStack.push(label);
  }

  /**
   * Exit the innermost log group.
   */
  groupEnd() {
    if (this.groupStack.length > 0) {
      this.groupStack.pop();
    }
  }

  /* --------------------------------------------------------------------------
     Multi-Sink & Browser DevTools Router
     -------------------------------------------------------------------------- */
  /**
   * Toggle mirroring output to native browser window.console.
   * @param {boolean} enabled
   */
  setBrowserMirror(enabled) {
    this.engine.sinkRouter.setBrowserMirror(enabled);
  }

  /**
   * Add a custom log sink subscriber (e.g. remote telemetry).
   * @param {Function} sinkFn
   * @returns {Function} Unsubscribe
   */
  addSink(sinkFn) {
    return this.engine.sinkRouter.addSink(sinkFn);
  }

  /* --------------------------------------------------------------------------
     API Usage Detector & Telemetry Auditor
     -------------------------------------------------------------------------- */
  /**
   * Wrap an API object/module with an observable audit proxy that detects
   * method calls, parameter validation, deprecation warnings, and execution durations.
   * @template T
   * @param {T} target
   * @param {string} [namespace='API']
   * @returns {T}
   */
  audit(target, namespace = 'API') {
    return this.auditor.audit(target, namespace);
  }

  /**
   * Register a deprecation warning for an API method.
   * @param {string} methodName
   * @param {string} [replacement]
   */
  deprecate(methodName, replacement = '') {
    this.auditor.deprecate(methodName, replacement);
  }

  /**
   * Register a parameter validator for an API method.
   * @param {string} methodName
   * @param {Function} validatorFn
   */
  validate(methodName, validatorFn) {
    this.auditor.registerValidator(methodName, validatorFn);
  }

  /* --------------------------------------------------------------------------
     Two-Way Interactive REPL & Command Registry
     -------------------------------------------------------------------------- */
  /**
   * Register a custom engine command for the interactive CLI prompt.
   * @param {string} name - Command name (e.g. 'fps', 'stats').
   * @param {Function} handler - Callback returning string or executing action.
   * @param {string} [description='Custom command']
   */
  registerCommand(name, handler, description = 'Custom command') {
    this.commands.set(name.toLowerCase().trim(), { handler, description });
  }

  /**
   * Unregister an engine command.
   * @param {string} name
   */
  unregisterCommand(name) {
    this.commands.delete(name.toLowerCase().trim());
  }

  /**
   * Safely evaluate interactive input: checks commands first, then falls back to JS expression evaluation.
   * @param {string} input - User typed line from CLI prompt.
   * @returns {*}
   */
  evaluate(input) {
    const raw = String(input || '').trim();
    if (!raw) return;

    // Log the user's prompt input
    this.log(`> ${raw}`);

    const parts = raw.split(/\s+/);
    const cmdKey = parts[0].toLowerCase();
    const args = parts.slice(1);

    // 1. Check custom registered commands
    if (this.commands.has(cmdKey)) {
      try {
        const { handler } = this.commands.get(cmdKey);
        const result = handler(args.join(' '), this);
        if (result !== undefined) {
          this.info(String(result));
        }
      } catch (err) {
        this.error(`Command [${cmdKey}] error: ${err.message}`);
      }
      return;
    }

    // 2. Fallback: JavaScript Expression Evaluator
    try {
      // Evaluate within safe functional scope
      const evalFn = new Function('console', `return (${raw});`);
      const result = evalFn(this);
      if (result !== undefined) {
        if (typeof result === 'object' && result !== null) {
          this.dir(result);
        } else {
          this.info(`< ${result}`);
        }
      }
    } catch {
      try {
        // Fallback for statements like "let x = 10" or function calls
        const stmtFn = new Function('console', raw);
        const result = stmtFn(this);
        if (result !== undefined) this.info(`< ${result}`);
      } catch (evalErr) {
        this.error(`SyntaxError: ${evalErr.message}`);
      }
    }
  }

  /**
   * Register default engine commands.
   * @private
   */
  _registerDefaultCommands() {
    this.registerCommand('help', () => {
      const list = Array.from(this.commands.entries())
        .map(([k, v]) => `  ${k.padEnd(12)} - ${v.description}`)
        .join('\n');
      return `Available Commands:\n${list}\n  (Or type any JavaScript expression e.g. 2 + 3, window.innerWidth)`;
    }, 'Show available CLI commands');

    this.registerCommand('clear', () => {
      this.clear();
    }, 'Clear console output');

    this.registerCommand('theme', (themeName) => {
      const t = themeName.trim() || 'dark';
      this.setTheme(t);
      return `Theme switched to '${t}'`;
    }, 'Switch visual theme (dark, dracula, nord, monokai, etc.)');

    this.registerCommand('channels', () => {
      const list = Array.from(this.channels.keys()).join(', ') || 'No active channels yet';
      return `Active Subsystem Channels: ${list}`;
    }, 'List active engine subsystem channels');
  }

  /* --------------------------------------------------------------------------
     Standard Engine Controls
     -------------------------------------------------------------------------- */
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
    this.profiler.clear();
    this.channels.clear();
    this.commands.clear();
    this.engine.destroy();
    this.dispatchEvent({ type: EVENTS.DESTROY });
  }
}

export { Console };
