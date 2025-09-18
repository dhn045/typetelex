import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';
import TextDisplay, { TextDisplayUseCase } from "./TextDisplay";
import { TELEX_INTERMEDIATE_FORMS } from "../utils/telex";
import InfoDisplay from './InfoDisplay';
import { useMetrics } from '../hooks/useMetrics';
import { useTextGenerator } from '../hooks/useTextGenerator';
import { ProgressionDisplay } from './ProgressionDisplay';

export const LetterStatus = {
    Correct: 'correct',
    PartiallyCorrect: 'partially-correct',
    Incorrect: 'incorrect',
    Untyped: 'untyped'
} as const;

export type LetterStatus = typeof LetterStatus[keyof typeof LetterStatus];

const TypingInterface: React.FC = () => {

    const { currentLetter, resetBuffer } = useTelexInput();
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [latestLetterStatus, setLatestLetterStatus] = useState<LetterStatus>(LetterStatus.Untyped);
    const { wpm, accuracy, logCorrectCharacter, logIncorrectCharacter, resetMetrics } = useMetrics();
    const { generatedText, generateText } = useTextGenerator({availableCharacters: new Set('nhticgađômà '.split('')), maxLength: 60});

    useEffect(() => {
        generateText();
    }, []);

    // React to letter changes and update cursor position
    useEffect(() => {
        if(!currentLetter) {
            return;
        }

        if (generatedText[cursorPosition] === currentLetter) {
            setCursorPosition(prev => prev + 1);
            setLatestLetterStatus(LetterStatus.Untyped);
            logCorrectCharacter();
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
    }, []);

    return (
        <div>
            <InfoDisplay currentChar={currentLetter} wpm={wpm} accuracy={accuracy} />
            <TextDisplay
                useCase={TextDisplayUseCase.MainDisplay}
                text={generatedText}
                showCursor={true}
                cursorPosition={cursorPosition}
                currentLetter={currentLetter}
                latestLetterStatus={latestLetterStatus}
                numberOfLines={2}
            />
            <ProgressionDisplay />
        </div>
    );
};

export default TypingInterface;
