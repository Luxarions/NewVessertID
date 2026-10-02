class CSSRenderer {
  constructor(state) { this.state = state; this.root = null; }
  mount(parent = document.body) { this.root = document.createElement('div'); this.root.className = 'vessert-css'; parent.appendChild(this.root); }
  unmount() { this.root?.remove(); this.root = null; }
  write(entry) { if (this.root) this.root.textContent += `${entry.message}\n`; }
  clear() { if (this.root) this.root.textContent = ''; }
}

export { CSSRenderer };
