import { RigidBody } from '@react-three/rapier';
import { boxGeometry } from '@common/geometries/boxGeometry.ts';
import * as options from '@common/options.ts';

export function Alley() {
  return (
    <RigidBody type={'fixed'} restitution={0.2} friction={0}>
      {/* RIGHT WALL */}
      <mesh
        geometry={boxGeometry}
        scale={[
          options.TRACK_THICKNESS,
          options.TRACK_HEIGHT,
          options.TRACK_LENGTH,
        ]}
        position={[
          (options.TRACK_WIDTH + options.TRACK_THICKNESS) / 2,
          (options.TRACK_HEIGHT + options.TRACK_THICKNESS) / 2,
          0,
        ]}
      >
        <meshBasicMaterial color={'purple'} />
      </mesh>
      {/* LEFT WALL */}
      <mesh
        geometry={boxGeometry}
        scale={[
          options.TRACK_THICKNESS,
          options.TRACK_HEIGHT,
          options.TRACK_LENGTH,
        ]}
        position={[
          -(options.TRACK_WIDTH + options.TRACK_THICKNESS) / 2,
          (options.TRACK_HEIGHT + options.TRACK_THICKNESS) / 2,
          0,
        ]}
      >
        <meshBasicMaterial color={'purple'} />
      </mesh>
      {/* FLOOR */}
      <mesh
        geometry={boxGeometry}
        scale={[
          options.TRACK_WIDTH,
          options.TRACK_THICKNESS,
          options.TRACK_LENGTH,
        ]}
      >
        <meshBasicMaterial color={'mediumpurple'} />
      </mesh>
    </RigidBody>
  );
}
