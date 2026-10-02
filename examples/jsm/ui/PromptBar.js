/**
 * PromptBar - External UI component for interactive CLI prompt and REPL.
 * Part of VessertID Visual Layer.
 */
export class PromptBar {
  constructor(consoleInstance, options = {}) {
    this.console = consoleInstance;
    this.options = options;
    this.history = [];
    this.historyIndex = -1;
    this.dom = this._createDOM();
  }

  _createDOM() {
    const bar = document.createElement('div');
    bar.className = 'vessert-ui-prompt-bar';

    bar.innerHTML = `
      <span class="vessert-prompt-sym">❯</span>
      <input type="text" class="vessert-prompt-input" placeholder="Type JS command or console method (e.g. c.info('hello'), 100 * 2) and press Enter..." />
      <button class="vessert-prompt-exec">Run</button>
    `;

    const input = bar.querySelector('.vessert-prompt-input');
    const execBtn = bar.querySelector('.vessert-prompt-exec');

    const execute = () => {
      const cmd = input.value.trim();
      if (!cmd) return;
      this.history.push(cmd);
      this.historyIndex = this.history.length;

      if (typeof this.console.evaluate === 'function') {
        this.console.evaluate(cmd);
      } else {
        this.console.log(`❯ ${cmd}`);
        try {
          const c = this.console;
          const result = eval(cmd);
          if (result !== undefined) {
            this.console.info(`❮ ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`);
          }
        } catch (err) {
          this.console.error(`Uncaught ${err.name}: ${err.message}`);
        }
      }
      input.value = '';
    };

    execBtn.addEventListener('click', execute);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        execute();
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = this.history[this.historyIndex] || '';
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          input.value = '';
        }
        e.preventDefault();
      }
    });

    return bar;
  }
}
