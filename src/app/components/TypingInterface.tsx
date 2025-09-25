import React, { useEffect, useMemo, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';
import TextDisplay from "./TextDisplay";
import { TELEX_INTERMEDIATE_FORMS } from "../utils/telex";
import InfoDisplay from './InfoDisplay';
import { useMetrics } from '../hooks/useMetrics';
import { useTextGenerator } from '../hooks/useTextGenerator';
// import { ProgressionDisplay } from './ProgressionDisplay';
import { LETTER_PROGRESSION } from '../utils/vietnameseLetterProgression';
import { useProgressionPersistence } from '../hooks/useProgressionPersistence';

export const LetterStatus = {
    Correct: 'correct',
    PartiallyCorrect: 'partially-correct',
    Incorrect: 'incorrect',
    Untyped: 'untyped'
} as const;

export type LetterStatus = typeof LetterStatus[keyof typeof LetterStatus];

const flatProgression = LETTER_PROGRESSION.flat();

const STARTING_INDEX = 21; // Start with all base letters

const TypingInterface: React.FC = () => {

    const { currentLetter, charBuffer, resetBuffer } = useTelexInput();
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [latestLetterStatus, setLatestLetterStatus] = useState<LetterStatus>(LetterStatus.Untyped);
    const { wpm, accuracy, logCorrectCharacter, logIncorrectCharacter, resetMetrics } = useMetrics();
    const [currentProgressionIndex, setCurrentProgressionIndex] = useProgressionPersistence(STARTING_INDEX);
    const availableCharacters = useMemo(() => {
        return new Set(' ' + flatProgression.slice(0, currentProgressionIndex + 1));
    }, [currentProgressionIndex]);

    // Get the most recently added character for focused practice
    const targetCharacter = useMemo(() => {
        return currentProgressionIndex > 0 && currentProgressionIndex != STARTING_INDEX ? flatProgression[currentProgressionIndex] : undefined;
    }, [currentProgressionIndex]);

    const { generatedText, generateText } = useTextGenerator({
        availableCharacters,
        maxLength: 80,
        targetCharacter
    });

    useEffect(() => {
        generateText();
    }, [generateText]);

    // React to letter changes and update cursor position
    useEffect(() => {
        if(!currentLetter) {
            return;
        }

        if (generatedText[cursorPosition] === currentLetter) {
            setCursorPosition(prev => prev + 1);
            setLatestLetterStatus(LetterStatus.Untyped);
            logCorrectCharacter();
            if (cursorPosition + 1 >= generatedText.length) {
                if (wpm > 30 && accuracy > .90) {
                    setCurrentProgressionIndex(prev => prev + 1);
                } else {
                    generateText();
                }
            }
        } else {
            // Letter can be partially correct (e.g. 'a' when 'á' is expected)
            const targetChar = generatedText[cursorPosition];
            if (TELEX_INTERMEDIATE_FORMS[targetChar] && TELEX_INTERMEDIATE_FORMS[targetChar].includes(currentLetter)) {
                setLatestLetterStatus(LetterStatus.PartiallyCorrect);
            } else {
                setLatestLetterStatus(LetterStatus.Incorrect);
                logIncorrectCharacter();
            }
        }
    }, [currentLetter]);

    useEffect(() => {
        setCursorPosition(0);
        resetBuffer();
        resetMetrics();
        setLatestLetterStatus(LetterStatus.Untyped);
    }, [generatedText]);

    // Handle top level key events like escape to reset
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
            }
            if (event.key === 'Escape') {
                generateText();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [generateText]);

    return (
        <div className="typing-interface">
            <InfoDisplay
                currentChar={currentLetter}
                wpm={wpm}
                accuracy={accuracy}
                targetChar={targetCharacter}
                currentInput={charBuffer}
            />
            <TextDisplay
                text={generatedText}
                showCursor={true}
                cursorPosition={cursorPosition}
                letterInProgress={currentLetter}
                letterInProgressStatus={latestLetterStatus}
            />
        </div>
    );
};

export default TypingInterface;
