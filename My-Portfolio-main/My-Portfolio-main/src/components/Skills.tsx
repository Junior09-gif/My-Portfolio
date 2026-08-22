import { useState } from "react";
import { motion } from "motion/react";
import { Skill } from "../types";
import { Terminal, Code2, Paintbrush, Cpu, Network, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SkillsProps { skills: Skill[]; }

const DETAILS: Record<string, { desc: string; points: string[] }> = {
  "Python": { desc: "Automation scripts, mathematical solvers, file handlers, and defensive terminal tools.", points: ["Data structures & algorithms", "Script automation pipelines", "Defensive security scripting"] },
  "HTML": { desc: "Semantic, accessible web documents with responsive layouts.", points: ["Semantic HTML5 elements", "Accessibility (ARIA) standards", "SEO-friendly structure"] },
  "CSS": { desc: "Modern layouts using grid, flexbox, custom properties, and animations.", points: ["Responsive grid & flexbox", "CSS custom properties & theming", "Keyframe & transition animations"] },
  "JavaScript": { desc: "Client-side logic, DOM manipulation, async workflows, and API integrations.", points: ["ES6+ syntax & async/await", "DOM events & state management", "REST API integrations"] },
  "Networking": { desc: "TCP/IP models, IPv4 subnetting, routing protocols, and socket-level communication.", points: ["IPv4 addressing & CIDR subnetting", "DNS, DHCP, routing gateways", "OSI model layer analysis"] },
  "Cybersecurity Basics": { desc: "Security threat modeling, encryption fundamentals, and cybercrime prevention frameworks.", points: ["Threat identification & mitigation", "Encryption & hash functions", "Secure coding principles"] },
};

const getIcon = (name?: string) => {
  const cls = "w-4 h-4";
  switch (name) {
    case "Python": return <Terminal className={cls} />;
    case "Html5": return <Code2 className={cls} />;
    case "Css3": return <Paintbrush className={cls} />;
    case "Javascript": return <Cpu className={cls} />;
    case "Network": return <Network className={cls} />;
    case "ShieldSec": return <ShieldCheck className={cls} />;
    default: return <Code2 className={cls} />;
  }
};

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Skills({ skills }: SkillsProps) {
  const [selected, setSelected] = useState<Skill>(skills[5]);

  return (
    <section id="skills" className="section relative" style={{ background: "#0F0F17" }}>
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div {...inView()} className="mb-16">
          <p className="label mb-3">Skills</p>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            Tech stack &amp; competencies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Skill grid */}
          <div className="lg:col-span-7 space-y-3">
            <p className="mono-tag mb-5">Click any skill to explore depth</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill, i) => {
                const isActive = selected?.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    {...inView(i * 0.05)}
                    onClick={() => setSelected(skill)}
                    whileHover={{ y: -1 }}
                    className="text-left p-4 rounded-xl transition-all duration-200 cursor-pointer w-full"
                    style={{
                      background: isActive ? "rgba(10,132,255,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isActive ? "rgba(10,132,255,0.3)" : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-1.5 rounded-lg"
                          style={{
                            background: isActive ? "rgba(10,132,255,0.12)" : "rgba(255,255,255,0.05)",
                            color: isActive ? "#0A84FF" : "#515154",
                          }}
                        >
                          {getIcon(skill.iconName)}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "#F5F5F7" }}>{skill.name}</p>
                          <span
                            className="text-xs"
                            style={{ color: "#515154", fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
                          >
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: isActive ? "#0A84FF" : "#515154", fontFamily: "var(--font-mono)" }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress */}
                    <div
                      className="h-0.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: isActive ? "#0A84FF" : "rgba(255,255,255,0.15)" }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <motion.div
              key={selected?.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6 sticky top-24 space-y-6"
              style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Icon + name */}
              <div
                className="flex items-center gap-3 pb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "rgba(10,132,255,0.1)", color: "#0A84FF" }}
                >
                  {getIcon(selected?.iconName)}
                </div>
                <div>
                  <p className="mono-tag">{selected?.category}</p>
                  <h3 className="text-base font-semibold mt-0.5" style={{ color: "#F5F5F7" }}>{selected?.name}</h3>
                </div>
              </div>

              {/* Ring */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle
                      cx="26" cy="26" r="20" fill="none"
                      stroke="#0A84FF" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(2 * Math.PI * 20 * (selected?.level ?? 0)) / 100} 999`}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                    style={{ color: "#0A84FF", fontFamily: "var(--font-mono)" }}
                  >
                    {selected?.level}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#F5F5F7" }}>Proficiency</p>
                  <p className="text-xs mt-0.5" style={{ color: "#86868B" }}>
                    {(selected?.level ?? 0) >= 85 ? "Advanced" : (selected?.level ?? 0) >= 70 ? "Intermediate" : "Foundational"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#86868B" }}>
                {DETAILS[selected?.name ?? ""]?.desc}
              </p>

              {/* Points */}
              <div className="space-y-2.5">
                <p className="mono-tag">Key competencies</p>
                {(DETAILS[selected?.name ?? ""]?.points ?? []).map(pt => (
                  <div key={pt} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#30D158" }} />
                    <span style={{ fontSize: "0.82rem", color: "#86868B" }}>{pt}</span>
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
