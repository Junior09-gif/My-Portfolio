import { motion } from "motion/react";
import { ArrowDown, Github, Mail, FileText, MapPin } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
  dark?: boolean;
}

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "transparent", zIndex: 1 }}
    >
      {/* ── Main content ── */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center"
        style={{ paddingTop: "7rem", paddingBottom: "9rem" }}
      >

        {/* Location pill */}
        <motion.div {...fade(0.1)} className="mb-7">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#86868B",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
            }}
          >
            <MapPin className="w-3 h-3" style={{ color: "#0A84FF" }} />
            BSc. Information Technology · KNUST, Ghana
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.18)}
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            color: "#F5F5F7",
            marginBottom: "0.5rem",
          }}
        >
          Building software.
        </motion.h1>

        <motion.h1
          {...rise(0.26)}
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            marginBottom: "2rem",
            background: "linear-gradient(135deg, #F5F5F7 10%, #60A5FA 60%, #0A84FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Securing systems.
        </motion.h1>

        {/* Bio */}
        <motion.p
          {...rise(0.34)}
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            lineHeight: 1.75,
            color: "#86868B",
            maxWidth: "30rem",
            marginBottom: "2.5rem",
          }}
        >
          I'm{" "}
          <strong style={{ color: "#E5E7EB", fontWeight: 600 }}>
            Boadu Kofi Junior Edwin
          </strong>{" "}
          — an IT student at KNUST building practical software and exploring
          the edges of cybersecurity.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...rise(0.42)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Primary */}
          <button
            onClick={() => scroll("#projects")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.65rem 1.4rem",
              borderRadius: "0.75rem",
              background: "#0A84FF",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
              boxShadow: "0 0 24px rgba(10,132,255,0.25)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#409CFF";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0A84FF";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Projects
          </button>

          {/* GitHub */}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.65rem 1.4rem",
              borderRadius: "0.75rem",
              background: "rgba(255,255,255,0.05)",
              color: "#86868B",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#86868B";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scroll("#contact"); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.65rem 1.4rem",
              borderRadius: "0.75rem",
              background: "rgba(255,255,255,0.05)",
              color: "#86868B",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#86868B";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>

          {/* Resume */}
          <button
            onClick={() => scroll("#about")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.65rem 1rem",
              borderRadius: "0.75rem",
              background: "transparent",
              color: "#515154",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#86868B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#515154")}
          >
            <FileText className="w-4 h-4" />
            Résumé
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fade(0.56)}
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            width: "100%",
            justifyContent: "center",
            gap: "0",
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
                flex: 1,
                textAlign: "center",
                padding: "0 1rem",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#F5F5F7",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "0.3rem",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "#515154",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue — enough bottom padding to clear controls bar */}
      <motion.button
        {...fade(1.3)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        style={{
          position: "absolute",
          bottom: "5.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          background: "none",
          border: "none",
          color: "#3A3A3C",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "0.58rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
