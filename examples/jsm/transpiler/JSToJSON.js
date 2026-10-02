class JSToJSON {
  static convert(object) { return JSON.stringify(object, null, 2); }
}

export { JSToJSON };
