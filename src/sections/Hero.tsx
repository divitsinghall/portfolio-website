// src/sections/Hero.tsx
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { PortfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaChevronDown } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import TextScrambler from '../components/TextScrambler';
import MagneticButton from '../components/MagneticButton';

const Hero = () => {
  const roles = ['AI Engineer', 'Quant Developer', 'System Architect'];

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
      transition: { duration: 0.8, ease: 'easeOut' as const }
    },
  };

  return (
    <section className="min-h-screen bg-bg relative flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Top-centered Spotlight Effect - Apple Pro Style */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        style={{ filter: 'blur(120px)' }}
      />

      {/* Subtle secondary glow */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full pointer-events-none"
        style={{ filter: 'blur(100px)' }}
      />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Fade to black at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-5xl text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div variants={child} className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <span className="font-medium text-xs text-secondary uppercase tracking-wider">
                {PortfolioData.availability}
              </span>
            </div>
          </motion.div>

          {/* Massive Name Typography - Metallic Gradient */}
          <motion.h1
            variants={child}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 leading-[0.9]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              {PortfolioData.name.split(' ')[0]}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/70 to-white/40">
              {PortfolioData.name.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Text Scrambler for Roles - Refined Typography */}
          <motion.div variants={child} className="mb-12">
            <TextScrambler
              texts={roles}
              interval={3500}
              className="text-lg md:text-xl font-medium tracking-widest"
            />
          </motion.div>

          {/* Accent Line */}
          <motion.div
            variants={child}
            className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"
          />

          {/* Tagline */}
          <motion.p
            variants={child}
            className="text-base md:text-lg text-secondary/70 max-w-xl leading-relaxed mb-12"
          >
            {PortfolioData.hero.tagline}
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            variants={child}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <MagneticButton>
              <Link
                to="projects"
                smooth={true}
                duration={1000}
                className="cmd-button cursor-pointer inline-flex"
              >
                View Work
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href={PortfolioData.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                <HiDownload className="text-lg" />
                Resume
              </a>
            </MagneticButton>
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
              className="text-secondary/60 hover:text-primary transition-colors duration-300"
            >
              <FaGithub size={22} />
            </a>
            <a
              href={PortfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary/60 hover:text-accent transition-colors duration-300"
            >
              <FaLinkedin size={22} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <Link
          to="about"
          smooth={true}
          duration={1000}
          className="cursor-pointer text-secondary/30 hover:text-white/50 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <FaChevronDown size={20} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;