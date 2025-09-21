import React from 'react';
import { LETTER_PROGRESSION } from '../utils/vietnameseLetterProgression';
import { LetterStatus } from './TypingInterface';
import TextDisplay, { TextDisplayUseCase } from './TextDisplay';

export const ProgressionDisplay: React.FC = () => {

    return (
        <div className="progression-display">
          {
            /// use textDisplay
            LETTER_PROGRESSION.map((group, groupIndex) => (
              <TextDisplay
                useCase={TextDisplayUseCase.ProgressionDisplay}
                key={groupIndex}
                text={Array.isArray(group) ? group.join('') : group}
                showCursor={false}
                cursorPosition={0}
                currentLetter=""
                latestLetterStatus={LetterStatus.Untyped}
                numberOfLines={1}
              />
            ))
          }
        </div>
    );
}