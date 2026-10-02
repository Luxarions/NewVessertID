class Pass {
  constructor({ enabled = true } = {}) { this.enabled = enabled; }
  run(entries) { return entries; }
}

export { Pass };
