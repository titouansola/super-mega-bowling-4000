import { create } from 'zustand';
import {
  initJamScoresArray,
  instantiatePlayer,
  Player,
} from '@common/models/Player.ts';

type PlayerStoreActions = {
  updateName: (value: string) => void;
  updateScore: (jamIndex: number, points: number) => void;
  reset: () => void;
};

type PlayerStore = Player & PlayerStoreActions;

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  ...instantiatePlayer(),
  updateName(value: string) {
    set({ name: value });
  },
  updateScore(jamIndex: number, points: number) {
    const { jamScores, score } = get();
    jamScores[jamIndex] = points;
    set({ jamScores: [...jamScores], score: score + points });
  },
  reset: () => set({ score: 0, jamScores: initJamScoresArray() }),
}));
