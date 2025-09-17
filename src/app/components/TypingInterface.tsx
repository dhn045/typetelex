import LetterDisplay from "./LetterDisplay";
import React, { useEffect, useState } from 'react';
import { useTelexInput } from '../hooks/useTelex';

interface TextDisplayProps {
    text: string;
}

const TypingInterface: React.FC<TextDisplayProps> = ({ text }) => {
    const { currentLetter, resetBuffer } = useTelexInput();
    const [cursorPosition, setCursorPosition] = useState<number>(0);

    // React to letter changes and update cursor position
    useEffect(() => {
        console.log('=== TypingInterface useEffect triggered ===');
        console.log('currentLetter:', currentLetter);
        console.log('cursorPosition:', cursorPosition);
        console.log('text[cursorPosition]:', text[cursorPosition]);
        console.log('Match?', currentLetter === text[cursorPosition]);
        
        if (currentLetter && text[cursorPosition] === currentLetter) {
            console.log('✅ Characters match! Advancing cursor');
            setCursorPosition(prev => {
                console.log('📍 Cursor moving from', prev, 'to', prev + 1);
                return prev + 1;
            });
        } else if (currentLetter) {
            console.log('❌ Characters do not match');
        }
        console.log('==========================================');
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
                                isTyped={globalIndex < cursorPosition}
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
                                isTyped={globalIndex < cursorPosition}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default TypingInterface;
