class InspectorRow {
  constructor(label, value) {
    this.root = document.createElement('div');
    this.root.className = 'vessert-inspector-row';
    this.root.innerHTML = `<span class="k">${label}</span><span class="v">${value}</span>`;
  }
}

export { InspectorRow };
