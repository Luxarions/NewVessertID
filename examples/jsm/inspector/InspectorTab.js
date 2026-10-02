class InspectorTab {
  constructor(label, container) {
    this.label = label;
    this.container = container;
    this.root = document.createElement('section');
    this.root.className = 'vessert-inspector-tab';
    const title = document.createElement('h3');
    title.textContent = label;
    this.pre = document.createElement('pre');
    this.root.appendChild(title);
    this.root.appendChild(this.pre);
    container.appendChild(this.root);
  }
  setContent(text) { this.pre.textContent = text; }
}

export { InspectorTab };
