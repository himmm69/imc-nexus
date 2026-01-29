import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Specific hooks for common use cases
export function useUpvotes() {
  return useLocalStorage<string[]>('imc-upvoted-notes', []);
}

export function useBookmarks() {
  return useLocalStorage<string[]>('imc-bookmarked-notes', []);
}

export function useAttemptedPapers() {
  return useLocalStorage<string[]>('imc-attempted-papers', []);
}
