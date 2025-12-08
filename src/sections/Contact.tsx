import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <SectionHeader title="Get In Touch" subtitle="Let's connect and build something amazing together." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-heading font-bold text-white">
              Let's talk about <span className="text-accent">your next project</span>
            </h3>
            <p className="text-text-muted text-lg leading-relaxed">
              I am currently open to internships and co-op opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${PortfolioData.email}`}
                className="glass p-6 rounded-2xl flex items-center gap-6 group hover:bg-secondary/30 transition-all duration-300 border border-border hover:border-accent/30"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email Me</h4>
                  <p className="text-text-muted group-hover:text-accent-glow transition-colors">{PortfolioData.email}</p>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-4">
                {PortfolioData.socialLinks.linkedin && (
                  <a
                    href={PortfolioData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:bg-secondary/30 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <FaLinkedin size={32} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
                    <span className="text-text-muted group-hover:text-white font-medium">LinkedIn</span>
                  </a>
                )}

                {PortfolioData.socialLinks.github && (
                  <a
                    href={PortfolioData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:bg-secondary/30 border border-border hover:border-white/30 transition-all duration-300"
                  >
                    <FaGithub size={32} className="text-text-muted group-hover:text-white transition-colors duration-300" />
                    <span className="text-text-muted group-hover:text-white font-medium">GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Visual Only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-primary/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder-text-muted/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-primary/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder-text-muted/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-primary/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder-text-muted/50 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="button"
                onClick={() => window.location.href = `mailto:${PortfolioData.email}`}
                className="w-full py-4 bg-gradient-to-r from-accent to-accent-glow hover:from-accent-glow hover:to-accent text-white font-bold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;