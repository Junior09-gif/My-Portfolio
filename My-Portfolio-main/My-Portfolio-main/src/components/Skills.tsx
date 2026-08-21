import { useState } from "react";
import { motion } from "motion/react";
import { Skill } from "../types";
import {
  Terminal, Code2, Paintbrush, Cpu, Network, ShieldCheck, CheckCircle2, ChevronRight
} from "lucide-react";

interface SkillsProps {
  skills: Skill[];
}

const skillDetails: Record<string, { desc: string; points: string[] }> = {
  "Python": {
    desc: "Used for automation scripts, mathematical solvers, file handlers, and defensive terminal tools.",
    points: ["Data structures & algorithms", "Script automation pipelines", "Defensive security scripting"]
  },
  "HTML": {
    desc: "Building structured, semantic web documents with accessibility-first markup and responsive layouts.",
    points: ["Semantic HTML5 elements", "Accessibility (ARIA) standards", "SEO-friendly document structure"]
  },
  "CSS": {
    desc: "Modern layouts using grid, flexbox, custom properties, and smooth transition animations.",
    points: ["Responsive grid & flexbox systems", "CSS custom properties & theming", "Keyframe & transition animations"]
  },
  "JavaScript": {
    desc: "Client-side logic, DOM manipulation, async workflows, and API integrations.",
    points: ["ES6+ syntax & async/await", "DOM events & state management", "REST API integrations"]
  },
  "Networking": {
    desc: "TCP/IP models, IPv4 subnetting, routing protocols, and socket-level communication.",
    points: ["IPv4 addressing & CIDR subnetting", "DNS, DHCP, routing gateways", "OSI model layer analysis"]
  },
  "Cybersecurity Basics": {
    desc: "Security threat modeling, encryption fundamentals, and cybercrime prevention frameworks.",
    points: ["Threat identification & mitigation", "Encryption & hash functions", "Secure coding principles"]
  }
};

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case "Python": return <Terminal className="w-5 h-5" />;
    case "Html5": return <Code2 className="w-5 h-5" />;
    case "Css3": return <Paintbrush className="w-5 h-5" />;
    case "Javascript": return <Cpu className="w-5 h-5" />;
    case "Network": return <Network className="w-5 h-5" />;
    case "ShieldSec": return <ShieldCheck className="w-5 h-5" />;
    default: return <Code2 className="w-5 h-5" />;
  }
};

const categoryColor: Record<string, string> = {
  "Language": "text-brand-400 bg-brand-500/10 border-brand-500/20",
  "Core IT": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Concepts": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Other": "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

export default function Skills({ skills }: SkillsProps) {
  const [selected, setSelected] = useState<Skill>(skills[5]);

  return (
    <section id="skills" className="py-28 bg-surface-900 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-brand-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">Technical Skills</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            My tech stack & competencies
          </h2>
          <div className="w-10 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Skill cards grid */}
          <div className="lg:col-span-7">
            <p className="text-sm text-slate-500 mb-6">Click any skill to explore its depth and coursework.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill) => {
                const isSelected = selected?.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => setSelected(skill)}
                    whileHover={{ y: -2 }}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer w-full ${isSelected
                        ? "bg-brand-500/8 border-brand-500/50 shadow-lg shadow-brand-900/20"
                        : "bg-surface-800 border-white/6 hover:border-white/15"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg border ${isSelected ? categoryColor[skill.category] : "text-slate-400 bg-surface-700 border-white/6"}`}>
                          {getIcon(skill.iconName)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{skill.name}</p>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${categoryColor[skill.category]}`}>
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-bold text-brand-400">{skill.level}%</span>
                        <ChevronRight className={`w-3.5 h-3.5 text-slate-600 transition-transform ${isSelected ? "rotate-90 text-brand-400" : ""}`} />
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 rounded-full bg-surface-600 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${isSelected ? "bg-brand-400" : "bg-surface-500"}`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Drill-down panel */}
          <div className="lg:col-span-5">
            <motion.div
              key={selected?.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 sticky top-24 space-y-5"
            >
              {/* Panel header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/6">
                <div className={`p-2.5 rounded-xl border ${categoryColor[selected?.category ?? "Other"]}`}>
                  {getIcon(selected?.iconName)}
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{selected?.category} Focus</p>
                  <h3 className="font-display font-bold text-white text-base mt-0.5">{selected?.name}</h3>
                </div>
              </div>

              {/* Proficiency ring */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                    <circle
                      cx="28" cy="28" r="22" fill="none"
                      stroke="#0ea5e9" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${(2 * Math.PI * 22 * (selected?.level ?? 0)) / 100} 999`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-brand-400">
                    {selected?.level}%
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Proficiency Level</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {(selected?.level ?? 0) >= 85 ? "Advanced" : (selected?.level ?? 0) >= 70 ? "Intermediate" : "Foundational"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {skillDetails[selected?.name ?? ""]?.desc ?? "Select a skill to explore its applications."}
              </p>

              {/* Key competencies */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Key Competencies</p>
                {(skillDetails[selected?.name ?? ""]?.points ?? []).map((pt) => (
                  <div key={pt} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
