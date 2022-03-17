import React, { useRef } from 'react';
import { Vector3 } from 'three';
import { CatmullRomCurve3 } from 'three';

export default function Curve({ startPos, endPos, numberOfPoints }) {
  console.log(startPos, endPos);
  const ref = useRef();

  let points = [];
  for (let index = 0; index < numberOfPoints; index++) {
    let v1 = new Vector3(startPos.x, startPos.y, startPos.z);
    let v2 = new Vector3(endPos.x, endPos.y, endPos.z);
    let p = new Vector3().lerpVectors(v1, v2, 1 / numberOfPoints);
    console.log(p);
    p.normalize();
    p.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * 1) / numberOfPoints));
    points.push(p);
  }

  console.log(ref);

  let path = new CatmullRomCurve3(points);
  console.log(path);
  return (
    <tubeGeometry
      ref={ref}
      args={[path, 70, 0.02, 50, false]}
      attach="geometry"
    >
      <meshBasicMaterial attach="material" color="#ffffff" />
    </tubeGeometry>
  );
}
