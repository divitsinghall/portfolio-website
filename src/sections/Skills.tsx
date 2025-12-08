import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData, type Skill } from '../data/portfolioData';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  // Group skills by category
  const categories = Array.from(new Set(PortfolioData.skills.map(s => s.category)));

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader title="Technical Skills" subtitle="My arsenal of tools and technologies." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              className="bg-primary p-6 rounded-xl border border-border hover:border-accent/30 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-accent-glow mb-4 border-b border-border pb-2">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {PortfolioData.skills
                  .filter(skill => skill.category === category)
                  .map((skill: Skill, index) => (
                    <div
                      key={index}
                      className="group relative bg-primary/30 px-3 py-1.5 rounded-full text-sm text-text-main border border-accent/20 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                      {skill.proficiency && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-border z-20">
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;