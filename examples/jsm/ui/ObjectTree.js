/**
 * @file Interactive Expandable Object Tree Inspector for console.dir().
 * @module ui/ObjectTree
 */

export class ObjectTree {
  /**
   * Build an expandable DOM tree from an object.
   * @param {Object} obj - Target object.
   * @param {string} [name='Object'] - Root name.
   * @param {number} [depth=0]
   * @returns {HTMLElement}
   */
  static render(obj, name = 'Object', depth = 0) {
    const container = document.createElement('div');
    container.className = 'vessert-object-node';
    container.style.cssText = `margin-left: ${depth * 14}px; font-family: inherit; font-size: 11.5px; line-height: 1.4;`;

    if (obj === null) {
      container.innerHTML = `<span style="color: #94a3b8;">${name}:</span> <span style="color: #64748b; font-style: italic;">null</span>`;
      return container;
    }

    if (typeof obj !== 'object') {
      const color = typeof obj === 'string' ? '#a6e22e' : typeof obj === 'number' ? '#bd93f9' : '#38bdf8';
      const valStr = typeof obj === 'string' ? `"${obj}"` : String(obj);
      container.innerHTML = `<span style="color: #94a3b8;">${name}:</span> <span style="color: ${color};">${valStr}</span>`;
      return container;
    }

    const isArray = Array.isArray(obj);
    const keys = Object.keys(obj);
    const bracketOpen = isArray ? '[' : '{';
    const bracketClose = isArray ? ']' : '}';

    const toggleHeader = document.createElement('div');
    toggleHeader.style.cssText = 'cursor: pointer; user-select: none; color: #38bdf8; display: inline-flex; align-items: center; gap: 4px;';
    toggleHeader.innerHTML = `<span>▶</span> <span>${name}:</span> <span style="color: #64748b;">${bracketOpen} ${keys.length} properties ${bracketClose}</span>`;

    const childrenContainer = document.createElement('div');
    childrenContainer.style.display = 'none';

    keys.forEach((key) => {
      const childNode = ObjectTree.render(obj[key], key, depth + 1);
      childrenContainer.appendChild(childNode);
    });

    toggleHeader.addEventListener('click', () => {
      const isExpanded = childrenContainer.style.display !== 'none';
      childrenContainer.style.display = isExpanded ? 'none' : 'block';
      toggleHeader.querySelector('span').textContent = isExpanded ? '▶' : '▼';
    });

    container.appendChild(toggleHeader);
    container.appendChild(childrenContainer);
    return container;
  }
}
