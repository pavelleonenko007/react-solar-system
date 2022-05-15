import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';
import NeptuneTexture from '../textures/Neptune.jpg';
import { calculatePosition } from '../utils/utils';
import Ecliptic from './Ecliptic';

export default function Neptune(props) {
  const { planetRadius, orbitRadius, angle } = props;
  const colorMap = useLoader(TextureLoader, NeptuneTexture);
  const ref = useRef();
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const handleNeptuneClick = (event) => {
    event.stopPropagation();
    setActivePlanet(ref.current);
  };
  const pos = calculatePosition(angle, orbitRadius);

  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  return (
    <>
      <mesh
        {...props}
        ref={ref}
        name="Neptune"
        position={pos}
        onClick={handleNeptuneClick}
      >
        <sphereGeometry args={[planetRadius, 64, 64]} />
        <meshPhongMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={orbitRadius} zRadius={orbitRadius} />
    </>
  );
}
