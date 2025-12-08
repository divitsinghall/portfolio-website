import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaUniversity, FaGraduationCap } from 'react-icons/fa';

const Education: React.FC = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeader title="Education" subtitle="Academic background and qualifications." />

        <div className="space-y-8">
          {PortfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-secondary p-8 rounded-xl border border-border shadow-lg flex flex-col md:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center text-accent border border-accent/30">
                  <FaUniversity size={32} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <h3 className="text-2xl font-bold text-white">{edu.institution}</h3>
                  <span className="text-accent font-medium bg-primary/20 px-3 py-1 rounded-full text-sm mt-2 md:mt-0 border border-accent/20">
                    {edu.duration}
                  </span>
                </div>

                <div className="flex items-center text-xl text-accent-glow mb-4">
                  <FaGraduationCap className="mr-2" />
                  {edu.degree} — {edu.major}
                </div>

                {edu.relevantCoursework && (
                  <div className="mb-4">
                    <h4 className="text-sm text-text-muted uppercase tracking-wider mb-2 font-semibold">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCoursework.map((course, i) => (
                        <span key={i} className="text-xs text-text-muted bg-primary/50 px-2 py-1 rounded border border-border">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;