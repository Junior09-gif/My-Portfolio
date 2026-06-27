import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CyberLab from "./components/CyberLab";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import { UserProfile, Skill, Project, ContactMessage } from "./types";
import { defaultProfile, defaultSkills, defaultProjects } from "./data";

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("student_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return defaultProfile;
  });
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects] = useState<Project[]>(defaultProjects);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>("#3b82f6"); // Primary Blue Accent

  useEffect(() => {
    localStorage.setItem("student_profile", JSON.stringify(profile));
  }, [profile]);

  const handleAddMessage = (msg: ContactMessage) => {
    setMessages(prev => [msg, ...prev]);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white relative">
      <Navbar 
        editMode={editMode} 
        setEditMode={setEditMode} 
        fullName={profile.fullName} 
      />

      <main className="flex-grow">
        <Hero 
          profile={profile} 
          setProfile={setProfile} 
          editMode={editMode} 
        />

        <About 
          profile={profile} 
          setProfile={setProfile} 
          editMode={editMode} 
        />

        <Skills 
          skills={skills} 
          setSkills={setSkills} 
          editMode={editMode} 
        />

        <Projects 
          projects={projects} 
          editMode={editMode} 
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />

        <CyberLab />

        <Contact 
          profile={profile} 
          editMode={editMode} 
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
