class ShakeEffect {
  constructor(element, { duration = 400, intensity = 4 } = {}) {
    this.element = element;
    this.duration = duration;
    this.intensity = intensity;
  }
  play() {
    const el = this.element;
    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      if (t >= this.duration) { el.style.transform = ''; return; }
      const dx = (Math.random() - 0.5) * this.intensity;
      const dy = (Math.random() - 0.5) * this.intensity;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

export { ShakeEffect };
