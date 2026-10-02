/**
 * @file Facade renderer.
 * @module renderers/ConsoleRenderer
 */

import { DOMRenderer } from './DOMRenderer.js';
import { ScrollRenderer } from './ScrollRenderer.js';

/** Orchestrates DOM rendering and scrolling. */
class ConsoleRenderer {
  /** @param {Object} state @param {Object} themes @param {Object} layouts */
  constructor(state, themes, layouts) {
    this.state = state;
    this.themes = themes;
    this.layouts = layouts;
    /** @type {DOMRenderer} */ this.dom = new DOMRenderer(state);
    /** @type {ScrollRenderer} */ this.scroll = new ScrollRenderer(this.dom);
    /** @type {Object[]} */ this.entries = [];
  }

  /** @returns {void} */ mount() {
    this.dom.mount();
    this.scroll.attach();
    this.applyTheme(this.themes.current());
    this.applyLayout(this.layouts.current());
  }

  /** @returns {void} */ unmount() {
    this.scroll.detach();
    this.dom.unmount();
  }

  /** @param {Object} entry @returns {void} */
  write(entry) {
    this.entries.push(entry);
    this.dom.append(entry);
    if (this.state.features.autoScroll) this.scroll.toBottom();
  }

  /** @returns {void} */ clear() { this.entries = []; this.dom.clear(); }

  /** @param {Object[]} entries @returns {void} */
  rerender(entries) { this.entries = entries; this.dom.replaceAll(entries); }

  /** @param {Object[]} results @returns {void} */
  highlight(results) { this.dom.highlight(results); }

  /** @param {Object} theme @returns {void} */
  applyTheme(theme) { if (theme) this.dom.setStyles(theme.toCSS()); }

  /** @param {Object} layout @returns {void} */
  applyLayout(layout) { if (layout) this.dom.setLayout(layout.toCSS()); }
}

export { ConsoleRenderer };
