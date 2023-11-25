import './EndGame.css';
import { useCoreStore } from '@common/hooks/store/core/useCoreStore.ts';
import { PhaseEnum } from '@common/enums/phase.enum.ts';

export function EndGame() {
  return (
    <div className="end-game">
      <h1>END</h1>
      <button
        onClick={() => useCoreStore.getState().changePhase(PhaseEnum.HOME)}
      >
        GO BACK HOME
      </button>
    </div>
  );
}
