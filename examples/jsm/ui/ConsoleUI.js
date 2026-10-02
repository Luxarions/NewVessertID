/**
 * ConsoleUI - External Master Visual Orchestrator.
 * Combines WindowChrome, Toolbar, Output Viewport, PromptBar, and StatusBar
 * into a complete, professional, visual console workstation.
 */
import { WindowChrome } from './WindowChrome.js';
import { Toolbar } from './Toolbar.js';
import { PromptBar } from './PromptBar.js';
import { StatusBar } from './StatusBar.js';

export class ConsoleUI {
  constructor(consoleInstance, options = {}) {
    this.console = consoleInstance;
    this.options = {
      container: document.body,
      title: options.title || 'VessertID Terminal',
      badge: options.badge || 'WORKSTATION',
      theme: options.theme || consoleInstance.state?.theme || 'dark',
      showChrome: options.showChrome !== false,
      showToolbar: options.showToolbar !== false,
      showPrompt: options.showPrompt !== false,
      showStatusBar: options.showStatusBar !== false,
      retroCRT: options.retroCRT || false,
      ...options
    };

    this.wrapper = null;
    this.outputElement = null;
    this.chrome = null;
    this.toolbar = null;
    this.promptBar = null;
    this.statusBar = null;

    this._init();
  }

  _init() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = `vessert-workbench-container theme-${this.options.theme}`;
    if (this.options.retroCRT) {
      this.wrapper.classList.add('retro-crt-mode');
    }

    // 1. Window Chrome Header
    if (this.options.showChrome) {
      this.chrome = new WindowChrome({
        title: this.options.title,
        badge: this.options.badge,
        onClose: () => {
          this.console.warn('Console session terminated.');
          this.wrapper.style.opacity = '0.4';
        },
        onMinimize: () => {
          const body = this.wrapper.querySelector('.vessert-viewport-body');
          if (body) body.style.display = body.style.display === 'none' ? 'flex' : 'none';
        },
        onMaximize: () => {
          this.wrapper.classList.toggle('fullscreen-mode');
        }
      });
      this.wrapper.appendChild(this.chrome.dom);
    }

    // 2. Toolbar
    if (this.options.showToolbar) {
      this.toolbar = new Toolbar(this.console, {
        theme: this.options.theme,
        onThemeChange: (newTheme) => {
          this.wrapper.className = `vessert-workbench-container theme-${newTheme}`;
          if (this.options.retroCRT) this.wrapper.classList.add('retro-crt-mode');
          this.statusBar?.setTheme(newTheme);
        }
      });
      this.wrapper.appendChild(this.toolbar.dom);
    }

    // 3. Viewport Body (where the console engine mounts)
    const viewportBody = document.createElement('div');
    viewportBody.className = 'vessert-viewport-body';

    this.outputElement = document.createElement('div');
    this.outputElement.className = 'vessert-output-pane';
    viewportBody.appendChild(this.outputElement);

    this.wrapper.appendChild(viewportBody);

    // Mount Console Engine renderer into output pane
    if (this.console.engine?.renderer?.dom) {
      this.console.engine.renderer.dom.mount(this.outputElement);
    }

    // 4. Interactive CLI Prompt
    if (this.options.showPrompt) {
      this.promptBar = new PromptBar(this.console);
      this.wrapper.appendChild(this.promptBar.dom);
    }

    // 5. Telemetry Status Bar
    if (this.options.showStatusBar) {
      this.statusBar = new StatusBar(this.console);
      this.wrapper.appendChild(this.statusBar.dom);
    }

    // Mount to Target Container
    const target = typeof this.options.container === 'string'
      ? document.querySelector(this.options.container)
      : this.options.container;

    if (target) {
      target.appendChild(this.wrapper);
    }
  }

  setTheme(themeName) {
    this.console.setTheme(themeName);
    this.wrapper.className = `vessert-workbench-container theme-${themeName}`;
    if (this.options.retroCRT) this.wrapper.classList.add('retro-crt-mode');
    this.statusBar?.setTheme(themeName);
  }

  toggleCRT(enable) {
    this.options.retroCRT = enable !== undefined ? enable : !this.options.retroCRT;
    this.wrapper.classList.toggle('retro-crt-mode', this.options.retroCRT);
  }

  destroy() {
    this.wrapper?.remove();
  }
}
