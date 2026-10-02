import { Capabilities } from './Capabilities.js';

class FeatureDetect {
  static best() {
    if (Capabilities.hasWebGPU()) return 'webgpu';
    if (Capabilities.hasCanvas()) return 'canvas';
    return 'dom';
  }
  static supports(rendererName) {
    switch (rendererName) {
      case 'webgpu': return Capabilities.hasWebGPU();
      case 'canvas': return Capabilities.hasCanvas();
      case 'dom': return true;
      default: return false;
    }
  }
}

export { FeatureDetect };
