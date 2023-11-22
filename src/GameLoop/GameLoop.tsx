import { Physics } from '@react-three/rapier';
import { Player } from './components/Player/Player.tsx';
import { Alley } from './components/Alley/Alley.tsx';
import { Pins } from './components/Pins/Pins.tsx';

export function GameLoop() {
  return (
    <Physics debug>
      <Player />
      <Alley />
      <Pins />
    </Physics>
  );
}
