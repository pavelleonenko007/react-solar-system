import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CatmullRomCurve3, TubeGeometry, Vector3 } from 'three';
import { useActivePlanet } from '../hooks/useActivePlanet';

function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

export default function Curve({ startPos, endPos, numberOfPoints, ...props }) {
  const x = useRef(0);
  const y = useRef(0);
  const { activePlanet } = useActivePlanet();
  const points = [];

  for (let index = 0; index <= numberOfPoints; index++) {
    let p = new Vector3().lerpVectors(startPos, endPos, index / numberOfPoints);
    p.setComponent(1, p.y + 15 * Math.sin((Math.PI * index) / numberOfPoints));
    points.push(p);
  }

  const curve = new CatmullRomCurve3(points);
  const geometry = new TubeGeometry(curve, points.length, 0, 18, false);

  useEffect(() => {
    x.current = 0;
  }, [activePlanet]);

  useFrame((state, delta) => {
    x.current += 0.002;
    y.current = Math.sin(Math.PI * x.current - Math.PI / 2) / 2 + 0.5;
    // console.log(y.current);
    if (x.current < 1) {
      const pos = geometry.parameters.path.getPointAt(y.current);
      state.camera.position.copy(pos);
    } else {
      x.current = 1;
    }
  });

  return (
    <mesh geometry={geometry} {...props}>
      {/* <meshBasicMaterial color={'#ffffff'} /> */}
    </mesh>
  );
}
