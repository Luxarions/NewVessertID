/**
 * @file Lightweight Universal Test Runner & Assertion Library.
 * Works seamlessly in both Node.js (CLI) and Web Browsers (DOM/Vessert Console).
 * @module test/runner
 */

class Assertion {
  constructor(actual) {
    this.actual = actual;
  }

  toBe(expected) {
    if (this.actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)}, but received ${JSON.stringify(this.actual)}`);
    }
  }

  toEqual(expected) {
    const a = JSON.stringify(this.actual);
    const b = JSON.stringify(expected);
    if (a !== b) {
      throw new Error(`Deep equality failed:\nExpected: ${b}\nReceived: ${a}`);
    }
  }

  toBeTruthy() {
    if (!this.actual) {
      throw new Error(`Expected truthy value, but received ${JSON.stringify(this.actual)}`);
    }
  }

  toBeFalsy() {
    if (this.actual) {
      throw new Error(`Expected falsy value, but received ${JSON.stringify(this.actual)}`);
    }
  }

  toContain(item) {
    if (typeof this.actual === 'string' || Array.isArray(this.actual)) {
      if (!this.actual.includes(item)) {
        throw new Error(`Expected collection to contain ${JSON.stringify(item)}, but it was not found.`);
      }
    } else {
      throw new Error(`toContain requires string or array, got ${typeof this.actual}`);
    }
  }

  toBeGreaterThan(num) {
    if (!(this.actual > num)) {
      throw new Error(`Expected ${this.actual} to be > ${num}`);
    }
  }

  toBeLessThan(num) {
    if (!(this.actual < num)) {
      throw new Error(`Expected ${this.actual} to be < ${num}`);
    }
  }

  toThrow(expectedMessage) {
    if (typeof this.actual !== 'function') {
      throw new Error(`toThrow requires a function, got ${typeof this.actual}`);
    }
    let threw = false;
    let caughtErr = null;
    try {
      this.actual();
    } catch (err) {
      threw = true;
      caughtErr = err;
    }
    if (!threw) {
      throw new Error('Expected function to throw an error, but it returned normally.');
    }
    if (expectedMessage && !caughtErr.message.includes(expectedMessage)) {
      throw new Error(`Expected error containing "${expectedMessage}", but got "${caughtErr.message}"`);
    }
  }
}

export function expect(actual) {
  return new Assertion(actual);
}

class TestRunner {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
    this.stats = {
      totalSuites: 0,
      totalTests: 0,
      passed: 0,
      failed: 0,
      durationMs: 0
    };
  }

  describe(name, fn) {
    const suite = {
      name,
      tests: [],
      passed: 0,
      failed: 0
    };
    this.suites.push(suite);
    const prevSuite = this.currentSuite;
    this.currentSuite = suite;
    try {
      fn();
    } finally {
      this.currentSuite = prevSuite;
    }
  }

  it(name, fn) {
    if (!this.currentSuite) {
      this.describe('Default Suite', () => this.it(name, fn));
      return;
    }
    this.currentSuite.tests.push({ name, fn });
  }

  async run(reporter = null) {
    const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
    const start = performance.now();
    this.stats = {
      totalSuites: this.suites.length,
      totalTests: 0,
      passed: 0,
      failed: 0,
      durationMs: 0
    };

    const out = reporter || {
      log: console.log,
      success: (msg) => console.log(isNode ? `\x1b[32m${msg}\x1b[0m` : msg),
      error: (msg) => console.log(isNode ? `\x1b[31m${msg}\x1b[0m` : msg),
      header: (msg) => console.log(isNode ? `\x1b[1m\x1b[36m${msg}\x1b[0m` : msg)
    };

    out.header(`\n═══════════════════════════════════════════════════════`);
    out.header(`🧪 VessertID Automated Test Suite Engine`);
    out.header(`═══════════════════════════════════════════════════════\n`);

    for (const suite of this.suites) {
      out.log(`\n📦 Suite: ${suite.name}`);
      for (const t of suite.tests) {
        this.stats.totalTests++;
        const testStart = performance.now();
        try {
          await t.fn();
          const duration = (performance.now() - testStart).toFixed(2);
          suite.passed++;
          this.stats.passed++;
          out.success(`  ✓ ${t.name} (${duration}ms)`);
        } catch (err) {
          suite.failed++;
          this.stats.failed++;
          out.error(`  ✗ ${t.name}`);
          out.error(`    Error: ${err.message}`);
          if (err.stack) {
            const firstLines = err.stack.split('\n').slice(1, 3).join('\n');
            out.error(`    ${firstLines}`);
          }
        }
      }
    }

    this.stats.durationMs = (performance.now() - start).toFixed(2);

    out.header(`\n═══════════════════════════════════════════════════════`);
    out.header(`📊 Test Execution Results:`);
    out.log(`  Total Suites: ${this.stats.totalSuites}`);
    out.log(`  Total Tests:  ${this.stats.totalTests}`);
    out.success(`  Passed Tests: ${this.stats.passed}`);
    if (this.stats.failed > 0) {
      out.error(`  Failed Tests: ${this.stats.failed}`);
    } else {
      out.success(`  All tests passed successfully! ✨`);
    }
    out.log(`  Duration:     ${this.stats.durationMs}ms`);
    out.header(`═══════════════════════════════════════════════════════\n`);

    return this.stats;
  }
}

export const runner = new TestRunner();
export const describe = runner.describe.bind(runner);
export const it = runner.it.bind(runner);
export const test = runner.it.bind(runner);

// If executed directly from Node CLI
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.endsWith('runner.js')) {
  (async () => {
    // Dynamically load all test suites
    await import('./suites/console.test.js');
    await import('./suites/channels.test.js');
    await import('./suites/profiler.test.js');
    await import('./suites/repl.test.js');
    await import('./suites/api-auditor.test.js');

    const stats = await runner.run();
    process.exit(stats.failed > 0 ? 1 : 0);
  })();
}
