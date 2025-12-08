// src/sections/About.tsx
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { PortfolioData } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { FaServer, FaClock, FaBolt, FaShieldAlt } from 'react-icons/fa';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="node-card text-center"
  >
    <div className="text-accent mb-3">{icon}</div>
    <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-mono">
      {value}
    </div>
    <div className="text-sm text-secondary uppercase tracking-wider">
      {label}
    </div>
  </motion.div>
);

const About: React.FC = () => {
  const stats = [
    {
      icon: <FaServer size={28} />,
      value: PortfolioData.stats.microservices,
      label: "Microservices Monitored"
    },
    {
      icon: <FaClock size={28} />,
      value: PortfolioData.stats.p95Reduction,
      label: "P95 Triage Reduction"
    },
    {
      icon: <FaBolt size={28} />,
      value: PortfolioData.stats.reqPerSec,
      label: "Requests / Second"
    },
    {
      icon: <FaShieldAlt size={28} />,
      value: PortfolioData.stats.mttrReduction,
      label: "MTTR Reduction"
    },
  ];

  return (
    <section className="section-container bg-bg">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title="System Overview"
          subtitle="Engineering metrics from production systems and real-world impact."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="node-card"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Terminal-style profile */}
            <div className="lg:w-1/3">
              <div className="bg-bg rounded-lg border border-border overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-secondary">profile.json</span>
                </div>

                {/* Terminal content */}
                <div className="p-4 font-mono text-sm">
                  <div className="text-secondary">{"{"}</div>
                  <div className="pl-4">
                    <span className="text-accent">"name"</span>
                    <span className="text-secondary">: </span>
                    <span className="text-success">"{PortfolioData.name}"</span>
                    <span className="text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-accent">"role"</span>
                    <span className="text-secondary">: </span>
                    <span className="text-success">"{PortfolioData.role}"</span>
                    <span className="text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-accent">"status"</span>
                    <span className="text-secondary">: </span>
                    <span className="text-success">"{PortfolioData.availability}"</span>
                    <span className="text-secondary">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-accent">"location"</span>
                    <span className="text-secondary">: </span>
                    <span className="text-success">"Edmonton, AB"</span>
                  </div>
                  <div className="text-secondary">{"}"}</div>
                </div>
              </div>
            </div>

            {/* Bio section */}
            <div className="lg:w-2/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                The Engineer
              </h3>
              <p className="text-secondary leading-relaxed mb-6">
                I'm a Computer Science student at the University of Alberta specializing in
                Artificial Intelligence, with deep expertise in distributed systems and
                high-performance computing. My work at Amazon involved building incident
                diagnostics platforms that aggregate telemetry from 9,000+ microservices,
                significantly reducing triage times and MTTR.
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                I'm passionate about building systems that are not just functional, but
                resilient, scalable, and elegant. Whether it's designing atomic consistency
                guarantees for flash-sale engines or architecting master-worker patterns
                for distributed job scheduling, I focus on the details that matter at scale.
              </p>

              {/* Quick highlights */}
              <div className="flex flex-wrap gap-3">
                <span className="stat-badge">
                  <span className="text-secondary">Education:</span>
                  <span className="stat-value">3rd Year CS @ UofA</span>
                </span>
                <span className="stat-badge">
                  <span className="text-secondary">Focus:</span>
                  <span className="stat-value">AI & Distributed Systems</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;