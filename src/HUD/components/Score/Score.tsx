import './Score.css';
import { useGameStore } from '@common/hooks/store/game/useGameStore.ts';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import { usePlayerStore } from '@common/hooks/store/player/usePlayerStore.ts';

export function Score() {
  const points = useJamStore((s) => s.points);
  const jamScores = usePlayerStore((s) => s.jamScores);
  const score = usePlayerStore((s) => s.score);
  const currentJamIndex = useGameStore((s) => s.currentJamIndex);

  return (
    <div className="hud-component score">
      <p>Launch : {currentJamIndex + 1}</p>
      <p>Pins : {points}</p>
      <table>
        <thead>
          <tr>
            {jamScores.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {jamScores.map((value, index) => (
              <td key={index}>{value >= 0 ? value : ''}</td>
            ))}
            <td>{score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
