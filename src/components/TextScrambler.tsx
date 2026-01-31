// src/components/TextScrambler.tsx
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextScramblerProps {
    texts: string[];
    interval?: number;
    className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

const TextScrambler: React.FC<TextScramblerProps> = ({
    texts,
    interval = 3000,
    className = '',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(texts[0]);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback((targetText: string) => {
        setIsScrambling(true);
        const duration = 600; // Total scramble duration in ms
        const steps = 15; // Number of scramble iterations
        const stepDuration = duration / steps;
        let currentStep = 0;

        const scrambleInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const revealedLength = Math.floor(targetText.length * progress);

            // Build the scrambled text
            let scrambled = '';
            for (let i = 0; i < targetText.length; i++) {
                if (i < revealedLength) {
                    scrambled += targetText[i];
                } else if (targetText[i] === ' ') {
                    scrambled += ' ';
                } else {
                    scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }
            setDisplayText(scrambled);

            if (currentStep >= steps) {
                clearInterval(scrambleInterval);
                setDisplayText(targetText);
                setIsScrambling(false);
            }
        }, stepDuration);
    }, []);

    useEffect(() => {
        const cycleInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % texts.length;
            setCurrentIndex(nextIndex);
            scramble(texts[nextIndex]);
        }, interval);

        return () => clearInterval(cycleInterval);
    }, [currentIndex, texts, interval, scramble]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={currentIndex}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className={`font-mono ${className} ${isScrambling ? 'text-accent' : 'text-secondary'} transition-colors duration-300`}
            >
                {displayText}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-accent ml-0.5"
                >
                    _
                </motion.span>
            </motion.span>
        </AnimatePresence>
    );
};

export default TextScrambler;
