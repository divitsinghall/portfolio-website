// src/data/portfolioData.ts

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  stats?: { label: string; value: string }[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  tech?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  major: string;
  duration: string;
  coursework?: string[];
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  refId: string;
  link: string;
}

export const PortfolioData = {
  name: "Divit Singhal",
  role: "Distributed Systems & AI Engineer",
  availability: "Incoming SDE @ Amazon",
  socials: {
    github: "https://github.com/divitsinghall",
    linkedin: "https://linkedin.com/in/divit-singhal",
    email: "divitsinghal2004@gmail.com",
    resume: "/Divit_Singhal_Resume.pdf"
  },
  hero: {
    tagline: "Architecting resilient distributed systems and scalable AI solutions.",
    subline: "Focused on high-concurrency engines, atomic consistency, and cloud-native orchestration."
  },
  skills: {
    languages: ["Java", "Python", "C/C++", "Go", "TypeScript", "Ruby", "C#"],
    infrastructure: ["AWS (Fargate, Lambda)", "Docker", "Kubernetes", "Redis", "gRPC"],
    frameworks: [".NET 8", "Ruby on Rails", "React", "Next.js", "Django", "Terraform"],
    concepts: ["Distributed Systems", "Atomic Consistency", "Microservices", "System Design"]
  },
  certifications: [
    {
      title: "Solutions Architect Associate",
      issuer: "AWS",
      date: "Dec 2028",
      refId: "SAA-C03",
      link: "https://www.credly.com/badges/46643584-ce6c-413b-8767-d5e92f8bd189/public_url"
    },
    {
      title: "Cloud Practitioner",
      issuer: "AWS",
      date: "Nov 2028",
      refId: "CLF-C02",
      link: "https://www.credly.com/badges/db2e02de-cbb9-49cf-ada3-6b6b6fede3de/public_url"
    }
  ] as Certification[],
  projects: [
    {
      title: "Titan Orchestrator",
      description: "A cloud-native distributed job scheduler architected on AWS Fargate. Features a custom VPC topology, bi-directional gRPC streams for real-time command-and-control, and a 'Master-Worker' pattern using Redis for state management.",
      techStack: [".NET 8", "gRPC", "AWS Fargate", "Redis", "Docker"],
      github: "https://github.com/divitsinghall",
      stats: [
        { label: "Architecture", value: "Master-Worker" },
        { label: "Protocol", value: "Bi-directional gRPC" }
      ]
    },
    {
      title: "FlashBurst",
      description: "High-concurrency flash-sale engine handling 5k+ req/s with zero inventory drift. Utilizes Redis Lua scripting for atomicity and an asynchronous write-behind pattern to decouple reservation from persistence.",
      techStack: ["Ruby on Rails", "Redis", "Sidekiq", "PostgreSQL"],
      github: "https://github.com/divitsinghall",
      stats: [
        { label: "Concurrency", value: "5,000+ req/s" },
        { label: "Latency", value: "<5ms" }
      ]
    },
    {
      title: "Forget Me Not Platform",
      description: "Layered companion platform with RBAC, identity management, and commerce pipelines. 100% test coverage on protected routes via Clerk sessions.",
      techStack: ["React Native", "Django", "AWS", "Stripe API"],
      github: "https://github.com/divitsinghall",
      stats: [
        { label: "Uptime", value: "99.9%" },
        { label: "Security", value: "RBAC" }
      ]
    }
  ] as Project[],
  experience: [
    {
      company: "Amazon",
      role: "Incoming SDE Intern (Auto Augmentation)",
      duration: "Fall 2026",
      location: "Vancouver, BC",
      description: ["Returning for a second internship with the Auto Augmentation Core Team."],
      tech: ["Java", "AWS"]
    },
    {
      company: "Amazon",
      role: "Software Development Engineer Intern",
      duration: "Summer 2025",
      location: "Vancouver, BC",
      description: [
        "Engineered an incident-diagnostics platform aggregating telemetry from 9,000+ microservices.",
        "Reduced p95 triage time by 44% (25m to 14m) and MTTR by 42%.",
        "Architected a pooled session manager reducing redundant calls by 30% during high-scale investigations.",
        "Integrated Amazon Q for historical incident matching, reducing RCA false starts by 35%."
      ],
      tech: ["Java", "AWS", "GenAI"]
    },
    {
      company: "University of Alberta",
      role: "Research Assistant",
      duration: "Jan 2025 - Apr 2025",
      location: "Edmonton, AB",
      description: [
        "Developed a semi-supervised CNN pipeline improving classification precision from 22% to 77%.",
        "Implemented LogMMSE denoising and fuzzy clustering (LAMDA 3π) with domain experts."
      ],
      tech: ["Python", "Deep Learning"]
    }
  ] as Experience[],
  education: [
    {
      institution: "University of Alberta",
      degree: "Bachelor of Science",
      major: "Computer Science - Artificial Intelligence",
      duration: "Sep 2022 – Dec 2026",
      coursework: [
        "Data Structures & Algorithms",
        "Distributed Systems",
        "Machine Learning",
        "Computer Vision",
        "Database Management"
      ]
    }
  ] as Education[],
  achievements: [
    {
      title: "Return Offer - Amazon",
      issuer: "Amazon",
      date: "Aug 2025",
      description: "Received a return offer for a second internship with the Auto Augmentation Core Team."
    },
    {
      title: "Tech Lead - Forget Me Not",
      issuer: "University of Alberta",
      date: "Sep 2025",
      description: "Led a team to architect and build a complex companion platform with React Native and AWS."
    }
  ] as Achievement[],
  stats: {
    microservices: "9,000+",
    p95Reduction: "44%",
    reqPerSec: "5,000+",
    mttrReduction: "42%"
  }
};