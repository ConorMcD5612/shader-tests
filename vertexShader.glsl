varying vec2 vUvs;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

mat3 rotateY(float radians)
{
  float s = sin(radians);
  float c = cos(radians);

  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}
void main() {
  vec3 localSpacePosition = position;
  localSpacePosition = rotateY(time) * localSpacePosition;

gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vUvs = uv;
}