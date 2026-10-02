class ConsolePanel {
  constructor() { this.el = document.createElement('div'); this.el.className = 'vessert-panel'; }
  mount(parent) { parent.appendChild(this.el); }
  unmount() { this.el.remove(); }
}

export { ConsolePanel };
