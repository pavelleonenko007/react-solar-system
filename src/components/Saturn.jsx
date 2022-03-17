import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import SaturnTexture from '../textures/Saturn.jpg';
import Ecliptic from './Ecliptic';

export default function Saturn({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, SaturnTexture);
  const ref = useRef();
  const ringRef = useRef();
  const { setPlanets } = usePlanets();
  const pos = [
    radius * Math.sin(angle * (Math.PI / 180)),
    0,
    radius * Math.cos(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    ringRef.current.rotation.x = 5;
    setPlanets(ref.current);
  }, []);
  return (
    <group>
      <mesh ref={ref} name="Saturn" position={pos}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <mesh ref={ringRef} position={pos}>
        <ringGeometry args={[planetRadius + 1, planetRadius + 3, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
