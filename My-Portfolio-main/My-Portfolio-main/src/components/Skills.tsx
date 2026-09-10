import { motion } from "motion/react";
import { Code2, Globe, Network, Shield, Cpu, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { skillCategories } from "../data";

const ICONS: Record<string, typeof Code2> = {
  code: Code2, globe: Globe, network: Network,
  shield: Shield, cpu: Cpu, tool: Wrench,
};

// Section reveal: viewport -15%, play once
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: "#0a0f1e", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Skills</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Technical Skill Matrix
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Competencies cultivated through KNUST computing coursework, lab experimentation, and active self-directed study.
          </p>
        </motion.div>

        {/* Staggered grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.35rem" }}>
          {skillCategories.map((cat, ci) => {
            const Icon = ICONS[cat.icon] || Code2;
            return (
              <motion.div
                key={cat.title}
                {...inView(ci * 0.05)}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(6,182,212,0.4)",
                  boxShadow: "0 8px 30px rgba(6,182,212,0.08)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                style={{
                  padding: "1.5rem",
                  background: "#0d1424",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  cursor: "default",
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <div style={{ padding: "0.55rem", background: "rgba(6,182,212,0.1)", borderRadius: "0.45rem" }}>
                      <Icon style={{ width: "1.1rem", height: "1.1rem", color: "#06b6d4" }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>{cat.title}</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.55, marginBottom: "1.1rem" }}>
                    {cat.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {cat.skills.map(skill => {
                    const isCore = skill.level === "Core";
                    return (
                      <span
                        key={skill.name}
                        className="skill-badge"
                        style={{
                          background: isCore ? "rgba(15,23,42,0.9)" : "#090d16",
                          borderColor: isCore ? "#1e293b" : "rgba(30,41,59,0.7)",
                          color: isCore ? "#e2e8f0" : "#94a3b8",
                        }}
                      >
                        <span style={{
                          width: "0.35rem", height: "0.35rem", borderRadius: "50%",
                          background: isCore ? "#06b6d4" : "#f59e0b",
                          flexShrink: 0,
                        }} />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
