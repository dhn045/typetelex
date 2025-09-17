import React from 'react';

interface LetterDisplayProps {
    letter: string;
    showCursor?: boolean;
    isTyped?: boolean;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({ letter, showCursor = false, isTyped = false }) => {
    return (
        <span className={`letter ${showCursor ? 'cursor' : ''} ${isTyped ? 'typed' : ''}`}>
            {letter}
        </span>
    );
};

export default LetterDisplay;