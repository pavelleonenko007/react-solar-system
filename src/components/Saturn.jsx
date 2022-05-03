import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { BackSide, Vector3 } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import SaturnTexture from '../textures/Saturn.jpg';
import Rings from '../textures/saturn_rings.png';
import Ecliptic from './Ecliptic';

export default function Saturn({ planetRadius, radius, angle }) {
  const [colorMap, ringsMap] = useLoader(TextureLoader, [SaturnTexture, Rings]);
  const ref = useRef();
  const ringRef = useRef();
  const ringGeoRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleSaturnClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };
  const pos = [
    radius * Math.cos(angle * (Math.PI / 180)),
    0,
    radius * Math.sin(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    const geometry = ringGeoRef.current;
    const pos = geometry.attributes.position;
    var v3 = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < 5 ? 0 : 1, 1);
    }

    ringRef.current.rotation.x = 4.7;
    ringRef.current.rotation.y = 0.2;
    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh
        ref={ref}
        name="Saturn"
        position={pos}
        castShadow
        onClick={handleSaturnClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <mesh ref={ringRef} position={pos} receiveShadow>
        <ringGeometry
          ref={ringGeoRef}
          args={[planetRadius + 1, planetRadius + 4, 64]}
        />
        {/* <meshBasicMaterial color={'#ababab'} /> */}
        {/* <shaderMaterial
          args={[
            {
              transparent: true,
              side: DoubleSide,
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
            uniform sampler2D ringTexture;
            uniform vec3 uSun;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPos;
            varying vec3 vPosition;

            void main() {
              vec4 ambient = vec4(1., 1., 1., 1.);
              vec4 ringColor = texture2D(ringTexture, vUv);

              float diff = dot(vNormal, normalize(uSun - vPos));

              float specularLight = 0.9;
              vec3 viewDirection = normalize(cameraPosition - vPos);
              vec3 reflectionDirection = reflect(uSun, vNormal);
              float specularAmount = pow(max(dot(viewDirection, reflectionDirection), 0.), 8.);
              float specular = specularAmount * specularLight;



              vec4 result = ringColor * (diff + specular);

              gl_FragColor = vec4(result);
            }
          `,
            },
          ]}
        /> */}
        <shadowMaterial attach="material" transparent opacity={0.4} />
        <meshPhongMaterial
          map={ringsMap}
          transparent
          side={2}
          shadowSide={BackSide}
        />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
