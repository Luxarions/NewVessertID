/**
 * @file Canvas 2D renderer.
 * @module renderers/CanvasRenderer
 */

/** Renders entries onto a 2D canvas. */
class CanvasRenderer {
  /** @param {Object} state - Console state. */
  constructor(state) {
    this.state = state;
    /** @type {HTMLCanvasElement|null} */ this.canvas = null;
    /** @type {CanvasRenderingContext2D|null} */ this.ctx = null;
    /** @type {Object[]} */ this.lines = [];
  }

  /** @param {HTMLElement} [parent=document.body] @returns {void} */
  mount(parent = document.body) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'vessert-canvas';
    this.ctx = this.canvas.getContext('2d');
    parent.appendChild(this.canvas);
    this.resize();
  }

  /** @returns {void} */
  unmount() { this.canvas?.remove(); this.canvas = null; this.ctx = null; }

  /** @param {Object} entry @returns {void} */
  write(entry) { this.lines.push(entry); this.draw(); }

  /** @returns {void} */
  draw() {
    if (!this.ctx || !this.canvas) return;
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    const lh = this.state.font.size * this.state.font.lineHeight;
    this.lines.forEach((entry, i) => {
      this.ctx.fillStyle = entry.color ?? '#ffffff';
      this.ctx.fillText(entry.message, 8, (i + 1) * lh);
    });
  }

  /** @returns {void} */
  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.clientWidth || 640;
    this.canvas.height = this.canvas.clientHeight || 480;
    this.draw();
  }
}

export { CanvasRenderer };
