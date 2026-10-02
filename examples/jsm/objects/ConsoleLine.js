class ConsoleLine {
  constructor(entry) {
    this.entry = entry;
    this.el = document.createElement('div');
    this.el.className = `vessert-line vessert-${entry.level}`;
    this.el.textContent = entry.message;
  }
  appendTo(parent) { parent.appendChild(this.el); }
  remove() { this.el.remove(); }
}

export { ConsoleLine };
