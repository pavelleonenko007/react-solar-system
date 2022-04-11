import React from 'react';

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.005} />
      <pointLight
        color={'#F4E99B'}
        intensity={1}
        position={[0, 0, 0]}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
    </>
  );
}
