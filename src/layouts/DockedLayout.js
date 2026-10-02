/**
 * @file Docked layout preset.
 * @module layouts/DockedLayout
 */

import { Layout } from './Layout.js';

/** Docked layout. */
class DockedLayout extends Layout {
  /** @param {string} [anchor='bottom'] - Anchor side. */
  constructor(anchor = 'bottom') {
    super({
      name: `docked-${anchor}`, position: 'docked', anchor,
      width: anchor === 'right' || anchor === 'left' ? 360 : '100%',
      height: anchor === 'right' || anchor === 'left' ? '100%' : 240,
      resizable: true, draggable: false, collapsible: true,
      padding: 8, border: '1px solid #30363d', zIndex: 1000
    });
  }
}

export { DockedLayout };
