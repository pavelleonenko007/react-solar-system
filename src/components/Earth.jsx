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
import { AdditiveBlending } from 'three';
import { BackSide } from 'three';

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
        value: new Vector3(0.01, 0, 0.01),
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
      <mesh position={pos}>
        <sphereGeometry args={[planetRadius + 0.03, 64, 64]} />
        <shaderMaterial
          args={[
            {
              vertexShader: `
            varying vec2 vUV;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vPos;

            void main() {
              vUV = uv;
              vPosition = position;
              vPos = (modelMatrix * vec4(position, 1.0)).xyz;
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vNormal = normal;
              gl_Position = projectionMatrix * mvPosition;
            }
            
          `,
              fragmentShader: `
              varying vec2 vUV;
              varying vec3 vNormal;
              varying vec3 vPosition;
              varying vec3 vPos;

            void main() {
              float ambient = 0.02;
              float intensity = pow(0.5 - dot(vNormal, vec3(0., 0., 1.)), 2.);

              vec4 lightColor = vec4(1.);
              vec3 atmosphereColor = vec3(0., 0.8, 1.);

              vec3 normal = normalize(vNormal);
              vec3 lightDirection = normalize(vec3(0., 0., 0.) - vPos);

              float diffuse = max(dot(lightDirection, normal), 0.);

              float specularLight = 0.5;
              vec3 viewDirection = normalize(cameraPosition - vPos);
              vec3 reflectionDirection = reflect(-vec3(0., 0., 0.), normal);
              float specAmount = pow(max(dot(viewDirection, reflectionDirection), 0.), 30.);
              float specular = specAmount * specularLight;

              gl_FragColor = vec4(atmosphereColor, 1.0) * intensity * lightColor * (diffuse + ambient + specular);
            }
          `,
              blending: AdditiveBlending,
              side: BackSide,
              transparent: true,
            },
          ]}
        />
      </mesh>
      <mesh position={pos} ref={cloudsRef} onClick={handleClick}>
        <sphereGeometry args={[planetRadius + 0.015, 64, 64]} />
        <meshPhongMaterial map={cloudsMap} transparent />
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
              varying vec3 vPos;
              varying vec3 vPosition;
              
              void main() {
                vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
                vPosition = position;
                vUv = uv;
                vNormal = normal;

                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
              }
              `,
              fragmentShader: `
                uniform sampler2D uDay;
                uniform sampler2D uNight;
                uniform vec3 uSun;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPos;
                varying vec3 vPosition;

                void main() {
                  vec4 ambient = vec4(1., 1., 1., 1.);
                  vec3 dayColor = texture2D(uDay, vUv).rgb;
                  vec3 nightColor = texture2D(uNight, vUv).rgb;

                  float diff = dot(vNormal, normalize(uSun - vPos));

                  float specularLight = 0.9;
                  vec3 viewDirection = normalize(cameraPosition - vPos);
                  vec3 reflectionDirection = reflect(uSun, vNormal);
                  float specularAmount = pow(max(dot(viewDirection, reflectionDirection), 0.), 8.);
                  float specular = specularAmount * specularLight;

                  vec3 result = mix(nightColor, dayColor, diff);

                  gl_FragColor = vec4(result, 1.);
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
