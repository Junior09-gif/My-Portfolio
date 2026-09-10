import { motion, AnimatePresence } from "motion/react";
import { X, Github, ExternalLink, ShieldCheck, CheckCircle2, Layers, Cpu, Play } from "lucide-react";
import { Project } from "../data";

interface Props {
  project: Project | null;
  onClose: () => void;
  onOpenSubnet: () => void;
  onOpenTopology?: () => void;
  onOpenCyberToolkit?: () => void;
}

export default function ProjectModal({ project, onClose, onOpenSubnet, onOpenTopology, onOpenCyberToolkit }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.82)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        {/* Backdrop click */}
        <div style={{ position: "absolute", inset: 0 }} onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "44rem", maxHeight: "90vh",
            background: "#0d1424", border: "1px solid #1e293b",
            borderRadius: "0.85rem", boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Header banner */}
          <div style={{
            padding: "1.4rem", borderBottom: "1px solid #1e293b",
            background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(13,20,36,0.9) 100%)",
            position: "relative",
          }}>
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "1.1rem", right: "1.1rem",
                background: "#0a0f1e", border: "1px solid #1e293b", color: "#94a3b8",
                borderRadius: "0.4rem", padding: "0.35rem", cursor: "pointer", display: "flex",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >
              <X style={{ width: "1.1rem", height: "1.1rem" }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "0.68rem", fontFamily: "var(--font-mono)",
                color: "#22d3ee", background: "rgba(6,182,212,0.12)",
                padding: "0.2rem 0.6rem", borderRadius: "999px",
                border: "1px solid rgba(6,182,212,0.25)",
              }}>
                {project.categoryLabel}
              </span>
              <span style={{
                fontSize: "0.68rem", fontFamily: "var(--font-mono)",
                color: project.status === "completed" ? "#4ade80" : "#fbbf24",
                background: project.status === "completed" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                padding: "0.2rem 0.6rem", borderRadius: "999px",
                border: `1px solid ${project.status === "completed" ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"}`,
                textTransform: "capitalize",
              }}>
                ● {project.status}
              </span>
            </div>

            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginTop: "0.4rem", lineHeight: 1.6 }}>
              {project.description}
            </p>
          </div>

          {/* Body Content */}
          <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Problem & Solution Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem" }}>
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 600 }}>
                  Problem Context
                </p>
                <p style={{ fontSize: "0.825rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                  {project.problem}
                </p>
              </div>

              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 600 }}>
                  Engineered Solution
                </p>
                <p style={{ fontSize: "0.825rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.65rem", color: "#06b6d4" }}>
                  <ShieldCheck style={{ width: "0.95rem", height: "0.95rem" }} />
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                    Technical Highlights
                  </span>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: "0.2rem" }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "#22d3ee", flexShrink: 0, marginTop: "0.2rem" }} />
                      <span style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.55 }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture note */}
            {project.architecture && (
              <div style={{ padding: "0.85rem 1rem", background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.18)", borderRadius: "0.5rem", display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                <Layers style={{ width: "1rem", height: "1rem", color: "#06b6d4", flexShrink: 0, marginTop: "0.15rem" }} />
                <div>
                  <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#22d3ee", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "0.2rem" }}>
                    Architecture &amp; Implementation
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.55 }}>
                    {project.architecture}
                  </p>
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Technologies &amp; Protocols
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.tech.map(t => (
                  <span key={t} className="tech-tag" style={{ fontSize: "0.75rem", padding: "0.25rem 0.7rem" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div style={{
            padding: "1rem 1.4rem", borderTop: "1px solid #1e293b",
            background: "#090d16", display: "flex", flexWrap: "wrap",
            justifyContent: "space-between", alignItems: "center", gap: "0.75rem",
          }}>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {project.interactiveType === "subnet" && (
                <button
                  onClick={() => { onClose(); onOpenSubnet(); }}
                  className="btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                >
                  <Play style={{ width: "0.85rem", height: "0.85rem" }} />
                  Launch Subnet Tool
                </button>
              )}

              {project.interactiveType === "topology" && onOpenTopology && (
                <button
                  onClick={() => { onClose(); onOpenTopology(); }}
                  className="btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                >
                  <Play style={{ width: "0.85rem", height: "0.85rem" }} />
                  Launch Topology Viewer
                </button>
              )}

              {project.interactiveType === "cybertoolkit" && onOpenCyberToolkit && (
                <button
                  onClick={() => { onClose(); onOpenCyberToolkit(); }}
                  className="btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                >
                  <Play style={{ width: "0.85rem", height: "0.85rem" }} />
                  Launch Security Toolkit
                </button>
              )}

              {project.demo && project.demo.startsWith("http") && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                >
                  <ExternalLink style={{ width: "0.85rem", height: "0.85rem" }} />
                  Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                >
                  <Github style={{ width: "0.85rem", height: "0.85rem" }} />
                  View Repository
                </a>
              )}
            </div>

            <button className="btn-ghost" onClick={onClose} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
