import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import PlutoTexture from '../textures/Pluto.jpg';
import Ecliptic from './Ecliptic';

export default function Pluto({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, PlutoTexture);
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
    <group>
      <mesh ref={ref} name="Pluto" position={pos} castShadow>
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
