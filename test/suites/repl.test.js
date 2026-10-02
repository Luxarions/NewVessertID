/**
 * @file Interactive REPL & Evaluator Test Suite.
 */
import { describe, it, expect } from '../runner.js';
import { Console } from '../../src/Vessert.js';

describe('Interactive REPL & Expression Evaluator', () => {
  it('evaluates mathematical expressions accurately', () => {
    const c = new Console();
    c.evaluate('100 + 250');

    const snap = c.engine.buffer.snapshot();
    expect(snap.length).toBe(2); // > 100 + 250 and < 350
    expect(snap[0].message).toContain('> 100 + 250');
    expect(snap[1].message).toContain('< 350');
    c.destroy();
  });

  it('executes built-in registered commands (help, clear, channels)', () => {
    const c = new Console();
    c.evaluate('channels');

    const snap = c.engine.buffer.snapshot();
    expect(snap.some(e => e.message.includes('Active Subsystem Channels'))).toBe(true);

    c.evaluate('clear');
    expect(c.engine.buffer.length).toBe(0);
    c.destroy();
  });

  it('allows registering and executing custom commands with arguments', () => {
    const c = new Console();
    c.registerCommand('greet', (name) => `Hello, ${name || 'World'}!`, 'Greets a user');

    c.evaluate('greet Alice');
    const snap = c.engine.buffer.snapshot();
    expect(snap.some(e => e.message.includes('Hello, Alice!'))).toBe(true);
    c.destroy();
  });
});
