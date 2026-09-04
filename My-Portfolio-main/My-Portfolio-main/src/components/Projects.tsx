import { motion } from "motion/react";
import { Github, ExternalLink, CheckCircle, Clock, Lightbulb } from "lucide-react";
import { projects } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay },
});

const STATUS: Record<string, { icon: typeof CheckCircle; label: string; color: string }> = {
  "completed": { icon: CheckCircle, label: "Completed", color: "#22c55e" },
  "in-progress": { icon: Clock, label: "In Progress", color: "#f59e0b" },
  "planned": { icon: Lightbulb, label: "Planned", color: "#64748b" },
};

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: "#0d1424", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Projects</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Things I've built
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Real projects — no fabricated repos or inflated metrics.
          </p>
        </motion.div>

        {/* Staggered grid — 50ms between cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {projects.map((proj, i) => {
            const S = STATUS[proj.status];
            return (
              <motion.div key={proj.id}
                {...inView(i * 0.05)}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(6,182,212,0.4)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                style={{
                  padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem",
                  background: "#0a0f1e",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>{proj.title}</h3>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                    padding: "0.18rem 0.6rem", borderRadius: "999px", flexShrink: 0,
                    fontSize: "0.65rem", fontFamily: "var(--font-mono)",
                    color: S.color, background: `${S.color}14`, border: `1px solid ${S.color}30`,
                  }}>
                    <S.icon style={{ width: "0.65rem", height: "0.65rem" }} />
                    {S.label}
                  </span>
                </div>

                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>{proj.description}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ padding: "0.65rem 0.85rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                    <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Problem</p>
                    <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.55 }}>{proj.problem}</p>
                  </div>
                  <div style={{ padding: "0.65rem 0.85rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                    <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Solution</p>
                    <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.55 }}>{proj.solution}</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid #1e293b" }}>
                  <motion.a href={proj.github} target="_blank" rel="noopener noreferrer"
                    aria-label={`${proj.title} GitHub`}
                    className="btn-ghost"
                    style={{ flex: 1, justifyContent: "center" }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Github style={{ width: "0.85rem", height: "0.85rem" }} />Code
                  </motion.a>
                  {proj.demo ? (
                    <motion.a href={proj.demo} target="_blank" rel="noopener noreferrer"
                      aria-label={`${proj.title} Live Demo`}
                      className="btn-ghost"
                      style={{ flex: 1, justifyContent: "center" }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ExternalLink style={{ width: "0.85rem", height: "0.85rem" }} />Demo
                    </motion.a>
                  ) : (
                    <span className="btn-ghost" style={{ flex: 1, justifyContent: "center", opacity: 0.4, cursor: "default" }}>
                      No demo yet
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
