// src/components/BentoGrid.tsx
import React from 'react';
import BentoCard from './BentoCard';

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

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {sortedProjects.map((project, index) => {
                const variant = getVariant(project.title);
                // First project (Chronos-ITCH) is large
                const size = index === 0 ? 'large' : 'medium';

                return (
                    <BentoCard
                        key={project.title}
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
                );
            })}
        </div>
    );
};

export default BentoGrid;
