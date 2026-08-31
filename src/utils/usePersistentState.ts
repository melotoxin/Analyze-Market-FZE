import { useEffect, useState } from 'react';

/** useState that survives a reload. Language and currency reset on every page load before. */
export function usePersistentState<T extends string>(
  key: string,
  initial: T,
  isValid: (v: string) => v is T,
): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored && isValid(stored) ? stored : initial;
    } catch {
      return initial; // private mode / storage disabled
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* not worth failing a render over */
    }
  }, [key, value]);

  return [value, setValue];
}
