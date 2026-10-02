/**
 * @file Console engine.
 * @module core/ConsoleEngine
 */

import { EventDispatcher } from '../events/EventDispatcher.js';
import { OutputBuffer } from '../output/OutputBuffer.js';
import { MessageFormatter } from '../formatters/MessageFormatter.js';
import { ThemeManager } from '../themes/ThemeManager.js';
import { LayoutManager } from '../layouts/LayoutManager.js';
import { KeymapManager } from '../input/KeymapManager.js';
import { LocaleManager } from '../locales/LocaleManager.js';
import { LevelManager } from '../levels/LevelManager.js';
import { FilterChain } from '../filters/FilterChain.js';
import { SearchEngine } from '../filters/SearchEngine.js';
import { Exporter } from '../export/Exporter.js';
import { CopyManager } from '../export/CopyManager.js';
import { ConsoleRenderer } from '../renderers/ConsoleRenderer.js';
import { EventBus } from '../events/EventBus.js';
import { EVENTS } from '../constants.js';

/**
 * The engine that binds state, buffer, managers, and renderer.
 * @extends EventDispatcher
 */
class ConsoleEngine extends EventDispatcher {
  /**
   * @param {import('./ConsoleState.js').ConsoleState} state - Console state.
   */
  constructor(state) {
    super();
    this.state = state;
    this.bus = new EventBus();
    this.buffer = new OutputBuffer(state.maxLines);
    this.formatter = new MessageFormatter(state);
    this.themes = new ThemeManager();
    this.layouts = new LayoutManager();
    this.keymaps = new KeymapManager();
    this.locales = new LocaleManager();
    this.levels = new LevelManager();
    this.filters = new FilterChain();
    this.search = new SearchEngine();
    this.exporter = new Exporter(this.buffer);
    this.copier = new CopyManager(this.buffer);
    /** @type {ConsoleRenderer|null} */
    this.renderer = null;
  }

  /**
   * Loads managers and mounts the renderer.
   *
   * @returns {void}
   */
  init() {
    this.themes.load(this.state.theme);
    this.layouts.load(this.state.layout);
    this.keymaps.load(this.state.keymap);
    this.locales.load(this.state.locale);
    this.levels.loadAll();
    this.renderer = new ConsoleRenderer(this.state, this.themes, this.layouts);
    this.renderer.mount();
    this.dispatchEvent({ type: EVENTS.READY });
  }

  /**
   * Formats, filters, buffers, and renders an entry.
   *
   * @param {string} level - Level name.
   * @param {*[]} args - Args.
   * @returns {void}
   */
  write(level, args) {
    const message = this.formatter.format(level, args);
    const entry = { level, message, timestamp: Date.now(), raw: args };
    if (!this.levels.isEnabled(level)) return;
    if (!this.filters.pass(entry)) return;
    this.buffer.push(entry);
    this.renderer?.write(entry);
    this.dispatchEvent({ type: EVENTS[level.toUpperCase()] ?? level, entry });
  }

  /** @returns {void} */
  clear() {
    this.buffer.clear();
    this.renderer?.clear();
    this.dispatchEvent({ type: EVENTS.CLEAR });
  }

  /**
   * @param {string} query
   * @returns {void}
   */
  filter(query) {
    this.filters.setText(query);
    this.renderer?.rerender(this.buffer.snapshot());
    this.dispatchEvent({ type: EVENTS.FILTER, query });
  }

  /**
   * @param {string} query
   * @returns {void}
   */
  search(query) {
    this.search.setQuery(query);
    this.renderer?.highlight(this.search.results(this.buffer.snapshot()));
    this.dispatchEvent({ type: EVENTS.SEARCH, query });
  }

  /**
   * @param {string} format - 'json' | 'text' | 'html'.
   * @returns {string}
   */
  export(format) {
    const data = this.exporter.export(format);
    this.dispatchEvent({ type: EVENTS.EXPORT, format });
    return data;
  }

  /** @returns {Promise<void>} */
  copy() {
    this.dispatchEvent({ type: EVENTS.COPY });
    return this.copier.copyAll();
  }

  /** @param {string} name @returns {void} */
  setTheme(name) {
    this.themes.load(name);
    this.renderer?.applyTheme(this.themes.current());
    this.dispatchEvent({ type: EVENTS.THEME, name });
  }

  /** @param {string} name @returns {void} */
  setLayout(name) {
    this.layouts.load(name);
    this.renderer?.applyLayout(this.layouts.current());
    this.dispatchEvent({ type: EVENTS.LAYOUT, name });
  }

  /** @param {string} name @returns {void} */
  setKeymap(name) {
    this.keymaps.load(name);
    this.dispatchEvent({ type: EVENTS.KEYMAP, name });
  }

  /** @param {string} name @returns {void} */
  setLocale(name) {
    this.locales.load(name);
    this.dispatchEvent({ type: EVENTS.LOCALE, name });
  }

  /** @returns {void} */
  destroy() {
    this.renderer?.unmount();
    this.buffer.clear();
    this.dispatchEvent({ type: EVENTS.DESTROY });
  }
}

export { ConsoleEngine };
