import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import Ecliptic from './Ecliptic';
import EarthTexture from '../textures/Earth.jpg';
import EarthNormalTexture from '../textures/Earth_Normal.jpeg';
import EarthBumpTexture from '../textures/Earth_Bump.jpeg';
import EarthCloudsMap from '../textures/Earth_Clouds.png';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { usePlanets } from '../hooks/usePlanets';

export default function Earth({ planetRadius, radius, angle }) {
  const [colorMap, normalMap, bumpMap, cloudsMap] = useLoader(TextureLoader, [
    EarthTexture,
    EarthNormalTexture,
    EarthBumpTexture,
    EarthCloudsMap,
  ]);
  const { setPlanets } = usePlanets();
  const { setActivePlanet } = useActivePlanet();
  const cloudsRef = useRef();
  const planetRef = useRef();
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

  useFrame(() => {
    // cloudsRef.current.rotation.y += 0.001;
    // planetRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <mesh position={pos} ref={cloudsRef} onClick={handleClick}>
        <sphereGeometry args={[planetRadius + 0.015, 32, 32]} />
        <meshStandardMaterial map={cloudsMap} transparent />
      </mesh>
      <mesh position={pos} name="Earth" ref={planetRef}>
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={[2, 2]}
          bumpMap={bumpMap}
          bumpScale={0.8}
        />
      </mesh>
      <Ecliptic xRadius={radius} zRadius={radius} />
    </group>
  );
}
