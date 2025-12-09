// src/sections/Contact.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';

const Contact: React.FC = () => {
  const contactLinks = [
    {
      icon: <FaEnvelope size={24} />,
      label: "Email",
      value: PortfolioData.socials.email,
      href: `mailto:${PortfolioData.socials.email}`,
      command: `mailto:${PortfolioData.socials.email}`,
    },
    {
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn",
      value: "divit-singhal",
      href: PortfolioData.socials.linkedin,
      command: "connect --protocol=linkedin",
    },
    {
      icon: <FaGithub size={24} />,
      label: "GitHub",
      value: "divitsinghall",
      href: PortfolioData.socials.github,
      command: "git clone career://divitsinghall",
    },
  ];

  return (
    <section className="section-container bg-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeader
          title="Establish Connection"
          subtitle="Ready to build something resilient together?"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="node-card">
              <h3 className="text-xl font-bold text-primary mb-4">
                Let's connect
              </h3>
              <p className="text-secondary leading-relaxed mb-6">
                I'm currently open to internship and co-op opportunities.
                Whether you have a question about distributed systems,
                want to discuss a project, or just want to say hi —
                feel free to reach out.
              </p>

              {/* Terminal-style availability */}
              <div className="bg-bg rounded-lg border border-border p-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-accent">$</span>
                  <span>check --availability</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-success">
                    Status: Available for intern opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${PortfolioData.socials.email}`}
                className="primary-button"
              >
                <FaEnvelope />
                Send Message
              </a>
              <a
                href={PortfolioData.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="cmd-button"
              >
                View Resume
              </a>
            </div>
          </motion.div>

          {/* Right - Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="node-card flex items-center gap-4 group cursor-pointer"
              >
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 bg-surface rounded-lg border border-border flex items-center justify-center text-secondary group-hover:text-accent group-hover:border-accent/50 transition-all">
                  {link.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-primary font-medium group-hover:text-accent transition-colors">
                    {link.label}
                  </div>
                  <div className="font-mono text-xs text-secondary truncate">
                    {link.command}
                  </div>
                </div>

                {/* Arrow */}
                <FaArrowRight className="text-secondary/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;