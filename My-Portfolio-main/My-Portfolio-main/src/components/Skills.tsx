import { motion } from "motion/react";
import { Code2, Globe, Network, Shield, Cpu, Wrench } from "lucide-react";
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
            Technical skill matrix
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Organized by category — skills reflect current study and hands-on practice.
          </p>
        </motion.div>

        {/* Staggered grid: 50ms between each card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {skillCategories.map((cat, ci) => {
            const Icon = ICONS[cat.icon] || Code2;
            return (
              <motion.div key={cat.title}
                {...inView(ci * 0.05)}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(6,182,212,0.4)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                style={{
                  padding: "1.35rem",
                  background: "#0d1424",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  cursor: "default",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                  <div style={{ padding: "0.45rem", background: "rgba(6,182,212,0.08)", borderRadius: "0.4rem" }}>
                    <Icon style={{ width: "1rem", height: "1rem", color: "#06b6d4" }} />
                  </div>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9" }}>{cat.title}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {cat.skills.map(skill => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
