class HighlightLayer {
  constructor(target) { this.target = target; this.matches = []; }
  setMatches(entries) { this.matches = entries; this.render(); }
  render() {
    this.target.querySelectorAll('.vessert-line').forEach((el, i) => {
      el.classList.toggle('vessert-match', this.matches.some((m) => m.index === i));
    });
  }
}

export { HighlightLayer };
