class Capabilities {
  static hasWebGPU() { return typeof navigator !== 'undefined' && !!navigator.gpu; }
  static hasCanvas() { return typeof document !== 'undefined' && !!document.createElement('canvas').getContext; }
  static hasClipboard() { return typeof navigator !== 'undefined' && !!navigator.clipboard; }
  static hasWorker() { return typeof Worker !== 'undefined'; }
  static hasOffscreenCanvas() { return typeof OffscreenCanvas !== 'undefined'; }
  static hasIntersectionObserver() { return typeof IntersectionObserver !== 'undefined'; }
  static report() {
    return {
      webgpu: Capabilities.hasWebGPU(), canvas: Capabilities.hasCanvas(),
      clipboard: Capabilities.hasClipboard(), worker: Capabilities.hasWorker(),
      offscreen: Capabilities.hasOffscreenCanvas(), intersection: Capabilities.hasIntersectionObserver()
    };
  }
}

export { Capabilities };
