class StyleModifier {
  constructor(styles = {}) { this.styles = styles; }
  applyTo(el) { Object.assign(el.style, this.styles); }
}

export { StyleModifier };
