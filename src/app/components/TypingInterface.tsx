import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';
import TextDisplay from "./TextDisplay";
import { TELEX_INTERMEDIATE_FORMS } from "../utils/telex";

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

    // React to letter changes and update cursor position
    useEffect(() => {
        if (currentLetter && text[cursorPosition] === currentLetter) {
            setCursorPosition(prev => prev + 1);
            setLatestLetterStatus(LetterStatus.Untyped);
        } else if (currentLetter) {
            // Letter can be partially correct (e.g. 'a' when 'á' is expected)
            const targetChar = text[cursorPosition];
            if (TELEX_INTERMEDIATE_FORMS[targetChar] && TELEX_INTERMEDIATE_FORMS[targetChar].includes(currentLetter)) {
                setLatestLetterStatus(LetterStatus.PartiallyCorrect);
            } else {
                setLatestLetterStatus(LetterStatus.Incorrect);
            }
        }
    }, [currentLetter]);

    // Reset all state when text changes
    useEffect(() => {
        setCursorPosition(0);
        resetBuffer();
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
        <TextDisplay text={text} cursorPosition={cursorPosition} currentLetter={currentLetter} latestLetterStatus={latestLetterStatus} />
    );
};

export default TypingInterface;
