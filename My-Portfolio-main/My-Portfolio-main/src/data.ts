// ─── Personal profile ─────────────────────────────────────────────────────────
export const profile = {
  name: "Boadu Kofi Junior Edwin",
  alias: "eii.jnr",
  title: "Information Technology Student | Aspiring Cybersecurity Professional | Developer",
  location: "KNUST Campus, Kumasi, Ghana",
  email: "boaduedwin5543@gmail.com",
  github: "https://github.com/Junior09-gif",
  linkedin: "https://linkedin.com/in/boadu-kofi-junior-edwin",
  cvUrl: "#", // TODO: Replace with your Google Drive PDF link e.g. "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
  bio: [
    "I'm Boadu Kofi Junior Edwin — known online as eii.jnr — an Information Technology student at the Kwame Nkrumah University of Science and Technology (KNUST) in Kumasi, Ghana. My fascination with technology started in childhood, tinkering with computers and exploring how software makes hardware come to life.",
    "Today that curiosity drives me to pursue a career at the intersection of software development, network engineering, and cybersecurity. I believe that building secure, resilient, and well-engineered systems is one of the most meaningful contributions a technologist can make — especially in Africa's rapidly transforming digital economy.",
    "I am currently sharpening my technical foundation through hands-on lab coursework, personal coding projects, and self-directed study in networking protocols, ethical hacking, Linux systems, and modern full-stack development.",
  ],
  stats: [
    { value: "5+", label: "Built Projects" },
    { value: "BSc", label: "Degree Path" },
    { value: "KNUST", label: "University" },
    { value: "2029", label: "Graduation" },
  ],
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level?: "Core" | "Advanced" | "Active Study" }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Networking & Protocols",
    icon: "network",
    description: "L2/L3 networking fundamentals, packet analysis, routing protocols & Cisco switching.",
    skills: [
      { name: "TCP/IP & OSI Model", level: "Core" },
      { name: "IPv4 Subnetting & CIDR", level: "Core" },
      { name: "Router & Switch Config", level: "Core" },
      { name: "Cisco Packet Tracer", level: "Core" },
      { name: "VLAN & Trunking (802.1Q)", level: "Active Study" },
      { name: "DNS, DHCP & NAT", level: "Core" },
    ],
  },
  {
    title: "Cybersecurity & Defense",
    icon: "shield",
    description: "Security principles, defensive mechanisms, threat identification & ethical hacking fundamentals.",
    skills: [
      { name: "Security Fundamentals", level: "Core" },
      { name: "Linux Administration", level: "Core" },
      { name: "Vulnerability Scanning", level: "Active Study" },
      { name: "Network Reconnaissance", level: "Active Study" },
      { name: "Authentication (JWT & RBAC)", level: "Core" },
      { name: "Nmap & Wireshark Basics", level: "Active Study" },
    ],
  },
  {
    title: "Programming Languages",
    icon: "code",
    description: "Object-oriented programming, scripting, algorithmic problem solving & data structures.",
    skills: [
      { name: "Python", level: "Core" },
      { name: "C++", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "SQL", level: "Core" },
      { name: "Bash Scripting", level: "Active Study" },
    ],
  },
  {
    title: "Web & Full-Stack Development",
    icon: "globe",
    description: "Modern component-based frontends, responsive design & server-side APIs.",
    skills: [
      { name: "React 19", level: "Core" },
      { name: "Node.js & Express", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "HTML5 & Modern CSS", level: "Core" },
      { name: "RESTful API Design", level: "Core" },
      { name: "Vite & Tooling", level: "Core" },
    ],
  },
  {
    title: "IT & Systems Administration",
    icon: "cpu",
    description: "Operating system management, troubleshooting, hardware architecture & virtualization.",
    skills: [
      { name: "Linux/Unix (Ubuntu, Debian)", level: "Core" },
      { name: "Windows Server / Desktop", level: "Core" },
      { name: "System Troubleshooting", level: "Core" },
      { name: "Process & File Systems", level: "Core" },
      { name: "Virtual Machines (VirtualBox)", level: "Core" },
    ],
  },
  {
    title: "Dev Tools & Workflow",
    icon: "tool",
    description: "Version control, shell environments, development environments & collaboration.",
    skills: [
      { name: "Git & GitHub", level: "Core" },
      { name: "VS Code & JetBrains", level: "Core" },
      { name: "CLI & Terminal Power Tools", level: "Core" },
      { name: "Markdown & Technical Docs", level: "Core" },
      { name: "Figma (UI Wireframing)", level: "Active Study" },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export type ProjectCategory = "network-security" | "web-dev" | "cli-tools";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  tech: string[];
  github: string;
  demo?: string;
  hasInteractiveDemo?: boolean;
  interactiveType?: "subnet" | "terminal" | "topology" | "cybertoolkit" | "external";
  status: "completed" | "in-progress" | "planned";
  architecture?: string;
}

export const projects: Project[] = [
  {
    id: "subnet-calculator",
    title: "IPv4 Subnet & CIDR Intelligence Toolkit",
    category: "network-security",
    categoryLabel: "Networking & Security",
    description: "An interactive networking utility for real-time computation of IPv4 subnet masks, broadcast addresses, usable host ranges, and binary representations.",
    problem: "Manual subnet calculations during networking labs and exam practice are time-consuming and error-prone.",
    solution: "Engineered a client-side bitwise calculation engine with instant CIDR parsing, binary breakdown, and private/public scope classification.",
    highlights: [
      "Real-time bitwise operations computing network and broadcast boundaries",
      "Interactive CIDR slider (/1 to /32) with instant host range updates",
      "Full binary breakdown visualization for networking students and engineers",
      "RFC 1918 Private vs Public IP address classification",
    ],
    tech: ["TypeScript", "Bitwise Math", "React", "Tailwind CSS", "Networking"],
    github: "https://github.com/Junior09-gif",
    hasInteractiveDemo: true,
    interactiveType: "subnet",
    status: "completed",
    architecture: "Client-side bitwise shift and mask engine (IP integer serialization -> 32-bit bitmask -> range extraction).",
  },
  {
    id: "cyber-analyst-toolkit",
    title: "Cryptographic Hasher & Password Entropy Analyzer",
    category: "network-security",
    categoryLabel: "Networking & Security",
    description: "A client-side security utility evaluating password character entropy (bits), GPU brute-force crack time estimates, and real-time SHA-256 cryptographic hashing.",
    problem: "Users and developers frequently deploy weak authentication credentials without understanding brute-force exposure or cryptographic hashing.",
    solution: "Built a cryptographic security inspector measuring symbol pool diversity, entropy algorithms, and instant WebCrypto SHA-256 digesting.",
    highlights: [
      "Shannon entropy score computation and brute-force time extrapolation",
      "Real-time hardware-accelerated WebCrypto SHA-256 hashing",
      "Base64 RFC 4648 string serialization and decoding",
      "Cryptographic random key generator for strong token creation",
    ],
    tech: ["Web Crypto API", "SHA-256", "Entropy Math", "TypeScript", "React"],
    github: "https://github.com/Junior09-gif",
    hasInteractiveDemo: true,
    interactiveType: "cybertoolkit",
    status: "completed",
    architecture: "WebCrypto subtle API digest pipeline + logarithmic password space calculation.",
  },
  {
    id: "cisco-campus-network",
    title: "Enterprise Campus Multi-VLAN Topology",
    category: "network-security",
    categoryLabel: "Networking & Security",
    description: "A simulated enterprise network topology designed in Cisco Packet Tracer with multi-VLAN segmentation, inter-VLAN routing, and DHCP services.",
    problem: "Campus departments required isolated broadcast domains and restricted access between staff, student, and server subnets.",
    solution: "Configured 802.1Q trunking, Router-on-a-Stick inter-VLAN routing, DHCP pools with exclusion ranges, and default gateway redundancy.",
    highlights: [
      "VLAN segmentation for Admin, Faculty, Lab, and Student networks",
      "Inter-VLAN routing via Sub-interfaces with 802.1Q encapsulation",
      "DHCP server pool configuration with DNS and default-gateway distribution",
      "Access Control Lists (ACLs) to restrict student access to admin server subnets",
    ],
    tech: ["Cisco Packet Tracer", "802.1Q", "VLANs", "Inter-VLAN Routing", "ACLs"],
    github: "https://github.com/Junior09-gif",
    hasInteractiveDemo: true,
    interactiveType: "topology",
    status: "completed",
    architecture: "Hierarchical 3-tier model (Core -> Distribution -> Access) with VLAN isolation.",
  },
  {
    id: "portfolio",
    title: "Cyber-Themed Developer Portfolio & Terminal",
    category: "web-dev",
    categoryLabel: "Web & Full-Stack",
    description: "A high-performance interactive developer portfolio featuring a built-in interactive CLI terminal emulator, live subnet calculator, and ambient canvas shaders.",
    problem: "Needed a distinctive digital presence that authentically reflects technical skills in both software development and cybersecurity.",
    solution: "Built a sleek React 19 + TypeScript SPA featuring modular architecture, custom canvas background modes, and interactive tools.",
    highlights: [
      "Custom interactive Cyber Terminal emulator with autocomplete and command history",
      "Multi-mode ambient canvas engine (Matrix Rain, Stardust, Elastic Grid)",
      "Zero-dependency bitwise IPv4 subnetting calculation tool",
      "100% responsive, accessible dark UI with Lucide iconography and Motion animations",
    ],
    tech: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Motion", "Canvas API"],
    github: "https://github.com/Junior09-gif/My-Portfolio",
    demo: "https://boadu-kofi-junior-edwin.vercel.app",
    status: "completed",
    architecture: "Component-driven SPA with reactive state management and HTML5 2D Canvas rendering.",
  },
  {
    id: "network-analyzer-sim",
    title: "Python Packet & Protocol Inspector Simulator",
    category: "network-security",
    categoryLabel: "Networking & Security",
    description: "A Python-based simulation script exploring packet dissection, protocol headers (Ethernet, IPv4, TCP/UDP), and basic anomaly detection.",
    problem: "Understanding low-level network packet headers and payload structures is difficult without dedicated hands-on dissection tools.",
    solution: "Developed modular Python parsers to unpack raw bytes, extract protocol header fields, verify checksums, and print formatted hex/ASCII dumps.",
    highlights: [
      "Decodes IPv4 headers (TTL, Protocol, Source/Destination IP, Checksum)",
      "Parses TCP flags (SYN, ACK, FIN, RST) and UDP port mappings",
      "Identifies potential port scanning activity from source IP patterns",
      "Outputs formatted terminal summaries with colored risk highlights",
    ],
    tech: ["Python", "Socket Simulation", "Struct Unpacking", "Networking", "CLI"],
    github: "https://github.com/Junior09-gif",
    status: "in-progress",
    architecture: "Layered packet decoder utilizing Python struct module to unpack binary network frames.",
  },
  {
    id: "python-calculator",
    title: "Python Expression Parser & CLI Engine",
    category: "cli-tools",
    categoryLabel: "CLI & Tools",
    description: "A command-line mathematical expression evaluator built in Python with tokenizer, operator precedence parsing, and error recovery.",
    problem: "Standard CLI calculators often fail with nested parentheses, improper precedence, or unhandled math exceptions.",
    solution: "Implemented an expression tokenizer and recursive descent evaluation algorithm with division-by-zero protection and memory registers.",
    highlights: [
      "Tokenizer regex matching variables, floats, integers, and operators",
      "Handles nested parentheses, exponential powers, and modulo operations",
      "History recall and persistent memory store (Ans, M+, M-)",
      "Robust error handling for unbalanced parentheses and illegal characters",
    ],
    tech: ["Python", "Regex", "AST Parsing", "CLI", "Unit Testing"],
    github: "https://github.com/Junior09-gif",
    status: "completed",
    architecture: "Lexer -> Parser -> Evaluator pipeline with custom error handling.",
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
    role: "IT & Computer Systems Laboratory Practice",
    org: "KNUST — Department of Computer Science",
    period: "2026 – Present",
    type: "Academic Practical",
    bullets: [
      "Designed and simulated LAN networks, VLAN segmentations, and static/dynamic routing in Cisco Packet Tracer.",
      "Configured Linux virtual machines for network services, user permission hierarchies, and shell automation.",
      "Conducted coursework experiments in data structures, relational database schemas (SQL), and algorithmic complexity.",
      "Collaborated with peers on hands-on hardware diagnostics, PC assembly, and network cabling (RJ45 crimping).",
    ],
  },
  {
    id: "self-study",
    role: "Independent Technical & Cybersecurity Research",
    org: "Self-Directed Practical Learning",
    period: "2024 – Present",
    type: "Continuous Learning",
    bullets: [
      "Completed hands-on labs in networking fundamentals, subnetting arithmetic, and protocol analysis.",
      "Practiced ethical hacking methodologies: network reconnaissance (Nmap), web vulnerabilities, and security hygiene.",
      "Engineered frontend and full-stack web applications using React, TypeScript, and modern styling libraries.",
      "Maintained version-controlled repositories on GitHub with clean documentation and modular architecture.",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const education = {
  degree: "Bachelor of Science — Information Technology",
  institution: "Kwame Nkrumah University of Science and Technology (KNUST)",
  location: "Kumasi, Ghana",
  period: "2026 – Expected 2029",
  coursework: [
    "Computer Networks & Data Communications",
    "Operating Systems Architecture",
    "Data Structures & Algorithms",
    "Database Management Systems (SQL)",
    "Object-Oriented Programming (C++ & Python)",
    "Web Technologies & Client-Side Scripting",
    "Information Security Principles",
  ],
  highlights: [
    "Engaged in university computing societies and technical peer study groups.",
    "Academic focus on network security, infrastructure defense, and robust software engineering.",
    "Committed to solving African technological challenges through resilient digital infrastructure.",
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
  badgeName?: string;
}

export const certifications: Certification[] = [
  {
    id: "google-cyber",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    year: "In Progress",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    status: "in-progress",
    badgeName: "Google Cyber",
  },
  {
    id: "cisco-net",
    title: "Cisco Networking Basics & Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "Active Study",
    link: "https://www.netacad.com/",
    status: "in-progress",
    badgeName: "Cisco NetAcad",
  },
  {
    id: "comptia-sec",
    title: "CompTIA Security+ (SY0-701)",
    issuer: "CompTIA",
    year: "Planned Target",
    link: "https://www.comptia.org/certifications/security",
    status: "planned",
    badgeName: "CompTIA Sec+",
  },
];

// ─── My Journey (Personal & Professional Development) ─────────────────────────
export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  org: string;
  category: "Leadership & Digital Platforms" | "Academic Foundation" | "Technical Growth" | "Practical Engineering" | "Security Direction" | "Future Horizon";
  categoryColor: string;
  icon: "users" | "graduation" | "code" | "hammer" | "shield" | "target";
  shortDescription: string;
  details: {
    overview: string;
    points: string[];
    technologies: string[];
    learnMoreAction?: {
      type: "modal" | "link" | "section";
      target: string;
      label: string;
    };
  };
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "pensa-knust",
    period: "2026",
    title: "Assistant Web & App Head",
    org: "PENSA-KNUST",
    category: "Leadership & Digital Platforms",
    categoryColor: "#06b6d4",
    icon: "users",
    shortDescription: "Contributing to the development and evolution of digital platforms while supporting technical initiatives, collaborating with developers, and helping deliver reliable web and app solutions for the organization.",
    details: {
      overview: "Serving in a technical leadership and development capacity at PENSA-KNUST, helping steward web and mobile applications that connect thousands of university students and alumni.",
      points: [
        "Collaborating with fellow student developers and media teams to maintain and enhance digital platforms.",
        "Assisting in feature planning, interface responsiveness, and reliable content delivery.",
        "Troubleshooting live technical issues and supporting technical initiatives for events and outreach.",
      ],
      technologies: ["Web Development", "App Solutions", "Team Collaboration", "Platform Support", "Git"],
      learnMoreAction: {
        type: "modal",
        target: "pensa-knust",
        label: "View Milestone Details",
      },
    },
  },
  {
    id: "knust-academic",
    period: "2026 – Expected 2029",
    title: "BSc. Information Technology",
    org: "Kwame Nkrumah University of Science and Technology (KNUST)",
    category: "Academic Foundation",
    categoryColor: "#3b82f6",
    icon: "graduation",
    shortDescription: "Pursuing undergraduate IT studies in Kumasi, Ghana — establishing foundational depth across networking protocols, operating systems, algorithms, and secure systems architecture.",
    details: {
      overview: "Formal academic training at one of West Africa's leading technological universities, developing the theoretical and laboratory competencies essential for modern computer engineering.",
      points: [
        "Core modules: Computer Networks, Data Communications, Operating Systems, Data Structures, Database Systems (SQL), and Object-Oriented Programming.",
        "Active participant in computing peer study groups and department laboratory practice.",
        "Connecting classroom principles to practical systems design and African technological development.",
      ],
      technologies: ["Computer Networks", "OS Architecture", "C++", "Python", "SQL", "Data Structures"],
      learnMoreAction: {
        type: "section",
        target: "#education",
        label: "View Education Details",
      },
    },
  },
  {
    id: "skill-development",
    period: "Continuous Learning",
    title: "Continuous Technical Skill Development",
    org: "Self-Directed & Lab Practice",
    category: "Technical Growth",
    categoryColor: "#10b981",
    icon: "code",
    shortDescription: "Progressively expanding practical competencies across programming, modern web frameworks, Cisco networking configurations, and Linux system administration.",
    details: {
      overview: "An ongoing commitment to technical improvement through structured online curricula, coding practice, and hands-on system experimentation without fabricated proficiency percentages.",
      points: [
        "Strengthening foundational software development in C++, Python, TypeScript, and React 19.",
        "Practicing network subnet arithmetic, Cisco IOS commands, and packet routing protocols.",
        "Mastering command line tools, Git version control, and Linux shell environments.",
      ],
      technologies: ["Python", "C++", "TypeScript", "React", "Linux Administration", "TCP/IP"],
      learnMoreAction: {
        type: "section",
        target: "#skills",
        label: "Explore Skills Matrix",
      },
    },
  },
  {
    id: "building-experience",
    period: "2024 – Present",
    title: "Building Practical Solutions & Labs",
    org: "Personal & Academic Projects",
    category: "Practical Engineering",
    categoryColor: "#f59e0b",
    icon: "hammer",
    shortDescription: "Engineering functional utilities and technical prototypes — including an interactive IPv4 subnet calculator, Cisco multi-VLAN campus topologies, and terminal tools.",
    details: {
      overview: "Validating engineering knowledge by building real software, configuring network simulations, and solving practical computational problems.",
      points: [
        "Created an interactive IPv4 Subnetting & CIDR Intelligence Toolkit with instant bitwise arithmetic.",
        "Configured an Enterprise Campus Multi-VLAN Topology with 802.1Q trunking and ACL security in Cisco Packet Tracer.",
        "Developed a Python expression parser and CLI engine with operator precedence handling.",
      ],
      technologies: ["TypeScript", "Bitwise Math", "Cisco Packet Tracer", "Python", "AST Parsing", "React"],
      learnMoreAction: {
        type: "section",
        target: "#projects",
        label: "Browse Built Projects",
      },
    },
  },
  {
    id: "cybersecurity-direction",
    period: "Active Focus",
    title: "Cybersecurity Specialization & Defense Direction",
    org: "Targeted Career Pathway",
    category: "Security Direction",
    categoryColor: "#ec4899",
    icon: "shield",
    shortDescription: "Actively channeling technical curiosity toward defensive security, ethical hacking fundamentals, vulnerability inspection, and building secure-by-design systems.",
    details: {
      overview: "Positioning cybersecurity as an essential long-term career specialization through dedicated coursework, professional certificate preparation, and defensive engineering labs.",
      points: [
        "Enrolled in the Google Cybersecurity Professional Certificate curriculum covering SIEM, Linux security, and network triage.",
        "Practicing network reconnaissance concepts (Nmap, Wireshark) and access control principles.",
        "Studying toward the CompTIA Security+ industry credential to validate defensive competencies.",
      ],
      technologies: ["Security Fundamentals", "Network Defense", "Vulnerability Scanning", "JWT/RBAC", "Linux Security"],
      learnMoreAction: {
        type: "modal",
        target: "cybersecurity-direction",
        label: "View Security Roadmap",
      },
    },
  },
  {
    id: "future-vision",
    period: "Future Horizon",
    title: "Engineering Resilient Digital Infrastructure",
    org: "Long-Term Professional Vision",
    category: "Future Horizon",
    categoryColor: "#8b5cf6",
    icon: "target",
    shortDescription: "Aspiring to become a highly capable IT engineer and cybersecurity professional who designs secure, innovative technological systems that solve real-world problems.",
    details: {
      overview: "Driven by the belief that robust, well-engineered technology can transform communities and accelerate Africa's digital economy securely.",
      points: [
        "Developing expertise to design and protect mission-critical enterprise systems.",
        "Contributing to innovative software and secure network architectures.",
        "Continuously evolving with emerging technologies in cloud computing, cybersecurity, and automation.",
      ],
      technologies: ["Enterprise Systems", "Secure Cloud Infrastructure", "African Digital Growth", "Continuous Innovation"],
      learnMoreAction: {
        type: "section",
        target: "#contact",
        label: "Connect With Me",
      },
    },
  },
];


