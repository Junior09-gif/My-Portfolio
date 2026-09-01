import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps { profile: UserProfile; }

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
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
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "transparent", zIndex: 1,
    }}>
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: "52rem", margin: "0 auto",
        padding: "7rem 1.5rem 8rem",
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        gap: "1.5rem",
      }}>

        {/* Status badge */}
        <motion.div {...fade(0.05)}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.3rem 0.85rem",
            background: "rgba(37,99,235,0.08)",
            border: "1px solid rgba(37,99,235,0.2)",
            borderRadius: "999px",
            fontSize: "0.72rem", color: "#60a5fa",
            fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
          }}>
            <span style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", flexShrink: 0 }} />
            Available for internships
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div {...rise(0.1)}>
          <h1 style={{
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
            color: "#f1f5f9",
          }}>
            Hi, I'm{" "}
            <span style={{ color: "#2563eb" }}>Edwin</span>
            <span style={{ color: "#1e293b" }}>.</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#475569", marginTop: "0.75rem",
            fontFamily: "var(--font-mono)", letterSpacing: "0.02em",
          }}>
            IT Student &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Cybersecurity
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p {...rise(0.2)} style={{
          fontSize: "1rem", lineHeight: 1.8,
          color: "#94a3b8", maxWidth: "34rem",
        }}>
          I build <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>secure &amp; practical software</strong>,
          explore the edges of <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>cybersecurity</strong>,
          and grow my skills through real-world projects at{" "}
          <strong style={{ color: "#2563eb", fontWeight: 600 }}>KNUST</strong>.
        </motion.p>

      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(1.2)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
          background: "none", border: "none", cursor: "pointer", color: "#1e293b",
        }}
      >
        <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
