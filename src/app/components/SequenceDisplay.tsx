import React, { useState, useEffect } from 'react';
import { REVERSE_TELEX_MAP } from '../utils/telex';

interface SequenceDisplayProps {
    targetChar?: string;
    currentInput?: string;
}

const SequenceDisplay: React.FC<SequenceDisplayProps> = ({ targetChar, currentInput }) => {
    if (!targetChar || targetChar === ' ') {
        return null;
    }

    const [litUpCount, setLitUpCount] = useState(0);
    const [isSequenceComplete, setIsSequenceComplete] = useState(false);

    const getSequence = (char: string): string[] => {
        const telexSequence = REVERSE_TELEX_MAP[char];
        if (telexSequence) {
            return telexSequence.split('');
        }
        return [char];
    };

    const sequence = getSequence(targetChar);
    const targetSequence = REVERSE_TELEX_MAP[targetChar];

    // Calculate how many characters match the sequence so far
    useEffect(() => {
        if (!targetSequence || !currentInput) {
            setLitUpCount(0);
            return;
        }

        let correctCount = 0;
        for (let i = 0; i < Math.min(currentInput.length, targetSequence.length); i++) {
            if (currentInput[i] === targetSequence[i]) {
                correctCount++;
            } else {
                break;
            }
        }

        if (correctCount > litUpCount) {
            setLitUpCount(correctCount);
        }
        if (correctCount === targetSequence.length) {
            setIsSequenceComplete(true);
        }
    }, [currentInput, targetSequence, targetChar]);

    // Reset lit up count when target character changes
    useEffect(() => {
        setLitUpCount(0);
        setIsSequenceComplete(false);
    }, [targetChar]);

    return (
        sequence
        ? <div className="sequence-display">
            {sequence.map((char, index) => (
                <React.Fragment key={index}>
                    <span className={`sequence-char ${index < litUpCount ? 'lit-up' : ''}`}>
                        {char}
                    </span>
                    {index < sequence.length - 1 && (
                        <span className="sequence-separator">+</span>
                    )}
                </React.Fragment>
            ))}
            <span className="sequence-separator">=</span>
            <span className={`sequence-result ${isSequenceComplete ? 'lit-up' : ''}`}>
                {targetChar}
            </span>
        </div>
        : null
    );
};

export default SequenceDisplay;