import { useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { usePlayerControls } from './controls/usePlayerControls.ts';
import { usePlayerView } from './camera/usePlayerView.ts';

export function usePlayer() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  usePlayerControls(rigidBodyRef);
  usePlayerView(rigidBodyRef);
  return { rigidBodyRef };
}
