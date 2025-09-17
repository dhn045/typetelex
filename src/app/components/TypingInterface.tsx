import LetterDisplay, { LetterStatus } from "./LetterDisplay";
import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';
import TextDisplay from "./TextDisplay";

interface TextDisplayProps {
    text: string;
}

const TypingInterface: React.FC<TextDisplayProps> = ({ text }) => {
    const { currentLetter, resetBuffer } = useTelexInput();
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean>(true);

    // React to letter changes and update cursor position
    useEffect(() => {
        if (currentLetter && text[cursorPosition] === currentLetter) {
            setCursorPosition(prev => prev + 1);
            setIsCorrect(true);
        } else if (currentLetter) {
            // Incorrect letter typed, could add error handling here
            setIsCorrect(false);
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
            event.preventDefault();
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
        <TextDisplay text={text} cursorPosition={cursorPosition} currentLetter={currentLetter} isLastestLetterCorrect={isCorrect} />
    );
};

export default TypingInterface;
