class WebGPURenderer {
  constructor(state) { this.state = state; this.device = null; this.context = null; this.canvas = null; }
  async mount(parent = document.body) {
    if (!navigator.gpu) throw new Error('WebGPU not supported');
    this.canvas = document.createElement('canvas');
    parent.appendChild(this.canvas);
    this.context = this.canvas.getContext('webgpu');
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter.requestDevice();
    const format = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({ device: this.device, format });
  }
  write() {}
  clear() {}
  unmount() { this.canvas?.remove(); this.device?.destroy(); }
}

export { WebGPURenderer };
