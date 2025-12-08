import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const Achievements: React.FC = () => {
  if (!PortfolioData.achievements || PortfolioData.achievements.length === 0) return null;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader title="Achievements" subtitle="Honors, awards, and certifications." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PortfolioData.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-primary p-6 rounded-lg border border-border flex items-start gap-4 hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="text-accent mt-1">
                <FaTrophy size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-accent-glow text-sm mb-2">{achievement.issuer} • {achievement.date}</p>
                {achievement.description && (
                  <p className="text-text-muted text-sm">{achievement.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;