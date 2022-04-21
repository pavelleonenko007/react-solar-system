//frragment 

uniform sampler2D uDay;
uniform sampler2D uNight;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float diff = dot(-normalize(vec3(0.005, 0.0, 0.005)), vNormal);
  // diff = diff * 0.5 + 0.5;
  vec3 colorDay = texture2D(uDay, vUv).rgb;
  vec3 colorNight = texture2D(uNight, vUv).rgb;
  vec3 resultColor = vec3(mix(colorNight, colorDay, diff));
  gl_FragColor = vec4(resultColor, 1.);
}

// vertex
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vNormal = normal;
  gl_Position = projectionMatrix * mvPosition;
}

