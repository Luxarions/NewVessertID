class ChromaEffect {
  constructor(element) { this.element = element; }
  enable() { this.element.classList.add('vessert-chroma'); }
  disable() { this.element.classList.remove('vessert-chroma'); }
}

export { ChromaEffect };
