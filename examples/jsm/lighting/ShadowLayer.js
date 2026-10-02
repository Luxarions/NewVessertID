class ShadowLayer {
  constructor(element, { blur = 8, color = 'rgba(0,0,0,0.4)' } = {}) { this.element = element; this.blur = blur; this.color = color; }
  enable() { this.element.style.textShadow = `0 0 ${this.blur}px ${this.color}`; }
  disable() { this.element.style.textShadow = ''; }
}

export { ShadowLayer };
