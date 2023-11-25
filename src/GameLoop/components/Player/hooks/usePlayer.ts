import { useEffect, useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { usePlayerView } from './camera/usePlayerView.ts';
import { usePlayerControls } from './controls/usePlayerControls.ts';

export function usePlayer() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  usePlayerControls(rigidBodyRef);
  usePlayerView(rigidBodyRef);

  useEffect(() => {
    if (!rigidBodyRef.current) {
      return;
    }
    rigidBodyRef.current.userData = { name: 'Player' };
  }, [rigidBodyRef]);

  return { rigidBodyRef };
}
