/**
 * @file API Usage Detector & Telemetry Auditor Test Suite.
 */
import { describe, it, expect } from '../runner.js';
import { Console } from '../../src/Vessert.js';

describe('API Usage Detector & Auditor', () => {
  it('intercepts function calls, executes them, and logs execution audit duration', () => {
    const c = new Console();
    const mockModule = {
      computeHash(str) {
        return `hash_${str}`;
      }
    };

    const proxied = c.audit(mockModule, 'Crypto');
    const result = proxied.computeHash('my-secret');

    expect(result).toBe('hash_my-secret');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(1);
    expect(snap[0].level).toBe('debug');
    expect(snap[0].message).toContain('[AUDIT] ⚡ Crypto.computeHash(my-secret)');
    expect(snap[0].message).toContain('ms');
    c.destroy();
  });

  it('detects parameter validation failures and reports red error', () => {
    const c = new Console();
    const mockRenderer = {
      setResolution(width, height) {
        return `${width}x${height}`;
      }
    };

    c.validate('Renderer.setResolution', ([w, h]) => {
      if (typeof w !== 'number' || w <= 0 || typeof h !== 'number' || h <= 0) {
        return { valid: false, error: 'Width and height must be positive numbers' };
      }
      return { valid: true };
    });

    const renderer = c.audit(mockRenderer, 'Renderer');

    // Valid call
    renderer.setResolution(1920, 1080);
    const snap1 = c.engine.buffer.snapshot();
    expect(snap1.some(e => e.level === 'error')).toBe(false);

    // Invalid call
    renderer.setResolution(-100, 500);
    const snap2 = c.engine.buffer.snapshot();
    const errorEntry = snap2.find(e => e.level === 'error');
    expect(errorEntry).toBeTruthy();
    expect(errorEntry.message).toContain('[VALIDATION] ❌ Invalid parameter in \'Renderer.setResolution\'');
    c.destroy();
  });

  it('detects deprecated API methods and emits deprecation warning', () => {
    const c = new Console();
    const mockLegacy = {
      oldConnect() { return true; },
      newConnect() { return true; }
    };

    c.deprecate('Network.oldConnect', 'Network.newConnect');
    const net = c.audit(mockLegacy, 'Network');

    net.oldConnect();

    const snap = c.engine.buffer.snapshot();
    const warnEntry = snap.find(e => e.level === 'warn');
    expect(warnEntry).toBeTruthy();
    expect(warnEntry.message).toContain('[DEPRECATION] ⚠️ \'Network.oldConnect\' is deprecated.');
    expect(warnEntry.message).toContain('Please migrate to \'Network.newConnect\'.');
    c.destroy();
  });

  it('detects call frequency spam in rapid succession (<200ms)', () => {
    const c = new Console();
    const mockPipeline = {
      rebuild() { return 'ok'; }
    };

    const pipeline = c.audit(mockPipeline, 'Pipeline');

    // Simulate 12 rapid calls
    for (let i = 0; i < 12; i++) {
      pipeline.rebuild();
    }

    const snap = c.engine.buffer.snapshot();
    const spamAlert = snap.find(e => e.message.includes('[PERF ALERT]'));
    expect(spamAlert).toBeTruthy();
    expect(spamAlert.message).toContain('called 11 times in <200ms');
    c.destroy();
  });
});
