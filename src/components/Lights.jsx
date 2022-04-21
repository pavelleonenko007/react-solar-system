import React, { useRef } from 'react';

export default function Lights() {
  const ref = useRef();
  return (
    <>
      <ambientLight intensity={0.02} />
      <pointLight
        ref={ref}
        color={'#ffffff'}
        intensity={1}
        position={[0, 0, 0]}
        castShadow
        decay={2}
        shadow-bias={-0.002}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        // shadow={{ radius: 2 }}
      />
    </>
  );
}
