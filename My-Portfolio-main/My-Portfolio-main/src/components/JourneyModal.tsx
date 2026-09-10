import { motion, AnimatePresence } from "motion/react";
import { X, Users, GraduationCap, Code2, Hammer, ShieldCheck, Target, ArrowRight, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { JourneyMilestone } from "../data";

interface Props {
  milestone: JourneyMilestone | null;
  onClose: () => void;
  onNavigateSection?: (href: string) => void;
}

const ICONS = {
  users: Users,
  graduation: GraduationCap,
  code: Code2,
  hammer: Hammer,
  shield: ShieldCheck,
  target: Target,
};

export default function JourneyModal({ milestone, onClose, onNavigateSection }: Props) {
  if (!milestone) return null;

  const Icon = ICONS[milestone.icon] || Target;

  const handleAction = () => {
    if (milestone.details.learnMoreAction?.type === "section" && onNavigateSection) {
      onClose();
      onNavigateSection(milestone.details.learnMoreAction.target);
    }
  };

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.84)",
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
            width: "100%", maxWidth: "42rem", maxHeight: "90vh",
            background: "#0d1424", border: "1px solid #1e293b",
            borderRadius: "0.85rem", boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "1.4rem", borderBottom: "1px solid #1e293b",
            background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(13,20,36,0.95) 100%)",
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
                color: milestone.categoryColor, background: `${milestone.categoryColor}18`,
                padding: "0.2rem 0.6rem", borderRadius: "999px",
                border: `1px solid ${milestone.categoryColor}35`,
                fontWeight: 600,
              }}>
                {milestone.category}
              </span>
              <span style={{
                fontSize: "0.68rem", fontFamily: "var(--font-mono)",
                color: "#94a3b8", background: "#0a0f1e",
                padding: "0.2rem 0.6rem", borderRadius: "999px",
                border: "1px solid #1e293b",
              }}>
                {milestone.period}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginTop: "0.4rem" }}>
              <div style={{
                padding: "0.5rem", background: `${milestone.categoryColor}15`,
                borderRadius: "0.5rem", border: `1px solid ${milestone.categoryColor}30`,
                color: milestone.categoryColor, flexShrink: 0,
              }}>
                <Icon style={{ width: "1.2rem", height: "1.2rem" }} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.25 }}>
                  {milestone.title}
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#06b6d4", fontFamily: "var(--font-mono)" }}>
                  {milestone.org}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Overview */}
            <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.55rem" }}>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem", fontWeight: 600 }}>
                Milestone Overview
              </p>
              <p style={{ fontSize: "0.86rem", color: "#cbd5e1", lineHeight: 1.7 }}>
                {milestone.details.overview}
              </p>
            </div>

            {/* Key Points & Contributions */}
            <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.55rem" }}>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.65rem", fontWeight: 600 }}>
                Key Initiatives &amp; Responsibilities
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "0.1rem" }}>
                {milestone.details.points.map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: milestone.categoryColor, flexShrink: 0, marginTop: "0.22rem" }} />
                    <span style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.6 }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Technologies & Competencies */}
            <div>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Technologies &amp; Competencies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {milestone.details.technologies.map(t => (
                  <span key={t} className="tech-tag" style={{ fontSize: "0.75rem", padding: "0.25rem 0.65rem" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div style={{
            padding: "1rem 1.4rem", borderTop: "1px solid #1e293b",
            background: "#090d16", display: "flex", justifyContent: "space-between",
            alignItems: "center", gap: "0.75rem", flexWrap: "wrap",
          }}>
            {milestone.details.learnMoreAction?.type === "section" ? (
              <button
                onClick={handleAction}
                className="btn-primary"
                style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
              >
                <ArrowRight style={{ width: "0.85rem", height: "0.85rem" }} />
                {milestone.details.learnMoreAction.label}
              </button>
            ) : (
              <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                Part of Edwin Boadu's IT Career Progression
              </span>
            )}

            <button className="btn-ghost" onClick={onClose} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
