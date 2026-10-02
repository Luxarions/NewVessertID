/**
 * @file Subsystem Channels Test Suite.
 */
import { describe, it, expect } from '../runner.js';
import { Console } from '../../src/Vessert.js';

describe('Subsystem Channels (DSRT Architecture)', () => {
  it('creates dedicated channel instances and caches them', () => {
    const c = new Console();
    const gfx1 = c.channel('RENDERER');
    const gfx2 = c.channel('RENDERER');
    const phys = c.channel('PHYSICS');

    expect(gfx1).toBe(gfx2);
    expect(gfx1.name).toBe('RENDERER');
    expect(phys.name).toBe('PHYSICS');
    c.destroy();
  });

  it('tags channel entries with channel name in metadata and message prefix', () => {
    const c = new Console();
    const gfx = c.channel('RENDERER');
    gfx.info('Compiling vertex shader');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(1);
    expect(snap[0].channel).toBe('RENDERER');
    expect(snap[0].message).toContain('[RENDERER]');
    expect(snap[0].message).toContain('Compiling vertex shader');
    c.destroy();
  });

  it('supports channel-specific table and dir calls', () => {
    const c = new Console();
    const audio = c.channel('AUDIO');
    audio.table([{ voice: 'BGM', volume: 0.8 }, { voice: 'SFX', volume: 1.0 }]);

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(1);
    expect(snap[0].channel).toBe('AUDIO');
    expect(snap[0].type).toBe('table');
    c.destroy();
  });
});
