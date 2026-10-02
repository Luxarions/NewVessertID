class OffscreenRenderer {
  constructor(width = 800, height = 600) {
    this.canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(width, height) : null;
  }
  isSupported() { return !!this.canvas; }
}

export { OffscreenRenderer };
