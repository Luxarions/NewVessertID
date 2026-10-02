/**
 * @file Fullscreen layout preset.
 * @module layouts/FullscreenLayout
 */

import { Layout } from './Layout.js';

/** Fullscreen layout. */
class FullscreenLayout extends Layout {
  constructor() {
    super({ name: 'fullscreen', position: 'fullscreen', anchor: 'center', width: '100%', height: '100%', resizable: false, draggable: false, collapsible: true, padding: 16, border: 'none', zIndex: 10000 });
  }
}

export { FullscreenLayout };
