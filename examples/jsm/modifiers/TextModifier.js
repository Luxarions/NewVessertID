class TextModifier {
  constructor(mods = {}) { this.mods = mods; }
  apply(text) {
    if (this.mods.uppercase) text = text.toUpperCase();
    if (this.mods.lowercase) text = text.toLowerCase();
    if (this.mods.trim) text = text.trim();
    if (this.mods.truncate && text.length > this.mods.truncate) text = text.slice(0, this.mods.truncate) + '…';
    return text;
  }
}

export { TextModifier };
