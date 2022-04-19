import { useLoader } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import EarthTexture from '../textures/Earth.jpg';
import EarthTexture8K from '../textures/8k_earth_daymap.jpg';
import EarthBumpTexture from '../textures/Earth_Bump.jpeg';
import EarthCloudsMap from '../textures/Earth_Clouds.png';
import EarthNigthTexture from '../textures/Earth_Night.jpg';
import EarthNigthTexture8K from '../textures/8k_earth_nightmap.jpg';
import EarthNormalTexture from '../textures/Earth_Normal.jpeg';
import Ecliptic from './Ecliptic';

export default function Earth({ planetRadius, radius, angle }) {
  const [colorMap, nightMap, normalMap, bumpMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      EarthTexture8K,
      EarthNigthTexture8K,
      EarthNormalTexture,
      EarthBumpTexture,
      EarthCloudsMap,
    ]
  );
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const mat = useRef();
  const cloudsRef = useRef();
  const planetRef = useRef();
  const handleClick = (e) => {
    setActivePlanet(planetRef.current);
  };
  const pos = [
    radius * Math.sin(angle * (Math.PI / 180)),
    0,
    radius * Math.cos(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    setPlanets(planetRef.current);
  }, []);

  // useFrame(() => {
  //   cloudsRef.current.rotation.y += 0.0001;
  //   // planetRef.current.rotation.y += 0.002;
  // });

  const uniforms = useMemo(() => {
    return {
      uSun: {
        value: new Vector3(0.1, 0, 0.1),
      },
      uDay: {
        value: colorMap,
      },
      uNight: {
        value: nightMap,
      },
    };
  }, []);

  return (
    <group name="Earth">
      <mesh position={pos} ref={cloudsRef} onClick={handleClick}>
        <sphereGeometry args={[planetRadius + 0.015, 64, 64]} />
        <meshStandardMaterial map={cloudsMap} transparent />
      </mesh>
      <mesh position={pos} name="Earth" ref={planetRef}>
        <sphereGeometry args={[planetRadius, 100, 100]} />
        <shaderMaterial
          args={[
            {
              extensions: {
                derivatives: true,
              },
              uniforms: uniforms,
              vertexShader: `
              varying vec2 vUv;
              varying vec3 vNormal;
              
              void main() {
                vUv = uv;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                vNormal = normal;
                gl_Position = projectionMatrix * mvPosition;
              }
              `,
              fragmentShader: `
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
              `,
            },
          ]}
        />
        {/* <earthShaderMaterial
          ref={mat}
          uDay={colorMap}
          uNight={nightMap}
          extensions={{ derivatives: true }}
        /> */}
        <meshPhongMaterial
          reflectivity={2}
          map={nightMap}
          normalMap={normalMap}
          normalScale={[0.2, 0.2]}
          bumpMap={bumpMap}
          bumpScale={0.9}
        />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
