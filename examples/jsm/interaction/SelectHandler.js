class SelectHandler {
  constructor(target) { this.target = target; this.selected = new Set(); }
  enable() {
    this.target.addEventListener('click', (e) => {
      const line = e.target.closest('.vessert-line');
      if (!line) return;
      if (e.shiftKey) this.selected.add(line);
      else { this.selected.clear(); this.selected.add(line); }
      this.refresh();
    });
  }
  refresh() {
    this.target.querySelectorAll('.vessert-line.selected').forEach((el) => el.classList.remove('selected'));
    this.selected.forEach((el) => el.classList.add('selected'));
  }
  clear() { this.selected.clear(); this.refresh(); }
}

export { SelectHandler };
