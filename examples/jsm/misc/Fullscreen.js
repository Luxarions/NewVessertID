class Fullscreen {
  static async request(el = document.documentElement) { return el.requestFullscreen?.(); }
  static async exit() { return document.exitFullscreen?.(); }
  static isOn() { return typeof document !== 'undefined' && !!document.fullscreenElement; }
}

export { Fullscreen };
