export const StringUtils = {
  padEnd(str, len, fill = ' ') { return String(str).padEnd(len, fill); },
  truncate(str, max, suffix = '…') { const s = String(str); return s.length <= max ? s : s.slice(0, max - suffix.length) + suffix; },
  stripAnsi(str) { return String(str).replace(/\x1b\[[0-9;]*m/g, ''); }
};
