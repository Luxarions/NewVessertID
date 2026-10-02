/**
 * @file Inline layout preset.
 * @module layouts/InlineLayout
 */

import { Layout } from './Layout.js';

/** Inline layout. */
class InlineLayout extends Layout {
  constructor() {
    super({ name: 'inline', position: 'inline', anchor: 'bottom', width: '100%', height: 'auto', resizable: false, draggable: false, collapsible: true, padding: 4, border: 'none', zIndex: 1 });
  }
}

export { InlineLayout };
