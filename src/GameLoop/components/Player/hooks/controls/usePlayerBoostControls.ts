import { RefObject, useEffect } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';
import * as options from '@common/options.ts';

export function usePlayerBoostControls(
  rigidBodyRef: RefObject<RapierRigidBody>
) {
  const [keySub] = useKeyboardControls();

  useEffect(() => {
    if (!keySub) {
      return;
    }
    const keyUnsub = keySub((ctrl) => {
      const { jamIsLocked, boostAvailable, boost } = useJamStore.getState();
      if (jamIsLocked || !boostAvailable) {
        return;
      }
      if (ctrl[KeyboardNameEnum.BOOST]) {
        boost();
        rigidBodyRef.current?.applyImpulse(
          { x: 0, y: 0, z: options.PLAYER_BOOST_STRENGTH },
          true
        );
      }
    });
    return () => keyUnsub();
  }, [keySub, rigidBodyRef]);
}
