import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown, Share2, CheckCircle, Github, Mail,
  Shield, Terminal, Network, Sparkles
} from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
}

const badges = [
  { icon: Terminal, label: "Python Dev" },
  { icon: Shield, label: "Cybersecurity" },
  { icon: Network, label: "Networking" },
  { icon: Sparkles, label: "Web Engineering" },
];

export default function Hero({ profile }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const cleanName = profile.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    navigator.clipboard.writeText(`${window.location.origin}?ref=${cleanName}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060810]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-600/8 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-300 text-xs font-mono mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          BSc. Information Technology · KNUST, Ghana
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.05]"
        >
          Hi, I'm{" "}
          <span className="gradient-text">
            {profile.fullName.split(" ").slice(0, 3).join(" ")}
          </span>
        </motion.h1>

        {/* Sub-title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Software Engineering Student building real-world solutions —
          from <span className="text-white font-medium">secure web applications</span> to{" "}
          <span className="text-white font-medium">network infrastructure tools</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {profile.careerGoal}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <button
            onClick={() => scroll("#projects")}
            className="px-6 py-3 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/50 hover:shadow-brand-600/30 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            View My Projects
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-surface-800 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-surface-800 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </a>

          <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 cursor-pointer ${copied
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-surface-800 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Share"}
          </button>
        </motion.div>

        {/* Expertise badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800 border border-white/8 text-slate-300 text-xs font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-brand-400" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 max-w-sm mx-auto border-t border-white/5 pt-10"
        >
          {[
            { value: "3+", label: "Projects Built" },
            { value: "6", label: "Tech Skills" },
            { value: "2026", label: "KNUST Enrolled" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-display font-bold text-white">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={() => scroll("#about")}
          className="mt-14 flex flex-col items-center gap-1 mx-auto text-slate-600 hover:text-brand-400 transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.button>

      </div>
    </section>
  );
}
