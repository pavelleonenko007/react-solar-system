import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import MoonTexture from '../textures/Moon.jpg';
import { calculatePosition } from '../utils/utils';

export default function Moon(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const colorMap = useLoader(TextureLoader, MoonTexture);
  const moonRef = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleMoonClick = (event) => {
    event.stopPropagation();
    setActivePlanet(moonRef.current);
  };

  const pos = calculatePosition(angle, orbitRadius, 3);

  useEffect(() => {
    setPlanets(moonRef.current);
  }, []);

  return (
    <mesh
      {...props}
      name="Moon"
      position={pos}
      ref={moonRef}
      onClick={handleMoonClick}
    >
      <sphereGeometry args={[planetRadius, 64, 64]} />
      <meshPhongMaterial map={colorMap} />
    </mesh>
  );
}
