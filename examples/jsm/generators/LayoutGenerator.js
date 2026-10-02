class LayoutGenerator {
  static docked(anchor = 'bottom') {
    return {
      name: `docked-${anchor}`, position: 'docked', anchor,
      width: anchor === 'left' || anchor === 'right' ? 360 : '100%',
      height: anchor === 'left' || anchor === 'right' ? '100%' : 240,
      resizable: true, draggable: false, collapsible: true,
      padding: 8, border: '1px solid #30363d', zIndex: 1000
    };
  }
  static floating() {
    return {
      name: 'floating', position: 'overlay', anchor: 'bottom',
      width: 480, height: 320, resizable: true, draggable: true,
      collapsible: true, padding: 8, border: '1px solid #30363d', zIndex: 9999
    };
  }
}

export { LayoutGenerator };
