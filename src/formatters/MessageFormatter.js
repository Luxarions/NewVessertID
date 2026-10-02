/**
 * @file Message formatter.
 * @module formatters/MessageFormatter
 */

import { TimestampFormatter } from './TimestampFormatter.js';
import { StackTraceFormatter } from './StackTraceFormatter.js';
import { ObjectFormatter } from './ObjectFormatter.js';
import { PrefixFormatter } from './PrefixFormatter.js';

/** Composes the final string for an entry. */
class MessageFormatter {
  /** @param {Object} state - Console state. */
  constructor(state) {
    this.state = state;
    this.timestamp = new TimestampFormatter(state.features.timestampFormat);
    this.stack = new StackTraceFormatter();
    this.objects = new ObjectFormatter();
    this.prefix = new PrefixFormatter(state.levels);
  }

  /**
   * @param {string} level - Level name.
   * @param {*[]} args - Args.
   * @returns {string} Formatted message.
   */
  format(level, args) {
    const parts = [];
    if (this.state.features.timestamp) parts.push(this.timestamp.now());
    const pfx = this.prefix.for(level);
    if (pfx) parts.push(pfx);
    parts.push(args.map((a) => this.objects.format(a)).join(' '));
    if (this.state.features.stackTrace && args[0] instanceof Error) {
      parts.push(this.stack.format(args[0]));
    }
    return parts.filter(Boolean).join(' ');
  }
}

export { MessageFormatter };
