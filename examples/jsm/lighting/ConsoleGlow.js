class ConsoleGlow {
  constructor(element, { color = '#58a6ff', strength = 0.4 } = {}) { this.element = element; this.color = color; this.strength = strength; }
  enable() { this.element.style.boxShadow = `0 0 12px ${this.color}`; this.element.style.filter = `brightness(${1 + this.strength})`; }
  disable() { this.element.style.boxShadow = ''; this.element.style.filter = ''; }
}

export { ConsoleGlow };
