import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import SaturnTexture from '../textures/Saturn.jpg';
import Rings from '../textures/rings.jpeg';
import Ecliptic from './Ecliptic';
import { Vector3 } from 'three';

export default function Saturn({ planetRadius, radius, angle }) {
  const [colorMap, ringsMap] = useLoader(TextureLoader, [SaturnTexture, Rings]);
  const ref = useRef();
  const ringRef = useRef();
  const ringGeoRef = useRef();
  const { setPlanets } = usePlanets();
  const pos = [
    radius * Math.sin(angle * (Math.PI / 180)),
    0,
    radius * Math.cos(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    var posr = ringGeoRef.current.attributes.position;
    var v3 = new Vector3();
    for (let i = 0; i < posr.count; i++) {
      v3.fromBufferAttribute(posr, i);
      ringGeoRef.current.attributes.uv.setXY(i, v3.length() < 10 ? 0 : 1, 1);
    }

    ringRef.current.rotation.x = 5;
    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh ref={ref} name="Saturn" position={pos} receiveShadow castShadow>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <mesh ref={ringRef} position={pos} castShadow receiveShadow>
        <ringGeometry
          ref={ringGeoRef}
          args={[planetRadius + 1, planetRadius + 3, 64]}
        />
        <meshStandardMaterial map={ringsMap} side={2} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
