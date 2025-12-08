// src/sections/Achievements.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaTrophy, FaRocket } from 'react-icons/fa';

const Achievements: React.FC = () => {
  if (!PortfolioData.achievements || PortfolioData.achievements.length === 0) {
    return null;
  }

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('return') || title.toLowerCase().includes('offer')) {
      return <FaRocket size={20} />;
    }
    return <FaTrophy size={20} />;
  };

  return (
    <section className="section-container bg-surface">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title="System Events"
          subtitle="Key milestones and achievements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PortfolioData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="node-card"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  {getIcon(achievement.title)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {achievement.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="text-accent">{achievement.issuer}</span>
                    <span className="text-secondary/50">•</span>
                    <span className="text-secondary">{achievement.date}</span>
                  </div>
                  {achievement.description && (
                    <p className="text-secondary text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;