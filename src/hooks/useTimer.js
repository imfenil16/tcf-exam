import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_SECONDS = 35 * 60;

export function useTimer(defaultSeconds = DEFAULT_SECONDS, defaultRemaining) {
  const [total, setTotal] = useState(defaultSeconds);
  const [remaining, setRemaining] = useState(defaultRemaining == null ? defaultSeconds : defaultRemaining);
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

  // Start a fresh (or resumed) countdown: newTotal is the full duration; startAt is
  // the value to begin from (for resuming a saved attempt), defaulting to newTotal.
  const reset = useCallback((newTotal, startAt) => {
    setTotal(newTotal);
    setRemaining(startAt == null ? newTotal : Math.max(0, Math.min(startAt, newTotal)));
    setIsRunning(true);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progress = ((total - remaining) / total) * 100;
  const isExpired = remaining === 0;

  return { remaining, formatted, minutes, seconds, progress, isRunning, isExpired, pause, resume, reset };
}
