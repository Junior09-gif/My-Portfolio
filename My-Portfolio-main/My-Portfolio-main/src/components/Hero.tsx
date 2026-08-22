import { motion } from "motion/react";
import { ArrowDown, Github, Mail, MapPin, Shield, Code2, Network } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps { profile: UserProfile; }

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

export default function Hero({ profile }: HeroProps) {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "4rem",
      }}
    >
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(#E0E7FF 1px, transparent 1px), linear-gradient(90deg, #E0E7FF 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.3,
      }} />

      {/* Top gradient fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to bottom, #F0F7FF, transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "56rem", margin: "0 auto",
        padding: "5rem 1.5rem 8rem",
        textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Status badge */}
        <motion.div {...fade(0.05)} style={{ marginBottom: "1.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            padding: "0.35rem 0.9rem",
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: "999px",
            fontSize: "0.78rem", color: "#6B7280",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            <span style={{
              width: "0.45rem", height: "0.45rem", borderRadius: "50%",
              background: "#16A34A", flexShrink: 0,
            }} />
            Available for internships &amp; collaborations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.12)}
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          Building software.
        </motion.h1>
        <motion.h1
          {...rise(0.2)}
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#2563EB",
            marginBottom: "1.75rem",
          }}
        >
          Securing systems.
        </motion.h1>

        {/* Bio */}
        <motion.p
          {...rise(0.28)}
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            lineHeight: 1.75,
            color: "#6B7280",
            maxWidth: "34rem",
            marginBottom: "2.25rem",
          }}
        >
          I'm{" "}
          <strong style={{ color: "#111827", fontWeight: 600 }}>
            Boadu Kofi Junior Edwin
          </strong>
          {" "}— IT student at KNUST building practical software and
          exploring the edges of cybersecurity.
        </motion.p>

        {/* Location */}
        <motion.div
          {...fade(0.3)}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "2.5rem",
          }}
        >
          <MapPin style={{ width: "0.85rem", height: "0.85rem", color: "#2563EB" }} />
          Kumasi, Ghana · KNUST
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          {...rise(0.36)}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center", marginBottom: "4rem" }}
        >
          <button
            className="btn-primary"
            onClick={() => scroll("#projects")}
          >
            View Projects
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github style={{ width: "1rem", height: "1rem" }} />
            GitHub
          </a>

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scroll("#contact"); }}
            className="btn-secondary"
          >
            <Mail style={{ width: "1rem", height: "1rem" }} />
            Contact Me
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fade(0.48)}
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0",
            padding: "1.5rem 0",
            borderTop: "1px solid #E5E7EB",
            width: "100%", maxWidth: "36rem",
          }}
        >
          {[
            { value: "3+", label: "Projects" },
            { value: "6", label: "Skills" },
            { value: "KNUST", label: "University" },
            { value: "2029", label: "Grad. Year" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                flex: "1 1 25%", textAlign: "center", padding: "0 1rem",
                borderRight: i < 3 ? "1px solid #E5E7EB" : "none",
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }}>
                {value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.2rem" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Focus areas */}
        <motion.div
          {...fade(0.55)}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "2rem" }}
        >
          {[
            { icon: Code2, label: "Software Dev" },
            { icon: Shield, label: "Cybersecurity" },
            { icon: Network, label: "Networking" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.35rem 0.8rem",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "999px",
                fontSize: "0.78rem", color: "#374151",
              }}
            >
              <Icon style={{ width: "0.85rem", height: "0.85rem", color: "#2563EB" }} />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(1.1)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          background: "none", border: "none", cursor: "pointer", color: "#D1D5DB",
        }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          scroll
        </span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.9rem", height: "0.9rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
