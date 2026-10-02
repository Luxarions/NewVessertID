class Polyfill {
  static clipboard() {
    if (typeof navigator === 'undefined') return;
    if (navigator.clipboard) return;
    navigator.clipboard = {
      writeText: (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        return Promise.resolve();
      }
    };
  }
  static applyAll() { Polyfill.clipboard(); }
}

export { Polyfill };
