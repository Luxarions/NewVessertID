class ConsoleNode {
  constructor(type = 'log') { this.type = type; this.children = []; }
  add(child) { this.children.push(child); return this; }
  resolve() { return { type: this.type, children: this.children.map((c) => c.resolve()) }; }
}

export { ConsoleNode };
