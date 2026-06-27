import { UserProfile, Skill, Project } from "./types";

export const defaultProfile: UserProfile = {
  fullName: "Boadu Kofi Junior Edwin",
  university: "Kwame Nkrumah University of Science and Technology (KNUST)",
  program: "BSc. Information Technology",
  location: "Kumasi, Ghana",
  fieldsOfInterest: ["Technology", "Software Development", "Networking", "Cybersecurity"],
  careerGoal: "To become an IT professional focused on building real-world solutions and contributing to cybersecurity and cybercrime prevention.",
  tagline: "Building practical IT solutions and safeguarding the digital frontier through cybersecurity.",
  bio: "I am Boadu Kofi Junior Edwin, a student at Kwame Nkrumah University of Science and Technology (KNUST) pursuing a BSc. in Information Technology. I have a strong interest in the technology field, especially in areas related to computing and digital systems.\n\nMy goal is to become a skilled IT professional focused on building practical solutions that address real-world challenges, especially in the area of cybersecurity and cybercrime prevention.",
  email: "kingslayer5543@gmail.com",
  githubUrl: "https://github.com/kingslayer5543", // user email suggests user username might be kingslayer5543
  linkedinUrl: "https://linkedin.com/in/boadu-kofi-junior-edwin",
  phone1: "0558170318",
  phone2: "0554355883",
  whatsapp: "0554355883",
  snapchat: "@eii.jnr",
  instagram: "@eii.jnr",
  tiktok: "@eii.jnr",
  avatarUrl: "",
};

export const defaultSkills: Skill[] = [
  { name: "Python", category: "Language", level: 85, iconName: "Python" },
  { name: "HTML", category: "Language", level: 90, iconName: "Html5" },
  { name: "CSS", category: "Language", level: 85, iconName: "Css3" },
  { name: "JavaScript", category: "Language", level: 80, iconName: "Javascript" },
  { name: "Networking", category: "Core IT", level: 75, iconName: "Network" },
  { name: "Cybersecurity Basics", category: "Concepts", level: 80, iconName: "ShieldSec" },
];

export const defaultProjects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "A highly responsive and customisable developer portfolio designed to showcase skills, certificates, and academic achievements. Features an interactive workspace customiser and smooth content scrolling.",
    techStack: ["React", "HTML", "CSS", "Tailwind CSS", "Motion"],
    features: ["Responsive Grid System", "Live Portfolio Customiser Mode", "Smooth Page Transitions"],
    demoType: "portfolio-customizer"
  },
  {
    id: "calculator",
    title: "Python Calculator",
    description: "An interactive, fully functional calculator inspired by Python console syntax. Handles standard equations with instant validation, interactive button controls, and historical expression tracking.",
    techStack: ["React (Simulated Engine)", "State Management", "Regex Validation"],
    features: ["Standard Operator Precedence", "Error Handling & Feedback", "Floating Node Precedence"],
    demoType: "calculator"
  },
  {
    id: "network",
    title: "Network Study Project",
    description: "An educational platform summarizing critical IP network routing protocols (TCP/IP, IPv4 subnetting, DNS, routing gates) joined with an interactive live subnetting calculator.",
    techStack: ["IPv4 Addressing Logic", "Binary Mask Converters", "CIDR Translation"],
    features: ["Dynamic Subnet Mask Calculation", "Network & Broadcast Address Solver", "Protocol Cheat Sheets"],
    demoType: "subnet-calc"
  }
];
export const timelineEvents = [
  {
    year: "2026 - Present",
    title: "BSc. Information Technology Undergraduate",
    institution: "KNUST, Ghana",
    details: "Focusing on software systems, digital design, computer networking, client-side web development, and cybersecurity principles."
  },
  {
    year: "Self-Guided Training",
    title: "Cybersecurity & Network Systems Study",
    institution: "Online Platforms",
    details: "Exploring IP routing protocols, security fundamentals, defensive coding with Python, and malware analysis paradigms."
  }
];
