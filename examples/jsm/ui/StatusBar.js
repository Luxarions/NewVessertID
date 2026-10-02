/**
 * StatusBar - External UI component for real-time telemetry HUD.
 * Part of VessertID Visual Layer.
 */
export class StatusBar {
  constructor(consoleInstance, options = {}) {
    this.console = consoleInstance;
    this.options = options;
    this.startTime = performance.now();
    this.dom = this._createDOM();
    this._startLoop();
  }

  _createDOM() {
    const bar = document.createElement('div');
    bar.className = 'vessert-ui-status-bar';

    bar.innerHTML = `
      <div class="vessert-status-left">
        <span class="vessert-metric"><span class="metric-dot"></span>ENGINE: <strong class="vessert-metric-val">ONLINE</strong></span>
        <span class="vessert-metric">LINES: <strong class="vessert-lines-val">0</strong></span>
        <span class="vessert-metric">THEME: <strong class="vessert-theme-val">${this.console.state?.theme || 'dark'}</strong></span>
      </div>
      <div class="vessert-status-right">
        <span class="vessert-metric">UPTIME: <strong class="vessert-uptime-val">0s</strong></span>
        <span class="vessert-metric">BUFFER: <strong>10000 max</strong></span>
      </div>
    `;

    return bar;
  }

  _startLoop() {
    const linesEl = this.dom.querySelector('.vessert-lines-val');
    const uptimeEl = this.dom.querySelector('.vessert-uptime-val');
    const themeEl = this.dom.querySelector('.vessert-theme-val');

    const update = () => {
      if (!this.dom.isConnected) return;
      if (linesEl && this.console.engine?.buffer) {
        linesEl.textContent = this.console.engine.buffer.size();
      }
      if (uptimeEl) {
        const elapsed = ((performance.now() - this.startTime) / 1000).toFixed(1);
        uptimeEl.textContent = `${elapsed}s`;
      }
      if (themeEl && this.console.state) {
        themeEl.textContent = this.console.state.theme;
      }
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  setTheme(name) {
    const themeEl = this.dom.querySelector('.vessert-theme-val');
    if (themeEl) themeEl.textContent = name;
  }
}
