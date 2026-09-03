// ─── Personal profile ─────────────────────────────────────────────────────────
export const profile = {
  name: "Boadu Kofi Junior Edwin",
  alias: "eii.jnr",
  title: "Information Technology Student | Aspiring Cybersecurity Professional | Developer",
  location: "KNUST Campus, Kumasi, Ghana",
  email: "boaduedwin5543@gmail.com",
  github: "https://github.com/Junior09-gif",
  linkedin: "https://linkedin.com/in/boadu-kofi-junior-edwin",
  cvUrl: "#", // replace with real CV link when available
  bio: [
    "I'm Boadu Kofi Junior Edwin — known online as eii.jnr — an Information Technology student at the Kwame Nkrumah University of Science and Technology (KNUST) in Kumasi, Ghana. My fascination with technology started in childhood, tinkering with computers and wondering how software made machines think.",
    "Today that curiosity drives me to pursue a career at the intersection of software development and cybersecurity. I believe that building secure, well-engineered systems is one of the most meaningful contributions a technologist can make — especially in a rapidly digitising continent like Africa.",
    "I am currently building my technical foundation through hands-on coursework, personal projects, and self-directed learning in networking, ethical hacking, and full-stack development. My long-term goal is to become a skilled cybersecurity professional and software engineer who designs systems that are both innovative and resilient.",
  ],
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Web Development",
    icon: "globe",
    skills: ["HTML5", "CSS3", "Tailwind CSS", "React", "Node.js"],
  },
  {
    title: "Networking",
    icon: "network",
    skills: ["Network Fundamentals", "TCP/IP", "Router & Switch Config", "Cisco Packet Tracer", "DNS & DHCP"],
  },
  {
    title: "Cybersecurity",
    icon: "shield",
    skills: ["Security Fundamentals", "Linux Administration", "Ethical Hacking Basics", "Vulnerability Assessment", "Security Tools"],
  },
  {
    title: "IT & Systems",
    icon: "cpu",
    skills: ["Windows Administration", "Linux/Unix", "System Troubleshooting", "System Administration", "OS Management"],
  },
  {
    title: "Tools & Workflow",
    icon: "tool",
    skills: ["Git & GitHub", "VS Code", "Bash / Shell Scripting", "Command Line Interface", "Figma (Basic)"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  github: string;
  demo: string;
  status: "completed" | "in-progress" | "planned";
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "A responsive single-page developer portfolio showcasing skills, projects, and academic background.",
    problem: "Needed a professional online presence that accurately reflects technical skills without fabricated metrics.",
    solution: "Built a clean React + Tailwind SPA with modular section components and a dark technical aesthetic.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    github: "https://github.com/Junior09-gif/My-Portfolio",
    demo: "https://boadu-kofi-junior-edwin.vercel.app",
    status: "completed",
  },
  {
    id: "calculator",
    title: "Python CLI Calculator",
    description: "A terminal-based arithmetic calculator built in Python with expression parsing and error handling.",
    problem: "Needed a reliable command-line tool to evaluate complex arithmetic expressions with proper operator precedence.",
    solution: "Implemented recursive expression evaluation with regex validation, division-by-zero handling, and a clean shell interface.",
    tech: ["Python", "Regex", "CLI"],
    github: "https://github.com/Junior09-gif",
    demo: "",
    status: "completed",
  },
  {
    id: "subnet",
    title: "IPv4 Subnet Calculator",
    description: "An interactive web tool for computing IPv4 subnet masks, network addresses, broadcast addresses, and host ranges.",
    problem: "Manual subnet calculations are error-prone and time-consuming during networking study sessions.",
    solution: "Built a real-time browser tool that computes all subnet properties instantly from an IP address and CIDR prefix.",
    tech: ["React", "TypeScript", "IPv4 Logic", "CIDR"],
    github: "https://github.com/Junior09-gif",
    demo: "https://boadu-kofi-junior-edwin.vercel.app/#projects",
    status: "completed",
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  type: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    id: "knust-labs",
    role: "IT Laboratory Practice",
    org: "KNUST — Department of Computer Science",
    period: "2026 – Present",
    type: "Academic",
    bullets: [
      "Completed structured laboratory exercises in networking fundamentals using Cisco Packet Tracer.",
      "Practised IPv4 subnetting, VLAN configuration, and basic routing protocols.",
      "Engaged in operating systems coursework covering file systems, process management, and shell scripting.",
    ],
  },
  {
    id: "self-study",
    role: "Independent Technical Study",
    org: "Self-Directed (Online Platforms)",
    period: "2024 – Present",
    type: "Self-Study",
    bullets: [
      "Studied Python programming, data structures, and algorithm fundamentals through structured online curricula.",
      "Explored ethical hacking concepts including reconnaissance, vulnerability scanning, and basic exploit techniques.",
      "Completed web development projects using React, Tailwind CSS, and Vite.",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const education = {
  degree: "Bachelor of Science — Information Technology",
  institution: "Kwame Nkrumah University of Science and Technology (KNUST)",
  location: "Kumasi, Ghana",
  period: "2026 – Expected 2029",
  highlights: [
    "Core modules: Networking, Algorithms & Data Structures, Database Systems, Web Technologies, OS Fundamentals",
    "Active member of the university computing community",
    "Focus areas: Cybersecurity, Network Engineering, Software Development",
  ],
};

// ─── Certifications ───────────────────────────────────────────────────────────
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link: string;
  status: "earned" | "in-progress" | "planned";
}

export const certifications: Certification[] = [
  {
    id: "cisco-net",
    title: "Cisco Networking Basics",
    issuer: "Cisco Networking Academy",
    year: "Planned",
    link: "#",
    status: "planned",
  },
  {
    id: "google-cyber",
    title: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    year: "In Progress",
    link: "#",
    status: "in-progress",
  },
  {
    id: "comptia-sec",
    title: "CompTIA Security+",
    issuer: "CompTIA",
    year: "Planned",
    link: "#",
    status: "planned",
  },
];
