/**
 * @file VessertApp - Unified Application Shell & Prototype Orchestrator.
 * Connects Core Engine (src/), Visual UI Layer (jsm/ui/), Addons (jsm/),
 * Subsystem Channels, Profiler, REPL, and Multi-Sink Router.
 * Single entry point for building complete VessertID console applications.
 */

import { Console } from '../../../src/Vessert.js';
import { ConsoleUI } from '../ui/ConsoleUI.js';
import { REPL } from '../evaluator/REPL.js';
import { BrowserSink } from '../sinks/BrowserSink.js';
import * as Addons from '../Addons.js';

export class VessertApp {
  /**
   * @param {Object} [options={}]
   * @param {string|HTMLElement} [options.container=document.body] - Mount target.
   * @param {string} [options.title='VessertID Terminal Workstation'] - Window title.
   * @param {string} [options.badge='APP'] - Badge label.
   * @param {string} [options.theme='dark'] - Initial theme.
   * @param {string} [options.layout='default'] - Layout preset.
   * @param {string} [options.keymap='default'] - Keymap preset.
   * @param {string} [options.locale='en'] - Locale preset.
   * @param {boolean} [options.retroCRT=false] - CRT scanline phosphor effect.
   * @param {boolean} [options.browserMirror=false] - Mirror logs to window.console.
   * @param {boolean} [options.persist=true] - Save theme and history to localStorage.
   * @param {string[]|Object[]} [options.plugins=[]] - List of plugins/addons to activate.
   */
  constructor(options = {}) {
    this.options = {
      container: options.container || document.body,
      title: options.title || 'VessertID Terminal Workstation',
      badge: options.badge || 'PROTOTYPE',
      theme: this._getStoredTheme() || options.theme || 'dark',
      layout: options.layout || 'default',
      keymap: options.keymap || 'default',
      locale: options.locale || 'en',
      retroCRT: options.retroCRT || false,
      browserMirror: options.browserMirror || false,
      persist: options.persist !== false,
      plugins: options.plugins || [],
      ...options
    };

    this.activePlugins = new Map();

    // 1. Initialize Core Engine (src/)
    this.console = new Console({
      theme: this.options.theme,
      layout: this.options.layout,
      keymap: this.options.keymap,
      locale: this.options.locale
    });

    // 2. Initialize REPL and Browser Sink
    this.repl = new REPL(this.console);
    this.browserSink = new BrowserSink(this.console);
    if (this.options.browserMirror) {
      this.browserSink.enable();
    }

    // 3. Initialize Visual UI Layer (jsm/ui/)
    this.ui = new ConsoleUI(this.console, {
      container: this.options.container,
      title: this.options.title,
      badge: this.options.badge,
      theme: this.options.theme,
      retroCRT: this.options.retroCRT
    });

    // Expose `app` global shorthand in REPL
    this.repl.bind('app', this);

    // 4. Register Plugins
    this._initPlugins(this.options.plugins);

    // 5. Persistence setup
    if (this.options.persist) {
      this.console.engine?.addEventListener?.('theme', (e) => {
        try { localStorage.setItem('vessert_theme', e.name); } catch (_) {}
      });
    }
  }

  _getStoredTheme() {
    try {
      return localStorage.getItem('vessert_theme');
    } catch (_) {
      return null;
    }
  }

  _initPlugins(plugins) {
    if (!Array.isArray(plugins)) return;
    for (const p of plugins) {
      if (typeof p === 'string') {
        this.activatePlugin(p);
      } else if (p && typeof p.install === 'function') {
        p.install(this);
        this.activePlugins.set(p.name || 'custom', p);
      }
    }
  }

  /**
   * Activate an addon/plugin by name.
   * @param {string} name
   */
  activatePlugin(name) {
    const key = name.toLowerCase();
    if (this.activePlugins.has(key)) return;

    if (key === 'scanlines' || key === 'scanline') {
      const effect = new Addons.ScanlineEffect();
      effect.apply(this.console.engine.renderer.dom.root);
      this.activePlugins.set(key, effect);
    } else if (key === 'glitch') {
      const effect = new Addons.GlitchEffect();
      this.activePlugins.set(key, effect);
    } else if (key === 'bloom') {
      const effect = new Addons.BloomEffect();
      effect.apply(this.console.engine.renderer.dom.root);
      this.activePlugins.set(key, effect);
    } else if (key === 'typewriter') {
      const tw = new Addons.TypewriterEffect(this.console);
      this.activePlugins.set(key, tw);
    } else if (key === 'inspector') {
      const insp = new Addons.Inspector(this.console.engine);
      if (this.ui.wrapper) {
        insp.mount(this.ui.wrapper);
      }
      this.activePlugins.set(key, insp);
    }
  }

  /**
   * Register a custom plugin.
   * @param {Object} plugin
   */
  use(plugin) {
    if (plugin && typeof plugin.install === 'function') {
      plugin.install(this);
      this.activePlugins.set(plugin.name || Symbol('plugin'), plugin);
    }
    return this;
  }

  /* ---------------- Subsystem Channels (Game Engine Pattern) ---------------- */

  /**
   * Acquire a dedicated subsystem channel (e.g. 'RENDERER', 'PHYSICS', 'AUDIO').
   * @param {string} name
   */
  channel(name) {
    return this.console.channel(name);
  }

  /**
   * Alias for channel()
   * @param {string} name
   */
  scope(name) {
    return this.console.scope(name);
  }

  /* ---------------- Advanced Console API Operations ---------------- */

  /**
   * Display tabular data formatted as an ASCII/HTML grid.
   * @param {Array<Object>|Object} data
   * @param {string[]} [columns]
   */
  table(data, columns) {
    this.console.table(data, columns);
    return this;
  }

  /**
   * Interactive object inspector.
   * @param {Object} obj
   */
  dir(obj) {
    this.console.dir(obj);
    return this;
  }

  /**
   * Performance profiler timer start.
   * @param {string} [label]
   */
  time(label) {
    this.console.time(label);
    return this;
  }

  /**
   * Performance profiler timer stop & log.
   * @param {string} [label]
   */
  timeEnd(label) {
    this.console.timeEnd(label);
    return this;
  }

  /**
   * Performance profiler timer checkpoint log.
   * @param {string} [label]
   */
  timeLog(label, ...args) {
    this.console.timeLog(label, ...args);
    return this;
  }

  /**
   * Assertion checker; logs error if false.
   * @param {boolean} condition
   * @param {...*} args
   */
  assert(condition, ...args) {
    this.console.assert(condition, ...args);
    return this;
  }

  /**
   * Execution counter.
   * @param {string} [label]
   */
  count(label) {
    this.console.count(label);
    return this;
  }

  /**
   * Execution counter reset.
   * @param {string} [label]
   */
  countReset(label) {
    this.console.countReset(label);
    return this;
  }

  /**
   * Group logs.
   * @param {string} [label]
   */
  group(label) {
    this.console.group(label);
    return this;
  }

  groupEnd() {
    this.console.groupEnd();
    return this;
  }

  /* ---------------- Multi-Sink & Browser Mirroring ---------------- */

  /**
   * Enable/disable mirroring to browser DevTools (F12).
   * @param {boolean} enable
   */
  setBrowserMirror(enable) {
    if (enable) {
      this.browserSink.enable();
    } else {
      this.browserSink.disable();
    }
    return this;
  }

  /* ---------------- Command Execution & REPL ---------------- */

  /**
   * Register a custom engine command.
   * @param {string} name
   * @param {Function} handler
   * @param {string} [description]
   */
  registerCommand(name, handler, description) {
    this.console.registerCommand(name, handler, description);
    return this;
  }

  /**
   * Safely evaluate a command or expression.
   * @param {string} input
   */
  evaluate(input) {
    this.console.evaluate(input);
    return this;
  }

  /* ---------------- High-Level Integrated Logging APIs ---------------- */

  log(...args) {
    this.console.log(...args);
    return this;
  }

  info(...args) {
    this.console.info(...args);
    return this;
  }

  warn(...args) {
    this.console.warn(...args);
    return this;
  }

  error(...args) {
    this.console.error(...args);
    return this;
  }

  fatal(...args) {
    this.console.fatal(...args);
    return this;
  }

  debug(...args) {
    this.console.debug(...args);
    return this;
  }

  trace(...args) {
    this.console.trace(...args);
    return this;
  }

  clear() {
    this.console.clear();
    return this;
  }

  filter(query) {
    this.console.filter(query);
    return this;
  }

  search(query) {
    this.console.search(query);
    return this;
  }

  setTheme(name) {
    this.console.setTheme(name);
    this.ui.setTheme(name);
    return this;
  }

  setLayout(name) {
    this.console.setLayout(name);
    return this;
  }

  setKeymap(name) {
    this.console.setKeymap(name);
    return this;
  }

  setLocale(name) {
    this.console.setLocale(name);
    return this;
  }

  export(format = 'json') {
    return this.console.export(format);
  }

  copy() {
    return this.console.copy();
  }

  toggleCRT(enable) {
    this.ui.toggleCRT(enable);
    return this;
  }

  on(event, handler) {
    this.console.engine?.addEventListener?.(event, handler);
    return this;
  }

  off(event, handler) {
    this.console.engine?.removeEventListener?.(event, handler);
    return this;
  }

  destroy() {
    for (const plugin of this.activePlugins.values()) {
      if (typeof plugin.destroy === 'function') plugin.destroy();
    }
    this.activePlugins.clear();
    this.browserSink.disable();
    this.ui.destroy();
    this.console.destroy();
  }
}
