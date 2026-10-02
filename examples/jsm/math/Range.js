class Range {
  constructor(min = 0, max = 0) { this.min = min; this.max = max; }
  contains(v) { return v >= this.min && v <= this.max; }
  clamp(v) { return Math.max(this.min, Math.min(this.max, v)); }
  length() { return this.max - this.min; }
}

export { Range };
