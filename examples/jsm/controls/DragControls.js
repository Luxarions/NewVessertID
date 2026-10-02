class DragControls {
  constructor(root) {
    this.root = root;
    this.dragging = false;
    this.offset = { x: 0, y: 0 };
    this.handlers = null;
  }
  enable() {
    this.handlers = {
      down: (e) => {
        this.dragging = true;
        this.offset.x = e.clientX - this.root.offsetLeft;
        this.offset.y = e.clientY - this.root.offsetTop;
      },
      move: (e) => {
        if (!this.dragging) return;
        this.root.style.left = `${e.clientX - this.offset.x}px`;
        this.root.style.top = `${e.clientY - this.offset.y}px`;
      },
      up: () => { this.dragging = false; }
    };
    this.root.addEventListener('mousedown', this.handlers.down);
    document.addEventListener('mousemove', this.handlers.move);
    document.addEventListener('mouseup', this.handlers.up);
  }
  disable() {
    if (!this.handlers) return;
    this.root.removeEventListener('mousedown', this.handlers.down);
    document.removeEventListener('mousemove', this.handlers.move);
    document.removeEventListener('mouseup', this.handlers.up);
    this.handlers = null;
  }
}

export { DragControls };
