import { useRef, useCallback } from 'react';

export function useWakeLock() {
  const wakeLockRef = useRef(null);

  const acquire = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.warn('WakeLock acquire failed:', err);
    }
  }, []);

  const release = useCallback(async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch (err) {
      console.warn('WakeLock release failed:', err);
    }
  }, []);

  return { acquire, release };
}
