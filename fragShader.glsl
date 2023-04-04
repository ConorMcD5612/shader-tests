varying vec2 vUvs;

uniform uTime;
void main() {
  vec3 color;
  float wave = sin(vUvs.x * 10.0 + time * 5.0) * 0.02;
  float line1 = smoothstep(0.0, 0.005, abs(vUvs.y - 0.21333));
  float line2 = smoothstep(0.0, 0.005, abs(vUvs.y - 0.7666));
  

  color = vec3(0.5, 1.0, vUvs.x);
  color = mix(vec3(0.0, 0.0, 0.0), color, line1);
  color = mix(vec3(0.0, 0.0, 0.0), color, line2);


  gl_FragColor = vec4(color, 1.0);
}
