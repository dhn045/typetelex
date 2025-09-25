import SequenceDisplay from './SequenceDisplay';

interface InfoDisplayProps {
    currentChar: string;
    wpm: number;
    accuracy: number; // Accuracy as a percentage (0-100)
    targetChar?: string;
    currentInput?: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ currentChar, wpm, accuracy, targetChar, currentInput }) => {
  return (
    <div className="info-display">
      <div className="info-display-top">
        <div className="current-char">
          {currentChar || '-'}
        </div>
      </div>
      <SequenceDisplay targetChar={targetChar} currentInput={currentInput} />
      <div className="info-display-top">
        <div className="metrics">
          <div className="accuracy">
            {accuracy.toFixed(1)}%
          </div>
          <div className="wpm">
            {wpm}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;