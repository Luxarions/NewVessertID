class ConsoleWindow {
  constructor({ title = 'Console' } = {}) {
    this.el = document.createElement('div');
    this.el.className = 'vessert-window';
    const header = document.createElement('header');
    header.textContent = title;
    const body = document.createElement('div');
    body.className = 'vessert-window-body';
    this.el.appendChild(header);
    this.el.appendChild(body);
    this.body = body;
  }
  mount(parent) { parent.appendChild(this.el); }
  unmount() { this.el.remove(); }
}

export { ConsoleWindow };
