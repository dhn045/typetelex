import React from 'react';
import LetterDisplay from './LetterDisplay';
import { LetterStatus } from './TypingInterface';

interface TextDisplayProps {
    text: string;
    showCursor: boolean;
    cursorPosition: number;
    letterInProgress: string;
    letterInProgressStatus: LetterStatus;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
    text,
    showCursor,
    cursorPosition,
    letterInProgress,
    letterInProgressStatus
}) => {

    const getLetterStatus = (globalIndex: number): LetterStatus => {
        if (globalIndex < cursorPosition) {
            return LetterStatus.Correct;
        } else if (globalIndex === cursorPosition && letterInProgress && text[globalIndex] !== letterInProgress) {
            return letterInProgressStatus;
        } else {
            return LetterStatus.Untyped;
        }
    };

    // Split text into words and render them, letting CSS handle the wrapping
    const words = text.split(' ');
    let globalIndex = 0;

    return (
        <div className="text-display">
            {words.map((word, wordIndex) => {
                const wordStartIndex = globalIndex;
                const wordElement = (
                    <span key={`word-${wordIndex}`} className="word">
                        {word.split('').map((letter, letterIndex) => {
                            const letterGlobalIndex = wordStartIndex + letterIndex;
                            return (
                                <LetterDisplay
                                    key={`${wordIndex}-${letterIndex}`}
                                    letter={letter}
                                    showCursor={showCursor && letterGlobalIndex === cursorPosition}
                                    status={getLetterStatus(letterGlobalIndex)}
                                />
                            );
                        })}
                        {/* Add space after word (except for last word) */}
                        {wordIndex < words.length - 1 && (
                            <LetterDisplay
                                key={`${wordIndex}-space`}
                                letter=" "
                                showCursor={showCursor && (wordStartIndex + word.length) === cursorPosition}
                                status={getLetterStatus(wordStartIndex + word.length)}
                            />
                        )}
                    </span>
                );

                // Update global index for next word (word length + space)
                globalIndex += word.length + (wordIndex < words.length - 1 ? 1 : 0);

                return wordElement;
            })}
        </div>
    );
};

export default TextDisplay;