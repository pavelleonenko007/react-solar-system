import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import MoonTexture from '../textures/Moon.jpg';

export default function Moon({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, MoonTexture);
  const moonRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleMoonClick = (event) => {
    event.stopPropagation();
    setActivePlanet(moonRef.current);
  };

  const pos = [
    radius * Math.cos(angle * (Math.PI / 180)),
    3,
    radius * Math.sin(angle * (Math.PI / 180)),
  ];

  useEffect(() => {
    setPlanets(moonRef.current);
  }, []);

  return (
    <mesh name="Moon" position={pos} ref={moonRef} onClick={handleMoonClick}>
      <sphereGeometry args={[planetRadius, 64, 64]} />
      <meshPhongMaterial map={colorMap} />
    </mesh>
  );
}
