// src/sections/Hero.tsx
import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { PortfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';

const Hero: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" as const }
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-accent-glow/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={child} className="mb-6 relative inline-block">
            <span className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent-glow text-sm font-medium tracking-wide uppercase backdrop-blur-sm">
              Available for work
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
          </motion.div>

          <motion.h2 variants={child} className="text-accent-glow font-medium text-xl mb-4 tracking-wider">
            Hello, I'm
          </motion.h2>

          <motion.h1 variants={child} className="text-7xl md:text-9xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 mb-6 tracking-tight drop-shadow-2xl">
            {PortfolioData.name}
          </motion.h1>

          <motion.h3 variants={child} className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-glow mb-8 font-light">
            {PortfolioData.title}
          </motion.h3>

          <motion.p variants={child} className="text-text-muted max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed font-light">
            {PortfolioData.tagline}
          </motion.p>

          <motion.div variants={child} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="projects"
              smooth={true}
              duration={800}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-accent to-accent-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            {PortfolioData.socialLinks.resumePdf && (
              <a
                href={PortfolioData.socialLinks.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-white border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <FaFileDownload />
                <span>Resume</span>
              </a>
            )}
          </motion.div>

          <motion.div variants={child} className="flex justify-center gap-8 mt-16 text-text-muted">
            <a href={PortfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300">
              <FaGithub size={32} />
            </a>
            <a href={PortfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:scale-110 transition-all duration-300">
              <FaLinkedin size={32} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;