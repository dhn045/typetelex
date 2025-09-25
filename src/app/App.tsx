import { useState, useEffect } from 'react';
import './App.css'
import TypingInterface from './components/TypingInterface'
import TutorialModal from './components/TutorialModal';
import { useModalPersistence } from './hooks/useModalPersistence';

function App() {
  const { hasModalBeenShown, markModalAsShown } = useModalPersistence();
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Show tutorial modal on first launch
  useEffect(() => {
    if (!hasModalBeenShown('hasShownTutorialModal')) {
      setShowTutorialModal(true);
    }
  }, [hasModalBeenShown]);

  const handleTutorialClose = () => {
    setShowTutorialModal(false);
    markModalAsShown('hasShownTutorialModal');
  };

  const handleHelpClick = () => {
    setShowTutorialModal(true);
  };

  return (
    <>
      <button className="help-button" onClick={handleHelpClick} title="Show Tutorial">
        ?
      </button>
      <TypingInterface/>
      <TutorialModal
        isOpen={showTutorialModal}
        onClose={handleTutorialClose}
      />
    </>
  )
}

export default App
