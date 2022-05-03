import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import PlutoTexture from '../textures/Pluto.jpg';
import Ecliptic from './Ecliptic';

export default function Pluto({ planetRadius, radius, angle }) {
  const colorMap = useLoader(TextureLoader, PlutoTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handlePlutoClick = (event) => {
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
    <group>
      <mesh
        ref={ref}
        name="Pluto"
        position={pos}
        castShadow
        onClick={handlePlutoClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
