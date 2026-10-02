export const TimerUtils = {
  debounce(fn, ms) { let t = null; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; },
  throttle(fn, ms) { let last = 0; return (...args) => { const now = performance.now(); if (now - last >= ms) { last = now; fn(...args); } }; }
};
