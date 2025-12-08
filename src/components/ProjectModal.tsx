// src/components/ProjectModal.tsx
import React from 'react';
import { type Project } from '../data/portfolioData';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-primary rounded-lg shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-accent/50"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-accent transition-colors duration-300 text-2xl"
              aria-label="Close project details"
            >
              <FaTimes />
            </button>
            <h3 className="text-3xl font-bold text-accent-glow mb-4">{project.title}</h3>
            <p className="text-text-muted text-lg mb-6">{project.fullDescription || project.description}</p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-accent-glow mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/50 text-accent-glow text-sm rounded-full border border-accent/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.details && (
              <div className="mb-6 space-y-4">
                {project.details.problemStatement && (
                  <div>
                    <h4 className="text-xl font-semibold text-accent-glow mb-1">Problem Statement:</h4>
                    <p className="text-text-muted">{project.details.problemStatement}</p>
                  </div>
                )}
                {project.details.myRole && (
                  <div>
                    <h4 className="text-xl font-semibold text-accent-glow mb-1">My Role:</h4>
                    <p className="text-text-muted">{project.details.myRole}</p>
                  </div>
                )}
                {project.details.keyChallenges && (
                  <div>
                    <h4 className="text-xl font-semibold text-accent-glow mb-1">Key Challenges:</h4>
                    <ul className="list-disc list-inside text-text-muted space-y-1">
                      {project.details.keyChallenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.details.keyLearningsAndOutcomes && (
                  <div>
                    <h4 className="text-xl font-semibold text-accent-glow mb-1">Key Learnings & Outcomes:</h4>
                    <ul className="list-disc list-inside text-text-muted space-y-1">
                      {project.details.keyLearningsAndOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-start space-x-4 mt-6 border-t border-border pt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-300 transform hover:scale-105"
                >
                  <FaGithub className="mr-2" /> View Code
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent-glow text-white rounded-lg hover:bg-accent-glow/80 transition-colors duration-300 transform hover:scale-105"
                >
                  <FaExternalLinkAlt className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;