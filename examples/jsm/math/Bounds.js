class Bounds {
  constructor() { this.left = 0; this.top = 0; this.right = 0; this.bottom = 0; }
  set(l, t, r, b) { this.left = l; this.top = t; this.right = r; this.bottom = b; return this; }
  width() { return this.right - this.left; }
  height() { return this.bottom - this.top; }
}

export { Bounds };
