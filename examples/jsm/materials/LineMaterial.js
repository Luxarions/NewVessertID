class LineMaterial {
  constructor({ color = '#c9d1d9', size = 13 } = {}) { this.color = color; this.size = size; }
  applyTo(el) { el.style.color = this.color; el.style.fontSize = `${this.size}px`; }
}

export { LineMaterial };
