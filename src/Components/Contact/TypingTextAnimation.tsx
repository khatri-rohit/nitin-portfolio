import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';


const TypingText = React.memo<{
    text: string;
    delay?: number;
    onComplete?: () => void;
    showCursor?: boolean;
    shouldStart?: boolean;
    resetKey?: string;
}>(({
    text,
    delay = 0,
    onComplete,
    showCursor = true,
    shouldStart = true,
    resetKey = ''
}) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTypingCursor, setShowTypingCursor] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [lastResetKey, setLastResetKey] = useState(resetKey);

    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Reset animation when resetKey changes
    useEffect(() => {
        if (resetKey !== lastResetKey) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            if (cursorTimeoutRef.current) clearTimeout(cursorTimeoutRef.current);

            setDisplayText('');
            setCurrentIndex(0);
            setIsComplete(false);
            setHasStarted(false);
            setShowTypingCursor(false);
            setLastResetKey(resetKey);
        }
    }, [resetKey, lastResetKey]);

    // Start animation when shouldStart becomes true
    useEffect(() => {
        if (shouldStart && !hasStarted && !isComplete) {
            setHasStarted(true);
            setShowTypingCursor(true);
        }
    }, [shouldStart, hasStarted, isComplete]);

    // Typing effect
    useEffect(() => {
        if (hasStarted && currentIndex < text.length && !isComplete) {
            typingTimeoutRef.current = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 30 + delay);

            return () => {
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                }
            };
        } else if (hasStarted && currentIndex >= text.length && !isComplete) {
            setIsComplete(true);
            if (showCursor) {
                cursorTimeoutRef.current = setTimeout(() => {
                    setShowTypingCursor(false);
                    onComplete?.();
                }, 500);
            } else {
                onComplete?.();
            }
        }
    }, [hasStarted, currentIndex, text, isComplete, showCursor, onComplete, delay]);

    return (
        <span>
            {displayText}
            {showCursor && showTypingCursor && (
                <motion.span
                    className="inline-block w-0.5 h-4 bg-gray-600 dark:bg-gray-300 ml-0.5"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            )}
        </span>
    );
});

export default TypingText;