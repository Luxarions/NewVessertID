/**
 * @file Tabular Grid View for console.table().
 * @module ui/TableView
 */

export class TableView {
  /**
   * Render an HTML table element for structured dataset.
   * @param {Array<Object>} rows
   * @returns {HTMLTableElement}
   */
  static render(rows) {
    const table = document.createElement('table');
    table.className = 'vessert-table-grid';
    table.style.cssText = 'border-collapse: collapse; width: 100%; font-size: 11px; margin: 4px 0; font-family: inherit;';

    if (!Array.isArray(rows) || rows.length === 0) {
      table.innerHTML = '<tr><td>(empty dataset)</td></tr>';
      return table;
    }

    const keys = Object.keys(rows[0]);

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.cssText = 'background: #162030; color: #38bdf8; text-align: left;';

    keys.forEach((k) => {
      const th = document.createElement('th');
      th.textContent = k;
      th.style.cssText = 'padding: 4px 8px; border: 1px solid #233148; font-weight: 600;';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    rows.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.style.cssText = idx % 2 === 0 ? 'background: #0d1420;' : 'background: #111a28;';

      keys.forEach((k) => {
        const td = document.createElement('td');
        const val = r[k];
        td.textContent = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
        td.style.cssText = 'padding: 4px 8px; border: 1px solid #1e2a3e; color: #cbd5e1;';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }
}
