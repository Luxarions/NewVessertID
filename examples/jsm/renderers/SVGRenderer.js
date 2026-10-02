class SVGRenderer {
  constructor(state) { this.state = state; this.root = null; this.lines = []; }
  mount(parent = document.body) {
    const ns = 'http://www.w3.org/2000/svg';
    this.root = document.createElementNS(ns, 'svg');
    this.root.setAttribute('width', '100%');
    this.root.setAttribute('height', '100%');
    parent.appendChild(this.root);
  }
  unmount() { this.root?.remove(); this.root = null; this.lines = []; }
  write(entry) {
    if (!this.root) return;
    const ns = 'http://www.w3.org/2000/svg';
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', '8');
    text.setAttribute('y', String(16 * (this.lines.length + 1)));
    text.textContent = entry.message;
    this.root.appendChild(text);
    this.lines.push(entry);
  }
  clear() { if (!this.root) return; while (this.root.firstChild) this.root.removeChild(this.root.firstChild); this.lines = []; }
}

export { SVGRenderer };
