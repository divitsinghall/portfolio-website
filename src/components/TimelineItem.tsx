// src/components/TimelineItem.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  duration: string;
  descriptionPoints: string[];
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  duration,
  descriptionPoints,
  isLast,
}) => {
  return (
    <motion.div
      className="relative pl-8 sm:pl-16 pb-16 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-[5px] sm:left-[29px] top-[10px] h-full w-[2px] bg-gradient-to-b from-accent via-accent-glow to-accent/20 opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}

      {/* Glowing Node */}
      <div className="absolute left-0 sm:left-6 top-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full border border-accent-glow shadow-[0_0_10px_rgba(99,102,241,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(99,102,241,1)] transition-all duration-300 z-10">
        <div className="absolute inset-0 rounded-full bg-accent-glow animate-ping opacity-20"></div>
      </div>

      {/* Glass Card */}
      <div className="glass p-8 rounded-2xl hover:bg-secondary/50 transition-all duration-300 group-hover:translate-x-2 border-l-4 border-l-transparent group-hover:border-l-accent">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-2xl font-heading font-bold text-white group-hover:text-accent-glow transition-colors duration-300">
            {title}
          </h3>
          <span className="px-3 py-1 bg-primary/50 text-accent-glow text-xs font-medium rounded-full border border-accent/30 mt-2 sm:mt-0">
            {duration}
          </span>
        </div>

        <p className="text-accent-glow text-lg mb-6 font-medium">{subtitle}</p>

        <ul className="space-y-3">
          {descriptionPoints.map((point, index) => (
            <li key={index} className="flex items-start text-text-muted leading-relaxed group-hover:text-text-main transition-colors duration-300">
              <span className="mr-3 mt-2 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default TimelineItem;