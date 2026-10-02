class FadeEffect {
  constructor(element, { duration = 300 } = {}) { this.element = element; this.duration = duration; }
  in() { this.element.style.transition = `opacity ${this.duration}ms`; this.element.style.opacity = '1'; }
  out() { this.element.style.transition = `opacity ${this.duration}ms`; this.element.style.opacity = '0'; }
}

export { FadeEffect };
