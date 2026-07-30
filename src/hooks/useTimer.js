import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_SECONDS = 35 * 60;

export function useTimer(totalSeconds = DEFAULT_SECONDS) {
  const TOTAL_SECONDS = totalSeconds;
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progress = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100;
  const isExpired = remaining === 0;

  return { remaining, formatted, minutes, seconds, progress, isRunning, isExpired, pause, resume };
}
