import { RefObject, useEffect } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';

export function usePlayerStarts(rigidBodyRef: RefObject<RapierRigidBody>) {
  const [keySub] = useKeyboardControls();
  const startJam = useJamStore((s) => s.startJam);

  useEffect(() => {
    if (!keySub) {
      return;
    }
    const keyUnsub = keySub((ctrl) => {
      if (useJamStore.getState().jamIsLocked) {
        return;
      }
      if (
        useJamStore.getState().startTime === 0 &&
        (ctrl[KeyboardNameEnum.BOOST] ||
          ctrl[KeyboardNameEnum.FORWARD] ||
          ctrl[KeyboardNameEnum.RIGHTWARD] ||
          ctrl[KeyboardNameEnum.BACKWARD] ||
          ctrl[KeyboardNameEnum.LEFTWARD])
      ) {
        startJam();
      }
    });
    return () => keyUnsub();
  }, [keySub, startJam, rigidBodyRef]);
}
