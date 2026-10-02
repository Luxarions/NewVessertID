class KeymapGenerator {
  static fromMap(name, bindings) { return { name, bindings }; }
  static default() {
    return KeymapGenerator.fromMap('default', {
      'Ctrl+L': 'clear', 'Ctrl+F': 'filter', 'Ctrl+Shift+F': 'search',
      'Ctrl+S': 'export', 'Ctrl+C': 'copy'
    });
  }
}

export { KeymapGenerator };
