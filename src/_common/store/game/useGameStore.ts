import { create } from 'zustand';

type GameState = {
  fallenPins: number;
};

type GameStoreActions = {
  pinFell: () => void;
  softReset: () => void;
  hardReset: () => void;
};

type GameStore = GameState & GameStoreActions;

const initialState: GameState = {
  fallenPins: 0,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  pinFell: () => set((s) => ({ fallenPins: s.fallenPins + 1 })),
  softReset: () => set(() => ({ fallenPins: 0 })),
  hardReset: () => set(() => ({ ...initialState })),
}));
