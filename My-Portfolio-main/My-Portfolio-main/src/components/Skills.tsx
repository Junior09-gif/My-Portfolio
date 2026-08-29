import React, { useState } from "react";
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
  const s: React.CSSProperties = { width: "1rem", height: "1rem" };
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

const CARD: React.CSSProperties = { background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.75rem" };

export default function Skills({ skills }: SkillsProps) {
  const [selected, setSelected] = useState<Skill>(skills[0]);

  return (
    <section id="skills" className="section" style={{ background: "#0d1120", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Skills</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Tech stack &amp; competencies
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", alignContent: "start" }}>
            {skills.map((skill, i) => {
              const isActive = selected?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  {...inView(i * 0.05)}
                  onClick={() => setSelected(skill)}
                  whileHover={{ y: -1 }}
                  style={{
                    textAlign: "left", padding: "0.95rem", borderRadius: "0.65rem", cursor: "pointer",
                    background: isActive ? "rgba(37,99,235,0.07)" : "#0d1120",
                    border: `1px solid ${isActive ? "rgba(37,99,235,0.28)" : "#1e293b"}`,
                    transition: "all 0.18s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ padding: "0.3rem", borderRadius: "0.35rem", background: isActive ? "rgba(37,99,235,0.12)" : "#151c2c", color: isActive ? "#2563eb" : "#475569" }}>
                        {getIcon(skill.iconName)}
                      </div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9" }}>{skill.name}</span>
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: isActive ? "#2563eb" : "#475569", fontFamily: "var(--font-mono)" }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: "2px", background: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ height: "100%", background: isActive ? "#2563eb" : "#263347", borderRadius: "999px" }}
                    />
                  </div>
                  <p style={{ fontSize: "0.65rem", color: "#475569", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{skill.category}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={selected?.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ ...CARD, padding: "1.35rem", position: "sticky", top: "5rem", alignSelf: "start" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.1rem", paddingBottom: "1.1rem", borderBottom: "1px solid #1e293b" }}>
              <div style={{ padding: "0.55rem", borderRadius: "0.5rem", background: "rgba(37,99,235,0.1)", color: "#2563eb" }}>
                {getIcon(selected?.iconName)}
              </div>
              <div>
                <p className="mono-tag">{selected?.category}</p>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9", marginTop: "0.12rem" }}>{selected?.name}</h3>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.1rem" }}>
              <div style={{ position: "relative", width: "3.2rem", height: "3.2rem", flexShrink: 0 }}>
                <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="20" fill="none" stroke="#1e293b" strokeWidth="4" />
                  <circle cx="26" cy="26" r="20" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(2 * Math.PI * 20 * (selected?.level ?? 0)) / 100} 999`} />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "#2563eb", fontFamily: "var(--font-mono)" }}>
                  {selected?.level}%
                </span>
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>Proficiency</p>
                <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.1rem" }}>
                  {(selected?.level ?? 0) >= 85 ? "Advanced" : (selected?.level ?? 0) >= 70 ? "Intermediate" : "Foundational"}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "0.875rem", lineHeight: 1.72, color: "#94a3b8", marginBottom: "1.1rem" }}>
              {DETAILS[selected?.name ?? ""]?.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <p className="mono-tag" style={{ marginBottom: "0.2rem" }}>Key competencies</p>
              {(DETAILS[selected?.name ?? ""]?.points ?? []).map(pt => (
                <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem" }}>
                  <CheckCircle2 style={{ width: "0.825rem", height: "0.825rem", color: "#2563eb", flexShrink: 0, marginTop: "0.12rem" }} />
                  <span style={{ fontSize: "0.825rem", color: "#94a3b8" }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
