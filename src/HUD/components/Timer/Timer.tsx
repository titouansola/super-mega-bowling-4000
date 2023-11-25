import './Timer.css';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';
import { useJamStore } from '@common/hooks/store/jam/useJamStore.ts';

export function Timer() {
  const timerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!timerRef.current) {
      return;
    }

    const effectUnsub = addEffect(() => {
      const { startTime, jamIsLocked, jamDuration } = useJamStore.getState();
      let elapsedTime = 0;
      if (startTime > 0) {
        if (!jamIsLocked) {
          elapsedTime = Date.now() - startTime;
        } else {
          elapsedTime = jamDuration;
        }
      }
      elapsedTime /= 1000;
      timerRef.current!.textContent = elapsedTime.toFixed(2);
    });
    return () => effectUnsub();
  }, []);

  return (
    <div ref={timerRef} className="timer">
      0.00
    </div>
  );
}
