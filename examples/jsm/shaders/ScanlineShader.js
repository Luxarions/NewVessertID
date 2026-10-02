export const ScanlineShader = {
  name: 'ScanlineShader',
  uniforms: { density: 2.0, opacity: 0.2 },
  fragment: `
    vec3 scanline(vec3 color, float y, float density, float opacity) {
      float s = sin(y * density) * 0.5 + 0.5;
      return mix(color, vec3(0.0), s * opacity);
    }
  `
};
