/**
 * @file VessertApp - Unified Application Shell & Prototype Orchestrator.
 * Connects Core Engine (src/), Visual UI Layer (jsm/ui/), and Addons (jsm/).
 * Single entry point for building complete VessertID console applications.
 */

import { Console } from '../../../src/Vessert.js';
import { ConsoleUI } from '../ui/ConsoleUI.js';
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

    // 2. Initialize Visual UI Layer (jsm/ui/)
    this.ui = new ConsoleUI(this.console, {
      container: this.options.container,
      title: this.options.title,
      badge: this.options.badge,
      theme: this.options.theme,
      retroCRT: this.options.retroCRT
    });

    // 3. Register Plugins
    this._initPlugins(this.options.plugins);

    // 4. Persistence setup
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
    this.ui.destroy();
    this.console.destroy();
  }
}
