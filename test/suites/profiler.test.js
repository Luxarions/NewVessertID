/**
 * @file Execution Profiler & Assertion Test Suite.
 */
import { describe, it, expect } from '../runner.js';
import { Console } from '../../src/Vessert.js';

describe('Execution Profiler & Assertions', () => {
  it('measures elapsed time between time() and timeEnd()', async () => {
    const c = new Console();
    c.time('LoopDuration');

    // Small delay
    await new Promise(res => setTimeout(res, 20));

    c.timeEnd('LoopDuration');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(1);
    expect(snap[0].message).toContain('LoopDuration:');
    expect(snap[0].message).toContain('ms');
    c.destroy();
  });

  it('increments and resets count accurately', () => {
    const c = new Console();
    c.count('DrawCall');
    c.count('DrawCall');
    c.count('DrawCall');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(3);
    expect(snap[2].message).toContain('DrawCall: 3');

    c.countReset('DrawCall');
    c.count('DrawCall');
    const updatedSnap = c.engine.buffer.snapshot();
    expect(updatedSnap[3].message).toContain('DrawCall: 1');
    c.destroy();
  });

  it('assert() passes silently when true, but logs error when false', () => {
    const c = new Console();
    c.assert(true, 'This should not appear');
    expect(c.engine.buffer.length).toBe(0);

    c.assert(false, 'Expected failure alert');
    expect(c.engine.buffer.length).toBe(1);
    const snap = c.engine.buffer.snapshot();
    expect(snap[0].level).toBe('error');
    expect(snap[0].message).toContain('Assertion failed:');
    expect(snap[0].message).toContain('Expected failure alert');
    c.destroy();
  });
});
