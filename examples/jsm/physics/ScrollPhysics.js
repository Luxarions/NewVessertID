class ScrollPhysics {
  constructor(target, { friction = 0.92 } = {}) { this.target = target; this.friction = friction; this.velocity = 0; this.running = false; }
  impulse(v) { this.velocity += v; if (!this.running) this.tick(); }
  tick() {
    this.running = true;
    const step = () => {
      this.velocity *= this.friction;
      this.target.scrollTop += this.velocity;
      if (Math.abs(this.velocity) > 0.1) requestAnimationFrame(step);
      else this.running = false;
    };
    requestAnimationFrame(step);
  }
}

export { ScrollPhysics };
