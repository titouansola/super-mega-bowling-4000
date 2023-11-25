import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Player } from './components/Player/Player.tsx';
import { Alley } from './components/Alley/Alley.tsx';
import { PinSet } from './components/Pins/PinSet.tsx';
import { useDebug } from '@common/hooks/useDebug.ts';
import { useCoreStore } from '@common/hooks/store/core/useCoreStore.ts';
import { PhaseEnum } from '@common/enums/phase.enum.ts';

export function GameLoop() {
  const controls = useDebug();
  const phase = useCoreStore((s) => s.phase);
  return (
    <>
      {controls.showPerf && <Perf position={'top-left'} />}
      {controls.cameraIsFree && <OrbitControls makeDefault />}
      {phase === PhaseEnum.PLAYING && (
        <Physics debug={controls.debugPhysics}>
          <Player />
          <Alley />
          <PinSet />
        </Physics>
      )}
    </>
  );
}
