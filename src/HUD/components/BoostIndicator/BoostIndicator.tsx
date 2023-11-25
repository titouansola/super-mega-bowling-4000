import './BoostIndicator.css';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';
import * as options from '@common/options.ts';

export function BoostIndicator() {
  const progressRef = useRef<HTMLDivElement>(null);
  const boostAvailable = useJamStore((s) => s.boostAvailable);

  useEffect(() => {
    if (!progressRef.current) {
      return;
    }
    if (boostAvailable) {
      progressRef.current!.style.width = '0';
      return;
    }
    const effectUnsub = addEffect(() => {
      const { boostTime } = useJamStore.getState();
      const progress =
        (100 * (Date.now() - boostTime)) / options.PLAYER_BOOST_COOLDOWN;
      progressRef.current!.style.width = progress + '%';
    });
    return () => effectUnsub();
  }, [progressRef, boostAvailable]);

  return (
    <div className={`boost-indicator ${boostAvailable ? 'hidden' : ''}`}>
      <div className="boost-indicator__track">
        <div ref={progressRef} className="boost-indicator__progressbar" />
      </div>
    </div>
  );
}
