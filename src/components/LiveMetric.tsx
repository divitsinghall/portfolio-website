// src/components/LiveMetric.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveMetricProps {
    value: string;
    unit: string;
    label: string;
}

const LiveMetric: React.FC<LiveMetricProps> = ({ value, unit, label }) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        // Parse the numeric value
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) return;

        const interval = setInterval(() => {
            // Generate a small jitter (±5%)
            const jitter = (Math.random() - 0.5) * 0.1 * numericValue;
            const newValue = numericValue + jitter;

            // Format based on original precision
            const decimals = (value.split('.')[1] || '').length;
            const formatted = newValue.toFixed(decimals);

            setIsUpdating(true);
            setDisplayValue(formatted);

            // Reset update flash after 300ms
            setTimeout(() => setIsUpdating(false), 300);
        }, 2000 + Math.random() * 1000); // Random interval between 2-3s

        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
            {/* Update flash effect */}
            <AnimatePresence>
                {isUpdating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-teal-400/5 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="text-secondary/60 text-sm mb-1">{label}</div>
            <div className="flex items-baseline gap-1">
                <motion.span
                    key={displayValue}
                    initial={{ scale: 1.05, color: 'rgb(94, 234, 212)' }} // teal-300
                    animate={{ scale: 1, color: 'rgb(45, 212, 191)' }} // teal-400
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold font-mono"
                    style={{
                        textShadow: isUpdating
                            ? '0 0 30px rgba(45,212,191,0.8), 0 0 60px rgba(45,212,191,0.4)'
                            : '0 0 20px rgba(45,212,191,0.5)',
                        transition: 'text-shadow 0.3s ease-out',
                    }}
                >
                    {displayValue}
                </motion.span>
                <span className="text-teal-400/60 text-lg font-mono">{unit}</span>
            </div>

            {/* Subtle live indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-teal-400"
                />
                <span className="text-[10px] text-secondary/40 font-mono uppercase">Live</span>
            </div>
        </div>
    );
};

export default LiveMetric;
