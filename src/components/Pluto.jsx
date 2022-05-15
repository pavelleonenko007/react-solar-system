import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import PlutoTexture from '../textures/Pluto.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Pluto(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const colorMap = useLoader(TextureLoader, PlutoTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handlePlutoClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };

  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh
        {...props}
        ref={ref}
        name="Pluto"
        position={pos}
        castShadow
        onClick={handlePlutoClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </group>
  );
}
