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
  mode: "dust",
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
  const [accentColor, setAccentColor] = useState("#0ea5e9");
  const [bgConfig, setBgConfig] = useState<BgConfig>(DEFAULT_BG);

  const updateBg = (next: Partial<BgConfig>) =>
    setBgConfig(prev => ({ ...prev, ...next }));

  const dark = bgConfig.dark;

  return (
    <div
      style={{
        minHeight: "100vh",
        color: dark ? "#F1F5F9" : "#0F172A",
        position: "relative",
        transition: "color 0.4s ease",
      }}
    >
      {/* ── Fixed canvas layer — sits behind everything ── */}
      <AnimatedBackground config={bgConfig} />

      {/* ── All page content — sits above canvas (z-index: 1+) ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar fullName={profile.fullName} />

        <main>
          <Hero profile={profile} dark={dark} />
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
      </div>

      {/* ── Resume modal ── */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
      />

      {/* ── Floating controls bar — highest z-index ── */}
      <ControlsBar config={bgConfig} onChange={updateBg} />
    </div>
  );
}
