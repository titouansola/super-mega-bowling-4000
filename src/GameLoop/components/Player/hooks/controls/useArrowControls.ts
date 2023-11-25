import { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';
import * as options from '@common/options.ts';

export function useArrowControls(rigidBodyRef: RefObject<RapierRigidBody>) {
  const [, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || useJamStore.getState().jamIsLocked) {
      return;
    }
    const keys = getKeys();
    const forward = keys[KeyboardNameEnum.FORWARD] ? 1 : 0;
    const rightward = keys[KeyboardNameEnum.RIGHTWARD] ? 1 : 0;
    const backward = keys[KeyboardNameEnum.BACKWARD] ? 1 : 0;
    const leftward = keys[KeyboardNameEnum.LEFTWARD] ? 1 : 0;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = options.PLAYER_IMPULSE_STRENGTH * delta;
    const torqueStrength = options.PLAYER_TORQUE_STRENGTH * delta;

    impulse.x += leftward * -impulseStrength;
    impulse.z += forward * -impulseStrength;
    impulse.x += rightward * impulseStrength;
    impulse.z += backward * impulseStrength;

    torque.z += leftward * torqueStrength;
    torque.x += forward * -torqueStrength;
    torque.z += rightward * -torqueStrength;
    torque.x += backward * torqueStrength;

    rigidBodyRef.current.applyImpulse(impulse, false);
    rigidBodyRef.current.applyTorqueImpulse(torque, false);
  });
}
