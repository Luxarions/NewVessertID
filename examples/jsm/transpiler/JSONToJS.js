class JSONToJS {
  static convert(json) { return `export default ${JSON.stringify(json, null, 2)};\n`; }
}

export { JSONToJS };
