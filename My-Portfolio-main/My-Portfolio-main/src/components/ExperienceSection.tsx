import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Briefcase, Code2, GraduationCap, ShieldCheck, Check, X } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  title: string;
  category: "tech" | "media" | "education";
  description: string;
  icon: React.ReactNode;
  largeIcon: React.ReactNode;
  achievements: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: "pensa-knust",
    year: "2026 / 2027",
    title: "Assistant Web & App Head at PENSA-KNUST",
    category: "tech",
    description: "Overseeing development and technical needs of the department's web/app platforms while mentoring junior developers.",
    icon: <Code2 style={{ width: "1.25rem", height: "1.25rem" }} />,
    largeIcon: <Code2 style={{ width: "1.85rem", height: "1.85rem" }} />,
    achievements: [
      "Successfully delivered projects ahead of schedule",
      "Implemented innovative solutions that increased efficiency",
      "Received recognition for exceptional work quality",
      "Stewarding digital platforms that connect thousands of university students and alumni",
    ],
  },
  {
    id: "knust-it",
    year: "2026 – Expected 2029",
    title: "Undergraduate IT Student at KNUST",
    category: "education",
    description: "Pursuing BSc. Information Technology in Kumasi, Ghana — building deep expertise in software engineering, networking, and system security.",
    icon: <GraduationCap style={{ width: "1.25rem", height: "1.25rem" }} />,
    largeIcon: <GraduationCap style={{ width: "1.85rem", height: "1.85rem" }} />,
    achievements: [
      "Mastering L2/L3 networking, Cisco Packet Tracer simulations, and TCP/IP architecture",
      "Developing algorithmic and software foundations with C++, Python, and TypeScript",
      "Active participant in computing peer study groups and university laboratory experiments",
    ],
  },
  {
    id: "lab-projects",
    year: "2024 – Present",
    title: "Practical Systems & Cybersecurity Projects",
    category: "tech",
    description: "Architecting practical software tools and interactive labs including CIDR Subnet Calculators, Network Topology visualizers, and defensive scripts.",
    icon: <Briefcase style={{ width: "1.25rem", height: "1.25rem" }} />,
    largeIcon: <Briefcase style={{ width: "1.85rem", height: "1.85rem" }} />,
    achievements: [
      "Engineered browser-based networking utilities and terminal emulators with React",
      "Implemented clean, modular, and responsive user interfaces with Tailwind CSS",
      "Applied defensive security guidelines and authentication hygiene across codebases",
    ],
  },
  {
    id: "skill-mastery",
    year: "Continuous Learning",
    title: "Self-Directed Technical Skill Mastery",
    category: "tech",
    description: "Continuously expanding capabilities in Linux CLI administration, network packet inspection with Wireshark/Nmap, and cloud-native practices.",
    icon: <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} />,
    largeIcon: <ShieldCheck style={{ width: "1.85rem", height: "1.85rem" }} />,
    achievements: [
      "Hands-on Linux system administration across Ubuntu and Debian environments",
      "Coursework and lab experiments in cybersecurity fundamentals and threat mitigation",
      "Committed to producing clean, maintainable, and well-documented open-source code",
    ],
  },
];

export default function ExperienceSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <section id="experience" className="section" style={{ position: "relative", zIndex: 1, padding: "5rem 0" }}>
      <div className="container" style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section Heading matching AmassTech */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "0.85rem",
              letterSpacing: "-0.02em",
            }}
          >
            My <span style={{ color: "#315EFB" }}>Journey</span>
          </motion.h2>

          {/* Animated gradient underline bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              height: "4px",
              background: "linear-gradient(to right, #315EFB, #f97316)",
              margin: "0 auto 1rem",
              borderRadius: "2px",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ fontSize: "1rem", color: "#475569", maxWidth: "34rem", margin: "0 auto" }}
          >
            Key milestones in technical leadership, academic foundations, and practical engineering.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div style={{ position: "relative", width: "100%", padding: "2rem 0" }}>

          {/* Vertical gradient center line */}
          <div
            className="timeline-track"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, #315EFB, #64748B, #f97316)",
            }}
          />

          <div style={{ position: "relative" }}>
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`timeline-row ${isEven ? "timeline-row-reverse" : ""}`}
                  style={{ position: "relative", marginBottom: "3.5rem" }}
                >
                  {/* Card side */}
                  <div className="timeline-card-col">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      style={{
                        padding: "1.5rem 1.65rem",
                        borderRadius: "1rem",
                        background: "rgba(15, 23, 42, 0.94)",
                        border: "1px solid rgba(49, 94, 251, 0.35)",
                        boxShadow: "0 12px 30px -8px rgba(15, 23, 42, 0.4), 0 0 20px rgba(49, 94, 251, 0.12)",
                        maxWidth: "28rem",
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Subtle hover gradient shine */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(135deg, rgba(49,94,251,0.08) 0%, rgba(249,115,22,0.05) 100%)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Date Badge */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                        <Calendar style={{ width: "1rem", height: "1rem", color: "#94a3b8" }} />
                        <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                          {item.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem", lineHeight: 1.35 }}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.65, marginBottom: "1rem" }}>
                        {item.description}
                      </p>

                      {/* Learn More Button */}
                      <button
                        onClick={() => setSelectedMilestone(item)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "#60a5fa",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          transition: "color 0.18s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#60a5fa")}
                      >
                        Learn more
                      </button>
                    </motion.div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="timeline-center-node">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 * idx }}
                      style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        borderRadius: "50%",
                        background: "#315EFB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        boxShadow: "0 0 0 4px rgba(199, 227, 225, 0.9), 0 0 20px rgba(49, 94, 251, 0.5)",
                        zIndex: 10,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="timeline-empty-col" />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Pop-up Modal matching Image 2 */}
      <AnimatePresence>
        {selectedMilestone && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(5, 10, 24, 0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "32rem",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2rem 1.85rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, rgba(14, 28, 64, 0.97) 0%, rgba(11, 16, 32, 0.98) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.45)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(49, 94, 251, 0.25)",
                color: "#ffffff",
              }}
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedMilestone(null)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "50%",
                  background: "#1e40af",
                  border: "none",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1e40af")}
              >
                ✕
              </button>

              {/* Icon badge top-left */}
              <div
                style={{
                  width: "3.75rem",
                  height: "3.75rem",
                  borderRadius: "50%",
                  background: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                  boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
                }}
              >
                {selectedMilestone.largeIcon}
              </div>

              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#94a3b8", fontSize: "0.9rem" }}>
                <Calendar style={{ width: "1.1rem", height: "1.1rem" }} />
                <span>{selectedMilestone.year}</span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "0.85rem", color: "#ffffff", lineHeight: 1.3 }}>
                {selectedMilestone.title}
              </h2>

              {/* Description */}
              <p style={{ fontSize: "0.925rem", lineHeight: 1.68, color: "#cbd5e1", marginBottom: "1.5rem" }}>
                {selectedMilestone.description}
              </p>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #334155", paddingTop: "1.25rem", marginTop: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.85rem", color: "#ffffff" }}>
                  Key Achievements
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem", listStyle: "none", padding: 0 }}>
                  {selectedMilestone.achievements.map((ach, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", color: "#e2e8f0", fontSize: "0.88rem", lineHeight: 1.55 }}>
                      <span style={{ color: "#4ade80", fontWeight: 800, marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .timeline-track {
          left: 50%;
          transform: translateX(-50%);
        }
        .timeline-row {
          display: flex;
          align-items: center;
        }
        .timeline-card-col {
          width: 50%;
          display: flex;
          justify-content: flex-end;
          padding-right: 2.5rem;
        }
        .timeline-row-reverse .timeline-card-col {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: 2.5rem;
          order: 2;
        }
        .timeline-center-node {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-empty-col {
          width: 50%;
        }
        .timeline-row-reverse .timeline-empty-col {
          order: 1;
        }

        @media (max-width: 768px) {
          .timeline-track {
            left: 1.4rem;
            transform: none;
          }
          .timeline-row, .timeline-row-reverse {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .timeline-card-col, .timeline-row-reverse .timeline-card-col {
            width: 100%;
            justify-content: flex-start;
            padding-left: 3.5rem !important;
            padding-right: 0 !important;
            order: 2 !important;
          }
          .timeline-center-node {
            left: 1.4rem;
            transform: translateX(-50%);
            top: 1.25rem;
          }
          .timeline-empty-col, .timeline-row-reverse .timeline-empty-col {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
