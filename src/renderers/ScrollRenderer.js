/**
 * @file Scroll manager.
 * @module renderers/ScrollRenderer
 */

/** Manages scrolling on a DOM renderer's root. */
class ScrollRenderer {
  /** @param {import('./DOMRenderer.js').DOMRenderer} dom - Renderer. */
  constructor(dom) {
    /** @type {import('./DOMRenderer.js').DOMRenderer} */ this.dom = dom;
    /** @type {Function|null} */ this.onScroll = null;
  }

  /** @returns {void} */
  attach() {
    this.onScroll = () => { /* track scroll position */ };
    this.dom.root?.addEventListener('scroll', this.onScroll);
  }

  /** @returns {void} */
  detach() {
    if (this.onScroll) this.dom.root?.removeEventListener('scroll', this.onScroll);
  }

  /** @returns {void} */
  toBottom() {
    const root = this.dom.root;
    if (root) root.scrollTop = root.scrollHeight;
  }

  /** @returns {void} */
  toTop() {
    const root = this.dom.root;
    if (root) root.scrollTop = 0;
  }
}

export { ScrollRenderer };
