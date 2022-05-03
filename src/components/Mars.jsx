import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import MarsTexture from '../textures/Mars.jpg';
import Ecliptic from './Ecliptic';
import { useActivePlanet } from '../hooks/useActivePlanet';

export default function Mars({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, MarsTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleMarsClick = (event) => {
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
      <mesh ref={ref} name="Mars" position={pos} onClick={handleMarsClick}>
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
