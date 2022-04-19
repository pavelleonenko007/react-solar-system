import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import JupiterTexture from '../textures/Jupiter.jpg';
import JupiterTexture8K from '../textures/8k_jupiter.jpg';
import Ecliptic from './Ecliptic';

export default function Jupiter({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, JupiterTexture8K);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const pos = [
    radius * Math.sin(angle * (Math.PI / 180)),
    0,
    radius * Math.cos(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    setPlanets(ref.current);
  }, []);
  return (
    <>
      <mesh ref={ref} name="Jupiter" position={pos}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
