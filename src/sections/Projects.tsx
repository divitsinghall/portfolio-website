import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { PortfolioData, type Project } from '../data/portfolioData';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-20 bg-[#020617]">
      <div className="container mx-auto px-4">
        <SectionHeader title="Featured Projects" subtitle="A selection of my recent work and experiments." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PortfolioData.projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onOpenModal={setSelectedProject} 
            />
          ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;