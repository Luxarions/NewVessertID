/**
 * @file API Usage Detector & Telemetry Auditor.
 * Intercepts, detects, validates, and audits API calls made by users.
 * @module core/ApiAuditor
 */

export class ApiAuditor {
  /**
   * @param {import('./Console.js').Console} consoleInstance
   */
  constructor(consoleInstance) {
    this.console = consoleInstance;
    /** @type {Map<string, string>} */
    this.deprecations = new Map();
    /** @type {Map<string, Function>} */
    this.validators = new Map();
    /** @type {Map<string, { count: number, lastCall: number }>} */
    this.callFrequencies = new Map();
    /** @type {boolean} */
    this.verbose = true;
  }

  /**
   * Mark an API method as deprecated.
   * @param {string} methodName
   * @param {string} [replacement]
   */
  deprecate(methodName, replacement = '') {
    this.deprecations.set(methodName, replacement);
  }

  /**
   * Register argument validator for a method.
   * @param {string} methodName
   * @param {Function} validatorFn - (args) => { valid: boolean, error?: string }
   */
  registerValidator(methodName, validatorFn) {
    this.validators.set(methodName, validatorFn);
  }

  /**
   * Wrap an object or API module with an observable audit proxy.
   * Intercepts every call, detects deprecations, validates params, and measures execution time.
   * @template T
   * @param {T} target
   * @param {string} [namespace='API']
   * @returns {T}
   */
  audit(target, namespace = 'API') {
    if (!target || typeof target !== 'object') return target;

    const self = this;

    return new Proxy(target, {
      get(obj, prop, receiver) {
        const origVal = Reflect.get(obj, prop, receiver);

        // If property is a function, wrap it with detection logic
        if (typeof origVal === 'function') {
          return function (...args) {
            const qualifiedName = `${namespace}.${String(prop)}`;
            const now = performance.now();

            // 1. Detect Deprecation
            if (self.deprecations.has(qualifiedName) || self.deprecations.has(String(prop))) {
              const alt = self.deprecations.get(qualifiedName) || self.deprecations.get(String(prop));
              self.console.warn(`[DEPRECATION] ⚠️ '${qualifiedName}' is deprecated.${alt ? ` Please migrate to '${alt}'.` : ''}`);
            }

            // 2. Detect Parameter Validation
            const validator = self.validators.get(qualifiedName) || self.validators.get(String(prop));
            if (validator) {
              const check = validator(args);
              if (!check.valid) {
                self.console.error(`[VALIDATION] ❌ Invalid parameter in '${qualifiedName}': ${check.error || 'Argument check failed'}`);
              }
            }

            // 3. Detect Call Frequency / Spam
            const freq = self.callFrequencies.get(qualifiedName) || { count: 0, lastCall: now };
            if (now - freq.lastCall < 200) {
              freq.count++;
              if (freq.count > 10) {
                self.console.warn(`[PERF ALERT] ⚠️ Rapid execution: '${qualifiedName}' called ${freq.count} times in <200ms! Verify render loop.`);
                freq.count = 0; // reset warning throttle
              }
            } else {
              freq.count = 1;
            }
            freq.lastCall = now;
            self.callFrequencies.set(qualifiedName, freq);

            // 4. Measure Execution Duration
            const t0 = performance.now();
            let result;
            let hadError = false;
            try {
              result = origVal.apply(this, args);
            } catch (err) {
              hadError = true;
              self.console.error(`[API EXCEPTION] 💥 Exception in '${qualifiedName}': ${err.message}`);
              throw err;
            } finally {
              const duration = (performance.now() - t0).toFixed(3);
              if (self.verbose && !hadError) {
                const argsStr = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(', ');
                self.console.debug(`[AUDIT] ⚡ ${qualifiedName}(${argsStr}) [${duration}ms]`);
              }
            }

            return result;
          };
        }

        return origVal;
      }
    });
  }
}
