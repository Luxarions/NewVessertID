/**
 * @file Semantic console event names.
 * @module events/ConsoleEvents
 */

/** @constant {Record<string, string>} */
export const ConsoleEvents = {
  READY: 'console:ready', WRITE: 'console:write', CLEAR: 'console:clear',
  FILTER: 'console:filter', SEARCH: 'console:search', EXPORT: 'console:export',
  COPY: 'console:copy', THEME: 'console:theme', LAYOUT: 'console:layout',
  KEYMAP: 'console:keymap', LOCALE: 'console:locale', RESIZE: 'console:resize',
  DESTROY: 'console:destroy'
};
