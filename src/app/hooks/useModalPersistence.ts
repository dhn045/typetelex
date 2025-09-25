import { useState, useEffect, useCallback } from 'react';

const MODAL_STORAGE_KEY = 'typetelex-modals-shown';

interface ModalVisibilityState {
  hasShownTutorialModal: boolean;
  // Add other modal types as needed
  // hasShownLevelUpModal: boolean;
  // hasShownAchievementModal: boolean;
}

const DEFAULT_MODAL_VISIBILITY_STATE: ModalVisibilityState = {
  hasShownTutorialModal: false,
};

export const useModalPersistence = () => {
  const [modalVisibilityState, setModalVisibilityState] = useState<ModalVisibilityState>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_MODAL_VISIBILITY_STATE;
    }

    try {
      const saved = localStorage.getItem(MODAL_STORAGE_KEY);
      return saved ? { ...DEFAULT_MODAL_VISIBILITY_STATE, ...JSON.parse(saved) } : DEFAULT_MODAL_VISIBILITY_STATE;
    } catch (error) {
      console.warn('Failed to load modal state from localStorage:', error);
      return DEFAULT_MODAL_VISIBILITY_STATE;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(MODAL_STORAGE_KEY, JSON.stringify(modalVisibilityState));
    } catch (error) {
      console.warn('Failed to save modal state to localStorage:', error);
    }
  }, [modalVisibilityState]);

  const markModalAsShown = useCallback((modalField: keyof ModalVisibilityState) => {
    setModalVisibilityState(prev => ({
      ...prev,
      [modalField]: true
    }));
  }, []);

  const resetModalState = useCallback(() => {
    setModalVisibilityState(DEFAULT_MODAL_VISIBILITY_STATE);
  }, []);

  const hasModalBeenShown = useCallback((modalField: keyof ModalVisibilityState) => {
    return modalVisibilityState[modalField];
  }, [modalVisibilityState]);

  return {
    hasModalBeenShown,
    markModalAsShown,
    resetModalState
  };
};