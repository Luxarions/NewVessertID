class ClickHandler {
  constructor(target) { this.target = target; this.listeners = new Map(); }
  on(selector, fn) {
    const handler = (e) => { if (e.target.closest(selector)) fn(e); };
    this.target.addEventListener('click', handler);
    this.listeners.set(selector, handler);
  }
  off(selector) {
    const h = this.listeners.get(selector);
    if (h) this.target.removeEventListener('click', h);
    this.listeners.delete(selector);
  }
}

export { ClickHandler };
