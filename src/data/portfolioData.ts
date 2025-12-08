// src/data/portfolioData.ts

export interface Skill {
  name: string;
  category: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Project {
  title: string;
  description: string;
  fullDescription?: string; // For modal
  techStack: string[];
  githubLink?: string;
  liveDemoLink?: string;
  details?: {
    problemStatement?: string;
    myRole?: string;
    keyChallenges?: string[];
    keyLearningsAndOutcomes?: string[];
  };
}

export interface ExperienceEntry {
  title: string;
  company: string;
  location?: string;
  duration: string;
  descriptionPoints: string[];
  type: 'Work' | 'Research' | 'Leadership';
}

export interface EducationEntry {
  institution: string;
  degree: string;
  major: string;
  duration: string;
  gpa?: string;
  relevantCoursework?: string[];
  awards?: string[]; // Academic awards
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  socialLinks: {
    linkedin: string;
    github: string;
    resumePdf?: string;
  };
  about: {
    bio: string;
    avatarUrl?: string;
    highlights: string[];
  };
  skills: Skill[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  achievements: Achievement[];
  interests: string[]; // For typewriter effect
}

export const PortfolioData: PortfolioData = {
  name: "Divit Singhal",
  title: "3rd-Year Computer Science Student & Aspiring Software Engineer",
  tagline: "Bridging complex challenges with robust, scalable software solutions, driven by a passion for AI and impactful development.",
  email: "divitsinghal2004@gmail.com",
  phone: "+1-780-318-2779",
  socialLinks: {
    linkedin: "https://linkedin.com/in/divit-singhal",
    github: "https://github.com/divitsinghall",
    resumePdf: "/Divit_Singhal_Resume.pdf",
  },
  about: {
    bio: `I am a driven 3rd-year Computer Science student at the University of Alberta, specializing in Artificial Intelligence. My experience spans full-stack development, machine learning research, and leading impactful projects. I thrive on building production-quality software, optimizing systems, and leveraging AI to solve real-world problems. With internships at Amazon and research roles, I've honed my skills in everything from incident diagnostics to bioacoustic signal processing and robust API design. I'm eager to apply my expertise to challenging internships and co-op opportunities.`,
    avatarUrl: "https://ui-avatars.com/api/?name=Divit+Singhal&background=0D8ABC&color=fff&size=256", // Auto-generated initials avatar
    highlights: [
      "3rd Year CS @ University of Alberta",
      "Specializing in Artificial Intelligence",
      "Incoming SDE Intern @ Amazon",
      "Open to internships / co-ops",
    ],
  },
  skills: [
    // Languages
    { name: "Java", category: "Languages", proficiency: "Advanced" },
    { name: "Python", category: "Languages", proficiency: "Advanced" },
    { name: "C/C++", category: "Languages", proficiency: "Intermediate" },
    { name: "JavaScript", category: "Languages", proficiency: "Advanced" },
    { name: "TypeScript", category: "Languages", proficiency: "Advanced" },

    // Frameworks
    { name: "React", category: "Frameworks & Libraries", proficiency: "Advanced" },
    { name: "Node.js", category: "Frameworks & Libraries", proficiency: "Intermediate" },
    { name: "Next.js", category: "Frameworks & Libraries", proficiency: "Intermediate" },
    { name: "Flask", category: "Frameworks & Libraries", proficiency: "Intermediate" },
    { name: "Django", category: "Frameworks & Libraries", proficiency: "Advanced" },
    { name: "Tailwind CSS", category: "Frameworks & Libraries", proficiency: "Advanced" },

    // ML
    { name: "PyTorch", category: "Machine Learning", proficiency: "Intermediate" },
    { name: "TensorFlow", category: "Machine Learning", proficiency: "Intermediate" },
    { name: "scikit-learn", category: "Machine Learning", proficiency: "Advanced" },
    { name: "NumPy", category: "Machine Learning", proficiency: "Advanced" },
    { name: "pandas", category: "Machine Learning", proficiency: "Advanced" },

    // Tools & Systems
    { name: "Linux/Unix", category: "Systems & Tools", proficiency: "Advanced" },
    { name: "Git", category: "Systems & Tools", proficiency: "Advanced" },
    { name: "Docker", category: "Systems & Tools", proficiency: "Intermediate" },
    { name: "JUnit", category: "Systems & Tools", proficiency: "Advanced" },
    { name: "PostgreSQL", category: "Databases", proficiency: "Advanced" },
    { name: "MongoDB", category: "Databases", proficiency: "Intermediate" },
    { name: "Kubernetes", category: "DevOps & Cloud", proficiency: "Beginner" },
    { name: "Figma", category: "Systems & Tools", proficiency: "Intermediate" },

    // Cloud
    { name: "AWS", category: "Cloud", proficiency: "Intermediate" },
    { name: "GCP", category: "Cloud", proficiency: "Beginner" },
    { name: "Azure", category: "Cloud", proficiency: "Beginner" },
  ],
  projects: [
    {
      title: "Forget Me Not Companion Platform",
      description: "Architected and led a layered companion platform, implementing identity, authorization, API hardening, scheduling, and commerce pipelines.",
      fullDescription: "Architected and led a layered companion platform, measured by a React Native client exchanging JSON with versioned Django REST Framework (DRF) APIs over Django ORM → PostgreSQL running on AWS. I defined Presentation/Business/Persistence/Database boundaries and implemented DRF viewsets/serializers. I implemented identity, authorization, and API hardening, achieving 100% protected routes via Clerk sessions and RBAC with automated tests. Additionally, I built end-to-end scheduling and commerce pipelines and integrated safety services like Google Maps (geofencing/SOS) and Expo Push.",
      techStack: ["React Native", "Django", "PostgreSQL", "Stripe API", "AWS", "DRF"],
      githubLink: "https://github.com/divitsinghall", 
      liveDemoLink: "#", 
      details: {
        problemStatement: "To build a robust, scalable companion platform requiring complex backend logic for user management, scheduling, payments, and safety service integrations.",
        myRole: "Tech Lead: Architectural design, backend implementation, API security, and third-party integrations.",
        keyChallenges: [
          "Designing a clear layered architecture for maintainability.",
          "Implementing robust authentication and RBAC with Clerk.",
          "Handling complex state transitions for scheduling and payments.",
          "Integrating multiple external APIs (Certn, Google Maps, Resend) reliably."
        ],
        keyLearningsAndOutcomes: [
          "Mastered Django REST Framework and AWS deployment.",
          "Developed leadership skills by guiding the project from concept to operation.",
          "Successfully implemented identity management and secure commerce workflows.",
          "Ensured system reliability through audit logs and CI/CD pipelines."
        ]
      }
    },
    {
      title: "Rodent Vocalization Classifier",
      description: "Developed a semi-supervised CNN and active learning pipeline to classify rodent vocalizations from a 47,000+ audio file dataset.",
      fullDescription: "Developed a semi-supervised CNN and active learning pipeline classifying rodent vocalizations from a 47,000+ audio file dataset, improving precision and recall from 22% to 77%. Engineered advanced preprocessing (ultrasonic frequency filtering at 17–40 kHz, LogMMSE denoising) to isolate bioacoustic signals. Implemented fuzzy clustering (LAMDA 3π) and constrained K-means with domain-expert guidance. Designed an iterative active learning framework using entropy-based uncertainty sampling, significantly reducing labeling effort.",
      techStack: ["Python", "TensorFlow", "scikit-learn", "NumPy", "Audio Processing"],
      githubLink: "https://github.com/divitsinghall", 
      details: {
        problemStatement: "Manual labeling of large bioacoustic datasets is inefficient; needed a semi-supervised approach to classify rodent vocalizations accurately.",
        myRole: "Research Assistant: Designed and implemented the ML pipeline and active learning strategy.",
        keyChallenges: [
          "Processing a massive dataset (47k+ files) efficiently.",
          "Denoising ultrasonic audio signals to extract features.",
          "Minimizing manual labeling while maintaining high accuracy.",
          "Integrating expert feedback into the learning loop."
        ],
        keyLearningsAndOutcomes: [
          "Improved precision and recall to 77% from a baseline of 22%.",
          "Deepened knowledge of CNNs and audio signal processing.",
          "Successfully applied active learning to real-world scientific data.",
          "Enhanced model generalization through entropy-based sampling."
        ]
      }
    },
    {
      title: "AI-Driven Financial Advice Platform",
      description: "Integrated OpenAI's GPT-4 for personalized financial insights, designed a responsive UI, and ensured secure data handling.",
      fullDescription: "Integrated AI-driven financial advice using OpenAI’s GPT-4 model, providing personalized insights on spending and saving. Designed a responsive UI ensuring seamless user experience, enhancing user satisfaction and reducing bounce rates. Integrated data storage and API for secure handling of financial data, ensuring compliance with security standards. Enabled real-time financial health scoring, offering dynamic suggestions leading to better financial habits.",
      techStack: ["React", "OpenAI API", "Node.js", "Secure API", "Finance Tech"],
      githubLink: "https://github.com/divitsinghall",
      details: {
        problemStatement: "Users need accessible, personalized financial advice without the high cost of human advisors.",
        myRole: "Research & Analytics Intern: UI Design, API Integration, and Security implementation.",
        keyChallenges: [
          "Seamlessly integrating GPT-4 for real-time responses.",
          "Ensuring strict security standards for financial data.",
          "Creating an intuitive UI to visualize financial health scores."
        ],
        keyLearningsAndOutcomes: [
          "Successfully delivered personalized insights using LLMs.",
          "Enhanced user engagement through a responsive, secure interface.",
          "Implemented real-time scoring algorithms for financial health."
        ]
      }
    }
  ],
  experience: [
    {
      title: "Software Development Engineer Intern",
      company: "Amazon",
      location: "Vancouver, BC",
      duration: "May 2026 – August 2026 (Incoming)",
      type: "Work",
      descriptionPoints: [
        "Incoming return SDE intern with the Auto Augmentation Core Team."
      ]
    },
    {
      title: "Software Development Engineer Intern",
      company: "Amazon",
      location: "Vancouver, BC",
      duration: "May 2025 – August 2025",
      type: "Work",
      descriptionPoints: [
        "Owned an incident-diagnostics platform end-to-end, cutting p95 triage time by 44% (25→14 min) and MTTR by 42% (3.1h→1.8h) by aggregating telemetry from 6+ APIs / 9,000+ microservices.",
        "Invented and Simplified request handling via a pooled session manager, boosting API throughput and trimming redundant calls by 30%.",
        "Integrated Amazon Q 'known-issue' surfacing, reducing false starts in Root Cause Analysis (RCA) by 35%.",
        "Added pre-release rule-based validations (JDK/runtime checks), enabling 200+ automated daily service health checks.",
        "Standardized telemetry fields and validations via cross-functional design/code reviews and codified shared runbooks."
      ]
    },
    {
      title: "Research Assistant",
      company: "University of Alberta — Dept. of Computing Science",
      location: "Edmonton, AB",
      duration: "January 2025 – April 2025",
      type: "Research",
      descriptionPoints: [
        "Developed a semi-supervised CNN and active learning pipeline classifying rodent vocalizations, improving precision and recall from 22% to 77%.",
        "Engineered advanced preprocessing (ultrasonic frequency filtering, LogMMSE denoising) to isolate bioacoustic signals.",
        "Implemented fuzzy clustering (LAMDA 3π) and constrained K-means with domain-expert guidance.",
        "Designed an iterative active learning framework using entropy-based uncertainty sampling to reduce labeling effort."
      ]
    },
    {
      title: "Research & Analytics Intern",
      company: "Radical Technologies",
      location: "Pune, MH",
      duration: "May 2024 – August 2024",
      type: "Work",
      descriptionPoints: [
        "Integrated AI-driven financial advice using OpenAI’s GPT-4 model for personalized insights on spending and saving.",
        "Designed a responsive UI ensuring seamless user experience, enhancing satisfaction and reducing bounce rates.",
        "Integrated data storage and API for secure handling of financial data, ensuring compliance with security standards.",
        "Enabled real-time financial health scoring to offer dynamic financial habit suggestions."
      ]
    }
  ],
  education: [
    {
      institution: "University of Alberta",
      degree: "Bachelor of Science",
      major: "Major in Computer Science - Artificial Intelligence",
      duration: "Sep 2022 – Dec 2026",
      relevantCoursework: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Reinforcement Learning",
        "Search & Planning in AI",
        "Computer Vision",
        "Advanced Machine Learning",
        "Database Management",
        "Ethics in AI"
      ],
      awards: [
        "Dean's Honor Roll (Assumed)", 
        "Jason Lang Scholarship (Assumed)" 
      ]
    }
  ],
  achievements: [
    {
      title: "Tech Lead - Forget Me Not",
      issuer: "University Project / Startup",
      date: "Sep 2025",
      description: "Led a team to architect and build a complex companion platform with React Native and AWS."
    },
    {
      title: "Return Offer - Amazon",
      issuer: "Amazon",
      date: "Aug 2025",
      description: "Received a return offer for a second internship with the Auto Augmentation Core Team."
    }
  ],
  interests: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Distributed Systems",
    "Full-Stack Development"
  ]
};