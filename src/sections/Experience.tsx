// src/sections/Experience.tsx
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import BlurFade from '../components/ui/BlurFade';

interface ExperienceItemProps {
  experience: typeof PortfolioData.experience[0];
  index: number;
  isLast: boolean;
}

// Stagger animation for timeline items
const timelineItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const ExperienceItem = ({ experience, index, isLast }: ExperienceItemProps) => (
  <motion.div
    custom={index}
    variants={timelineItemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="relative pl-8 pb-12 last:pb-0"
  >
    {/* Timeline line */}
    {!isLast && (
      <motion.div
        className="absolute left-[5px] top-3 h-full w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        style={{ transformOrigin: 'top' }}
      />
    )}

    {/* Timeline node */}
    <motion.div
      className="absolute left-0 top-1.5 w-3 h-3 bg-accent rounded-full border-2 border-bg shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 + 0.1, duration: 0.3, type: "spring" }}
    />

    {/* Content card */}
    <div className="node-card ml-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent font-medium">{experience.company}</span>
            <span className="text-secondary/50">•</span>
            <span className="text-secondary text-sm">{experience.location}</span>
          </div>
        </div>

        {/* Duration badge */}
        <span className="stat-badge shrink-0">
          <span className="stat-value font-mono">{experience.duration}</span>
        </span>
      </div>

      {/* Description points */}
      <ul className="space-y-3 mb-4">
        {experience.description.map((point, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-secondary text-sm leading-relaxed"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 + i * 0.05 }}
          >
            <span className="text-accent mt-1.5">›</span>
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>

      {/* Tech tags */}
      {experience.tech && experience.tech.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <span key={tech} className="tech-tag font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <section className="section-container bg-surface">
      <div className="container mx-auto px-6 max-w-4xl">
        <BlurFade delay={0.1} inView>
          <SectionHeader
            title="Runtime Log"
            subtitle="Professional experience and internships."
          />
        </BlurFade>

        <div className="relative">
          {PortfolioData.experience.map((exp, index) => (
            <ExperienceItem
              key={`${exp.company}-${exp.role}`}
              experience={exp}
              index={index}
              isLast={index === PortfolioData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;