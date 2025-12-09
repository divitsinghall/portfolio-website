// src/sections/Skills.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaCode, FaCloud, FaCubes, FaBrain } from 'react-icons/fa';

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  delay?: number;
  command: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills, delay = 0, command }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="node-card"
  >
    {/* Category header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="text-accent">{icon}</div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>

    {/* Terminal command style */}
    <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
      <span className="text-accent">$</span>
      <span>{command}</span>
    </div>

    {/* Skills list */}
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + (index * 0.05) }}
          className="tech-tag"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  const categories = [
    {
      title: "Languages",
      icon: <FaCode size={20} />,
      skills: PortfolioData.skills.languages,
      command: "cat ~/.languages",
    },
    {
      title: "Cloud & DevOps",
      icon: <FaCloud size={20} />,
      skills: PortfolioData.skills.cloud_devops,
      command: "aws configure list",
    },
    {
      title: "Frameworks",
      icon: <FaCubes size={20} />,
      skills: PortfolioData.skills.frameworks,
      command: "npm list --depth=0",
    },
    {
      title: "AI / ML",
      icon: <FaBrain size={20} />,
      skills: PortfolioData.skills.ai_ml,
      command: "pip list | grep torch",
    },
  ];

  return (
    <section className="section-container bg-surface">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="Tech Stack"
          subtitle="Languages, cloud infrastructure, and AI/ML tools I work with."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              command={category.command}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;