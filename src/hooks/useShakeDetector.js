import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
export function useShakeDetector({ enabled=true, onShake }) {
  const last = useRef(0);
  const sub = useRef(null);
  useEffect(() => {
    if (!enabled) { sub.current?.remove(); return; }
    Accelerometer.setUpdateInterval(200);
    sub.current = Accelerometer.addListener(({ x, y, z }) => {
      const a = Math.sqrt(x*x+y*y+z*z);
      if (a > 2.5) { const now=Date.now(); if(now-last.current>1000){last.current=now;onShake?.();} }
    });
    return () => sub.current?.remove();
  }, [enabled, onShake]);
}
