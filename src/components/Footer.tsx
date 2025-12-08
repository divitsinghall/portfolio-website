// src/components/Footer.tsx
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { PortfolioData } from '../data/portfolioData';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12 mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left - Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-mono text-accent text-sm">
              // {PortfolioData.name}
            </div>
            <p className="text-secondary text-sm">
              {PortfolioData.role}
            </p>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-6">
            {PortfolioData.socials.github && (
              <a
                href={PortfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
            )}
            {PortfolioData.socials.linkedin && (
              <a
                href={PortfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
            )}
            {PortfolioData.socials.email && (
              <a
                href={`mailto:${PortfolioData.socials.email}`}
                className="text-secondary hover:text-success transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope size={22} />
              </a>
            )}
          </div>

          {/* Right - Version & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm">
            <span className="font-mono text-accent/70 text-xs">
              v{currentYear}.1.0
            </span>
            <p className="text-secondary/70">
              Built with precision
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-secondary/50 text-xs font-mono">
            &copy; {currentYear} {PortfolioData.name} • All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;