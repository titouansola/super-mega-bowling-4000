import { useCoreStore } from '@common/hooks/store/core/useCoreStore.ts';
import { PhaseEnum } from '@common/enums/phase.enum.ts';
import { HUD } from '../HUD/HUD.tsx';
import { Home } from '../HomePage/Home.tsx';
import { EndGame } from '../EndGame/EndGame.tsx';

export function UserInterface() {
  const phase = useCoreStore((s) => s.phase);

  switch (phase) {
    case PhaseEnum.HOME:
      return <Home />;
    case PhaseEnum.PLAYING:
      return <HUD />;
    case PhaseEnum.END_GAME:
      return <EndGame />;
    default:
      return null;
  }
}
