/**
 * Toolbar - External UI component for filter chain, search, themes, and actions.
 * Part of VessertID Visual Layer.
 */
export class Toolbar {
  constructor(consoleInstance, options = {}) {
    this.console = consoleInstance;
    this.options = options;
    this.onThemeChange = options.onThemeChange || null;
    this.dom = this._createDOM();
  }

  _createDOM() {
    const bar = document.createElement('div');
    bar.className = 'vessert-ui-toolbar';

    bar.innerHTML = `
      <div class="vessert-tb-group">
        <button class="vessert-tb-btn active" data-filter="">All</button>
        <button class="vessert-tb-btn tb-log" data-filter="log">Log</button>
        <button class="vessert-tb-btn tb-info" data-filter="info">Info</button>
        <button class="vessert-tb-btn tb-warn" data-filter="warn">Warn</button>
        <button class="vessert-tb-btn tb-error" data-filter="error">Error</button>
        <button class="vessert-tb-btn tb-debug" data-filter="debug">Debug</button>
      </div>

      <div class="vessert-tb-search">
        <span class="vessert-search-icon">🔍</span>
        <input type="text" class="vessert-search-input" placeholder="Filter console lines..." />
      </div>

      <div class="vessert-tb-actions">
        <select class="vessert-theme-select" title="Change Theme">
          <option value="dark">Theme: Dark</option>
          <option value="dracula">Theme: Dracula</option>
          <option value="nord">Theme: Nord</option>
          <option value="monokai">Theme: Monokai</option>
          <option value="gruvbox">Theme: Gruvbox</option>
          <option value="solarized-dark">Theme: Solarized</option>
          <option value="light">Theme: Light</option>
        </select>
        <button class="vessert-tb-btn btn-clear" title="Clear Console">🧹 Clear</button>
        <button class="vessert-tb-btn btn-export" title="Export Logs">💾 Export</button>
        <button class="vessert-tb-btn btn-copy" title="Copy to Clipboard">📋 Copy</button>
      </div>
    `;

    // Filter Buttons
    bar.querySelectorAll('.vessert-tb-group .vessert-tb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.vessert-tb-group .vessert-tb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.dataset.filter;
        this.console.filter(filterVal);
      });
    });

    // Search input
    const searchInput = bar.querySelector('.vessert-search-input');
    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      this.console.filter(q);
    });

    // Theme selector
    const themeSelect = bar.querySelector('.vessert-theme-select');
    if (this.options.theme) {
      themeSelect.value = this.options.theme;
    }
    themeSelect?.addEventListener('change', (e) => {
      const newTheme = e.target.value;
      this.console.setTheme(newTheme);
      this.onThemeChange?.(newTheme);
    });

    // Action buttons
    bar.querySelector('.btn-clear')?.addEventListener('click', () => {
      this.console.clear();
    });

    bar.querySelector('.btn-export')?.addEventListener('click', () => {
      const json = this.console.export('json');
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vessert-logs.json';
      a.click();
      URL.revokeObjectURL(url);
    });

    bar.querySelector('.btn-copy')?.addEventListener('click', async () => {
      await this.console.copy();
      const btn = bar.querySelector('.btn-copy');
      const oldText = btn.textContent;
      btn.textContent = '✔ Copied!';
      setTimeout(() => { btn.textContent = oldText; }, 1500);
    });

    return bar;
  }
}
