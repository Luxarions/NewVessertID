/**
 * @file WebGPU renderer stub.
 * @module renderers/WebGPURenderer
 */

/** Placeholder WebGPU renderer. */
class WebGPURenderer {
  /** @param {Object} state - Console state. */
  constructor(state) {
    this.state = state;
    /** @type {*} */ this.adapter = null;
    /** @type {*} */ this.device = null;
    /** @type {*} */ this.context = null;
  }

  /**
   * @param {HTMLCanvasElement} canvas - Canvas.
   * @returns {Promise<void>}
   * @throws {Error} If WebGPU is unsupported.
   */
  async init(canvas) {
    if (!navigator.gpu) throw new Error('WebGPU not supported');
    this.adapter = await navigator.gpu.requestAdapter();
    this.device = await this.adapter.requestDevice();
    this.context = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({ device: this.device, format });
  }

  /** @returns {void} */ write() {}
  /** @returns {void} */ clear() {}
  /** @returns {void} */ destroy() { this.device?.destroy(); }
}

export { WebGPURenderer };
