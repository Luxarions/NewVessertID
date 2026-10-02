import { ConsoleNode } from './ConsoleNode.js';

class LayoutNode extends ConsoleNode {
  constructor(name) { super('layout'); this.name = name; }
  resolve() { return { type: 'layout', name: this.name }; }
}

export { LayoutNode };
