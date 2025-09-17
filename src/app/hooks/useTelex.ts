import { useState, useEffect } from 'react';
import { TELEX_MAP } from '../utils/telex';

interface UseTelexInputReturn {
  currentLetter: string;
  resetBuffer: () => void;
}

const ALPHA_REGEX = /^[a-zA-Z ]$/;

export const useTelexInput = (): UseTelexInputReturn => {
  const [, setCharBuffer] = useState<string>('');
  const [currentLetter, setCurrentLetter] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCharBuffer(prev => {
        if (!ALPHA_REGEX.test(event.key)) return prev;
        const newBuffer = prev + event.key;
        const telexChar = TELEX_MAP[newBuffer];

        if (telexChar !== undefined) {
        // Found a telex mapping, continue building
        setCurrentLetter(telexChar);
        return newBuffer;
      } else {
        // No telex mapping found, use the raw character and reset buffer
        setCurrentLetter(event.key);
        return event.key;
      }
    });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const resetBuffer = () => {
    setCharBuffer('');
    setCurrentLetter('');
  };

  return {
    currentLetter,
    resetBuffer,
  };
};