/**
 * @file Theme model.
 * @module themes/Theme
 */

/** Represents a color theme. */
class Theme {
  /** @param {Object} json - Theme JSON. */
  constructor(json) {
    /** @type {string} */ this.name = json.name;
    /** @type {string} */ this.author = json.author ?? '';
    /** @type {string} */ this.license = json.license ?? 'MIT';
    /** @type {string} */ this.source = json.source ?? '';
    /** @type {Object} */ this.colors = json.colors ?? {};
    /** @type {Object} */ this.levels = json.levels ?? {};
  }
  /** @returns {Object} CSS variables. */
  toCSS() {
    const css = {};
    Object.entries(this.colors).forEach(([k, v]) => { css[`--vessert-${k}`] = v; });
    Object.entries(this.levels).forEach(([k, v]) => { css[`--vessert-level-${k}`] = v; });
    return css;
  }
  /** @param {string} level @returns {string} Color. */
  colorFor(level) { return this.levels[level] ?? this.colors.foreground; }
}

export { Theme };
