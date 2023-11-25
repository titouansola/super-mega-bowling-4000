import { RefObject, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useDebug } from '@common/hooks/useDebug.ts';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import * as options from '@common/options.ts';

const getFinalCameraPosition = () =>
  new THREE.Vector3(
    0,
    5,
    (-options.TRACK_LENGTH + options.TRACK_END_LENGTH) / 2
  );
const getFinalCameraTarget = () =>
  new THREE.Vector3(0, 0.5, -options.TRACK_LENGTH / 2);

export function usePlayerView(rigidBodyRef: RefObject<RapierRigidBody>) {
  const jamIsLocked = useJamStore((s) => s.jamIsLocked);
  const [smoothedCameraPosition] = useState(getFinalCameraPosition);
  const [smoothedCameraTarget] = useState(getFinalCameraTarget);
  const controls = useDebug();

  useFrame((state, delta) => {
    if (!rigidBodyRef.current || controls.cameraIsFree) {
      return;
    }

    let cameraPosition: THREE.Vector3;
    let cameraTarget: THREE.Vector3;

    if (!jamIsLocked) {
      const { x, y, z } = rigidBodyRef.current.translation();
      //
      cameraPosition = new THREE.Vector3(x, y, z);
      cameraPosition.z += 3.25;
      cameraPosition.y += 1.8;
      //
      cameraTarget = new THREE.Vector3(x, y, z);
      cameraTarget.y += 1.2;
    } else {
      cameraPosition = getFinalCameraPosition();
      cameraTarget = getFinalCameraTarget();
    }
    // Smoothen camera and target
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
    //
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });
}
