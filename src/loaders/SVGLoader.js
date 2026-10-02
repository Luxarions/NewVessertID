/**
 * @file SVG loader.
 * @module loaders/SVGLoader
 */

import { LoaderCache } from './LoaderCache.js';

/** Loads SVG files. */
class SVGLoader {
  /** @param {LoaderCache} [cache] - Cache. */
  constructor(cache = new LoaderCache()) {
    /** @type {LoaderCache} */
    this.cache = cache;
  }

  /**
   * @param {string} url - URL.
   * @returns {Promise<string>} SVG text.
   */
  async load(url) {
    if (this.cache.has(url)) return this.cache.get(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    const text = await res.text();
    this.cache.set(url, text);
    return text;
  }

  /**
   * @param {string} url - URL.
   * @returns {Promise<Element>} SVG element.
   */
  async loadAsElement(url) {
    const text = await this.load(url);
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    return doc.documentElement;
  }
}

export { SVGLoader };
