import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CyberLab from "./components/CyberLab";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import { Project, ContactMessage } from "./types";
import { defaultProfile, defaultSkills, defaultProjects } from "./data";

export default function App() {
  const profile = defaultProfile;
  const skills = defaultSkills;
  const [projects] = useState<Project[]>(defaultProjects);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#0ea5e9");

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 selection:bg-brand-600 selection:text-white">
      <Navbar fullName={profile.fullName} />

      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects
          projects={projects}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />
        <CyberLab />
        <Contact
          profile={profile}
          messages={messages}
          onAddMessage={(m) => setMessages(p => [m, ...p])}
        />
      </main>

      <Footer
        fullName={profile.fullName}
        onOpenResume={() => setResumeOpen(true)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
}
