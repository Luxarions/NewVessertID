class GlitchEffect {
  constructor(element, { duration = 500 } = {}) { this.element = element; this.duration = duration; }
  play() {
    this.element.classList.add('vessert-glitch');
    setTimeout(() => this.element.classList.remove('vessert-glitch'), this.duration);
  }
}

export { GlitchEffect };
