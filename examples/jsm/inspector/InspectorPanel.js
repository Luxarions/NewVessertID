import { InspectorTab } from './InspectorTab.js';

class InspectorPanel {
  constructor(container) { this.container = container; this.root = null; this.tabs = []; }
  mount() {
    this.root = document.createElement('div');
    this.root.className = 'vessert-inspector';
    this.container.appendChild(this.root);
    this.tabs.push(new InspectorTab('Raw', this.root));
  }
  unmount() { this.root?.remove(); this.root = null; this.tabs = []; }
  update(data) { this.tabs[0]?.setContent(data); }
}

export { InspectorPanel };
