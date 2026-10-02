class ConsoleCSVExporter {
  export(entries) {
    const header = 'timestamp,level,message';
    const rows = entries.map((e) => [e.timestamp, e.level, JSON.stringify(e.message)].join(','));
    return [header, ...rows].join('\n');
  }
}

export { ConsoleCSVExporter };
