// src/sections/About.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PortfolioData } from '../data/portfolioData';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to opacity for reveal effect
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [0.2, 0.6, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.4], [0.2, 0.6, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0.2, 0.6, 1]);

  const paragraphs = [
    `I'm a Computer Science student at the University of Alberta specializing in Artificial Intelligence, with deep expertise in distributed systems and high-performance computing.`,
    `My work at Amazon involved building incident diagnostics platforms that aggregate telemetry from 9,000+ microservices, significantly reducing triage times and MTTR.`,
    `I'm passionate about building systems that are not just functional, but resilient, scalable, and elegant. Whether it's designing zero-copy parsers for HFT or architecting master-worker patterns for distributed job scheduling, I focus on the details that matter at scale.`
  ];

  const opacities = [opacity1, opacity2, opacity3];

  return (
    <section
      ref={containerRef}
      className="section-container bg-bg min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-secondary/60 uppercase tracking-widest">
            About
          </span>
        </motion.div>

        {/* Main Content with Scroll Reveal */}
        <div className="space-y-8">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              style={{ opacity: opacities[index] }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight text-primary"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: PortfolioData.stats.microservices, label: "Microservices" },
              { value: PortfolioData.stats.p95Reduction, label: "P95 Reduction" },
              { value: PortfolioData.stats.reqPerSec, label: "Req/Second" },
              { value: PortfolioData.stats.mttrReduction, label: "MTTR Reduction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-secondary/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;