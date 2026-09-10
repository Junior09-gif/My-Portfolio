import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, Mail, Github, Linkedin, MapPin, CheckCircle2, Award, GraduationCap, Briefcase, Code2, Copy, Check } from "lucide-react";
import { profile, skillCategories, education, experiences, certifications } from "../data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyContact = () => {
    navigator.clipboard.writeText(`${profile.name} | ${profile.email} | ${profile.linkedin} | ${profile.github}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.85)",
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
            width: "100%", maxWidth: "48rem", maxHeight: "92vh",
            background: "#0d1424", border: "1px solid #1e293b",
            borderRadius: "0.85rem", boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Header Controls */}
          <div style={{
            padding: "1rem 1.4rem", borderBottom: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#090d16", position: "sticky", top: 0, zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>Curriculum Vitae Preview</h3>
              <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#22d3ee", background: "rgba(6,182,212,0.1)", padding: "0.15rem 0.5rem", borderRadius: "999px" }}>
                Official
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={handlePrint}
                className="btn-secondary"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
              >
                <Printer style={{ width: "0.8rem", height: "0.8rem" }} />
                Print / Save PDF
              </button>
              <button
                onClick={copyContact}
                className="btn-ghost"
                style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
              >
                {copied ? <Check style={{ width: "0.8rem", height: "0.8rem", color: "#22c55e" }} /> : <Copy style={{ width: "0.8rem", height: "0.8rem" }} />}
                {copied ? "Copied" : "Copy Info"}
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "1px solid #1e293b", color: "#94a3b8",
                  borderRadius: "0.4rem", padding: "0.35rem", cursor: "pointer", display: "flex",
                }}
              >
                <X style={{ width: "1.1rem", height: "1.1rem" }} />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Sheet */}
          <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "#0a0f1e" }}>
            
            {/* Header: Name & Contact Info */}
            <div style={{ borderBottom: "2px solid #1e293b", paddingBottom: "1.2rem" }}>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                {profile.name}
              </h1>
              <p style={{ fontSize: "0.9rem", color: "#06b6d4", fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "0.2rem" }}>
                {profile.title}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.75rem", fontSize: "0.78rem", color: "#94a3b8" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><MapPin style={{ width: "0.8rem", height: "0.8rem", color: "#06b6d4" }} /> {profile.location}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Mail style={{ width: "0.8rem", height: "0.8rem", color: "#06b6d4" }} /> {profile.email}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Github style={{ width: "0.8rem", height: "0.8rem", color: "#06b6d4" }} /> {profile.github}</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.5rem" }}>
                Professional Profile
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "#cbd5e1" }}>
                {profile.bio.join(" ")}
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>
                Education
              </h3>
              <div style={{ padding: "0.85rem 1rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>{education.degree}</h4>
                    <p style={{ fontSize: "0.82rem", color: "#22d3ee", fontFamily: "var(--font-mono)" }}>{education.institution}</p>
                  </div>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#64748b" }}>{education.period}</span>
                </div>
                <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {education.coursework.map(c => (
                    <span key={c} style={{ fontSize: "0.7rem", color: "#94a3b8", background: "#0a0f1e", padding: "0.15rem 0.45rem", borderRadius: "0.25rem", border: "1px solid #1e293b" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>
                Technical Skills &amp; Proficiencies
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.6rem" }}>
                {skillCategories.map(cat => (
                  <div key={cat.title} style={{ padding: "0.7rem 0.85rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.4rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22d3ee", marginBottom: "0.25rem" }}>{cat.title}</p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{cat.skills.map(s => s.name).join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Experience */}
            <div>
              <h3 style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>
                Practical Labs &amp; Activities
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {experiences.map(exp => (
                  <div key={exp.id} style={{ padding: "0.85rem 1rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.45rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#f1f5f9" }}>{exp.role}</h4>
                      <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#64748b" }}>{exp.period}</span>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "#06b6d4", fontFamily: "var(--font-mono)", marginBottom: "0.4rem" }}>{exp.org}</p>
                    <ul style={{ paddingLeft: "1rem", fontSize: "0.78rem", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>
                Certifications &amp; Credentials
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.6rem" }}>
                {certifications.map(c => (
                  <div key={c.id} style={{ padding: "0.7rem 0.85rem", background: "#0d1424", border: "1px solid #1e293b", borderRadius: "0.4rem" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#f1f5f9" }}>{c.title}</p>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>{c.issuer} · <span style={{ color: "#22d3ee" }}>{c.year}</span></p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div style={{
            padding: "0.9rem 1.4rem", borderTop: "1px solid #1e293b",
            background: "#090d16", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <p style={{ fontSize: "0.72rem", color: "#475569", fontFamily: "var(--font-mono)" }}>
              BSc. Information Technology · KNUST
            </p>
            <button className="btn-secondary" onClick={onClose} style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}>
              Close Preview
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
