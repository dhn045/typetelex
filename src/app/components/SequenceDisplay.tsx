import React from 'react';
import { REVERSE_TELEX_MAP } from '../utils/telex';

interface SequenceDisplayProps {
    targetChar?: string;
}

const SequenceDisplay: React.FC<SequenceDisplayProps> = ({ targetChar }) => {
    const getSequence = (char: string): string[] => {
        const telexSequence = REVERSE_TELEX_MAP[char];
        if (telexSequence) {
            return telexSequence.split('');
        }
        return [char];
    };

    if (!targetChar || targetChar === ' ') {
        return null;
    }

    const sequence = getSequence(targetChar);

    return (
        sequence
        ? <div className="sequence-display">
            {sequence.map((char, index) => (
                <React.Fragment key={index}>
                    <span className="sequence-char">{char}</span>
                    {index < sequence.length - 1 && (
                        <span className="sequence-separator">+</span>
                    )}
                </React.Fragment>
            ))}
            <span className="sequence-separator">=</span>
            <span className="sequence-result">{targetChar}</span>
        </div>
        : null
    );
};

export default SequenceDisplay;