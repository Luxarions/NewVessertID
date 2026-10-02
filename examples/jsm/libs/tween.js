export function tween({ from = 0, to = 1, duration = 300, onUpdate, onComplete }) {
  const start = performance.now();
  const tick = () => {
    const t = Math.min(1, (performance.now() - start) / duration);
    const v = from + (to - from) * t;
    onUpdate?.(v);
    if (t < 1) requestAnimationFrame(tick);
    else onComplete?.();
  };
  requestAnimationFrame(tick);
}
