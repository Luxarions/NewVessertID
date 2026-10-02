class Confirm {
  constructor(console_) { this.console = console_; }
  ask(question) { return window.confirm(question); }
}

export { Confirm };
