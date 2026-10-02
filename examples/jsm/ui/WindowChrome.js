/**
 * WindowChrome - External UI component for Terminal Window Header & Controls.
 * Part of VessertID Visual Layer.
 */
export class WindowChrome {
  constructor(options = {}) {
    this.title = options.title || 'Terminal Workstation';
    this.badge = options.badge || 'VessertID';
    this.onClose = options.onClose || null;
    this.onMinimize = options.onMinimize || null;
    this.onMaximize = options.onMaximize || null;
    this.dom = this._createDOM();
  }

  _createDOM() {
    const header = document.createElement('div');
    header.className = 'vessert-window-chrome';

    header.innerHTML = `
      <div class="vessert-chrome-left">
        <div class="vessert-dots">
          <span class="vessert-dot dot-close" title="Close"></span>
          <span class="vessert-dot dot-min" title="Minimize"></span>
          <span class="vessert-dot dot-max" title="Maximize"></span>
        </div>
        <div class="vessert-chrome-title">
          <span class="vessert-title-text">${this.title}</span>
          <span class="vessert-badge">${this.badge}</span>
        </div>
      </div>
      <div class="vessert-chrome-right">
        <span class="vessert-status-pill"><span class="pill-dot"></span>ACTIVE</span>
      </div>
    `;

    header.querySelector('.dot-close')?.addEventListener('click', () => this.onClose?.());
    header.querySelector('.dot-min')?.addEventListener('click', () => this.onMinimize?.());
    header.querySelector('.dot-max')?.addEventListener('click', () => this.onMaximize?.());

    return header;
  }

  setTitle(title) {
    this.title = title;
    const el = this.dom.querySelector('.vessert-title-text');
    if (el) el.textContent = title;
  }

  setBadge(badge) {
    this.badge = badge;
    const el = this.dom.querySelector('.vessert-badge');
    if (el) el.textContent = badge;
  }
}
