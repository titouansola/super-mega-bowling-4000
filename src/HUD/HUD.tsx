import { Score } from './components/Score/Score.tsx';
import { BoostIndicator } from './components/BoostIndicator/BoostIndicator.tsx';
import { Timer } from './components/Timer/Timer.tsx';

export function HUD() {
  return (
    <>
      <Score />
      <Timer />
      <BoostIndicator />
    </>
  );
}
