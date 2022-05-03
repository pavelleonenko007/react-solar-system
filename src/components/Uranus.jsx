import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import UranusTexture from '../textures/Uranus.jpg';
import Ecliptic from './Ecliptic';

export default function Uranus({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, UranusTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleUranusClick = (event) => {
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
      <mesh ref={ref} name="Uranus" position={pos} onClick={handleUranusClick}>
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </>
  );
}
