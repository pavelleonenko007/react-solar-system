import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useActivePlanet } from '../hooks/useActivePlanet';
import { useCurve } from '../hooks/useCurve';

export default function Camera({ pos = new Vector3() }) {
  const { camera } = useThree();
  const { activePlanet } = useActivePlanet();
  const refControls = useRef();
  const refTarget = useRef(new Vector3(0, 0, 0));
  const [orbitTarget, setOrbitTarget] = useState([0, 0, 0]);
  const { setCurveProps } = useCurve();
  const timer = useRef(0);

  useEffect(() => {
    timer.current = 0;
    console.log(activePlanet);
    if (activePlanet) {
      const curve = {
        startPos: camera.position,
        endPos: new Vector3(
          activePlanet.position.x,
          activePlanet.position.y,
          activePlanet.position.z +
            activePlanet.geometry.parameters.radius * 2.5
        ),
      };
      setCurveProps(curve);
      setOrbitTarget([
        activePlanet.position.x,
        activePlanet.position.y,
        activePlanet.position.z,
      ]);
    } else {
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

  return <OrbitControls ref={refControls} camera={camera} />;
}
