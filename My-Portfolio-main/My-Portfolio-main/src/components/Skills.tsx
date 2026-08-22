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
    <section id="skills" className="section section-alt">
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Skills</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>
            Tech stack &amp; competencies
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#6B7280", marginTop: "0.5rem" }}>
            Click any skill to explore proficiency and depth.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", alignContent: "start" }}>
            {skills.map((skill, i) => {
              const isActive = selected?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  {...inView(i * 0.05)}
                  onClick={() => setSelected(skill)}
                  whileHover={{ y: -2 }}
                  style={{
                    textAlign: "left", padding: "1rem",
                    borderRadius: "0.75rem", cursor: "pointer",
                    background: isActive ? "#EFF6FF" : "#fff",
                    border: `1px solid ${isActive ? "#BFDBFE" : "#E5E7EB"}`,
                    boxShadow: isActive ? "0 2px 12px rgba(37,99,235,0.08)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{
                        padding: "0.35rem", borderRadius: "0.4rem",
                        background: isActive ? "#DBEAFE" : "#F3F4F6",
                        color: isActive ? "#2563EB" : "#6B7280",
                      }}>
                        {getIcon(skill.iconName)}
                      </div>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{skill.name}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isActive ? "#2563EB" : "#9CA3AF", fontFamily: "var(--font-mono)" }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{ height: "3px", background: "#E5E7EB", borderRadius: "999px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ height: "100%", background: isActive ? "#2563EB" : "#9CA3AF", borderRadius: "999px" }}
                    />
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "#9CA3AF", marginTop: "0.35rem", fontFamily: "var(--font-mono)" }}>
                    {skill.category}
                  </p>
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
            style={{
              padding: "1.5rem",
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "1rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              position: "sticky", top: "5.5rem",
              alignSelf: "start",
            }}
          >
            {/* Icon + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ padding: "0.65rem", borderRadius: "0.6rem", background: "#EFF6FF", color: "#2563EB" }}>
                {getIcon(selected?.iconName)}
              </div>
              <div>
                <p className="mono-tag">{selected?.category}</p>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginTop: "0.15rem" }}>{selected?.name}</h3>
              </div>
            </div>

            {/* Proficiency ring */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ position: "relative", width: "3.5rem", height: "3.5rem", flexShrink: 0 }}>
                <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="20" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                  <circle
                    cx="26" cy="26" r="20" fill="none"
                    stroke="#2563EB" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(2 * Math.PI * 20 * (selected?.level ?? 0)) / 100} 999`}
                  />
                </svg>
                <span style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700, color: "#2563EB", fontFamily: "var(--font-mono)",
                }}>
                  {selected?.level}%
                </span>
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>Proficiency</p>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "0.1rem" }}>
                  {(selected?.level ?? 0) >= 85 ? "Advanced" : (selected?.level ?? 0) >= 70 ? "Intermediate" : "Foundational"}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#6B7280", marginBottom: "1.25rem" }}>
              {DETAILS[selected?.name ?? ""]?.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p className="mono-tag" style={{ marginBottom: "0.25rem" }}>Key competencies</p>
              {(DETAILS[selected?.name ?? ""]?.points ?? []).map(pt => (
                <div key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle2 style={{ width: "0.9rem", height: "0.9rem", color: "#16A34A", flexShrink: 0, marginTop: "0.1rem" }} />
                  <span style={{ fontSize: "0.825rem", color: "#6B7280" }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
