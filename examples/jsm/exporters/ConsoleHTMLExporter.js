class ConsoleHTMLExporter {
  export(entries) {
    return entries.map((e) => `<div class="vessert-line vessert-${e.level}">${escapeHtml(e.message)}</div>`).join('\n');
  }
}

function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

export { ConsoleHTMLExporter };
