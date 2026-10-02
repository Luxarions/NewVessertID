/**
 * @file Console Core & Levels Test Suite.
 */
import { describe, it, expect } from '../runner.js';
import { Console } from '../../src/Vessert.js';

describe('Core Console Engine & Levels', () => {
  it('initializes Console with default configuration', () => {
    const c = new Console();
    expect(c).toBeTruthy();
    expect(c.state).toBeTruthy();
    expect(c.engine).toBeTruthy();
    expect(c.engine.buffer.length).toBe(0);
    c.destroy();
  });

  it('records log, info, warn, error, fatal, debug, and trace entries in buffer', () => {
    const c = new Console();
    c.log('Standard log message');
    c.info('Info notice message');
    c.warn('Warning message');
    c.error('Error failure message');
    c.fatal('Fatal system crash');
    c.debug('Debug diagnostics');
    c.trace('Trace execution');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(7);

    const levels = snap.map(entry => entry.level);
    expect(levels).toEqual(['log', 'info', 'warn', 'error', 'fatal', 'debug', 'trace']);
    c.destroy();
  });

  it('clears buffer on c.clear()', () => {
    const c = new Console();
    c.log('Message 1');
    c.log('Message 2');
    expect(c.engine.buffer.length).toBe(2);

    c.clear();
    expect(c.engine.buffer.length).toBe(0);
    c.destroy();
  });

  it('renders table data correctly into formatted entries', () => {
    const c = new Console();
    const mockEntities = [
      { id: 1, name: 'Hero', role: 'Warrior' },
      { id: 2, name: 'Mage', role: 'Sorcerer' }
    ];
    c.table(mockEntities);

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(1);
    expect(snap[0].type).toBe('table');
    expect(snap[0].message).toContain('Hero');
    expect(snap[0].message).toContain('Sorcerer');
    c.destroy();
  });

  it('exports buffer as valid JSON string', () => {
    const c = new Console();
    c.info('Exportable message 1');
    c.error('Exportable message 2');

    const json = c.export('json');
    expect(typeof json).toBe('string');
    const parsed = JSON.parse(json);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBe(2);
    expect(parsed[0].message).toContain('Exportable message 1');
    c.destroy();
  });
});
