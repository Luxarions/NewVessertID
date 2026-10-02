class GridHelper {
  constructor(container, { cols = 4, rows = 4 } = {}) {
    this.container = container;
    this.cols = cols;
    this.rows = rows;
    this.root = null;
  }
  mount() {
    this.root = document.createElement('div');
    this.root.className = 'vessert-grid';
    this.root.style.display = 'grid';
    this.root.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.root.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    this.container.appendChild(this.root);
  }
  unmount() { this.root?.remove(); this.root = null; }
}

export { GridHelper };
