// src/components/BentoGrid.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import BentoCard from './BentoCard';
import LiveMetric from './LiveMetric';
import ProjectSimulation from './ProjectSimulation';
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

// Parse stat value to extract numeric and unit parts
const parseStatValue = (value: string): { numeric: string; unit: string } => {
    const match = value.match(/^([\d.]+)\s*(.*)$/);
    if (match) {
        return { numeric: match[1], unit: match[2] };
    }
    return { numeric: value, unit: '' };
};

// Magnetic Close Button
interface MagneticCloseButtonProps {
    onClose: () => void;
}

const MagneticCloseButton: React.FC<MagneticCloseButtonProps> = ({ onClose }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.button
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`
                absolute top-6 right-6 z-20 p-3 rounded-full transition-all duration-300
                backdrop-blur-md border
                ${isHovered
                    ? 'bg-red-500/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : 'bg-white/10 border-white/20'
                }
            `}
        >
            <FaTimes size={18} className={`transition-colors ${isHovered ? 'text-red-400' : 'text-white'}`} />
        </motion.button>
    );
};

// Expanded Card Component with Two-Column Layout
interface ExpandedCardProps {
    project: Project;
    onClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ project, onClose }) => {
    const variant = getVariant(project.title);

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
                className="fixed inset-4 md:inset-6 lg:inset-12 z-[70] bg-surface/95 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                {/* Grid Background Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Magnetic Close Button */}
                <MagneticCloseButton onClose={onClose} />

                {/* Content - Two Column Layout */}
                <div className="h-full overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        {/* Left Column - Content */}
                        <div className="p-8 md:p-12 lg:pr-8">
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
                                <p className="text-lg text-secondary/80 max-w-prose leading-relaxed">
                                    {project.description}
                                </p>
                            </motion.div>

                            {/* Live Metrics */}
                            {project.stats && project.stats.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-sm font-semibold text-secondary/60 uppercase tracking-wider mb-4">
                                        Live Metrics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {project.stats.map((stat) => {
                                            const { numeric, unit } = parseStatValue(stat.value);
                                            return (
                                                <LiveMetric
                                                    key={stat.label}
                                                    label={stat.label}
                                                    value={numeric}
                                                    unit={unit}
                                                />
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tech Stack */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="mb-8"
                            >
                                <h3 className="text-sm font-semibold text-secondary/60 uppercase tracking-wider mb-4">
                                    Technology Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-secondary hover:border-white/20 hover:text-primary transition-all"
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
                                className="flex flex-wrap gap-3"
                            >
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-primary text-sm hover:bg-white/20 transition-all"
                                    >
                                        <FaGithub size={16} />
                                        View Source
                                    </a>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm rounded-xl hover:bg-accent/90 transition-all"
                                    >
                                        <FaExternalLinkAlt size={14} />
                                        Live Demo
                                    </a>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column - Project Simulation */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                            className="p-8 md:p-12 lg:pl-8 flex items-center"
                        >
                            <div className="w-full h-full min-h-[300px] lg:min-h-0">
                                <ProjectSimulation type={variant} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

// Spotlight Border Card Wrapper
interface SpotlightCardProps {
    children: React.ReactNode;
    onClick: () => void;
    layoutId: string;
    isSelected: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, onClick, layoutId, isSelected }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={ref}
            layoutId={layoutId}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ opacity: isSelected ? 0 : 1 }}
            className="relative"
        >
            {/* Spotlight Border Effect */}
            <motion.div
                className="absolute -inset-px rounded-3xl pointer-events-none z-10"
                style={{
                    background: isHovered
                        ? `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(45,212,191,0.15), transparent 40%)`
                        : 'transparent',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s',
                }}
            />
            {children}
        </motion.div>
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
                        <SpotlightCard
                            key={project.title}
                            layoutId={`card-${generateId(project.title)}`}
                            onClick={() => handleCardClick(project)}
                            isSelected={isSelected}
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
                        </SpotlightCard>
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
