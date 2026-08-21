export interface UserProfile {
  fullName: string;
  university: string;
  program: string;
  location: string;
  fieldsOfInterest: string[];
  careerGoal: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  profilePicUrl?: string;
  avatarUrl?: string;
  phone1?: string;
  phone2?: string;
  whatsapp?: string;
  snapchat?: string;
  instagram?: string;
  tiktok?: string;
}

export interface Skill {
  name: string;
  category: "Language" | "Core IT" | "Concepts" | "Other";
  level: number; // 0 to 100
  percentageString?: string;
  iconName?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features?: string[];
  demoType: "calculator" | "subnet-calc" | "portfolio-customizer";
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
