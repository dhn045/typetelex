import { useState, useCallback, useMemo } from 'react';
import { VIETNAMESE_WORDS } from '../utils/vietnameseWords';

interface UseTextGeneratorProps {
  availableCharacters: Set<string>;
  maxLength: number;
  targetCharacter?: string; // Character that should appear in every word
}

export const useTextGenerator = ({ 
  availableCharacters, 
  maxLength,
  targetCharacter
}: UseTextGeneratorProps) => {
  const [generatedText, setGeneratedText] = useState<string>('');

  const isWordValid = useCallback((word: string): boolean => {
    let hasTargetCharacter = false;
    for(let char of word) {
      if (!availableCharacters.has(char)) {
        return false;
      }
      if (char === targetCharacter) {
        hasTargetCharacter = true;
      }
    }
    return targetCharacter ? hasTargetCharacter : true;
  }, [availableCharacters, targetCharacter]);

  const generateText = useCallback((targetLength: number = maxLength): string => {

    const validWords = VIETNAMESE_WORDS.filter((word: string) => isWordValid(word));

    if (validWords.length === 0) {
      console.warn('No valid words found for current character set');
      return '';
    }

    let text = '';
    while (text.length < targetLength) {
      const word = validWords[Math.floor(Math.random() * validWords.length)];
      if (text.length + word.length <= targetLength) {
        text += word;
        if (text.length < targetLength) {
          text += ' ';
        }
      }
    }

    return text.trimEnd();
  }, [maxLength, isWordValid]);

  // Generate new text and update state
  const generateAndSetText = useCallback((targetLength?: number) => {
    const newText = generateText(targetLength);
    setGeneratedText(newText);
    return newText;
  }, [generateText]);

  return {
    generatedText,
    generateText: generateAndSetText
  };
};