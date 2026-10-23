import React from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Play } from "lucide-react";
import { projects, Project } from "../data";

interface ProjectsProps {
  onSelectProject: (p: Project) => void;
  onOpenSubnet: () => void;
  onOpenTopology: () => void;
  onOpenCyberToolkit: () => void;
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  "completed": { label: "Completed", color: "#16a34a", bg: "#f0fdf4" },
  "in-progress": { label: "In Progress", color: "#d97706", bg: "#fffbeb" },
  "planned": { label: "Planned", color: "#9BA3AE", bg: "#F3F4F6" },
};

export default function Projects({ onSelectProject, onOpenSubnet, onOpenTopology, onOpenCyberToolkit }: ProjectsProps) {
  const handleLaunch = (proj: Project) => {
    if (proj.interactiveType === "subnet") { onOpenSubnet(); return; }
    if (proj.interactiveType === "topology") { onOpenTopology(); return; }
    if (proj.interactiveType === "cybertoolkit") { onOpenCyberToolkit(); return; }
    if (proj.demo) window.open(proj.demo, "_blank");
  };

  return (
    <section id="projects" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3.5rem", maxWidth: "40rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Projects</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Featured Projects</h2>
          <p className="section-subtitle">
            Real projects — each one built to solve a genuine problem or deepen my understanding.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {projects.map((proj, i) => {
            const S = STATUS[proj.status] || STATUS["planned"];
            return (
              <motion.div key={proj.id}
                {...inView(i * 0.06)}
                whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(23,26,33,0.1)", borderColor: "#D1D5DB", transition: { duration: 0.2 } }}
                style={{
                  display: "flex", flexDirection: "column",
                  background: "#FFFFFF", border: "1px solid #E5E7EB",
                  borderRadius: "0.875rem", overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => onSelectProject(proj)}
              >
                {/* Colored header bar */}
                <div style={{
                  height: "4px",
                  background: "linear-gradient(90deg, #315EFB, #6b8dfd)",
                }} />

                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                  {/* Status + category */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-mono)",
                      color: "#315EFB", textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {proj.categoryLabel || "Project"}
                    </span>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 600, padding: "0.18rem 0.6rem",
                      borderRadius: "999px", color: S.color, background: S.bg,
                    }}>
                      {S.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#171A21", lineHeight: 1.35 }}>
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#667085", flex: 1 }}>
                    {proj.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {proj.tech.slice(0, 4).map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="tech-tag">+{proj.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #F3F4F6" }}
                    onClick={e => e.stopPropagation()}
                  >
                    {(proj.interactiveType || proj.demo) && (
                      <button className="btn-primary"
                        style={{ flex: 1, justifyContent: "center", padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                        onClick={() => handleLaunch(proj)}
                      >
                        <Play style={{ width: "0.8rem", height: "0.8rem" }} />
                        {proj.interactiveType ? "Launch Tool" : "Live Demo"}
                      </button>
                    )}
                    {proj.github && proj.github !== "https://github.com/Junior09-gif" && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ flex: 1, justifyContent: "center", padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                      >
                        <Github style={{ width: "0.8rem", height: "0.8rem" }} />
                        Code
                      </a>
                    )}
                    {proj.demo && !proj.interactiveType && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ flex: 1, justifyContent: "center", padding: "0.5rem 0.75rem", fontSize: "0.8rem" }}
                      >
                        <ExternalLink style={{ width: "0.8rem", height: "0.8rem" }} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
