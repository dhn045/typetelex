import React from 'react';

export const LetterStatus = {
    Untyped: 'untyped',
    Correct: 'correct',
    Incorrect: 'incorrect'
} as const;

export type LetterStatus = typeof LetterStatus[keyof typeof LetterStatus];

interface LetterDisplayProps {
    letter: string;
    showCursor?: boolean;
    status: LetterStatus;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({
    letter,
    showCursor = false,
    status
}) => {
    const getCssClasses = () => {
        const classes = ['letter'];
        if (showCursor) {
            classes.push('cursor');
        }

        classes.push(status);
        return classes.join(' ');
    };

    return (
        <span className={getCssClasses()}>
            {letter}
        </span>
    );
};

export default LetterDisplay;