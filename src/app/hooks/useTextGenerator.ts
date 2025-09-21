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
  }, [availableCharacters]);

  const generateText = useCallback((targetLength: number = maxLength): string => {

    const validWords = VIETNAMESE_WORDS.filter((word: string) => isWordValid(word));

    // if (validWords.length === 0) return '';

    // // log first 5 words
    // if (targetCharacter) {
    //   const filteredWords = validWords.filter(word => word.includes(targetCharacter));
    //   if (filteredWords.length > 0) {
    //     console.log('Sample words with target character:', filteredWords.slice(0, 5));
    //   } else {
    //     console.log(`No words found containing the target character "${targetCharacter}".`);
    //   }
    // }

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
  }, [maxLength, targetCharacter, availableCharacters]);

  // Generate new text and update state
  const generateAndSetText = useCallback((targetLength?: number) => {
    const newText = generateText(targetLength);
    setGeneratedText(newText);
    return newText;
  }, [generateText, availableCharacters, targetCharacter]);

  return {
    generatedText,
    generateText: generateAndSetText
  };
};