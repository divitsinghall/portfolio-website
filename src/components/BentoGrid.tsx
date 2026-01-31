// src/components/BentoGrid.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
    title: string;
    description: string;
    techStack: string[];
    github?: string;
    link?: string;
    stats?: { label: string; value: string }[];
}

interface BentoGridProps {
    projects: Project[];
}

const getVariant = (title: string): 'chronos' | 'titan' | 'ezygut' | 'default' => {
    const lower = title.toLowerCase();
    if (lower.includes('chronos')) return 'chronos';
    if (lower.includes('titan')) return 'titan';
    if (lower.includes('ezy') || lower.includes('gut')) return 'ezygut';
    return 'default';
};

// Generate unique ID for layoutId
const generateId = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

// Expanded Card Component
interface ExpandedCardProps {
    project: Project;
    onClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ project, onClose }) => {

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent body scroll when expanded
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Expanded Card */}
            <motion.div
                layoutId={`card-${generateId(project.title)}`}
                className="fixed inset-4 md:inset-8 lg:inset-16 z-[70] bg-surface/95 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                    <FaTimes size={18} className="text-white" />
                </motion.button>

                {/* Content */}
                <div className="h-full overflow-y-auto p-8 md:p-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
                            {project.title}
                        </h2>
                        <p className="text-xl text-secondary/80 max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    {project.stats && project.stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                        >
                            {project.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                                >
                                    <div className="text-secondary/60 text-sm mb-1">{stat.label}</div>
                                    <div
                                        className="text-2xl font-bold text-teal-400"
                                        style={{
                                            textShadow: '0 0 20px rgba(45,212,191,0.5)',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mb-8"
                    >
                        <h3 className="text-lg font-semibold text-primary mb-4">Technology Stack</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-secondary hover:border-white/20 hover:text-primary transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4"
                    >
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-primary hover:bg-white/20 transition-all"
                            >
                                <FaGithub size={18} />
                                View Source
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all"
                            >
                                <FaExternalLinkAlt size={16} />
                                Live Demo
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Sort projects to prioritize featured ones
    const sortedProjects = [...projects].sort((a, b) => {
        const priorityOrder = ['Chronos-ITCH', 'Titan Orchestrator', 'EzyGut'];
        const aIndex = priorityOrder.findIndex(p => a.title.includes(p.split(' ')[0]));
        const bIndex = priorityOrder.findIndex(p => b.title.includes(p.split(' ')[0]));
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
    });

    const handleCardClick = useCallback((project: Project) => {
        setSelectedProject(project);
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProject(null);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {sortedProjects.map((project, index) => {
                    const variant = getVariant(project.title);
                    const size = index === 0 ? 'large' : 'medium';
                    const isSelected = selectedProject?.title === project.title;

                    return (
                        <motion.div
                            key={project.title}
                            layoutId={`card-${generateId(project.title)}`}
                            onClick={() => handleCardClick(project)}
                            style={{ opacity: isSelected ? 0 : 1 }}
                        >
                            <BentoCard
                                title={project.title}
                                description={project.description}
                                techStack={project.techStack}
                                github={project.github}
                                link={project.link}
                                stats={project.stats}
                                variant={variant}
                                size={size}
                                index={index}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Card Portal */}
            <AnimatePresence>
                {selectedProject && (
                    <ExpandedCard
                        project={selectedProject}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default BentoGrid;
