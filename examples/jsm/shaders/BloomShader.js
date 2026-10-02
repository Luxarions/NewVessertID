export const BloomShader = {
  name: 'BloomShader',
  uniforms: { threshold: 0.6, intensity: 0.8 },
  fragment: `
    vec3 bloom(vec3 color, float threshold, float intensity) {
      float l = dot(color, vec3(0.2126, 0.7152, 0.0722));
      return color + color * max(0.0, l - threshold) * intensity;
    }
  `
};
