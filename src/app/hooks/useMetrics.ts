import { useState, useCallback } from 'react';

const MILLISECONDS_IN_MINUTE = 60000;
const AVERAGE_WORD_LENGTH = 5; // Standard word length for WPM calculation

const calculateWpm = (charactersTyped: number, startTime: number) => {
    const elapsedMinutes = (Date.now() - startTime) / MILLISECONDS_IN_MINUTE;
    if (elapsedMinutes === 0) return 0;
    return Math.round((charactersTyped / AVERAGE_WORD_LENGTH) / elapsedMinutes);
};

const calculateAccuracy = (correct: number, total: number) => {
    if (total === 0) return 100;
    return (correct / total) * 100;
};

export const useMetrics = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalCharactersTyped, setTotalCharactersTyped] = useState<number>(0);
    const [correctCharactersTyped, setCorrectCharactersTyped] = useState<number>(0);
    const [currentWpm, setCurrentWpm] = useState<number>(0);
    const [currentAccuracy, setCurrentAccuracy] = useState<number>(100);

    const startTimerIfNeeded = useCallback(() => {
        const now = Date.now();
        const effectiveStartTime = startTime ?? now;

        if (startTime === null) {
            setStartTime(now);
        }

        return effectiveStartTime;
    }, [startTime]);

    const logCorrectCharacter = useCallback(() => {
        const effectiveStartTime = startTimerIfNeeded();
        const newTotal = totalCharactersTyped + 1;
        const newCorrect = correctCharactersTyped + 1;

        setTotalCharactersTyped(newTotal);
        setCorrectCharactersTyped(newCorrect);
        setCurrentWpm(calculateWpm(newCorrect, effectiveStartTime));
        setCurrentAccuracy(calculateAccuracy(newCorrect, newTotal));
    }, [startTimerIfNeeded, totalCharactersTyped, correctCharactersTyped]);

    const logIncorrectCharacter = useCallback(() => {
        const effectiveStartTime = startTimerIfNeeded();
        const newTotal = totalCharactersTyped + 1;

        setTotalCharactersTyped(newTotal);
        setCurrentWpm(calculateWpm(correctCharactersTyped, effectiveStartTime));
        setCurrentAccuracy(calculateAccuracy(correctCharactersTyped, newTotal));
    }, [startTimerIfNeeded, totalCharactersTyped, correctCharactersTyped]);

    const resetMetrics = useCallback(() => {
        setStartTime(null);
        setTotalCharactersTyped(0);
        setCorrectCharactersTyped(0);
    }, []);

    return {
        wpm: currentWpm,
        accuracy: currentAccuracy,
        logCorrectCharacter,
        logIncorrectCharacter,
        resetMetrics
    };
};