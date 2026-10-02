class ConsoleJSONExporter {
  export(entries) { return JSON.stringify(entries, null, 2); }
}

export { ConsoleJSONExporter };
