// src/sections/Skills.tsx
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaCode, FaCloud, FaCubes, FaBrain } from 'react-icons/fa';
import BlurFade from '../components/ui/BlurFade';
import type { ReactNode } from 'react';

interface SkillCategoryProps {
  title: string;
  icon: ReactNode;
  skills: string[];
  delay?: number;
  command: string;
  index: number;
}

// Stagger container for boot-sequence effect
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const SkillCategory = ({ title, icon, skills, delay = 0, command, index }: SkillCategoryProps) => (
  <BlurFade delay={delay + index * 0.1} inView>
    <div className="node-card h-full">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-accent">{icon}</div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>

      {/* Terminal command style - boot sequence feel */}
      <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
        <span className="text-success">$</span>
        <span className="text-accent">{command}</span>
        <span className="animate-pulse text-success">_</span>
      </div>

      {/* Skills list with staggered animation */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <motion.span
            key={skill}
            variants={staggerItem}
            className="tech-tag"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </BlurFade>
);

const Skills = () => {
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
        <BlurFade delay={0.1} inView>
          <SectionHeader
            title="Tech Stack"
            subtitle="Languages, cloud infrastructure, and AI/ML tools I work with."
          />
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              command={category.command}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;