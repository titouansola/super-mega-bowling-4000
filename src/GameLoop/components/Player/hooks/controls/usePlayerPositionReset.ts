import { RefObject, useEffect } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { useGameStore } from '@common/hooks/store/game/useGameStore.ts';
import * as options from '@common/options.ts';

export function usePlayerPositionReset(
  rigidBodyRef: RefObject<RapierRigidBody>
) {
  const currentJamIndex = useGameStore((s) => s.currentJamIndex);

  useEffect(() => {
    const [x, y, z] = options.PLAYER_POSITION;
    rigidBodyRef.current?.setTranslation({ x, y, z }, false);
    rigidBodyRef.current?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false);
    rigidBodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
    rigidBodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, false);
  }, [currentJamIndex, rigidBodyRef]);
}
