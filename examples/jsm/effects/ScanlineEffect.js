class ScanlineEffect {
  constructor(element) { this.element = element; }
  enable() { this.element.classList.add('vessert-scanlines'); }
  disable() { this.element.classList.remove('vessert-scanlines'); }
  toggle() { this.element.classList.toggle('vessert-scanlines'); }
}

export { ScanlineEffect };
