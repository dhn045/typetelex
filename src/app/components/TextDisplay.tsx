import React from 'react';
import LetterDisplay from './LetterDisplay';
import { LetterStatus } from './TypingInterface';

export const TextDisplayUseCase = {
    MainDisplay: 'main-text-display',
    ProgressionDisplay: 'progression-text-display',
} as const;

export type TextDisplayUseCase = typeof TextDisplayUseCase[keyof typeof TextDisplayUseCase];

interface TextDisplayProps {
    useCase: TextDisplayUseCase;
    text: string;
    showCursor: boolean;
    showHighlight: boolean;
    highlightPosition?: number;
    cursorPosition: number;
    currentLetter: string;
    latestLetterStatus: LetterStatus;
    numberOfLines: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
    useCase,
    text,
    showCursor,
    showHighlight,
    cursorPosition,
    highlightPosition = -1,
    currentLetter,
    latestLetterStatus,
    numberOfLines
}) => {

    const splitTextIntoLines = (numLines: number) => {
        const lines: string[] = [];
        const lineLength = Math.ceil(text.length / numLines);
        for (let i = 0; i < numLines; i++) {
            lines.push(text.slice(i * lineLength, (i + 1) * lineLength));
        }
        return lines;
    };

    const getLetterStatus = (globalIndex: number): LetterStatus => {
        if (globalIndex < cursorPosition) {
            return LetterStatus.Correct;
        } else if (globalIndex === cursorPosition && currentLetter && text[globalIndex] !== currentLetter) {
            // Maybe incorrect or partially correct
            return latestLetterStatus;
        } else {
            return LetterStatus.Untyped;
        }
    };

    const lines = splitTextIntoLines(numberOfLines);

    return (
        <div className={`text-display ${useCase}`}>
            {lines.map((line, lineIndex) => {
                // Calculate the starting global index for this line
                const lineStartIndex = lines.slice(0, lineIndex).reduce((sum, prevLine) => sum + prevLine.length, 0);
                return (
                    <div key={`line-${lineIndex}`} className="text-line">
                        {line.split('').map((letter, letterIndex) => {
                            const globalIndex = lineStartIndex + letterIndex;
                            return (
                                <LetterDisplay
                                    key={`line${lineIndex + 1}-${letterIndex}`}
                                    letter={letter}
                                    showCursor={showCursor && globalIndex === cursorPosition}
                                    status={getLetterStatus(globalIndex)}
                                    showHighlight={showHighlight && letterIndex < highlightPosition}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default TextDisplay;