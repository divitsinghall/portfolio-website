// src/sections/Hero.tsx
import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { PortfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaFileDownload, FaChevronDown, FaShieldAlt } from 'react-icons/fa';

const Hero: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="min-h-screen bg-bg relative flex flex-col justify-center px-6 pt-20 overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg pointer-events-none" />

      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* System Status Badge */}
          <motion.div variants={child} className="mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface border border-border rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                {PortfolioData.availability}
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={child}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary tracking-tight mb-6"
          >
            {PortfolioData.name}
          </motion.h1>

          {/* Role subtitle */}
          <motion.div variants={child} className="mb-8">
            <span className="font-mono text-accent text-lg md:text-xl">
              {PortfolioData.role}
            </span>
          </motion.div>

          {/* Accent line */}
          <motion.div
            variants={child}
            className="h-px w-24 bg-gradient-to-r from-accent to-transparent mb-8"
          />

          {/* Tagline */}
          <motion.p
            variants={child}
            className="text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-4"
          >
            {PortfolioData.hero.tagline}
          </motion.p>

          <motion.p
            variants={child}
            className="text-base md:text-lg text-secondary/60 max-w-2xl leading-relaxed mb-10"
          >
            {PortfolioData.hero.subline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={child}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link
              to="projects"
              smooth={true}
              duration={800}
              className="cmd-button cursor-pointer"
            >
              ~/view_projects
            </Link>

            <a
              href={PortfolioData.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <FaFileDownload />
              DOWNLOAD_RESUME
            </a>
          </motion.div>

          {/* Credentials / Certifications */}
          <motion.div variants={child} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <FaShieldAlt className="text-accent/60" size={14} />
              <span className="font-mono text-xs text-secondary/60 uppercase tracking-wider">
                Verified Credentials
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {PortfolioData.certifications.map((cert) => (
                <a
                  key={cert.refId}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg font-mono text-xs
                           hover:border-accent hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
                >
                  <span className="text-warning font-semibold">{cert.issuer}</span>
                  <span className="text-secondary/40">::</span>
                  <span className="text-secondary group-hover:text-primary transition-colors">{cert.refId}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={child}
            className="flex items-center gap-6"
          >
            <a
              href={PortfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={PortfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Code Block */}
      <div className="absolute right-8 top-1/3 opacity-[0.03] hidden xl:block font-mono text-sm text-primary select-none">
        <pre className="leading-relaxed">{`class TitanOrchestrator {
  private readonly _master: IMasterNode;
  private readonly _redis: IStateManager;
  
  async executeJob(job: Job): Promise<void> {
    const worker = await this._master.assign(job);
    await worker.execute();
  }
}`}</pre>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Link
          to="about"
          smooth={true}
          duration={800}
          className="cursor-pointer text-secondary/40 hover:text-accent transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaChevronDown size={24} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;