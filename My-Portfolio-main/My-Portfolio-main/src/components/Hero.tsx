import { motion } from "motion/react";
import { ArrowDown, Github, Mail, Instagram, Youtube, Linkedin } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps { profile: UserProfile; }

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
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
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "transparent", zIndex: 1,
      }}
    >
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: "42rem", margin: "0 auto",
        padding: "7rem 1.5rem 8rem",
        textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Wave greeting */}
        <motion.div {...fade(0.05)} style={{ marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "2.8rem" }}>👋</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...rise(0.12)}
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "#F0F4FF", marginBottom: "1rem",
          }}
        >
          Hi, I'm{" "}
          <span style={{
            background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #06B6D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Edwin
          </span>
        </motion.h1>

        {/* Role tag */}
        <motion.div {...rise(0.2)} style={{ marginBottom: "1.75rem" }}>
          <span style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #6366F1 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            letterSpacing: "0.02em",
          }}>
            IT Student &nbsp;·&nbsp; Dev &nbsp;·&nbsp; Cyber Enthusiast
          </span>
        </motion.div>

        {/* Stat badges — GitHub profile README style */}
        <motion.div
          {...rise(0.28)}
          style={{
            display: "flex", flexWrap: "wrap", gap: "0.5rem",
            justifyContent: "center", marginBottom: "2rem",
          }}
        >
          {[
            { label: "PROJECTS", value: "3+", color: "#8B5CF6" },
            { label: "SKILLS", value: "6", color: "#3B82F6" },
            { label: "UNIVERSITY", value: "KNUST", color: "#06B6D4" },
            { label: "GRAD", value: "2029", color: "#F59E0B" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                display: "inline-flex", alignItems: "center",
                borderRadius: "0.4rem", overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{
                padding: "0.3rem 0.7rem",
                background: "rgba(30,40,60,0.9)",
                fontSize: "0.68rem", fontWeight: 600,
                color: "#8FA3C8", letterSpacing: "0.06em",
                fontFamily: "var(--font-mono)", textTransform: "uppercase",
              }}>
                {label}
              </span>
              <span style={{
                padding: "0.3rem 0.65rem",
                background: color,
                fontSize: "0.75rem", fontWeight: 800,
                color: "#fff", fontFamily: "var(--font-mono)",
                letterSpacing: "0.03em",
              }}>
                {value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bio with bold highlights */}
        <motion.p
          {...rise(0.36)}
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
            lineHeight: 1.82, color: "#8FA3C8",
            maxWidth: "30rem", marginBottom: "2.25rem",
          }}
        >
          I build{" "}
          <strong style={{ color: "#F0F4FF" }}>secure &amp; practical software</strong>
          , explore the edges of{" "}
          <strong style={{ color: "#F0F4FF" }}>cybersecurity</strong>
          , and grow my skills through real-world projects at{" "}
          <strong style={{ color: "#60A5FA" }}>KNUST</strong>.
        </motion.p>

        {/* Social / CTA buttons */}
        <motion.div
          {...rise(0.44)}
          style={{
            display: "flex", flexWrap: "wrap", gap: "0.6rem",
            justifyContent: "center", marginBottom: "3rem",
          }}
        >
          {/* Instagram */}
          <a
            href={`https://instagram.com/${(profile.instagram || "eii.jnr").replace(/^@/, "")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: "linear-gradient(135deg, #E1306C, #C13584, #833AB4)",
              color: "#fff", borderRadius: "0.6rem",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", transition: "opacity 0.2s, transform 0.15s",
              boxShadow: "0 4px 16px rgba(193,53,132,0.35)",
              border: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Instagram style={{ width: "0.95rem", height: "0.95rem" }} />
            Instagram
          </a>

          {/* GitHub */}
          <a
            href={profile.githubUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: "rgba(255,255,255,0.08)",
              color: "#F0F4FF", borderRadius: "0.6rem",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.2s",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Github style={{ width: "0.95rem", height: "0.95rem" }} />
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedinUrl}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: "#0A66C2",
              color: "#fff", borderRadius: "0.6rem",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.2s",
              border: "none",
              boxShadow: "0 4px 16px rgba(10,102,194,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0958a8"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0A66C2"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Linkedin style={{ width: "0.95rem", height: "0.95rem" }} />
            LinkedIn
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scroll("#contact"); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem",
              background: "#3B82F6",
              color: "#fff", borderRadius: "0.6rem",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.2s",
              border: "none",
              boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2563EB"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#3B82F6"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <Mail style={{ width: "0.95rem", height: "0.95rem" }} />
            Contact
          </a>
        </motion.div>

        {/* Available status */}
        <motion.div
          {...fade(0.55)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: "999px",
            fontSize: "0.75rem", color: "#86EFAC",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ width: "0.45rem", height: "0.45rem", borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 6px #22C55E" }} />
          Available for internships &amp; collaborations
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(1.2)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        style={{
          position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)",
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
