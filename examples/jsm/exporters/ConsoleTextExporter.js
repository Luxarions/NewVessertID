class ConsoleTextExporter {
  export(entries) { return entries.map((e) => `[${e.level.toUpperCase()}] ${e.message}`).join('\n'); }
}

export { ConsoleTextExporter };
