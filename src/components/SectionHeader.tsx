// src/components/SectionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id }) => {
  return (
    <motion.div
      id={id}
      className="mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal-style prefix */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-accent text-sm tracking-wider">::</span>
        <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-accent to-transparent" />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
        {title}
      </h2>

      <p className="text-lg text-secondary max-w-2xl font-light">
        {subtitle}
      </p>

      {/* Accent underline */}
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" />
    </motion.div>
  );
};

export default SectionHeader;