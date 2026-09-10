import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail, ArrowRight, Terminal, Network, Shield, Copy, Check, FileText } from "lucide-react";
import { profile } from "../data";
import headshotPhoto from "../assets/images/edwin_headshot.jpg";

interface Props {
  onOpenTerminal?: () => void;
  onOpenSubnet?: () => void;
  onOpenResume?: () => void;
  onOpenCyberToolkit?: () => void;
}

const ROTATING_TITLES = [
  "Information Technology Student @ KNUST",
  "Aspiring Cybersecurity Specialist",
  "Network Engineering & Cisco Labs",
  "Full-Stack Software Developer",
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut", delay },
});

export default function Hero({ onOpenTerminal, onOpenSubnet, onOpenResume, onOpenCyberToolkit }: Props) {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  const [primaryHover, setPrimaryHover] = useState(false);
  const [titleIdx, setTitleIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx(prev => (prev + 1) % ROTATING_TITLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, overflow: "hidden",
    }}>

      {/* ── Hero background: faint grid + corner glow ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(30,41,59,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.5,
      }} />
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "-20%", left: "-10%",
          width: "50vw", height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", paddingTop: "6.5rem", paddingBottom: "5.5rem",
        gap: "1.6rem", position: "relative", zIndex: 2,
      }}>

        {/* 1. Profile Avatar & Status Pill */}
        <motion.div {...fadeIn(0)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          
          {/* Avatar with cyber neon border */}
          <div style={{ position: "relative" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", inset: -5, borderRadius: "50%",
                background: "conic-gradient(from 0deg, transparent 0 300deg, #06b6d4 360deg)",
                opacity: 0.85,
              }}
            />
            <div style={{
              position: "relative", width: "7.5rem", height: "7.5rem", borderRadius: "50%",
              overflow: "hidden", border: "2px solid #06b6d4",
              background: "#090d16", boxShadow: "0 0 30px rgba(6,182,212,0.45)",
            }}>
              <img
                src={headshotPhoto}
                alt={profile.name}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <span style={{
              position: "absolute", bottom: "4px", right: "6px",
              width: "1.2rem", height: "1.2rem", borderRadius: "50%",
              background: "#22c55e", border: "2.5px solid #0a0f1e",
              boxShadow: "0 0 10px #22c55e",
            }} title="Online / Open to opportunities" />
          </div>

          {/* Status Badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.32rem 0.95rem",
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.25)",
            borderRadius: "999px",
            fontSize: "0.74rem", color: "#22d3ee",
            fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
          }}>
            <span className="animate-pulse-dot" style={{ width: "0.45rem", height: "0.45rem", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            Open to internships &amp; IT roles — KNUST, Kumasi, Ghana
          </span>
        </motion.div>

        {/* 2. Name / Title */}
        <motion.div {...fadeUp(0.05)}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5.8vw, 4.4rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "#f1f5f9",
          }}>
            Hi, I'm{" "}
            <span style={{ color: "#06b6d4", textShadow: "0 0 30px rgba(6,182,212,0.4)" }}>Boadu Kofi</span>
            <br />
            <span style={{ color: "#f1f5f9" }}>Junior Edwin</span>
          </h1>
        </motion.div>

        {/* 3. Dynamic Rotating Title Pill */}
        <motion.div {...fadeUp(0.1)} style={{ minHeight: "2.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={titleIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.38rem 1.1rem",
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: "0.5rem",
                boxShadow: "0 0 15px rgba(6,182,212,0.1)",
              }}
            >
              <Terminal style={{ width: "0.85rem", height: "0.85rem", color: "#06b6d4" }} />
              <span style={{
                fontSize: "clamp(0.82rem, 1.6vw, 0.98rem)",
                fontWeight: 600, color: "#22d3ee",
                fontFamily: "var(--font-mono)", letterSpacing: "0.02em",
              }}>
                {ROTATING_TITLES[titleIdx]}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 4. Bio text */}
        <motion.p {...fadeUp(0.12)} style={{ fontSize: "1rem", lineHeight: 1.8, color: "#94a3b8", maxWidth: "39rem" }}>
          Driven by a childhood fascination with computer systems, I combine{" "}
          <strong style={{ color: "#22d3ee", fontWeight: 600 }}>networking fundamentals</strong>,{" "}
          <strong style={{ color: "#38bdf8", fontWeight: 600 }}>cybersecurity defense</strong>, and{" "}
          <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>modern software development</strong>{" "}
          to engineer resilient digital infrastructure — at KNUST and beyond.
        </motion.p>

        {/* 5. CTA buttons */}
        <motion.div {...fadeUp(0.18)} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", alignItems: "center" }}>
          
          {/* Primary View Projects */}
          <motion.button
            className="btn-primary"
            onClick={() => scroll("#projects")}
            onHoverStart={() => setPrimaryHover(true)}
            onHoverEnd={() => setPrimaryHover(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}
          >
            <motion.span
              animate={{ x: primaryHover ? 4 : 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ArrowRight style={{ width: "0.9rem", height: "0.9rem" }} />
            </motion.span>
            View Projects
          </motion.button>

          {/* Interactive Shell Trigger */}
          {onOpenTerminal && (
            <motion.button
              onClick={onOpenTerminal}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ borderColor: "rgba(6,182,212,0.35)", color: "#22d3ee" }}
            >
              <Terminal style={{ width: "0.9rem", height: "0.9rem", color: "#06b6d4" }} />
              Launch Terminal
            </motion.button>
          )}

          {/* Subnet Toolkit Trigger */}
          {onOpenSubnet && (
            <motion.button
              onClick={onOpenSubnet}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ borderColor: "rgba(6,182,212,0.35)", color: "#22d3ee" }}
            >
              <Network style={{ width: "0.9rem", height: "0.9rem", color: "#06b6d4" }} />
              Subnet Tool
            </motion.button>
          )}

          {/* Security Toolkit Trigger */}
          {onOpenCyberToolkit && (
            <motion.button
              onClick={onOpenCyberToolkit}
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ borderColor: "rgba(6,182,212,0.35)", color: "#22d3ee" }}
            >
              <Shield style={{ width: "0.9rem", height: "0.9rem", color: "#06b6d4" }} />
              Cyber Toolkit
            </motion.button>
          )}

          {/* View Resume / Download CV */}
          <motion.button
            onClick={() => onOpenResume ? onOpenResume() : null}
            className="btn-secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <FileText style={{ width: "0.9rem", height: "0.9rem" }} />
            Curriculum Vitae
          </motion.button>
        </motion.div>

        {/* 6. Social & Contact quick buttons */}
        <motion.div {...fadeIn(0.24)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email Me" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Icon style={{ width: "0.9rem", height: "0.9rem" }} />
              {label}
            </motion.a>
          ))}

          {/* Quick Copy Email Button */}
          <motion.button
            onClick={copyEmail}
            className="btn-ghost"
            style={{ color: copied ? "#4ade80" : "#64748b", borderColor: copied ? "rgba(34,197,94,0.4)" : "#1e293b" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check style={{ width: "0.85rem", height: "0.85rem" }} /> : <Copy style={{ width: "0.85rem", height: "0.85rem" }} />}
            {copied ? "Copied!" : "Copy Email"}
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div {...fadeIn(0.3)} style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0", paddingTop: "1.75rem",
          borderTop: "1px solid #1e293b", width: "100%", maxWidth: "34rem",
        }}>
          {profile.stats.map(({ value, label }, i) => (
            <div key={label} style={{
              flex: "1 1 25%", textAlign: "center", padding: "0 0.75rem",
              borderRight: i < profile.stats.length - 1 ? "1px solid #1e293b" : "none",
            }}>
              <div style={{ fontSize: "1.45rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: "0.65rem", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button {...fadeIn(0.4)} onClick={() => scroll("#about")} aria-label="Scroll to About"
        style={{ position: "absolute", bottom: "2.2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer", color: "#475569" }}>
        <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
