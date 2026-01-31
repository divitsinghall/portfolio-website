// src/sections/Projects.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import BentoGrid from '../components/BentoGrid';

const Projects: React.FC = () => {
  return (
    <section className="section-container bg-bg">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="Featured Work"
          subtitle="Systems built for performance, scale, and real-world impact."
        />

        <BentoGrid projects={PortfolioData.projects} />
      </div>
    </section>
  );
};

export default Projects;