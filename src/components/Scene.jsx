import { Stars, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Vector3 } from 'three';
import Camera from './Camera';
import Curve from './Curve';
import Earth from './Earth';
import Jupiter from './Jupiter';
import Lights from './Lights';
import Mars from './Mars';
import Mercury from './Mercury';
import Neptune from './Neptune';
import Saturn from './Saturn';
import Sun from './Sun';
import Uranus from './Uranus';
import Venus from './Venus';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 200, 0], fov: 45 }}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <Camera />
      <Suspense fallback={null}>
        <Sun />
        <Mercury radius={10} angle={-10} planetRadius={1} />
        <Venus radius={20} angle={15} planetRadius={2} />
        <Earth planetRadius={2.5} radius={30} angle={45} />
        <Mars planetRadius={2} radius={40} angle={75} />
        <Jupiter planetRadius={3.5} radius={50} angle={135} />
        <Saturn planetRadius={3} radius={60} angle={186} />
        <Uranus planetRadius={2} radius={70} angle={230} />
        <Neptune planetRadius={1.7} radius={80} angle={300} />
      </Suspense>
      <Lights />
      {/* <Curve
        startPos={new Vector3(10, 200, 0)}
        endPos={new Vector3(50, 0, 0)}
        numberOfPoints={40}
      /> */}
      {/* <Stats /> */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
