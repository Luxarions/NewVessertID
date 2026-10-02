class VRConsole {
  constructor(console_) { this.console = console_; this.session = null; }
  async enter() {
    if (!navigator.xr) throw new Error('WebXR not supported');
    this.session = await navigator.xr.requestSession('immersive-vr');
    return this.session;
  }
  exit() { return this.session?.end(); }
}

export { VRConsole };
