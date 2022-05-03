import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { useCurve } from '../hooks/useCurve';

export default function Camera({ pos = new Vector3() }) {
  const { camera } = useThree();
  const { activePlanet } = useActivePlanet();
  const useMin = useRef(0);
  const refControls = useRef();
  const refTarget = useRef(new Vector3(0, 0, 0));
  const [orbitTarget, setOrbitTarget] = useState([0, 0, 0]);
  const { setCurveProps } = useCurve();
  const timer = useRef(0);

  useEffect(() => {
    timer.current = 0;
    if (activePlanet) {
      const hypotenuse = Math.sqrt(
        Math.pow(activePlanet.position.x, 2) +
          Math.pow(activePlanet.position.z, 2)
      );

      let angle;
      let endPos;

      if (hypotenuse === 0) {
        endPos = new Vector3(
          activePlanet.position.x,
          activePlanet.position.y,
          activePlanet.position.z +
            activePlanet.geometry.parameters.radius * 2.5
        );
      } else {
        if (activePlanet.position.x > 0 && activePlanet.position.z > 0) {
          angle =
            Math.asin(activePlanet.position.z / hypotenuse) * (180 / Math.PI);
        }

        if (activePlanet.position.x < 0 && activePlanet.position.z > 0) {
          angle =
            180 -
            Math.asin(Math.abs(activePlanet.position.z) / hypotenuse) *
              (180 / Math.PI);
        }

        if (activePlanet.position.x < 0 && activePlanet.position.z < 0) {
          angle =
            180 +
            Math.asin(Math.abs(activePlanet.position.z) / hypotenuse) *
              (180 / Math.PI);
        }

        if (activePlanet.position.x > 0 && activePlanet.position.z < 0) {
          angle =
            360 -
            Math.asin(Math.abs(activePlanet.position.z) / hypotenuse) *
              (180 / Math.PI);
        }

        const newRadius =
          hypotenuse - activePlanet.geometry.parameters.radius * 3;

        endPos = new Vector3(
          newRadius * Math.cos(angle * (Math.PI / 180)),
          activePlanet.position.y,
          newRadius * Math.sin(angle * (Math.PI / 180))
        );
      }

      const curve = {
        startPos: camera.position,
        endPos: endPos,
      };

      useMin.current = activePlanet.geometry.parameters.radius + 1;
      setCurveProps(curve);
      setOrbitTarget([
        activePlanet.position.x,
        activePlanet.position.y,
        activePlanet.position.z,
      ]);
    } else {
      useMin.current = 0;
      setOrbitTarget([0, 0, 0]);
    }
  }, [activePlanet]);

  useFrame((state, delta) => {
    if (activePlanet && timer.current < 5) {
      //   const cameraPos = pos.set(
      //     activePlanet.position.x,
      //     activePlanet.position.y,
      //     activePlanet.position.z + activePlanet.geometry.parameters.radius + 5
      //   );
      refTarget.current.lerp(activePlanet.position, delta);
      refControls.current.target = refTarget.current.applyQuaternion(
        activePlanet.quaternion
      );
      //   camera.position.lerp(cameraPos, delta);
      //   camera.quaternion.slerpQuaternions(
      //     camera.quaternion,
      //     activePlanet.quaternion,
      //     delta
      //   );
      //   timer.current += delta;
    }
  });

  return (
    <OrbitControls
      ref={refControls}
      camera={camera}
      minDistance={useMin.current}
    />
  );
}
