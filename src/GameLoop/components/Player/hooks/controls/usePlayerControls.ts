import { RefObject, useEffect } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { KeyboardNameEnum } from '@common/enums/keyboard-name.enum.ts';
import * as options from '@common/options.ts';

export function usePlayerControls(rigidBodyRef: RefObject<RapierRigidBody>) {
  const [keySub, getKeys] = useKeyboardControls();

  useEffect(() => {
    if (!keySub) {
      return;
    }
    const keyUnsub = keySub((ctrl) => {
      if (ctrl[KeyboardNameEnum.PUSH]) {
        rigidBodyRef.current?.applyImpulse(
          { x: 0, y: 0, z: options.PLAYER_BOOST_STRENGTH },
          true
        );
      }
      if (ctrl[KeyboardNameEnum.RESET]) {
        const [x, y, z] = options.PLAYER_POSITION;
        rigidBodyRef.current?.setTranslation({ x, y, z }, false);
        rigidBodyRef.current?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false);
        rigidBodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
        rigidBodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, false);
      }
    });
    return () => keyUnsub();
  }, [keySub, rigidBodyRef]);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current) {
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
