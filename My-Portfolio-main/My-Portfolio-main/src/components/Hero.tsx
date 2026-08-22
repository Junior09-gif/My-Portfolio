import { motion } from "motion/react";
import { ArrowDown, Github, Mail, MapPin, Shield, Code2, Network } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps { profile: UserProfile; }

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut", delay },
});

export default function Hero({ profile }: HeroProps) {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "transparent",
        zIndex: 1,
      }}
    >
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: "52rem", margin: "0 auto",
        padding: "7rem 1.5rem 8rem",
        textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Status pill */}
        <motion.div {...fade(0.05)} style={{ marginBottom: "1.75rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(13,21,40,0.7)",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: "999px",
            fontSize: "0.78rem", color: "#8FA3C8",
            backdropFilter: "blur(12px)",
          }}>
            <span style={{ width: "0.45rem", height: "0.45rem", borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 6px #22C55E" }} />
            Available for internships &amp; collaborations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.12)}
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08,
            color: "#F0F4FF", marginBottom: "0.4rem",
          }}
        >
          Building software.
        </motion.h1>
        <motion.h1
          {...rise(0.2)}
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08,
            background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 40%, #06B6D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            marginBottom: "2rem",
          }}
        >
          Securing systems.
        </motion.h1>

        {/* Bio */}
        <motion.p
          {...rise(0.28)}
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.12rem)",
            lineHeight: 1.78, color: "#8FA3C8",
            maxWidth: "32rem", marginBottom: "0.75rem",
          }}
        >
          I'm{" "}
          <strong style={{ color: "#F0F4FF", fontWeight: 600 }}>Boadu Kofi Junior Edwin</strong>
          {" "}— IT student at KNUST building practical software and
          exploring the edges of cybersecurity.
        </motion.p>

        {/* Location */}
        <motion.div
          {...fade(0.3)}
          style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#4A5F80", marginBottom: "2.5rem" }}
        >
          <MapPin style={{ width: "0.85rem", height: "0.85rem", color: "#3B82F6" }} />
          Kumasi, Ghana · KNUST
        </motion.div>

        {/* CTA */}
        <motion.div
          {...rise(0.36)}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center", marginBottom: "3.75rem" }}
        >
          <button className="btn-primary" onClick={() => scroll("#projects")}>
            View Projects
          </button>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github style={{ width: "1rem", height: "1rem" }} />
            GitHub
          </a>
          <a href="#contact" onClick={e => { e.preventDefault(); scroll("#contact"); }} className="btn-secondary">
            <Mail style={{ width: "1rem", height: "1rem" }} />
            Contact Me
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.48)}
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            padding: "1.5rem 0", borderTop: "1px solid rgba(255,255,255,0.07)",
            width: "100%", maxWidth: "36rem", gap: 0,
          }}
        >
          {[
            { value: "3+", label: "Projects" },
            { value: "6", label: "Skills" },
            { value: "KNUST", label: "University" },
            { value: "2029", label: "Grad. Year" },
          ].map(({ value, label }, i) => (
            <div key={label} style={{
              flex: "1 1 25%", textAlign: "center", padding: "0 1rem",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#F0F4FF", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: "0.65rem", color: "#4A5F80", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Focus tags */}
        <motion.div
          {...fade(0.56)}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1.75rem" }}
        >
          {[
            { icon: Code2, label: "Software Dev" },
            { icon: Shield, label: "Cybersecurity" },
            { icon: Network, label: "Networking" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.35rem 0.85rem",
              background: "rgba(13,21,40,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              fontSize: "0.78rem", color: "#8FA3C8",
              backdropFilter: "blur(8px)",
            }}>
              <Icon style={{ width: "0.85rem", height: "0.85rem", color: "#3B82F6" }} />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(1.2)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          background: "none", border: "none", cursor: "pointer", color: "#2A3F60",
        }}
      >
        <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.9rem", height: "0.9rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
