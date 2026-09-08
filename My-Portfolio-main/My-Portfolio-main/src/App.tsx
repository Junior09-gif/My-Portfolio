import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedBackground, { BgConfig } from "./components/AnimatedBackground";
import ControlsBar from "./components/ControlsBar";

const DEFAULT_BG: BgConfig = { mode: "stardust", speed: 1, brightness: 100, dark: true };

export default function App() {
  const [bgConfig, setBgConfig] = useState<BgConfig>(DEFAULT_BG);
  const updateBg = (next: Partial<BgConfig>) => setBgConfig(prev => ({ ...prev, ...next }));

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", position: "relative" }}>
      <AnimatedBackground config={bgConfig} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ExperienceSection />
          <EducationSection />
          <Contact />
        </main>
        <Footer />
      </div>
      <ControlsBar config={bgConfig} onChange={updateBg} />
    </div>
  );
}
