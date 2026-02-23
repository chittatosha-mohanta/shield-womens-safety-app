import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useAppStore } from '../store/appStore';
export function useLocation({ watch=false }={}) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const setCurrentLocation = useAppStore((s) => s.setCurrentLocation);
  const watcher = useRef(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setError('Permission denied'); return; }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      if (mounted) { setLocation(loc.coords); setCurrentLocation(loc.coords); }
      if (watch) {
        watcher.current = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 10 },
          (l) => { if(mounted){setLocation(l.coords);setCurrentLocation(l.coords);} });
      }
    })();
    return () => { mounted=false; watcher.current?.remove(); };
  }, [watch]);
  return { location, error };
}
