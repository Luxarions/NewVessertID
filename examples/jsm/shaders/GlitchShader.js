export const GlitchShader = {
  name: 'GlitchShader',
  uniforms: { intensity: 0.05, speed: 1.0 },
  fragment: `
    vec3 glitch(vec3 color, float intensity) {
      float n = fract(sin(dot(color.rg, vec2(12.9898, 78.233))) * 43758.5453);
      return color + (n - 0.5) * intensity;
    }
  `
};
