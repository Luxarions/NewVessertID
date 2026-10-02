class ConsoleGroup {
  constructor(label) {
    this.label = label;
    this.el = document.createElement('details');
    this.el.open = true;
    const summary = document.createElement('summary');
    summary.textContent = label;
    this.el.appendChild(summary);
    this.body = document.createElement('div');
    this.el.appendChild(this.body);
  }
  add(entry) {
    const line = document.createElement('div');
    line.className = `vessert-line vessert-${entry.level}`;
    line.textContent = entry.message;
    this.body.appendChild(line);
  }
}

export { ConsoleGroup };
