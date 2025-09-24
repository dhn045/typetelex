interface InfoDisplayProps {
    currentChar: string;
    wpm: number;
    accuracy: number; // Accuracy as a percentage (0-100)
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ currentChar, wpm, accuracy }) => {
  return (
    <div className="info-display">
      <div className="current-char">
        {currentChar || '-'}
      </div>
      <div className="metrics">
        <div className="accuracy">
          {accuracy.toFixed(1)}%
        </div>

        <div className="wpm">
          {wpm}
        </div>
      </div>
    </div>
  );
}

export default InfoDisplay;