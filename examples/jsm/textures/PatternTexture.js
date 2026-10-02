class PatternTexture {
  static generate(size = 256, colorA = '#000', colorB = '#fff') {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const step = size / 8;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      ctx.fillStyle = (x + y) % 2 ? colorA : colorB;
      ctx.fillRect(x * step, y * step, step, step);
    }
    return canvas;
  }
}

export { PatternTexture };
