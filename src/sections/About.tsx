// src/sections/About.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaLaptopCode } from 'react-icons/fa';

// Reusable Bento Card Component with animation support
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={`bg-secondary/50 backdrop-blur-md border border-border rounded-2xl p-6 
      hover:border-accent/30 hover:bg-secondary/80 transition-all duration-300 
      hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group relative overflow-hidden ${className}`}
  >
    {/* Subtle gradient gloss effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
);

const About: React.FC = () => {
  // Extract the incoming role for the "featured" card
  const incomingRole = PortfolioData.experience.find(exp => exp.duration.includes("Incoming")) || PortfolioData.experience[0];

  return (
    <section className="py-24 bg-primary relative">
      <div className="container mx-auto px-4">
        <SectionHeader title="About Me" subtitle="A glimpse into my world, stats, and passion." />

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">

          {/* 1. Main Bio Block (Spans 2 cols) */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-center min-h-[300px]">
            <div className="flex items-center gap-3 mb-4 text-accent-glow">
              <FaLaptopCode size={24} />
              <h3 className="text-xl font-bold">The Developer</h3>
            </div>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              {PortfolioData.about.bio}
            </p>
            <div className="flex flex-wrap gap-3 mt-auto">
              {PortfolioData.about.highlights.map((highlight, i) => (
                <span key={i} className="text-xs font-medium bg-primary/30 text-accent-glow px-3 py-1 rounded-full border border-accent/20">
                  {highlight}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* 2. Avatar Block */}
          <BentoCard className="flex items-center justify-center p-0 overflow-hidden bg-secondary/30" delay={0.1}>
            <img
              src={PortfolioData.about.avatarUrl}
              alt={PortfolioData.name}
              className="w-full h-full object-cover min-h-[250px] opacity-90 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-bold text-xl">{PortfolioData.name}</p>
              <p className="text-accent-glow text-sm">{PortfolioData.title.split('&')[0]}</p>
            </div>
          </BentoCard>

          {/* 3. Stats Block (Education/GPA) */}
          <BentoCard className="flex flex-col justify-center items-center text-center" delay={0.2}>
            <div className="mb-2 p-3 bg-accent/10 rounded-full text-accent">
              {/* Assuming University of Alberta is the focus */}
              <span className="text-2xl font-bold">3rd</span>
            </div>
            <span className="text-3xl font-bold text-white mb-1">Year</span>
            <span className="text-sm text-text-muted uppercase tracking-wider">CS Student @ UofA</span>
          </BentoCard>

          {/* 4. Featured Tech Stack Block */}
          <BentoCard className="flex flex-col justify-between" delay={0.3}>
            <div className="flex items-center gap-2 text-accent-glow mb-4">
              <FaCode />
              <h4 className="font-bold uppercase text-sm tracking-wider">Core Arsenal</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Taking top 6 skills manually or slicing the array */}
              {['Java', 'Python', 'React', 'AWS', 'Django', 'PostgreSQL'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-secondary text-text-muted text-xs font-mono rounded border border-border hover:border-accent-glow/50 hover:text-accent-glow transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* 5. "Next Up" Block (Incoming Role) */}
          <BentoCard className="bg-gradient-to-br from-accent/20 to-accent-glow/20 border-accent/20" delay={0.4}>
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-text-muted text-xs uppercase font-bold mb-1">Next Adventure</h4>
                  <h3 className="text-xl font-bold text-white">{incomingRole.company}</h3>
                </div>
                <FaRocket className="text-yellow-400 text-xl animate-pulse" />
              </div>

              <div className="mt-4">
                <p className="text-accent-glow text-sm font-medium">{incomingRole.title}</p>
                <p className="text-text-muted text-xs mt-1">{incomingRole.duration}</p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default About;