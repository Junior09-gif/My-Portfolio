import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CyberLab from "./components/CyberLab";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import { Project, ContactMessage } from "./types";
import { defaultProfile, defaultSkills, defaultProjects } from "./data";

export default function App() {
  const [profile] = useState(defaultProfile);
  const [skills] = useState(defaultSkills);
  const [projects] = useState<Project[]>(defaultProjects);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>("#3b82f6");

  const handleAddMessage = (msg: ContactMessage) => {
    setMessages(prev => [msg, ...prev]);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white relative">
      <Navbar fullName={profile.fullName} />

      <main className="flex-grow">
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
          onAddMessage={handleAddMessage}
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
