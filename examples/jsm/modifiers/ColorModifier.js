class ColorModifier {
  constructor(mods = {}) { this.mods = mods; }
  apply(hex) { return this.mods.opacity !== undefined ? hexAlpha(hex, this.mods.opacity) : hex; }
}

function hexAlpha(hex, a) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export { ColorModifier };
