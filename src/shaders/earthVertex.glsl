//frragment 

uniform sampler2D uDay;
uniform sampler2D uNight;

uniform vec3 uSun;

varying vec2 vUv;
varying vec3 vNormal;

void main( void ) {
  vec3 dayColor = texture2D( uDay, vUv ).rgb;
  vec3 nightColor = texture2D( uNight, vUv ).rgb;

  // compute cosine sun to normal so -1 is away from sun and +1 is toward sun.
  float cosineAngleSunToNormal = dot(normalize(uSun), normalize(vNormal));

  // sharpen the edge beween the transition
  cosineAngleSunToNormal = clamp( cosineAngleSunToNormal * 100., -1.0, 1.0);

  // convert to 0 to 1 for mixing
  float mixAmount = cosineAngleSunToNormal * 0.5 + 0.5;

  vec3 black = vec3(0., 0., 0.);
  nightColor = mix(nightColor, black, smoothstep(0. , 0.3, normalize(vNormal).z + normalize(vNormal).x));

  // Select day or night texture based on mix.
  vec3 color = mix( dayColor, nightColor, mixAmount );

  gl_FragColor = vec4( color, 1.0 );
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

