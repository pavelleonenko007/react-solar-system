import { useLoader } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Select,
  Selection,
  SelectiveBloom,
} from '@react-three/postprocessing';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { usePlanets } from '../hooks/usePlanets';
import SunMap from '../textures/Sun.jpg';

export default function Sun() {
  const colorMap = useLoader(TextureLoader, SunMap);
  const { setPlanets } = usePlanets();
  const ref = useRef();
  useEffect(() => {
    setPlanets(ref.current);
  }, []);
  return (
    <Selection>
      <EffectComposer>
        <SelectiveBloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>
      <Select enabled>
        <mesh ref={ref} name="Sun">
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial map={colorMap} />
          {/* <meshBasicMaterial color="#E1DC59" /> */}
        </mesh>
      </Select>
    </Selection>
  );
}
