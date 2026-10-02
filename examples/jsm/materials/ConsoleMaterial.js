class ConsoleMaterial {
  constructor({ background = '#0d1117', foreground = '#c9d1d9', border = '#30363d' } = {}) {
    this.background = background;
    this.foreground = foreground;
    this.border = border;
  }
  applyTo(el) {
    el.style.background = this.background;
    el.style.color = this.foreground;
    el.style.border = `1px solid ${this.border}`;
  }
}

export { ConsoleMaterial };
