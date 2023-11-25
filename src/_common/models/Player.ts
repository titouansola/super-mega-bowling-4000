import { v4 as uuidv4 } from 'uuid';

export type Player = {
  id: string;
  name: string;
  score: number;
  jamScores: number[];
  isHost: boolean;
};

export function instantiatePlayer(partial?: Partial<Player>): Player {
  return {
    id: uuidv4(),
    name: '',
    score: 0,
    jamScores: initJamScoresArray(),
    isHost: false,
    ...(partial ?? {}),
  };
}

export function initJamScoresArray() {
  return Array<number>(10).fill(-1);
}
