// src/sections/Leadership.tsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { FaCheckCircle } from 'react-icons/fa';

const Leadership: React.FC = () => {
    const lead = PortfolioData.leadership[0];

    return (
        <section className="section-container bg-bg" id="leadership">
            <div className="container mx-auto px-6 max-w-5xl">
                <SectionHeader
                    title="Leadership"
                    subtitle="Active projects where I'm driving end-to-end delivery."
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="node-card border-accent/30 relative overflow-hidden"
                >
                    {/* Active status indicator */}
                    <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                            </span>
                            <span className="font-mono text-xs text-success tracking-widest uppercase">Active</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column - Role info */}
                        <div className="lg:w-1/3">
                            <h3 className="text-2xl font-bold text-primary mb-2">{lead.role}</h3>
                            <p className="text-accent font-mono text-sm mb-2">{lead.project}</p>
                            <p className="text-secondary text-sm mb-6">{lead.duration}</p>

                            <div className="bg-bg p-4 rounded-lg border border-border">
                                <p className="font-mono text-xs text-secondary uppercase tracking-wider mb-2">
                  // Scope
                                </p>
                                <p className="text-primary text-sm">
                                    End-to-end MVP delivery, Architecture, Client Negotiations
                                </p>
                            </div>
                        </div>

                        {/* Right column - Description & Achievements */}
                        <div className="lg:w-2/3 lg:border-l lg:border-border lg:pl-8">
                            <p className="text-secondary mb-6 leading-relaxed">
                                {lead.description}
                            </p>

                            <div className="font-mono text-xs text-secondary uppercase tracking-wider mb-4">
                // Key Achievements
                            </div>

                            <ul className="space-y-4">
                                {lead.keyAchievements.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <FaCheckCircle className="text-accent mt-1 flex-shrink-0" size={14} />
                                        <span className="text-primary/90 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Leadership;
