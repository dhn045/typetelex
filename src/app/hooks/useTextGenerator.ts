import { useState, useCallback, useMemo } from 'react';
import { vietnameseTransitions } from '../utils/vietnameseTransitions';

interface UseTextGeneratorProps {
  availableCharacters: Set<string>;
  maxLength?: number;
}

export const useTextGenerator = ({ 
  availableCharacters, 
  maxLength = 100 
}: UseTextGeneratorProps) => {
  const [generatedText, setGeneratedText] = useState<string>('');

  const filteredTransitions = useMemo(() => {
    const filtered = new Map<string, Map<string, number>>();
    
    for (const [fromChar, transitions] of vietnameseTransitions.entries()) {
      if (availableCharacters.has(fromChar)) {
        const availableTransitions = new Map<string, number>();
        let totalProb = 0;
        
        // Collect available transitions and sum probabilities
        for (const [toChar, prob] of transitions.entries()) {
          if (availableCharacters.has(toChar)) {
            availableTransitions.set(toChar, prob);
            totalProb += prob;
          }
        }

        // Normalize probabilities to sum to 1
        if (totalProb > 0) {
          const normalizedTransitions = new Map<string, number>();
          for (const [toChar, prob] of availableTransitions.entries()) {
            normalizedTransitions.set(toChar, prob / totalProb);
          }
          filtered.set(fromChar, normalizedTransitions);
        }
      }
    }
    
    return filtered;
  }, [availableCharacters]);

  const getNextCharacter = useCallback((currentChar: string): string => {
    const transitions = filteredTransitions.get(currentChar);
    if (!transitions || transitions.size === 0) {
      // Fallback: pick a random available character
      const availableArray = Array.from(availableCharacters);
      return availableArray[Math.floor(Math.random() * availableArray.length)];
    }

    // Weighted random selection
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [char, probability] of transitions.entries()) {
      cumulative += probability;
      if (rand <= cumulative) {
        return char;
      }
    }
    
    // Fallback: return first available transition
    return transitions.keys().next().value || ' ';
  }, [filteredTransitions, availableCharacters]);

  // Generate text starting from a space (beginning of text)
  const generateText = useCallback((targetLength: number = maxLength): string => {
    if (filteredTransitions.size === 0) {
      return '';
    }

    let text = '';
    let currentChar = ' '; // Start with space to begin first word

    // Generate characters up to target length
    while (text.length < targetLength) {
      const nextChar = getNextCharacter(currentChar);
      
      if (nextChar === ' ') {
        // Add space only if we're not at the start or end
        if (text.length > 0 && text[text.length - 1] !== ' ') {
          text += ' ';
        }
      } else {
        text += nextChar;
      }
      
      currentChar = nextChar;
    }

    // // Clean up text (remove leading/trailing spaces, normalize spaces)
    // text = text.trim().replace(/\s+/g, ' ');
    
    // // Truncate to target length if needed
    // if (text.length > targetLength) {
    //   // Try to break at word boundary
    //   const truncated = text.substring(0, targetLength);
    //   const lastSpaceIndex = truncated.lastIndexOf(' ');
    //   text = lastSpaceIndex > targetLength * 0.8 ? truncated.substring(0, lastSpaceIndex) : truncated;
    // }

    return text;
  }, [getNextCharacter, filteredTransitions, maxLength]);

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