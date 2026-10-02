/**
 * @file Color helpers.
 * @module formatters/ColorFormatter
 */

/** Hex/RGB helpers. */
class ColorFormatter {
  /** @param {string} hex - Hex. @returns {{r:number,g:number,b:number}} RGB. */
  static hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  /** @param {number} r @param {number} g @param {number} b @returns {string} Hex. */
  static rgbToHex(r, g, b) { return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join(''); }
  /** @param {string} hex @param {number} [amount=0.1] @returns {string} Lightened hex. */
  static lighten(hex, amount = 0.1) {
    const { r, g, b } = ColorFormatter.hexToRgb(hex);
    return ColorFormatter.rgbToHex(
      Math.min(255, Math.round(r + 255 * amount)),
      Math.min(255, Math.round(g + 255 * amount)),
      Math.min(255, Math.round(b + 255 * amount))
    );
  }
  /** @param {string} hex @param {number} [amount=0.1] @returns {string} Darkened hex. */
  static darken(hex, amount = 0.1) { return ColorFormatter.lighten(hex, -amount); }
}

export { ColorFormatter };
