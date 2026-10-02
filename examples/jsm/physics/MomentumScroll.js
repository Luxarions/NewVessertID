class MomentumScroll {
  constructor(target) { this.target = target; this.lastY = 0; this.lastT = 0; this.velocity = 0; }
  enable() {
    this.target.addEventListener('touchmove', (e) => {
      const y = e.touches[0].clientY;
      const t = performance.now();
      const dy = y - this.lastY;
      const dt = t - this.lastT || 1;
      this.velocity = dy / dt;
      this.lastY = y;
      this.lastT = t;
    });
  }
}

export { MomentumScroll };
