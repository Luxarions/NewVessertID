/**
 * @file Layout model.
 * @module layouts/Layout
 */

/** Represents a layout. */
class Layout {
  /** @param {Object} json - Layout JSON. */
  constructor(json) { Object.assign(this, json); }
  /** @returns {Object} CSS map. */
  toCSS() {
    const css = {};
    if (this.position) css['position'] = this.position === 'docked' ? 'fixed' : this.position;
    if (this.anchor === 'bottom' || this.anchor === 'top') css[this.anchor] = '0';
    if (this.anchor === 'left' || this.anchor === 'right') css[this.anchor] = '0';
    if (this.width)  css['width']  = typeof this.width === 'number' ? `${this.width}px` : this.width;
    if (this.height) css['height'] = typeof this.height === 'number' ? `${this.height}px` : this.height;
    if (this.padding !== undefined) css['padding'] = `${this.padding}px`;
    if (this.border) css['border'] = this.border;
    if (this.zIndex) css['z-index'] = String(this.zIndex);
    return css;
  }
}

export { Layout };
