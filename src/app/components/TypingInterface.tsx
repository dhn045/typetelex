import LetterDisplay, { LetterStatus } from "./LetterDisplay";
import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';

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

    const splitTextInHalf = () => {
        const textLength = text.length;
        const midPoint = Math.ceil(textLength / 2);
        return {
            firstLine: text.slice(0, midPoint),
            secondLine: text.slice(midPoint)
        };
    };

    const { firstLine, secondLine } = splitTextInHalf();

    function letterStatusForIndex(globalIndex: number): LetterStatus {
        if (globalIndex < cursorPosition) {
            return LetterStatus.Correct;
        } else if (globalIndex === cursorPosition) {
            return isCorrect ? LetterStatus.Untyped : LetterStatus.Incorrect;
        } else {
            return LetterStatus.Untyped;
        }
    }

    return (
        <div className="typing-interface">
            <div className="text-line">
                {
                    firstLine.split('').map((letter, index) => {
                        const globalIndex = index;
                        return (
                            <LetterDisplay 
                                key={`line1-${index}`} 
                                letter={letter} 
                                showCursor={globalIndex === cursorPosition}
                                status={letterStatusForIndex(globalIndex)}
                            />
                        );
                    })
                }
            </div>
            <div className="text-line">
                {
                    secondLine.split('').map((letter, index) => {
                        const globalIndex = firstLine.length + index;
                        return (
                            <LetterDisplay 
                                key={`line2-${index}`} 
                                letter={letter} 
                                showCursor={globalIndex === cursorPosition}
                                status={letterStatusForIndex(globalIndex)}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default TypingInterface;
