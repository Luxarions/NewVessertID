class Autocomplete {
  constructor(console_, commands = []) { this.console = console_; this.commands = commands; }
  suggest(input) {
    const q = input.toLowerCase();
    return this.commands.filter((c) => c.toLowerCase().startsWith(q));
  }
  attach(inputEl) {
    inputEl.addEventListener('input', () => {
      const s = this.suggest(inputEl.value);
      this.console.debug(`suggestions: ${s.join(', ')}`);
    });
  }
}

export { Autocomplete };
