import React, { useEffect, useRef } from 'react';
import { usePlanets } from '../hooks/usePlanets';

export default function Sun() {
  const { setPlanets } = usePlanets();
  const ref = useRef();
  useEffect(() => {
    setPlanets(ref.current);
  }, []);
  return (
    <mesh ref={ref} name="Sun">
      <sphereGeometry args={[6, 32, 32]} />
      <meshBasicMaterial color="#E1DC59" />
    </mesh>
  );
}
