class ContextMenu {
  constructor(target, items = []) { this.target = target; this.items = items; this.root = null; }
  enable() { this.target.addEventListener('contextmenu', (e) => { e.preventDefault(); this.open(e.clientX, e.clientY); }); }
  open(x, y) {
    this.close();
    this.root = document.createElement('div');
    this.root.className = 'vessert-context-menu';
    this.root.style.left = `${x}px`;
    this.root.style.top = `${y}px`;
    this.items.forEach((item) => {
      const el = document.createElement('div');
      el.textContent = item.label;
      el.onclick = () => { item.action(); this.close(); };
      this.root.appendChild(el);
    });
    document.body.appendChild(this.root);
  }
  close() { this.root?.remove(); this.root = null; }
}

export { ContextMenu };
