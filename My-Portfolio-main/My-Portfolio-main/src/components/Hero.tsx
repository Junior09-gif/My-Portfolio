import { motion } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { profile } from "../data";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
});
const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

export default function Hero() {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, overflow: "hidden",
    }}>
      <div className="container" style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", paddingTop: "6rem", paddingBottom: "6rem",
        gap: "1.75rem",
      }}>

        {/* Status */}
        <motion.div {...fade(0.05)}>
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

        {/* Headline */}
        <motion.div {...rise(0.1)}>
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

        {/* Subheading */}
        <motion.p {...rise(0.2)} style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "#64748b", fontFamily: "var(--font-mono)",
          letterSpacing: "0.02em", maxWidth: "42rem",
        }}>
          Information Technology Student &nbsp;·&nbsp; Aspiring Cybersecurity Professional &nbsp;·&nbsp; Developer
        </motion.p>

        {/* Intro */}
        <motion.p {...rise(0.28)} style={{
          fontSize: "1rem", lineHeight: 1.8,
          color: "#94a3b8", maxWidth: "38rem",
        }}>
          Driven by a childhood passion for technology, I'm building the skills to develop{" "}
          <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>secure, innovative solutions</strong>{" "}
          to real-world problems — starting at KNUST and reaching far beyond Ghana.
        </motion.p>

        {/* Action buttons */}
        <motion.div {...rise(0.36)} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => scroll("#projects")}>
            <ArrowRight style={{ width: "0.9rem", height: "0.9rem" }} />
            View Projects
          </button>
          <a href={profile.cvUrl} download className="btn-secondary">
            <Download style={{ width: "0.9rem", height: "0.9rem" }} />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div {...fade(0.48)} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {[
            { icon: Github, href: profile.github, label: "GitHub" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="btn-ghost"
            >
              <Icon style={{ width: "0.9rem", height: "0.9rem" }} />
              {label}
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.56)} style={{
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
      <motion.button {...fade(1.3)} onClick={() => scroll("#about")} aria-label="Scroll to About"
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer", color: "#1e293b" }}>
        <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
