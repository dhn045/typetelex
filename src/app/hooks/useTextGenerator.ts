import { useState, useCallback, useMemo } from 'react';
import { vietnameseTransitions } from '../utils/vietnameseTransitions';
import { vietnameseTrigrams } from '../utils/vietnameseTrigrams';

interface UseTextGeneratorProps {
  availableCharacters: Set<string>;
  maxLength: number;
}

export const useTextGenerator = ({ 
  availableCharacters, 
  maxLength
}: UseTextGeneratorProps) => {
  const [generatedText, setGeneratedText] = useState<string>('');

  // Filter trigrams for available characters
  const filteredTrigrams = useMemo(() => {
    const filtered = new Map<string, Map<string, number>>();

    for (const [prefix, transitions] of vietnameseTrigrams.entries()) {
      const prefixChars = prefix.split('');
      if (prefixChars.every(char => availableCharacters.has(char))) {
        const availableTransitions = new Map<string, number>();
        let totalProb = 0;

        for (const [nextChar, prob] of transitions.entries()) {
          if (availableCharacters.has(nextChar)) {
            availableTransitions.set(nextChar, prob);
            totalProb += prob;
          }
        }

        if (totalProb > 0) {
          const normalizedTransitions = new Map<string, number>();
          for (const [nextChar, prob] of availableTransitions.entries()) {
            normalizedTransitions.set(nextChar, prob / totalProb);
          }
          filtered.set(prefix, normalizedTransitions);
        }
      }
    }

    return filtered;
  }, [availableCharacters]);

  // Fallback bigrams when trigrams aren't available
  const filteredBigrams = useMemo(() => {
    const filtered = new Map<string, Map<string, number>>();
    
    for (const [fromChar, transitions] of vietnameseTransitions.entries()) {
      if (availableCharacters.has(fromChar)) {
        const availableTransitions = new Map<string, number>();
        let totalProb = 0;
        
        for (const [toChar, prob] of transitions.entries()) {
          if (availableCharacters.has(toChar)) {
            availableTransitions.set(toChar, prob);
            totalProb += prob;
          }
        }

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

  const getNextCharacter = useCallback((context: string): string => {
    // Try trigram first (use last 2 characters)
    if (context.length >= 2) {
      const prefix = context.slice(-2);
      const trigramTransitions = filteredTrigrams.get(prefix);

      if (trigramTransitions && trigramTransitions.size > 0) {
        const rand = Math.random();
        let cumulative = 0;

        for (const [char, probability] of trigramTransitions.entries()) {
          cumulative += probability;
          if (rand <= cumulative) {
            return char;
          }
        }
        return trigramTransitions.keys().next().value || ' ';
      }
    }

    // Fallback to bigram (use last character)
    const lastChar = context.slice(-1);
    const bigramTransitions = filteredBigrams.get(lastChar);

    if (bigramTransitions && bigramTransitions.size > 0) {
      const rand = Math.random();
      let cumulative = 0;

      for (const [char, probability] of bigramTransitions.entries()) {
        cumulative += probability;
        if (rand <= cumulative) {
          return char;
        }
      }
      return bigramTransitions.keys().next().value || ' ';
    }

    // Final fallback: random available character
    const availableArray = Array.from(availableCharacters);
    return availableArray[Math.floor(Math.random() * availableArray.length)];
  }, [filteredTrigrams, filteredBigrams, availableCharacters]);

  // Generate text using trigram context
  const generateText = useCallback((targetLength: number = maxLength): string => {
    if (filteredTrigrams.size === 0 && filteredBigrams.size === 0) {
      return '';
    }

    let text = '';
    let context = ' '; // Start with space to begin first word

    // Generate characters up to target length
    while (text.length < targetLength) {
      const nextChar = getNextCharacter(context);
      
      if (nextChar === ' ') {
        // Add space only if we're not at the start or end
        if (text.length > 0 && text[text.length - 1] !== ' ') {
          text += ' ';
        }
      } else {
        text += nextChar;
      }
      
      // Update context (keep last 2 characters for trigram support)
      context = (context + nextChar).slice(-2);
    }

    // Clean up text
    text = text.trim().replace(/\s+/g, ' ');
    
    // Truncate to target length if needed
    if (text.length > targetLength) {
      const truncated = text.substring(0, targetLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      text = lastSpaceIndex > targetLength * 0.8 ? truncated.substring(0, lastSpaceIndex) : truncated;
    }

    return text;
  }, [getNextCharacter, filteredTrigrams, filteredBigrams, maxLength]);

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