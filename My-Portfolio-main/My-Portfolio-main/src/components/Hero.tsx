import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { profile } from "../data";

// ── Animation helpers ─────────────────────────────────────────────────────────
// Fade-up: opacity 0→1, translateY 15px→0, fast ease-out
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

export default function Hero() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  const [primaryHover, setPrimaryHover] = useState(false);

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
        animate={{ opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", paddingTop: "6rem", paddingBottom: "6rem",
        gap: "1.75rem",
      }}>

        {/* 1. Status — delay 0ms */}
        <motion.div {...fadeIn(0)}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.3rem 0.9rem",
            background: "rgba(6,182,212,0.07)",
            border: "1px solid rgba(6,182,212,0.22)",
            borderRadius: "999px",
            fontSize: "0.72rem", color: "#22d3ee",
            fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
          }}>
            <span className="animate-pulse-dot" style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            Open to internships &amp; collaboration — Kumasi, Ghana
          </span>
        </motion.div>

        {/* 2. Name/Title — delay 0ms */}
        <motion.div {...fadeUp(0)}>
          <h1 style={{
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "#f1f5f9",
          }}>
            Hi, I'm{" "}
            <span style={{ color: "#06b6d4" }}>Boadu Kofi</span>
            <br />
            <span style={{ color: "#f1f5f9" }}>Junior Edwin</span>
          </h1>
        </motion.div>

        {/* 3. Subheading badges — delay 100ms */}
        <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
          {[
            "Information Technology Student",
            "Aspiring Cybersecurity Professional",
            "Developer",
          ].map((item, i) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{
                padding: "0.35rem 1rem",
                background: "rgba(6,182,212,0.07)",
                border: "1px solid rgba(6,182,212,0.2)",
                borderRadius: "0.4rem",
                fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)",
                fontWeight: 500, color: "#22d3ee",
                fontFamily: "var(--font-mono)", letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}>
                {item}
              </span>
              {i < 2 && <span style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: 300 }}>·</span>}
            </span>
          ))}
        </motion.div>

        {/* 4. Bio text — delay 100ms */}
        <motion.p {...fadeUp(0.1)} style={{ fontSize: "1rem", lineHeight: 1.8, color: "#94a3b8", maxWidth: "38rem" }}>
          Driven by a childhood passion for technology, I'm building the skills to develop{" "}
          <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>secure, innovative solutions</strong>{" "}
          to real-world problems — starting at KNUST and reaching far beyond Ghana.
        </motion.p>

        {/* 5. CTA buttons — delay 200ms */}
        <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          {/* Primary with arrow slide on hover */}
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

          <motion.a
            href={profile.cvUrl}
            download
            className="btn-secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Download style={{ width: "0.9rem", height: "0.9rem" }} />
            Download CV
          </motion.a>
        </motion.div>

        {/* 6. Social links — delay 300ms */}
        <motion.div {...fadeIn(0.3)} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
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
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeIn(0.35)} style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0", paddingTop: "1.75rem",
          borderTop: "1px solid #1e293b", width: "100%", maxWidth: "32rem",
        }}>
          {[
            { value: "3+", label: "Projects" },
            { value: "BSc", label: "Degree" },
            { value: "2029", label: "Graduation" },
            { value: "KNUST", label: "University" },
          ].map(({ value, label }, i) => (
            <div key={label} style={{
              flex: "1 1 25%", textAlign: "center", padding: "0 0.75rem",
              borderRight: i < 3 ? "1px solid #1e293b" : "none",
            }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: "0.62rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button {...fadeIn(0.5)} onClick={() => scroll("#about")} aria-label="Scroll to About"
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer", color: "#1e293b" }}>
        <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
