class ConsoleHelper {
  constructor(console) { this.console = console; }
  dump() { return this.console.export?.('json') ?? ''; }
  print(msg) { this.console.log(`[helper] ${msg}`); }
}

export { ConsoleHelper };
