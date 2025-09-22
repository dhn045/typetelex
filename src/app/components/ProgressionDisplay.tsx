import React from 'react';
import { LETTER_PROGRESSION } from '../utils/vietnameseLetterProgression';
import { LetterStatus } from './TypingInterface';
import TextDisplay, { TextDisplayUseCase } from './TextDisplay';

interface ProgressionDisplayProps {
  highlightPosition: number;
}

export const ProgressionDisplay: React.FC<ProgressionDisplayProps> = ({ highlightPosition }) => {

  let globalIndex = 0;

  return (
      <div className="progression-display">
        {
          LETTER_PROGRESSION.map((group, groupIndex) => {
            const groupStartIndex = globalIndex;
            globalIndex += group.length;
            const localHighlightIndex = highlightPosition - groupStartIndex;

            return <TextDisplay
              useCase={TextDisplayUseCase.ProgressionDisplay}
              key={groupIndex}
              text={Array.isArray(group) ? group.join('') : group}
              showCursor={false}
              showHighlight={true}
              cursorPosition={0}
              highlightPosition={localHighlightIndex}
              currentLetter=""
              latestLetterStatus={LetterStatus.Untyped}
              numberOfLines={1}
            />;
          })
        }
      </div>
  );
}
