class HoverHandler {
  constructor(target) { this.target = target; }
  on(selector, enter, leave = () => {}) {
    this.target.addEventListener('mouseover', (e) => { if (e.target.closest(selector)) enter(e); });
    this.target.addEventListener('mouseout', (e) => { if (e.target.closest(selector)) leave(e); });
  }
}

export { HoverHandler };
