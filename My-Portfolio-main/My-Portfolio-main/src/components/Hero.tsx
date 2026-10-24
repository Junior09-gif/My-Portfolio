import { motion } from "motion/react";
import { ArrowRight, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data";
import headshotPhoto from "../assets/images/edwin_headshot.jpg";

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenSubnet: () => void;
  onOpenResume: () => void;
  onOpenCyberToolkit: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

export default function Hero({ onOpenResume }: HeroProps) {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "#F8F9FB", paddingTop: "5rem", paddingBottom: "3rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle background circle */}
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "45vw", height: "45vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(49,94,251,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem", alignItems: "center",
        }}>

          {/* ── Left: Text ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Eyebrow */}
            <motion.p {...fadeIn(0.05)} style={{
              fontSize: "1rem", color: "#315EFB",
              display: "flex", alignItems: "center", gap: "0.6rem",
            }}>
              <span style={{ width: "1.5rem", height: "2px", background: "#315EFB", display: "inline-block", borderRadius: "999px", flexShrink: 0 }} />
              <em style={{ fontWeight: 700, fontStyle: "italic", letterSpacing: "0.01em" }}>Hello, I'm</em>
            </motion.p>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <h1 style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1,
                wordBreak: "keep-all", overflowWrap: "break-word",
              }}>
                {/* BOADU KOFI — blue gradient */}
                <span style={{
                  background: "linear-gradient(135deg, #315EFB 0%, #2563EB 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  BOADU KOFI
                </span>
                {/* JUNIOR EDWIN — dark charcoal */}
                <span style={{ color: "#171A21" }}>&nbsp;JUNIOR EDWIN</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p {...fadeUp(0.18)} style={{
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 500, color: "#315EFB",
              letterSpacing: "-0.01em",
            }}>
              Information Technology Student
            </motion.p>

            {/* Bio */}
            <motion.p {...fadeUp(0.25)} style={{
              fontSize: "1.05rem", lineHeight: 1.75,
              color: "#667085", maxWidth: "32rem",
            }}>
              Building my skills in software development and cybersecurity to create
              secure, useful technology solutions for a better tomorrow.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.32)} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <motion.button
                className="btn-primary"
                onClick={() => scroll("#projects")}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                View My Projects
                <ArrowRight style={{ width: "0.9rem", height: "0.9rem" }} />
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={() => scroll("#contact")}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Location */}
            <motion.div {...fadeIn(0.4)} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin style={{ width: "0.9rem", height: "0.9rem", color: "#315EFB" }} />
              <span style={{ fontSize: "0.875rem", color: "#667085" }}>
                Kumasi, Ghana &nbsp;·&nbsp; KNUST
              </span>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeIn(0.45)} style={{ display: "flex", gap: "0.5rem" }}>
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "2.25rem", height: "2.25rem",
                    background: "#FFFFFF", border: "1px solid #E5E7EB",
                    borderRadius: "0.45rem", color: "#667085",
                    transition: "all 0.18s", textDecoration: "none",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#315EFB"; (e.currentTarget as HTMLElement).style.borderColor = "#315EFB"; (e.currentTarget as HTMLElement).style.background = "#EEF2FF"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#667085"; (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
                >
                  <Icon style={{ width: "0.95rem", height: "0.95rem" }} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "clamp(260px, 40vw, 360px)" }}>
              {/* Decorative square behind */}
              <div style={{
                position: "absolute", top: "1.5rem", right: "-1.5rem",
                width: "100%", height: "100%",
                border: "2px solid #315EFB",
                borderRadius: "1rem",
                opacity: 0.2,
              }} />
              {/* Decorative dot grid top-left */}
              <div style={{
                position: "absolute", top: "-1rem", left: "-1rem",
                width: "5rem", height: "5rem",
                backgroundImage: "radial-gradient(circle, #315EFB 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
                opacity: 0.25,
              }} />

              {/* Photo */}
              <div style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(23,26,33,0.12), 0 4px 16px rgba(23,26,33,0.08)",
                background: "#E5E7EB",
              }}>
                <img
                  src={headshotPhoto}
                  alt="Edwin Boadu"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
