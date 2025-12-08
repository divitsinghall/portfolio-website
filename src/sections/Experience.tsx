// src/sections/Experience.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';

interface ExperienceItemProps {
  experience: typeof PortfolioData.experience[0];
  index: number;
  isLast: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-8 pb-12 last:pb-0"
  >
    {/* Timeline line */}
    {!isLast && (
      <div className="absolute left-[5px] top-3 h-full w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent" />
    )}

    {/* Timeline node */}
    <div className="absolute left-0 top-1.5 w-3 h-3 bg-accent rounded-full border-2 border-bg shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

    {/* Content card */}
    <div className="node-card ml-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent font-medium">{experience.company}</span>
            <span className="text-secondary/50">•</span>
            <span className="text-secondary text-sm">{experience.location}</span>
          </div>
        </div>

        {/* Duration badge */}
        <span className="stat-badge shrink-0">
          <span className="stat-value">{experience.duration}</span>
        </span>
      </div>

      {/* Description points */}
      <ul className="space-y-3 mb-4">
        {experience.description.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
            <span className="text-accent mt-1.5">›</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      {experience.tech && experience.tech.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

const Experience: React.FC = () => {
  return (
    <section className="section-container bg-surface">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title="Runtime Log"
          subtitle="Professional experience and internships."
        />

        <div className="relative">
          {PortfolioData.experience.map((exp, index) => (
            <ExperienceItem
              key={`${exp.company}-${exp.role}`}
              experience={exp}
              index={index}
              isLast={index === PortfolioData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;