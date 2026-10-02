class BufferGeometryUtils {
  static concat(buffers) { return buffers.flat(); }
  static interleave(arrays) {
    const out = [];
    const max = Math.max(...arrays.map((a) => a.length));
    for (let i = 0; i < max; i++) arrays.forEach((a) => out.push(a[i]));
    return out;
  }
}

export { BufferGeometryUtils };
