class XRSession {
  static async isSupported(mode = 'immersive-vr') { if (!navigator.xr) return false; return navigator.xr.isSessionSupported(mode); }
  static async request(mode = 'immersive-vr') { if (!navigator.xr) throw new Error('WebXR not supported'); return navigator.xr.requestSession(mode); }
}

export { XRSession };
