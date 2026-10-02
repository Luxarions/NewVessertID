export const ColorUtils = {
  hexToRgb(hex) { const n = parseInt(hex.replace('#', ''), 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; },
  rgbToHex(r, g, b) { return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join(''); },
  lighten(hex, a = 0.1) {
    const { r, g, b } = ColorUtils.hexToRgb(hex);
    return ColorUtils.rgbToHex(Math.min(255, Math.round(r + 255 * a)), Math.min(255, Math.round(g + 255 * a)), Math.min(255, Math.round(b + 255 * a)));
  },
  darken(hex, a = 0.1) { return ColorUtils.lighten(hex, -a); }
};
