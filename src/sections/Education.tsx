// src/sections/Education.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

const Education: React.FC = () => {
  const education = PortfolioData.education[0]; // Primary education

  return (
    <section className="section-container bg-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title="Education"
          subtitle="Academic background and coursework."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="node-card"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Icon */}
            <div className="shrink-0">
              <div className="w-16 h-16 bg-surface rounded-xl border border-border flex items-center justify-center text-accent">
                <FaUniversity size={28} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Institution & Duration */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <h3 className="text-2xl font-bold text-primary">
                  {education.institution}
                </h3>
                <span className="stat-badge shrink-0">
                  <span className="stat-value">{education.duration}</span>
                </span>
              </div>

              {/* Degree */}
              <div className="flex items-center gap-2 text-accent mb-6">
                <FaGraduationCap size={18} />
                <span className="font-medium">
                  {education.degree} — {education.major}
                </span>
              </div>

              {/* Coursework */}
              {education.coursework && education.coursework.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs text-secondary uppercase tracking-wider mb-3">
                    // Loaded Modules
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((course) => (
                      <span key={course} className="tech-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;