class BloomEffect {
  constructor(element, { intensity = 0.6 } = {}) { this.element = element; this.intensity = intensity; }
  enable() { this.element.style.filter = `brightness(${1 + this.intensity})`; }
  disable() { this.element.style.filter = ''; }
}

export { BloomEffect };
