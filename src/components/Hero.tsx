import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, Shield, Network, GraduationCap, ChevronDown, CheckCircle, Save, Sliders, Share2, Copy } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
  setProfile: (val: UserProfile) => void;
  editMode: boolean;
}

export default function Hero({ profile, setProfile, editMode }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFieldChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleCopyLink = () => {
    let baseUrl = "https://ais-pre-p6s7ubg7bk6753uhksmpxk-527426969725.europe-west1.run.app";
    if (window.location.host && !window.location.host.includes("localhost") && !window.location.host.includes("3000")) {
      baseUrl = window.location.protocol + "//" + window.location.host;
    }
    const cleanName = profile.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const shareUrl = `${baseUrl}?ref=${cleanName}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center py-20 overflow-hidden bg-radial from-navy-900 via-navy-950 to-navy-950">
      {/* Dynamic Cyber Grid Background and Decorative Elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full bg-brand-500/20 blur-[120px]"></div>
        <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Academic Status Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-950/40 border border-brand-800/40 text-brand-300 text-xs font-mono mb-8 "
        >
          <GraduationCap className="w-4 h-4 text-brand-400" />
          <span>Undergraduate @ KNUST</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </motion.div>

        {/* Full Name Display */}
        {editMode ? (
          <div className="mb-6 max-w-xl mx-auto">
            <label className="block text-xs font-semibold text-amber-500 text-left mb-1 font-mono">Full Name (Editable):</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              className="w-full text-center text-3xl sm:text-5xl font-display font-bold tracking-tight text-white bg-navy-900 border-2 border-amber-500/50 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-hidden font-sans"
            />
          </div>
        ) : (
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-white mb-6"
          >
            I'm <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-indigo-400 bg-clip-text text-transparent">{profile.fullName}</span>
          </motion.h1>
        )}

        {/* Professional Title Display */}
        {editMode ? (
          <div className="mb-6 max-w-xl mx-auto">
            <label className="block text-xs font-semibold text-amber-500 text-left mb-1 font-mono">Professional Title (Editable):</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => handleFieldChange("tagline", e.target.value)}
              className="w-full text-center text-sm sm:text-lg text-brand-300 bg-navy-900 border border-amber-500/30 rounded-lg px-3 py-2 focus:border-amber-500 focus:outline-hidden"
            />
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl font-light text-navy-200 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            Information Technology Student <span className="text-brand-400 font-bold mx-1">|</span> Creative Website Designer <span className="text-brand-400 font-bold mx-1">|</span> Cybersecurity Enthusiast <span className="text-brand-400 font-bold mx-1">|</span> Aspiring IT Professional
          </motion.p>
        )}

        {/* Interactive Tagline */}
        {editMode ? (
          <div className="mb-8 max-w-xl mx-auto">
            <label className="block text-xs font-semibold text-amber-500 text-left mb-1 font-mono">Short Tagline (Editable):</label>
            <textarea
              value={profile.careerGoal}
              onChange={(e) => handleFieldChange("careerGoal", e.target.value)}
              rows={2}
              className="w-full text-center text-sm text-navy-300 bg-navy-900 border border-amber-500/30 rounded-lg px-3 py-2 focus:border-amber-500 focus:outline-hidden resize-none"
            />
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm sm:text-base text-navy-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          >
            {profile.careerGoal}
          </motion.p>
        )}

        {/* Customizer Instructions in Edit Mode */}
        {editMode && (
          <div className="mb-10 p-3 max-w-md mx-auto rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-center flex items-center gap-2 justify-center">
            <Sliders className="w-4 h-4 text-amber-400 animate-spin-pulse" />
            <span>Interactive Customizer: Edit any text and toggle off edit mode to save.</span>
          </div>
        )}

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/40 hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm"
          >
            View My Work
          </button>
          
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide bg-navy-900 hover:bg-navy-800 text-navy-200 hover:text-white border border-navy-800 hover:border-navy-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center text-sm"
          >
            Contact Edwin
          </a>

          <button
            onClick={handleCopyLink}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide border transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm flex items-center justify-center gap-2 ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-navy-900/40 text-navy-300 border-navy-800 hover:text-white hover:border-brand-500/30"
            }`}
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Share Website"}</span>
          </button>
        </motion.div>

        {/* Visual Terminal / Tech Badges summary */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto border-t border-navy-900 pt-10 text-left"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-900/40 border border-navy-900/50 hover:border-brand-500/20 hover:bg-navy-900/60 transition-all">
            <div className="p-2 bg-indigo-505/10 rounded-lg text-indigo-400">
              <Terminal className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="font-display font-medium text-white text-sm">Python & Tech Development</h3>
              <p className="text-xs text-navy-400 mt-1">Solving system challenges and computational automation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-900/40 border border-navy-900/50 hover:border-brand-500/20 hover:bg-navy-900/60 transition-all">
            <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
              <Shield className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="font-display font-medium text-white text-sm">Cybersecurity Focus</h3>
              <p className="text-xs text-navy-400 mt-1">Enthusiastic about threat mitigation and cybercrime prevention.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-900/40 border border-navy-900/50 hover:border-brand-500/20 hover:bg-navy-900/60 transition-all">
            <div className="p-2 bg-sky-504/10 rounded-lg text-sky-400">
              <Network className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="font-display font-medium text-white text-sm">Computer Networking</h3>
              <p className="text-xs text-navy-400 mt-1">Understanding TCP/IP routing infrastructure designs.</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce hidden sm:flex flex-col items-center justify-center select-none text-navy-500 hover:text-brand-400 transition-colors cursor-pointer mx-auto" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
          <span className="text-[10px] uppercase tracking-widest font-mono mb-1">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </div>

      </div>
    </section>
  );
}
