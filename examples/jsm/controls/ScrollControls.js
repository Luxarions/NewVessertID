class ScrollControls {
  constructor(root) { this.root = root; this.handlers = null; }
  enable() {
    this.handlers = { wheel: (e) => { this.root.scrollTop += e.deltaY; } };
    this.root.addEventListener('wheel', this.handlers.wheel, { passive: true });
  }
  disable() {
    if (this.handlers) { this.root.removeEventListener('wheel', this.handlers.wheel); this.handlers = null; }
  }
}

export { ScrollControls };
