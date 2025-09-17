import { useState, useEffect } from 'react';
import { TELEX_MAP } from '../utils/telex';

interface UseTelexInputReturn {
  currentLetter: string;
  resetBuffer: () => void;
}

const ALPHA_REGEX = /^[a-zA-Z ]$/;

export const useTelexInput = (): UseTelexInputReturn => {
  const [charBuffer, setCharBuffer] = useState<string>('');
  const [currentLetter, setCurrentLetter] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ALPHA_REGEX.test(event.key)) return;
      // add logging
      console.log('Key pressed:', event.key);
      const newBuffer = charBuffer + event.key;
      console.log('New buffer:', newBuffer);
      const telexChar = TELEX_MAP[newBuffer];
      console.log('Mapped telex character:', telexChar);
      console.log('--------------------------');
      
      if (telexChar !== undefined) {
        // Found a telex mapping, continue building
        setCurrentLetter(telexChar);
        setCharBuffer(newBuffer);
      } else {
        // No telex mapping found, use the raw character and reset buffer
        setCurrentLetter(event.key);
        setCharBuffer(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [charBuffer]);

  const resetBuffer = () => {
    setCharBuffer('');
    setCurrentLetter('');
  };

  return {
    currentLetter,
    resetBuffer,
  };
};