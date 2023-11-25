import { create } from 'zustand';
import { PhaseEnum } from '@common/enums/phase.enum.ts';
import { usePlayerStore } from '@common/hooks/store/player/usePlayerStore.ts';

const initialState = {
  phase: PhaseEnum.HOME,
  roomCode: '',
};

type CoreStoreActions = {
  changePhase: (phase: PhaseEnum) => void;
  updateRoomCode: (roomCode: string) => void;
};

type CoreStore = typeof initialState & CoreStoreActions;

export const useCoreStore = create<CoreStore>((set) => ({
  ...initialState,
  changePhase(phase: PhaseEnum) {
    if (phase === PhaseEnum.HOME) {
      usePlayerStore.getState().reset();
    }
    set({ phase });
  },
  updateRoomCode(roomCode: string) {
    set({ roomCode });
  },
}));
