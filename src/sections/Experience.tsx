import React from 'react';
import SectionHeader from '../components/SectionHeader';
import TimelineItem from '../components/TimelineItem';
import { PortfolioData } from '../data/portfolioData';

const Experience: React.FC = () => {
  return (
    <section className="py-20 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <SectionHeader title="Experience" subtitle="My professional journey and internships." />

        <div className="mt-16">
          {PortfolioData.experience.map((exp, index) => (
            <TimelineItem
              key={index}
              title={exp.title}
              subtitle={`${exp.company} • ${exp.location}`}
              duration={exp.duration}
              descriptionPoints={exp.descriptionPoints}
              isLast={index === PortfolioData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;