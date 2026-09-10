import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, CheckCircle, Clock, Lightbulb, Play, Eye, Sparkles } from "lucide-react";
import { projects, Project, ProjectCategory } from "../data";

interface Props {
  onSelectProject: (proj: Project) => void;
  onOpenSubnet: () => void;
  onOpenTopology?: () => void;
  onOpenCyberToolkit?: () => void;
}

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

const CATEGORIES: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "network-security", label: "Networking & Security" },
  { key: "web-dev", label: "Web & Full-Stack" },
  { key: "cli-tools", label: "CLI & IT Tools" },
];

export default function Projects({ onSelectProject, onOpenSubnet, onOpenTopology, onOpenCyberToolkit }: Props) {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filteredProjects = projects.filter(p => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="section" style={{ background: "#0d1424", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "2rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Projects</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Engineered Systems &amp; Labs
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Real IT, networking architectures, security labs, and software solutions — no inflated metrics.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div {...inView(0.04)} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.2rem" }}>
          {CATEGORIES.map(cat => {
            const isActive = filter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                style={{
                  padding: "0.45rem 1rem", borderRadius: "0.45rem",
                  fontSize: "0.78rem", fontFamily: "var(--font-mono)",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#22d3ee" : "#94a3b8",
                  background: isActive ? "rgba(6,182,212,0.12)" : "#0a0f1e",
                  border: `1px solid ${isActive ? "rgba(6,182,212,0.4)" : "#1e293b"}`,
                  cursor: "pointer", transition: "all 0.18s",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Staggered grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.35rem" }}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, i) => {
              const S = STATUS[proj.status];
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
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
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    position: "relative",
                  }}
                >
                  {/* Card Top Category & Status */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <span style={{
                      fontSize: "0.65rem", fontFamily: "var(--font-mono)",
                      color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {proj.categoryLabel}
                    </span>

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

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(proj)}
                    style={{
                      fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.35,
                      cursor: "pointer", transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#22d3ee")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#f1f5f9")}
                  >
                    {proj.title}
                  </h3>

                  <p style={{ fontSize: "0.86rem", lineHeight: 1.68, color: "#94a3b8" }}>
                    {proj.description}
                  </p>

                  {/* Problem & Solution Mini Snippets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    <div style={{ padding: "0.6rem 0.8rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                      <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                        Problem
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        {proj.problem}
                      </p>
                    </div>
                    <div style={{ padding: "0.6rem 0.8rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                      <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                        Solution
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        {proj.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>

                  {/* Actions row */}
                  <div style={{ display: "flex", gap: "0.45rem", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid #1e293b", flexWrap: "wrap" }}>
                    
                    {/* Interactive Subnet Button */}
                    {proj.hasInteractiveDemo && proj.interactiveType === "subnet" && (
                      <motion.button
                        onClick={onOpenSubnet}
                        className="btn-primary"
                        style={{ flex: "1 1 auto", padding: "0.45rem 0.8rem", fontSize: "0.78rem", justifyContent: "center" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Play style={{ width: "0.78rem", height: "0.78rem" }} />
                        Launch Subnet Tool
                      </motion.button>
                    )}

                    {/* Interactive Topology Button */}
                    {proj.hasInteractiveDemo && proj.interactiveType === "topology" && onOpenTopology && (
                      <motion.button
                        onClick={onOpenTopology}
                        className="btn-primary"
                        style={{ flex: "1 1 auto", padding: "0.45rem 0.8rem", fontSize: "0.78rem", justifyContent: "center" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Play style={{ width: "0.78rem", height: "0.78rem" }} />
                        View Topology
                      </motion.button>
                    )}

                    {/* Interactive Cyber Security Toolkit Button */}
                    {proj.hasInteractiveDemo && proj.interactiveType === "cybertoolkit" && onOpenCyberToolkit && (
                      <motion.button
                        onClick={onOpenCyberToolkit}
                        className="btn-primary"
                        style={{ flex: "1 1 auto", padding: "0.45rem 0.8rem", fontSize: "0.78rem", justifyContent: "center" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Play style={{ width: "0.78rem", height: "0.78rem" }} />
                        Launch Security Tool
                      </motion.button>
                    )}

                    {/* Quick Details View */}
                    <motion.button
                      onClick={() => onSelectProject(proj)}
                      className="btn-ghost"
                      style={{ flex: "1 1 auto", justifyContent: "center", fontSize: "0.78rem", padding: "0.45rem 0.8rem" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye style={{ width: "0.78rem", height: "0.78rem" }} />
                      Details
                    </motion.button>

                    {/* GitHub Code */}
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} GitHub`}
                      className="btn-ghost"
                      style={{ flex: "1 1 auto", justifyContent: "center", fontSize: "0.78rem", padding: "0.45rem 0.8rem" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github style={{ width: "0.78rem", height: "0.78rem" }} />
                      Code
                    </motion.a>

                    {/* Live Demo if exists */}
                    {proj.demo && proj.demo.startsWith("http") && !proj.hasInteractiveDemo && (
                      <motion.a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${proj.title} Demo`}
                        className="btn-ghost"
                        style={{ flex: "1 1 auto", justifyContent: "center", fontSize: "0.78rem", padding: "0.45rem 0.8rem" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink style={{ width: "0.78rem", height: "0.78rem" }} />
                        Demo
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
