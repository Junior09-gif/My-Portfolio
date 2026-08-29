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
import AnimatedBackground, { BgConfig } from "./components/AnimatedBackground";
import ControlsBar from "./components/ControlsBar";
import { Project, ContactMessage } from "./types";
import { defaultProfile, defaultSkills, defaultProjects } from "./data";

const DEFAULT_BG: BgConfig = {
  mode: "stardust",
  speed: 1,
  brightness: 100,
  dark: true,
};

export default function App() {
  const profile = defaultProfile;
  const skills = defaultSkills;
  const [projects] = useState<Project[]>(defaultProjects);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [bgConfig, setBgConfig] = useState<BgConfig>(DEFAULT_BG);

  const updateBg = (next: Partial<BgConfig>) =>
    setBgConfig(prev => ({ ...prev, ...next }));

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f1f5f9", position: "relative" }}>
      <AnimatedBackground config={bgConfig} />
      <div style={{ position: "relative", zIndex: 1 }}>
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
            onAddMessage={m => setMessages(p => [m, ...p])}
          />
        </main>
        <Footer
          fullName={profile.fullName}
          onOpenResume={() => setResumeOpen(true)}
        />
      </div>
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
      />
      <ControlsBar config={bgConfig} onChange={updateBg} />
    </div>
  );
}
