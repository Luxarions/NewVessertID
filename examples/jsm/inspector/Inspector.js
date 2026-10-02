import { InspectorPanel } from './InspectorPanel.js';

class Inspector {
  constructor(container, console_) { this.container = container; this.console = console_; this.panel = new InspectorPanel(container); }
  mount() { this.panel.mount(); }
  unmount() { this.panel.unmount(); }
  refresh() { this.panel.update(this.console.export?.('json') ?? ''); }
}

export { Inspector };
