class ThemeGenerator {
  static from(baseHex) {
    return {
      name: 'generated', author: 'generator', license: 'MIT', source: '',
      colors: {
        background: shade(baseHex, -0.8), foreground: shade(baseHex, 0.8),
        cursor: baseHex, selection: shade(baseHex, -0.4),
        border: shade(baseHex, -0.6), scrollbar: shade(baseHex, -0.3)
      },
      levels: {
        log: shade(baseHex, 0.8), info: '#58a6ff', warn: '#d29922',
        error: '#f85149', debug: shade(baseHex, 0.2), trace: shade(baseHex, 0.0)
      }
    };
  }
}

function shade(hex, amount) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + amount * 255)));
  g = Math.max(0, Math.min(255, Math.round(g + amount * 255)));
  b = Math.max(0, Math.min(255, Math.round(b + amount * 255)));
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

export { ThemeGenerator };
