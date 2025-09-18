import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';
import TextDisplay from "./TextDisplay";
import { TELEX_INTERMEDIATE_FORMS } from "../utils/telex";
import InfoDisplay from './InfoDisplay';
import { useMetrics } from '../hooks/useMetrics';

const MILLISECONDS_IN_MINUTE = 60000;
const AVERAGE_WORD_LENGTH = 5; // Standard word length for WPM calculation


const calculateWpm = (charactersTyped: number, startTime: number) => {
    const elapsedMinutes = (Date.now() - startTime) / MILLISECONDS_IN_MINUTE;
    if (elapsedMinutes === 0) return 0;
    return Math.round((charactersTyped / AVERAGE_WORD_LENGTH) / elapsedMinutes);
};

const calculateAccuracy = (correct: number, total: number) => {
    if (total === 0) return 100;
    return (correct / total) * 100;
};

interface TextDisplayProps {
    text: string;
}

export const LetterStatus = {
    Correct: 'correct',
    PartiallyCorrect: 'partially-correct',
    Incorrect: 'incorrect',
    Untyped: 'untyped'
} as const;

export type LetterStatus = typeof LetterStatus[keyof typeof LetterStatus];

const TypingInterface: React.FC<TextDisplayProps> = ({ text }) => {
    const { currentLetter, resetBuffer } = useTelexInput();
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [latestLetterStatus, setLatestLetterStatus] = useState<LetterStatus>(LetterStatus.Untyped);
    const { wpm, accuracy, logCorrectCharacter, logIncorrectCharacter, resetMetrics } = useMetrics();

    // React to letter changes and update cursor position
    useEffect(() => {
        if(!currentLetter) {
            return;
        }

        if (text[cursorPosition] === currentLetter) {
            setCursorPosition(prev => prev + 1);
            setLatestLetterStatus(LetterStatus.Untyped);
            logCorrectCharacter();
        } else {
            // Letter can be partially correct (e.g. 'a' when 'á' is expected)
            const targetChar = text[cursorPosition];
            if (TELEX_INTERMEDIATE_FORMS[targetChar] && TELEX_INTERMEDIATE_FORMS[targetChar].includes(currentLetter)) {
                setLatestLetterStatus(LetterStatus.PartiallyCorrect);
            } else {
                setLatestLetterStatus(LetterStatus.Incorrect);
                logIncorrectCharacter();
            }
        }
    }, [currentLetter]);

    // Reset all state when text changes
    useEffect(() => {
        setCursorPosition(0);
        resetBuffer();
        resetMetrics();
        setLatestLetterStatus(LetterStatus.Untyped);
    }, [text]);

    // Handle top level key events like escape to reset
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
            }
            if (event.key === 'Escape') {
                setCursorPosition(0);
                resetBuffer();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <InfoDisplay currentChar={currentLetter} wpm={wpm} accuracy={accuracy} />
            <TextDisplay text={text} cursorPosition={cursorPosition} currentLetter={currentLetter} latestLetterStatus={latestLetterStatus} />
        </div>
    );
};

export default TypingInterface;
