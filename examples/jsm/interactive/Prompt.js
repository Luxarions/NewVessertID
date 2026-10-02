class Prompt {
  constructor(console_) { this.console = console_; }
  async ask(question) {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.placeholder = question;
      input.onkeydown = (e) => { if (e.key === 'Enter') { resolve(input.value); input.remove(); } };
      this.console.engine.renderer.dom.root.appendChild(input);
      input.focus();
    });
  }
}

export { Prompt };
