// src/sections/Projects.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: typeof PortfolioData.projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="node-card group"
  >
    {/* Header */}
    <div className="flex justify-between items-start mb-4">
      <div>
        {/* Service badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-xs text-success uppercase">Active</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>
      </div>

      {/* Links */}
      <div className="flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-secondary hover:text-primary hover:bg-surfaceHighlight rounded-lg transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub size={18} />
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-secondary hover:text-accent hover:bg-surfaceHighlight rounded-lg transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt size={16} />
          </a>
        )}
      </div>
    </div>

    {/* Description */}
    <p className="text-secondary text-sm leading-relaxed mb-6">
      {project.description}
    </p>

    {/* Stats */}
    {project.stats && project.stats.length > 0 && (
      <div className="flex flex-wrap gap-3 mb-6">
        {project.stats.map((stat) => (
          <div key={stat.label} className="stat-badge">
            <span className="text-secondary">{stat.label}:</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
    )}

    {/* Tech Stack */}
    <div className="pt-4 border-t border-border">
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects: React.FC = () => {
  return (
    <section className="section-container bg-bg">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="Deployed Services"
          subtitle="Production-grade systems with real-world impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PortfolioData.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;