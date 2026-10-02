class Canvas2DRenderer {
  constructor(state) { this.state = state; this.canvas = null; this.ctx = null; this.lines = []; }
  mount(parent = document.body) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'vessert-canvas2d';
    this.ctx = this.canvas.getContext('2d');
    parent.appendChild(this.canvas);
  }
  unmount() { this.canvas?.remove(); this.canvas = null; this.ctx = null; this.lines = []; }
  write(entry) { this.lines.push(entry); this.draw(); }
  draw() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = `${this.state.font.size}px ${this.state.font.family}`;
    this.ctx.fillStyle = this.state.theme?.colors?.foreground ?? '#ffffff';
    this.lines.forEach((l, i) => this.ctx.fillText(l.message, 8, 16 * (i + 1)));
  }
  clear() { this.lines = []; this.draw(); }
}

export { Canvas2DRenderer };
