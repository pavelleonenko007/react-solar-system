import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import VenusTexture from '../textures/Venus.jpg';
import VenusTexture8K from '../textures/8k_venus_surface.jpg';
import Ecliptic from './Ecliptic';

export default function Venus({ planetRadius, radius, angle }) {
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const colorMap = useLoader(TextureLoader, VenusTexture8K);
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
      <mesh ref={ref} name="Venus" position={pos}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
