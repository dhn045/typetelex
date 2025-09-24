import { useState, useEffect } from 'react';

const PROGRESSION_STORAGE_KEY = 'typetelex-progression-index';

export const useProgressionPersistence = (defaultIndex: number) => {
  const [currentProgressionIndex, setCurrentProgressionIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(PROGRESSION_STORAGE_KEY);
      return saved ? parseInt(saved, 10) : defaultIndex;
    } catch (error) {
      console.warn('Failed to load progression from localStorage:', error);
      return defaultIndex;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESSION_STORAGE_KEY, currentProgressionIndex.toString());
    } catch (error) {
      console.warn('Failed to save progression to localStorage:', error);
    }
  }, [currentProgressionIndex]);

  return [currentProgressionIndex, setCurrentProgressionIndex] as const;
};