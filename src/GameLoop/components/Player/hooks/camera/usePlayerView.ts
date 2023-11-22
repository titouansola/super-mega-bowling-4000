import { RefObject, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useControls } from 'leva';

export function usePlayerView(rigidBodyRef: RefObject<RapierRigidBody>) {
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const controls = useControls({
    cameraIsFree: { name: 'Free Camera', value: true },
  });

  useFrame((state, delta) => {
    if (!rigidBodyRef.current || controls.cameraIsFree) {
      return;
    }
    const { x, y, z } = rigidBodyRef.current.translation();
    const { z: dz } = rigidBodyRef.current.linvel();
    const cameraPosition = new THREE.Vector3(x, y, z);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65 - dz / 50;
    const cameraTarget = new THREE.Vector3(x, y, z);
    cameraTarget.y += 0.25 - dz / 50;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });
}
