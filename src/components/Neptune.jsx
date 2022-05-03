import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import NeptuneTexture from '../textures/Neptune.jpg';
import Ecliptic from './Ecliptic';

export default function Neptune({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, NeptuneTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleNeptuneClick = (event) => {
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
        name="Neptune"
        position={pos}
        onClick={handleNeptuneClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
