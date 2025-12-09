import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
    text: string;
    typingSpeed?: number;
    pauseDuration?: number;
    pauseChance?: number;
    startDelay?: number;
}

interface UseTypewriterReturn {
    displayText: string;
    isTyping: boolean;
    isComplete: boolean;
    cursor: string;
}

export const useTypewriter = ({
    text,
    typingSpeed = 50,
    pauseDuration = 300,
    pauseChance = 0.15,
    startDelay = 500,
}: UseTypewriterOptions): UseTypewriterReturn => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    const typeNextChar = useCallback((currentIndex: number) => {
        if (currentIndex >= text.length) {
            setIsTyping(false);
            setIsComplete(true);
            return;
        }

        const char = text[currentIndex];
        setDisplayText(text.slice(0, currentIndex + 1));

        // Calculate delay for next character
        let delay = typingSpeed + Math.random() * 30; // Add slight randomness

        // "Thinking" pause - more likely after punctuation or spaces
        const shouldPause =
            (char === '.' || char === ',' || char === ' ') &&
            Math.random() < pauseChance;

        if (shouldPause) {
            delay += pauseDuration * (0.5 + Math.random() * 0.5);
        }

        setTimeout(() => typeNextChar(currentIndex + 1), delay);
    }, [text, typingSpeed, pauseDuration, pauseChance]);

    // Start typing effect
    useEffect(() => {
        setDisplayText('');
        setIsComplete(false);

        const startTimer = setTimeout(() => {
            setIsTyping(true);
            typeNextChar(0);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, [text, startDelay, typeNextChar]);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 530);

        return () => clearInterval(cursorInterval);
    }, []);

    const cursor = cursorVisible ? '█' : ' ';

    return {
        displayText,
        isTyping,
        isComplete,
        cursor,
    };
};

export default useTypewriter;
