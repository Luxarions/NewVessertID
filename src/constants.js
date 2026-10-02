/**
 * @file Global constants for VessertID.
 * @module constants
 */

/** @constant {string} */
export const REVISION = '1.0.0';

/** @constant {Record<string, string>} */
export const LEVELS = { LOG: 'log', INFO: 'info', WARN: 'warn', ERROR: 'error', DEBUG: 'debug', TRACE: 'trace' };

/** @constant {string[]} */
export const LEVEL_ORDER = ['trace', 'debug', 'log', 'info', 'warn', 'error'];

/** @constant {Record<string, string>} */
export const LAYOUT_POSITIONS = { INLINE: 'inline', OVERLAY: 'overlay', DOCKED: 'docked', FULLSCREEN: 'fullscreen' };

/** @constant {Record<string, string>} */
export const ANCHORS = { TOP: 'top', BOTTOM: 'bottom', LEFT: 'left', RIGHT: 'right', CENTER: 'center' };

/** @constant {Record<string, string>} */
export const EVENTS = {
  LOG: 'log', INFO: 'info', WARN: 'warn', ERROR: 'error', DEBUG: 'debug', TRACE: 'trace',
  CLEAR: 'clear', FILTER: 'filter', SEARCH: 'search', EXPORT: 'export', COPY: 'copy',
  RESIZE: 'resize', THEME: 'theme', LAYOUT: 'layout', KEYMAP: 'keymap', LOCALE: 'locale',
  READY: 'ready', DESTROY: 'destroy'
};

/** @constant {Record<string, number|string>} */
export const DEFAULTS = {
  MAX_LINES: 10000, MAX_HISTORY: 1000, GROUP_INDENT: 2,
  FONT_FAMILY: 'monospace', FONT_SIZE: 13, LINE_HEIGHT: 1.5,
  THEME: 'dark', LAYOUT: 'docked-bottom', KEYMAP: 'default', LOCALE: 'en'
};

/** @constant {Record<string, string>} */
export const PATHS = {
  CONSOLE: 'assets/console', THEMES: 'assets/console/themes',
  LAYOUTS: 'assets/console/layouts', KEYMAPS: 'assets/console/keymaps',
  LOCALES: 'assets/console/locales', ICONS: 'assets/console/icons',
  PRESETS: 'assets/console/presets'
};
