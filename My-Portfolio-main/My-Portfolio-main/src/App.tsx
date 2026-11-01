import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SubnetCalculatorModal from "./components/SubnetCalculatorModal";
import CyberTerminalModal from "./components/CyberTerminalModal";
import CyberToolkitModal from "./components/CyberToolkitModal";
import NetworkTopologyModal from "./components/NetworkTopologyModal";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSubnetOpen, setIsSubnetOpen] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isCyberToolkitOpen, setIsCyberToolkitOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", color: "#0F172A" }}>
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
        <ExperienceSection />
        <EducationSection />
        <Contact />
      </main>
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      <CyberTerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} onOpenSubnet={() => setIsSubnetOpen(true)} />
      <SubnetCalculatorModal isOpen={isSubnetOpen} onClose={() => setIsSubnetOpen(false)} />
      <NetworkTopologyModal isOpen={isTopologyOpen} onClose={() => setIsTopologyOpen(false)} />
      <CyberToolkitModal isOpen={isCyberToolkitOpen} onClose={() => setIsCyberToolkitOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
