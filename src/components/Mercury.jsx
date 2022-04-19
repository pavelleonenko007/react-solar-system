import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import MercuryMap from '../textures/Mercury.jpg';
import MercuryMap8K from '../textures/8k_mercury.jpg';
import Ecliptic from './Ecliptic';

export default function Mercury({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, MercuryMap8K);
  const planetRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
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

  return (
    <>
      <mesh
        ref={planetRef}
        name="Mercury"
        position={pos}
        onClick={handleClick}
        receiveShadow
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
