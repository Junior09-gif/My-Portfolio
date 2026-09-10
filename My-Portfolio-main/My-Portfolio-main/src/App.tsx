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
import SubnetCalculatorModal from "./components/SubnetCalculatorModal";
import CyberTerminalModal from "./components/CyberTerminalModal";
import CyberToolkitModal from "./components/CyberToolkitModal";
import NetworkTopologyModal from "./components/NetworkTopologyModal";
import ResumeModal from "./components/ResumeModal";
import ProjectModal from "./components/ProjectModal";
import { Project } from "./data";

const DEFAULT_BG: BgConfig = { mode: "stardust", speed: 1, brightness: 100, dark: true };

export default function App() {
  const [bgConfig, setBgConfig] = useState<BgConfig>(DEFAULT_BG);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSubnetOpen, setIsSubnetOpen] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isCyberToolkitOpen, setIsCyberToolkitOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const updateBg = (next: Partial<BgConfig>) => setBgConfig(prev => ({ ...prev, ...next }));

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", position: "relative" }}>
      {/* Dynamic Ambient Background Shaders */}
      <AnimatedBackground config={bgConfig} />

      {/* Main Page Layout */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenSubnet={() => setIsSubnetOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCyberToolkit={() => setIsCyberToolkitOpen(true)}
        />
        <main>
          <Hero
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenSubnet={() => setIsSubnetOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenCyberToolkit={() => setIsCyberToolkitOpen(true)}
          />
          <About />
          <Skills />
          <Projects
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenSubnet={() => setIsSubnetOpen(true)}
            onOpenTopology={() => setIsTopologyOpen(true)}
            onOpenCyberToolkit={() => setIsCyberToolkitOpen(true)}
          />
          <ExperienceSection />
          <EducationSection />
          <Contact />
        </main>
        <Footer onOpenResume={() => setIsResumeOpen(true)} />
      </div>

      {/* Controls Bar for Shader & Brightness adjustment */}
      <ControlsBar config={bgConfig} onChange={updateBg} />

      {/* Interactive Cyber Terminal Modal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenSubnet={() => setIsSubnetOpen(true)}
      />

      {/* Interactive IPv4 Subnet Calculator Modal */}
      <SubnetCalculatorModal
        isOpen={isSubnetOpen}
        onClose={() => setIsSubnetOpen(false)}
      />

      {/* Interactive Cisco Network Topology Viewer */}
      <NetworkTopologyModal
        isOpen={isTopologyOpen}
        onClose={() => setIsTopologyOpen(false)}
      />

      {/* Interactive Cyber Security Toolkit (Password Entropy & Hasher) */}
      <CyberToolkitModal
        isOpen={isCyberToolkitOpen}
        onClose={() => setIsCyberToolkitOpen(false)}
      />

      {/* Interactive Curriculum Vitae Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Project Deep-Dive Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenSubnet={() => {
          setSelectedProject(null);
          setIsSubnetOpen(true);
        }}
        onOpenTopology={() => {
          setSelectedProject(null);
          setIsTopologyOpen(true);
        }}
        onOpenCyberToolkit={() => {
          setSelectedProject(null);
          setIsCyberToolkitOpen(true);
        }}
      />
    </div>
  );
}
