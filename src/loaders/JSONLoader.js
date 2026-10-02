/**
 * @file JSON loader with cache.
 * @module loaders/JSONLoader
 */

import { LoaderCache } from './LoaderCache.js';

/** Loads JSON over HTTP. */
class JSONLoader {
  /** @param {LoaderCache} [cache] - Cache. */
  constructor(cache = new LoaderCache()) {
    /** @type {LoaderCache} */
    this.cache = cache;
  }

  /**
   * @param {string} url - URL.
   * @returns {Promise<*>} Parsed JSON.
   * @throws {Error} If the request fails.
   */
  async load(url) {
    if (this.cache.has(url)) return this.cache.get(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    const json = await res.json();
    this.cache.set(url, json);
    return json;
  }

  /**
   * @param {string[]} urls - URLs.
   * @returns {Promise<*[]>} Parsed JSON array.
   */
  async loadMany(urls) {
    return Promise.all(urls.map((u) => this.load(u)));
  }
}

export { JSONLoader };
