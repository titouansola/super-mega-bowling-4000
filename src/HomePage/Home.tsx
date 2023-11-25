import './Home.css';
import { useCoreStore } from '@common/hooks/store/core/useCoreStore.ts';
import { PhaseEnum } from '@common/enums/phase.enum.ts';

export function Home() {
  return (
    <div className="home">
      <h1>HOME</h1>
      <button
        onClick={() => useCoreStore.getState().changePhase(PhaseEnum.PLAYING)}
      >
        START
      </button>
    </div>
  );
}
