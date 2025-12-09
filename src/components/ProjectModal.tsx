// src/components/ProjectModal.tsx
import React from 'react';
import type { Project } from '../data/portfolioData';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaTerminal } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-surface border border-border rounded-lg w-full max-w-2xl overflow-hidden relative shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Terminal Bar */}
            <div className="bg-surfaceHighlight border-b border-border p-4 flex justify-between items-center">
              <div className="flex items-center gap-3 text-secondary font-mono text-sm">
                <FaTerminal className="text-accent" />
                <span>~/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <button
                onClick={onClose}
                className="text-secondary hover:text-white transition-colors"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-4 font-sans tracking-tight">
                {project.title}
              </h3>

              <p className="text-primary/80 text-lg leading-relaxed mb-8 font-light">
                {project.description}
              </p>

              {/* Stats Grid */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="bg-bg border border-border p-3 rounded">
                      <div className="text-secondary text-xs font-mono uppercase tracking-wider mb-1">
                        {stat.label}
                      </div>
                      <div className="text-accent font-mono font-bold">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-sm text-secondary uppercase tracking-widest mb-3 font-mono">
                  Stack Configuration
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-mono text-primary bg-surfaceHighlight border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-white font-mono text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    <FaGithub />
                    <span>VIEW_SOURCE</span>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-mono text-sm hover:bg-accent/90 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    <span>DEPLOYMENT_URL</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;