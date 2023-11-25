import { RefObject } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { usePlayerPositionReset } from './usePlayerPositionReset.ts';
import { usePlayerStarts } from './usePlayerStarts.ts';
import { usePlayerBoostControls } from './usePlayerBoostControls.ts';
import { useArrowControls } from './useArrowControls.ts';

export function usePlayerControls(rigidBodyRef: RefObject<RapierRigidBody>) {
  usePlayerPositionReset(rigidBodyRef);
  usePlayerStarts(rigidBodyRef);
  usePlayerBoostControls(rigidBodyRef);
  useArrowControls(rigidBodyRef);
}
