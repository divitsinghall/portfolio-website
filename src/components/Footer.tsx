// src/components/Footer.tsx
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { PortfolioData } from '../data/portfolioData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-text-muted py-8 border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {PortfolioData.socialLinks.github && (
            <a
              href={PortfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
          )}
          {PortfolioData.socialLinks.linkedin && (
            <a
              href={PortfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          )}
          {PortfolioData.email && (
            <a
              href={`mailto:${PortfolioData.email}`}
              className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110"
              aria-label="Email"
            >
              <FaEnvelope size={28} />
            </a>
          )}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {PortfolioData.name}. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-text-muted/70">
          Designed and built with <span className="text-accent-glow">♥</span> by a professional frontend engineer.
        </p>
      </div>
    </footer>
  );
};

export default Footer;