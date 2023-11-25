import { create } from 'zustand';
import { useGameStore } from '@common/hooks/store/game/useGameStore.ts';
import * as options from '@common/options.ts';

const initialState = {
  points: 0,
  startTime: 0,
  jamDuration: 0,
  boostTime: 0,
  boostAvailable: true,
  jamIsLocked: false,
  jamEndTimeout: -1,
  boostTimeout: -1,
};

type JamStoreActions = {
  startJam: () => void;
  endJam: () => void;
  addPoint: () => void;
  boost: () => void;
  clearBoostTimeout: () => void;
};

type JamStore = typeof initialState & JamStoreActions;

export const useJamStore = create<JamStore>((set, get) => ({
  ...initialState,
  /**
   * Called when player press a key to move their ball
   */
  startJam() {
    set(() => ({ startTime: Date.now() }));
  },
  /**
   * Called when player's ball has reached track limit
   */
  endJam() {
    const jamEndTimeout = setTimeout(() => {
      const { points, jamDuration } = get();
      let computedPoints = 1000 * points - jamDuration;
      computedPoints = Math.ceil(computedPoints);
      computedPoints = Math.max(computedPoints, points);
      useGameStore.getState().handleEndOfJam(computedPoints);
      clearTimeout(jamEndTimeout);
      set({ ...initialState });
    }, 5000);
    //
    const { startTime, clearBoostTimeout } = get();
    const jamDuration = Date.now() - startTime;
    clearBoostTimeout();
    set({ jamDuration, jamEndTimeout, jamIsLocked: true });
  },
  /**
   * Called when a pin falls
   */
  addPoint() {
    set((s) => ({ points: s.points + 1 }));
  },
  /**
   * Called when player uses their boost
   */
  boost() {
    const boostTimeout = setTimeout(() => {
      get().clearBoostTimeout();
    }, options.PLAYER_BOOST_COOLDOWN);
    set({ boostAvailable: false, boostTime: Date.now(), boostTimeout });
  },
  /**
   * Mostly internal, clears boost timeout immediatly and resets it
   */
  clearBoostTimeout() {
    set((s) => {
      clearTimeout(s.boostTimeout);
      return { boostAvailable: true, boostTime: 0, boostTimeout: -1 };
    });
  },
}));
