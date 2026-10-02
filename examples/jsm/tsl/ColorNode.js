import { ConsoleNode } from './ConsoleNode.js';

class ColorNode extends ConsoleNode {
  constructor(hex) { super('color'); this.hex = hex; }
  resolve() { return { type: 'color', value: this.hex }; }
}

export { ColorNode };
