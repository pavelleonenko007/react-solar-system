import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import VenusTexture from '../textures/Venus.jpg';
import Ecliptic from './Ecliptic';

export default function Venus({ planetRadius, radius, angle }) {
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const colorMap = useLoader(TextureLoader, VenusTexture);
  const { setActivePlanet } = useActivePlanet();
  const handleVenusClick = (event) => {
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
      <mesh ref={ref} name="Venus" position={pos} onClick={handleVenusClick}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
