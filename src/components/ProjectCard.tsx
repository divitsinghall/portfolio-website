// src/components/ProjectCard.tsx
import React, { useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { type Project } from '../data/portfolioData';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for gradient glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse position values for 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Smooth physics springs for rotation (max 5 degrees)
  const springConfig = { stiffness: 150, damping: 20 };
  const mouseXSpring = useSpring(tiltX, springConfig);
  const mouseYSpring = useSpring(tiltY, springConfig);

  // Calculate rotation based on mouse position (constrained to 5 degrees)
  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -1deg)`;
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 1deg)`;

  // Holographic gradient that follows cursor (600px radius, 15% opacity accent)
  const glowBackground = useMotionTemplate`
    radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 40%)
  `;

  // Border glow that follows cursor
  const borderGlow = useMotionTemplate`
    radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.4), transparent 40%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update gradient position
    mouseX.set(x);
    mouseY.set(y);

    // Calculate tilt (constrained to max 5 degrees)
    const xPct = (x / width - 0.5) * 5;
    const yPct = (y / height - 0.5) * 5;

    tiltX.set(xPct);
    tiltY.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
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
      {/* Border glow layer */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          background: borderGlow,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Card container */}
      <div className="relative h-full rounded-2xl bg-surface/80 backdrop-blur-sm border border-border/50 p-8 shadow-2xl flex flex-col group cursor-pointer overflow-hidden transition-all duration-500 hover:border-accent/30">

        {/* Holographic glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: glowBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Grid pattern reveal on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content Container with 3D translation */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300 p-2 hover:bg-accent/10 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>

          <p className="text-secondary mb-6 flex-grow leading-relaxed font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-surface/80 text-accent text-xs font-mono rounded-full border border-accent/20 backdrop-blur-sm"
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