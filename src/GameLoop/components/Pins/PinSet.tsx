import {
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import * as options from '@common/options.ts';
import { RigidBodyUserData } from '@common/types/RigidBodyUserData.ts';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import { useGameStore } from '@common/hooks/store/game/useGameStore.ts';
import { pinGeometry } from '@common/geometries/pinGeometry.ts';

function Pin(props: { position: [number, number, number] }) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const currentJamIndex = useGameStore((s) => s.currentJamIndex);
  const addPoint = useJamStore((s) => s.addPoint);
  const [detectionActivated, setDetectionActivated] = useState(true);

  useEffect(() => {
    const [x, y, z] = props.position;
    const [gx, gy, gz] = options.PINS_POSITION;
    bodyRef.current?.setTranslation({ x: x + gx, y: y + gy, z: z + gz }, false);
    bodyRef.current?.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false);
    bodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
    bodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, false);
    //
    setDetectionActivated(true);
  }, [props.position, currentJamIndex]);

  return (
    <>
      {/* Pin */}
      <RigidBody
        ref={bodyRef}
        colliders={false}
        position={props.position}
        restitution={1}
        friction={1}
        angularDamping={0.5}
        linearDamping={0.5}
        mass={1.5}
        canSleep={false}
      >
        <CylinderCollider args={[options.PIN_HEIGHT / 2, options.PIN_RADIUS]} />
        <mesh geometry={pinGeometry}>
          <meshBasicMaterial color={'#23c79c'} />
        </mesh>
      </RigidBody>
      {/* Pin presence sensor */}
      {detectionActivated && (
        <RigidBody
          position={[
            props.position[0],
            props.position[1] + (3 * options.PIN_HEIGHT) / 8,
            props.position[2],
          ]}
          colliders={false}
          type={'fixed'}
          onIntersectionExit={(collision) => {
            if (collision.rigidBody === bodyRef.current) {
              addPoint();
              setDetectionActivated(false);
            }
          }}
          includeInvisible
          sensor
        >
          <CylinderCollider
            args={[options.PIN_HEIGHT / 8, options.PIN_RADIUS / 4]}
          />
        </RigidBody>
      )}
    </>
  );
}

export function PinSet() {
  const endJam = useJamStore((s) => s.endJam);

  return (
    <>
      {/* Ball detector */}
      <RigidBody
        type={'fixed'}
        position={[
          0,
          options.TRACK_HEIGHT / 2,
          (options.TRACK_END_LENGTH - options.TRACK_LENGTH) / 2,
        ]}
        onIntersectionEnter={(c) => {
          if ((c.rigidBody?.userData as RigidBodyUserData)?.name === 'Player') {
            endJam();
          }
        }}
        includeInvisible
        sensor
      >
        <CuboidCollider
          args={[
            options.TRACK_WIDTH / 2,
            options.TRACK_HEIGHT / 2,
            options.TRACK_END_LENGTH / 2,
          ]}
        />
      </RigidBody>
      {/* Pin set */}
      <group position={options.PINS_POSITION}>
        {Array(4)
          .fill(null)
          .map((_, row) => {
            return Array(row + 1)
              .fill(null)
              .map((_, pinNumber) => {
                const index = pinNumber - row / 2;
                const sign = Math.sign(index);
                const factor = sign * Math.ceil(Math.abs((index * 3) / 2));
                return (
                  <Pin
                    key={`key-${row}-${pinNumber}`}
                    position={[
                      (options.PIN_RADIUS * 2 - 0.1) * factor,
                      0.05,
                      -options.PIN_RADIUS * 2 * row,
                    ]}
                  />
                );
              });
          })}
      </group>
    </>
  );
}
