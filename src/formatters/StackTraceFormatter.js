/**
 * @file Stack trace formatter.
 * @module formatters/StackTraceFormatter
 */

/** Formats an Error stack. */
class StackTraceFormatter {
  /** @param {Error} error - Error. @returns {string} Stack. */
  format(error) {
    if (!error?.stack) return String(error);
    return error.stack.split('\n').slice(1).join('\n');
  }
}

export { StackTraceFormatter };
