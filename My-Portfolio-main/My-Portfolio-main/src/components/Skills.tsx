import { useState } from "react";
import { motion } from "motion/react";
import { Skill } from "../types";
import { Terminal, Code2, Paintbrush, Cpu, Network, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SkillsProps { skills: Skill[]; }

const DETAILS: Record<string, { desc: string; points: string[] }> = {
  "Python": { desc: "Automation scripts, mathematical solvers, file handlers, and defensive terminal tools.", points: ["Data structures & algorithms", "Script automation pipelines", "Defensive security scripting"] },
  "HTML": { desc: "Semantic, accessible web documents with responsive layouts.", points: ["Semantic HTML5 elements", "Accessibility (ARIA) standards", "SEO-friendly structure"] },
  "CSS": { desc: "Modern layouts using grid, flexbox, custom properties, and animations.", points: ["Responsive grid & flexbox", "CSS custom properties", "Animations & transitions"] },
  "JavaScript": { desc: "Client-side logic, DOM manipulation, async workflows, and API integrations.", points: ["ES6+ syntax & async/await", "DOM events & state management", "REST API integrations"] },
  "Networking": { desc: "TCP/IP models, IPv4 subnetting, routing protocols, and socket-level communication.", points: ["IPv4 addressing & CIDR", "DNS, DHCP, routing gateways", "OSI model layer analysis"] },
  "Cybersecurity Basics": { desc: "Security threat modeling, encryption fundamentals, and cybercrime prevention.", points: ["Threat identification", "Encryption & hash functions", "Secure coding principles"] },
};

const getIcon = (name?: string) => {
  const s = { width: "1rem", height: "1rem" };
  switch (name) {
    case "Python": return <Terminal style={s} />;
    case "Html5": return <Code2 style={s} />;
    case "Css3": return <Paintbrush style={s} />;
    case "Javascript": return <Cpu style={s} />;
    case "Network": return <Network style={s} />;
    case "ShieldSec": return <ShieldCheck style={s} />;
    default: return <Code2 style={s} />;
  }
};

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Skills({ skills }: SkillsProps) {
  const [selected, setSelected] = useState<Skill>(skills[0]);

  return (
    <section id="skills" className="section" style={{ background: "rgba(13,21,40,0.9)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Skills</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em" }}>
            Tech stack &amp; competencies
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#8FA3C8", marginTop: "0.5rem" }}>Click any skill to explore proficiency and depth.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", alignContent: "start" }}>
            {skills.map((skill, i) => {
              const isActive = selected?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  {...inView(i * 0.05)}
                  onClick={() => setSelected(skill)}
                  whileHover={{ y: -2 }}
                  style={{
                    textAlign: "left", padding: "1rem", borderRadius: "0.75rem", cursor: "pointer",
                    background: isActive ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive ? "0 4px 20px rgba(59,130,246,0.15)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ padding: "0.35rem", borderRadius: "0.4rem", background: isActive ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)", color: isActive ? "#60A5FA" : "#4A5F80" }}>
                        {getIcon(skill.iconName)}
                      </div>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>{skill.name}</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: isActive ? "#60A5FA" : "#4A5F80", fontFamily: "var(--font-mono)" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ height: "100%", background: isActive ? "linear-gradient(90deg,#3B82F6,#06B6D4)" : "rgba(255,255,255,0.2)", borderRadius: "999px" }}
                    />
                  </div>
                  <p style={{ fontSize: "0.68rem", color: "#4A5F80", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{skill.category}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={selected?.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "1.5rem", background: "rgba(13,21,40,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", position: "sticky", top: "5.5rem", alignSelf: "start" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ padding: "0.6rem", borderRadius: "0.6rem", background: "rgba(59,130,246,0.12)", color: "#60A5FA" }}>{getIcon(selected?.iconName)}</div>
              <div>
                <p className="mono-tag">{selected?.category}</p>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", marginTop: "0.15rem" }}>{selected?.name}</h3>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ position: "relative", width: "3.5rem", height: "3.5rem", flexShrink: 0 }}>
                <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                  <circle cx="26" cy="26" r="20" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(2 * Math.PI * 20 * (selected?.level ?? 0)) / 100} 999`} />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 700, color: "#60A5FA", fontFamily: "var(--font-mono)" }}>{selected?.level}%</span>
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>Proficiency</p>
                <p style={{ fontSize: "0.8rem", color: "#8FA3C8", marginTop: "0.1rem" }}>{(selected?.level ?? 0) >= 85 ? "Advanced" : (selected?.level ?? 0) >= 70 ? "Intermediate" : "Foundational"}</p>
              </div>
            </div>

            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#8FA3C8", marginBottom: "1.25rem" }}>{DETAILS[selected?.name ?? ""]?.desc}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p className="mono-tag" style={{ marginBottom: "0.25rem" }}>Key competencies</p>
              {(DETAILS[selected?.name ?? ""]?.points ?? []).map(pt => (
                <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "#22C55E", flexShrink: 0, marginTop: "0.12rem" }} />
                  <span style={{ fontSize: "0.825rem", color: "#8FA3C8" }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
