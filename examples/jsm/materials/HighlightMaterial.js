class HighlightMaterial {
  constructor({ background = '#264f78', foreground = '#ffffff' } = {}) { this.background = background; this.foreground = foreground; }
  applyTo(el) { el.style.background = this.background; el.style.color = this.foreground; }
}

export { HighlightMaterial };
