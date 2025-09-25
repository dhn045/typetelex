import React, { useState, useMemo } from 'react';
import Modal from './Modal';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = useMemo(() => [
    {
      title: "Welcome to TypeTelex",
      content: (
        <div style={{ textAlign: "left" }}>
          <p>typetelex is a site designed to help users learn Vietnamese typing using the Telex input method. It assumes familiarity with basic typing skills and gradually introduces Vietnamese specific diacritics and tones.</p>

        </div>
      )
    },
    {
      title: "How It Works",
      content: (
        <div style={{ textAlign: "left" }}>
          <p>The progression is as follows</p>
          <ul>
            <li>letters without diacrities and tones (normal alphabet excluding f, j, w, and z) </li>
            <li>letters with single diacrities or tones (i.e. â, ê, ó, ù)</li>
            <li>letters with diacritics and tones (i.e. ấ, ề, ỡ, ự)</li>
          </ul>
        </div>
      )
    },
    {
      title: "How It Works",
      content: (
        <div style={{ textAlign: "left" }}>
          <p>Each round will introduce a new character combination either by adding a diacritic or a tone to an existing letter. You'll need a minimum of 90% accuracy and 30wpm to advance to the next level</p>
        </div>
      )
    }
  ], []);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={pages[currentPage].title}
    >
      <div className="tutorial-content">
        {pages[currentPage].content}
      </div>

      <div className="tutorial-footer">
        <div className="pagination-dots">
          {pages.map((_, index) => (
            <span
              key={index}
              className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>

        <div className="tutorial-actions">
          <button
            className="modal-button secondary"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            ‹
          </button>

          <button
            className="modal-button primary"
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
          >
            ›
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TutorialModal;