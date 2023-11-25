import { create } from 'zustand';
import { usePlayerStore } from '@common/hooks/store/player/usePlayerStore.ts';
import { useCoreStore } from '@common/hooks/store/core/useCoreStore.ts';
import { PhaseEnum } from '@common/enums/phase.enum.ts';

const initialState = {
  currentJamIndex: 0,
};

type GameStoreActions = {
  handleEndOfJam: (points: number) => void;
};

type GameStore = typeof initialState & GameStoreActions;

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  handleEndOfJam(points: number) {
    const { currentJamIndex } = get();
    usePlayerStore.getState().updateScore(currentJamIndex, points);
    if (currentJamIndex < 9) {
      set({ currentJamIndex: currentJamIndex + 1 });
    } else {
      set({ currentJamIndex: 0 });
      useCoreStore.getState().changePhase(PhaseEnum.END_GAME);
    }
  },
}));
