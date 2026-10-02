/**
 * @file Ring buffer.
 * @module output/OutputRing
 */

/** Fixed-capacity ring buffer. */
class OutputRing {
  /** @param {number} [capacity=1024] - Capacity. */
  constructor(capacity = 1024) {
    this.capacity = capacity;
    /** @type {*[]} */ this.buffer = new Array(capacity);
    /** @type {number} */ this.head = 0;
    /** @type {number} */ this.size = 0;
  }
  /** @param {*} item @returns {void} */
  push(item) {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.size < this.capacity) this.size++;
  }
  /** @returns {*[]} */
  toArray() {
    const out = [];
    const start = this.size < this.capacity ? 0 : this.head;
    for (let i = 0; i < this.size; i++) out.push(this.buffer[(start + i) % this.capacity]);
    return out;
  }
  /** @returns {void} */ clear() { this.head = 0; this.size = 0; }
}

export { OutputRing };
