import React from 'react';
import LetterDisplay from './LetterDisplay';
import { LetterStatus } from './TypingInterface';

interface TextDisplayProps {
    text: string;
    cursorPosition: number;
    currentLetter: string;
    latestLetterStatus: LetterStatus;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, cursorPosition, currentLetter, latestLetterStatus }) => {
    const splitTextInHalf = () => {
        const textLength = text.length;
        const midPoint = Math.ceil(textLength / 2);
        return {
            firstLine: text.slice(0, midPoint),
            secondLine: text.slice(midPoint)
        };
    };

    const getLetterStatus = (globalIndex: number): LetterStatus => {
        if (globalIndex < cursorPosition) {
            // Letter has been passed - it's correct
            return LetterStatus.Correct;
        } else if (globalIndex === cursorPosition && currentLetter && text[globalIndex] !== currentLetter) {
            // Currently at this position and letter is incorrect
            return latestLetterStatus;
        } else {
            // Not yet typed
            return LetterStatus.Untyped;
        }
    };

    const { firstLine, secondLine } = splitTextInHalf();

    return (
        <div className="text-display">
            <div className="text-line">
                {firstLine.split('').map((letter, index) => {
                    const globalIndex = index;
                    return (
                        <LetterDisplay 
                            key={`line1-${index}`} 
                            letter={letter} 
                            showCursor={globalIndex === cursorPosition}
                            status={getLetterStatus(globalIndex)}
                        />
                    );
                })}
            </div>
            <div className="text-line">
                {secondLine.split('').map((letter, index) => {
                    const globalIndex = firstLine.length + index;
                    return (
                        <LetterDisplay 
                            key={`line2-${index}`} 
                            letter={letter} 
                            showCursor={globalIndex === cursorPosition}
                            status={getLetterStatus(globalIndex)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TextDisplay;