const EN = {
  'console.title': 'Console', 'console.clear': 'Clear', 'console.filter': 'Filter',
  'console.search': 'Search', 'console.export': 'Export', 'console.copy': 'Copy',
  'console.close': 'Close', 'console.empty': 'No messages'
};

class LocaleGenerator {
  static fromMap(name, map) { return { name, strings: { ...EN, ...map } }; }
}

export { LocaleGenerator };
