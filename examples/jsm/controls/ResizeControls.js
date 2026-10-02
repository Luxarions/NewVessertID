class ResizeControls {
  constructor(root) { this.root = root; this.observer = null; }
  enable() {
    if (typeof ResizeObserver === 'undefined') return;
    this.observer = new ResizeObserver(() => {
      this.root.dispatchEvent(new CustomEvent('vessert:resize'));
    });
    this.observer.observe(this.root);
  }
  disable() { this.observer?.disconnect(); this.observer = null; }
}

export { ResizeControls };
