import React from 'react';
import type { LetterStatus } from './TypingInterface';

interface LetterDisplayProps {
    letter: string;
    showCursor?: boolean;
    showHighlight?: boolean;
    status: LetterStatus;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({
    letter,
    showCursor = false,
    showHighlight = false,
    status
}) => {
    const getCssClasses = () => {
        const classes = ['letter'];
        if (showCursor) {
            classes.push('cursor');
        }
        if (showHighlight) {
            classes.push('highlight');
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