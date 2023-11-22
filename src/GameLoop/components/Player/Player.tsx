import { RigidBody } from '@react-three/rapier';
import { usePlayer } from './hooks/usePlayer.ts';
import * as options from '@common/options.ts';

export function Player() {
  const { rigidBodyRef } = usePlayer();
  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={'ball'}
      position={options.PLAYER_POSITION}
      restitution={0.2}
      friction={1}
      angularDamping={0.5}
      linearDamping={0.5}
      mass={4}
      canSleep={false}
    >
      <mesh>
        <sphereGeometry args={[options.BALL_RADIUS]} />
        <meshBasicMaterial color={'orange'} />
      </mesh>
    </RigidBody>
  );
}
