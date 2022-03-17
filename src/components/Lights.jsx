import React from 'react';

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight intensity={2} position={[0, 0, 0]} />
    </>
  );
}
