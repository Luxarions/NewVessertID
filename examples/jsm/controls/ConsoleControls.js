import { ScrollControls } from './ScrollControls.js';
import { DragControls } from './DragControls.js';
import { ResizeControls } from './ResizeControls.js';

class ConsoleControls {
  constructor(root) {
    this.root = root;
    this.scroll = new ScrollControls(root);
    this.drag = new DragControls(root);
    this.resize = new ResizeControls(root);
  }
  enable() { this.scroll.enable(); this.drag.enable(); this.resize.enable(); }
  disable() { this.scroll.disable(); this.drag.disable(); this.resize.disable(); }
}

export { ConsoleControls };
