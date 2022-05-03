import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import JupiterTexture from '../textures/Jupiter.jpg';
import Ecliptic from './Ecliptic';

export default function Jupiter({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, JupiterTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleJupiterClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };
  const pos = [
    radius * Math.cos(angle * (Math.PI / 180)),
    0,
    radius * Math.sin(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  return (
    <>
      <mesh
        ref={ref}
        name="Jupiter"
        position={pos}
        onClick={handleJupiterClick}
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
