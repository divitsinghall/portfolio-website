// src/components/ProjectCard.tsx
import React, { useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { type Project } from '../data/portfolioData';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth physics springs for rotation
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Calculate rotation based on mouse position
  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.5deg)`;
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.5deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 20); // Strength of rotation
    y.set(yPct * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative h-full perspective-1000"
      onClick={() => onOpenModal(project)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass h-full rounded-2xl p-8 shadow-2xl flex flex-col group cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-accent/30">
        {/* Hover Glow Effect inside card */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container with 3D translation */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-heading font-bold text-white group-hover:text-accent-glow transition-colors duration-300">
              {project.title}
            </h3>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors duration-300 p-2 hover:bg-secondary/50 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>

          <p className="text-text-muted mb-6 flex-grow leading-relaxed font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/50 text-accent-glow text-xs font-medium rounded-full border border-accent/20 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;