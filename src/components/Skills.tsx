import { useState } from "react";
import { motion } from "motion/react";
import { Skill } from "../types";
import { Terminal, Code2, Paintbrush, Cpu, Network, ShieldCheck, CheckCircle2, Sliders, ChevronRight } from "lucide-react";

interface SkillsProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  editMode: boolean;
}

export default function Skills({ skills, setSkills, editMode }: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[5]); // Default to Cybersecurity Basics

  // Mapping helper to map iconic descriptions for each skill
  const skillDetails: Record<string, string> = {
    "Python": "Leveraged for developer scripts, computing setups, custom mathematical equations, defensive terminal scripts, and automated file handlers.",
    "HTML": "The backbone of the web. Designing structural hierarchies that comply with responsive view grids, custom tag attributes, and web accessibility standards.",
    "CSS": "Creating beautiful visually-paired modern layouts with fluid grid templates, customized styling rules, responsive variables, and high-performance transitions.",
    "JavaScript": "Powering client-side logic, conditional workflows, custom math operations, API integrations, and visual rendering modules.",
    "Networking": "Deep study of IPv4 addressing models, subnet architectures, routing gateways, DNS protocols, and standard socket setups.",
    "Cybersecurity Basics": "Understanding security threats, cybercrime prevention rules, encryption structures, defensive system baselines, and data safety compliance audits."
  };

  const getSkillIcon = (iconName?: string) => {
    switch (iconName) {
      case "Python":
        return <Terminal className="w-5 h-5" />;
      case "Html5":
        return <Code2 className="w-5 h-5" />;
      case "Css3":
        return <Paintbrush className="w-5 h-5" />;
      case "Javascript":
        return <Cpu className="w-5 h-5" />;
      case "Network":
        return <Network className="w-5 h-5" />;
      case "ShieldSec":
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  const handleLevelChange = (index: number, newLevel: number) => {
    const updated = [...skills];
    updated[index].level = newLevel;
    setSkills(updated);
    if (selectedSkill?.name === updated[index].name) {
      setSelectedSkill(updated[index]);
    }
  };

  return (
    <section id="skills" className="py-24 bg-navy-950 border-t border-navy-900 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2 font-semibold">Ability Matrix</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Technical Skills</p>
          <div className="w-12 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Layout: Info panel on Left, interactive drilldown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* List of Skills (8 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm text-navy-400 mb-6 font-medium">Click on any expertise badge below to inspect course logs, real-world utility frameworks, and competencies.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -2 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand-950/40 border-brand-500 shadow-md shadow-brand-500/10"
                        : "bg-navy-900/45 border-navy-800 hover:border-navy-700"
                    }`}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg border ${
                          isSelected 
                            ? "bg-brand-500/20 border-brand-500/30 text-brand-300" 
                            : "bg-navy-950/60 border-navy-800 text-navy-300"
                        }`}>
                          {getSkillIcon(skill.iconName)}
                        </div>
                        <span className="font-display font-medium text-sm text-white">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-400">{skill.level}%</span>
                    </div>

                    {/* Progress Slider (Editable in Edit Mode) */}
                    {editMode ? (
                      <div className="space-y-1 mt-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between">
                          <span className="text-[10px] text-amber-500 font-mono">Drag level:</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleLevelChange(index, parseInt(e.target.value))}
                          className="w-full h-1.5 bg-navy-850 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full bg-navy-950 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1 }}
                          className="bg-brand-500 h-1.5 rounded-full"
                        ></motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {editMode && (
              <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[11px] text-amber-400 font-sans flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Adjust slider values to dynamic real levels corresponding to project depths.</span>
              </div>
            )}
          </div>

          {/* Interactive Drilldown / Deep Dive (5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 lg:h-full">
            <div className="p-6 rounded-2xl bg-navy-900/30 border border-brand-500/10 shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 border-b border-navy-800 pb-4 mb-5">
                  <div className="p-2 bg-brand-500/10 rounded-xl text-brand-400">
                    {selectedSkill ? getSkillIcon(selectedSkill.iconName) : <Terminal />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-400 uppercase">
                      {selectedSkill?.category || "Selected Core"} Focus
                    </span>
                    <h3 className="font-display font-bold text-white text-base leading-none mt-1">
                      {selectedSkill?.name || "Select a Skill"}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-navy-400 uppercase tracking-wider">Course Competencies & Core Values</h4>
                  <p className="text-sm text-navy-300 leading-relaxed font-sans">
                    {selectedSkill ? skillDetails[selectedSkill.name] : "Select a skill card to view its specific applications."}
                  </p>
                </div>

                <div className="mt-8 space-y-3.5">
                  <h4 className="text-xs font-mono text-navy-400 uppercase tracking-wider">Academic Proficiency Indicators</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-navy-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Complies with KNUST Dept. of IT practical benchmarks</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Demonstrated in open projects and laboratory exercises</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Regularly refined with secure principles & safeguards</span>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
