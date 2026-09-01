import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
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

const TERMINAL_LINES: { prefix: string; text: string; color: string }[] = [
  { prefix: "$ ", text: "whoami", color: "#60a5fa" },
  { prefix: "", text: "boadu-kofi-junior-edwin", color: "#f1f5f9" },
  { prefix: "$ ", text: "cat skills.txt", color: "#60a5fa" },
  { prefix: "", text: "Python · HTML · CSS · JS · Networking · Cybersecurity", color: "#94a3b8" },
  { prefix: "$ ", text: "echo $GOAL", color: "#60a5fa" },
  { prefix: "", text: "Build. Secure. Grow.", color: "#f1f5f9" },
];

function TerminalWidget() {
  const [count, setCount] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (count >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setCount(c => Math.min(c + 1, TERMINAL_LINES.length)), 480);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 550);
    return () => clearInterval(t);
  }, []);

  const visibleLines = TERMINAL_LINES.slice(0, count);
  const done = count >= TERMINAL_LINES.length;

  return (
    <div style={{
      background: "#020408", border: "1px solid #1e293b",
      borderRadius: "0.75rem", overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      maxWidth: "32rem", width: "100%",
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.65rem 1rem", background: "#0d1120",
        borderBottom: "1px solid #1e293b",
      }}>
        {["#ef4444", "#f59e0b", "#22c55e"].map(c => (
          <span key={c} style={{ width: "0.55rem", height: "0.55rem", borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
        <span style={{ marginLeft: "0.5rem", fontSize: "0.68rem", color: "#475569", fontFamily: "var(--font-mono)" }}>
          ~/portfolio — bash
        </span>
        <Terminal style={{ width: "0.75rem", height: "0.75rem", color: "#475569", marginLeft: "auto" }} />
      </div>

      {/* Body */}
      <div style={{
        padding: "1rem 1.1rem 1.1rem", fontFamily: "var(--font-mono)",
        fontSize: "0.78rem", minHeight: "11rem",
        display: "flex", flexDirection: "column", gap: "0.25rem",
      }}>
        {visibleLines.map((l, i) => (
          <div key={i} style={{ display: "flex", gap: "0.3rem" }}>
            {l.prefix ? <span style={{ color: "#2563eb", userSelect: "none" }}>{l.prefix}</span> : null}
            <span style={{ color: l.color }}>{l.text}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <span style={{ color: "#2563eb" }}>$ </span>
          <span style={{ color: done ? "#475569" : "#f1f5f9", opacity: cursor ? 1 : 0 }}>▋</span>
        </div>
      </div>
    </div>
  );
}

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
        maxWidth: "68rem", margin: "0 auto",
        padding: "7rem 1.5rem 8rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "3.5rem",
        alignItems: "center",
      }}>

        {/* ── Left: text content ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

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
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1,
              color: "#f1f5f9",
            }}>
              Hi, I'm{" "}
              <span style={{ color: "#2563eb" }}>Edwin</span>
              <span style={{ color: "#1e293b" }}>.</span>
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#475569", marginTop: "0.5rem",
              fontFamily: "var(--font-mono)", letterSpacing: "0.02em",
            }}>
              IT Student &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Cybersecurity
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p {...rise(0.2)} style={{
            fontSize: "0.95rem", lineHeight: 1.78,
            color: "#94a3b8", maxWidth: "30rem",
          }}>
            I build <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>secure &amp; practical software</strong>,
            explore the edges of <strong style={{ color: "#f1f5f9", fontWeight: 600 }}>cybersecurity</strong>,
            and grow my skills through real-world projects at{" "}
            <strong style={{ color: "#2563eb", fontWeight: 600 }}>KNUST</strong>.
          </motion.p>

          {/* Stat badges — monochromatic */}
          <motion.div {...rise(0.28)} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { label: "Projects", value: "3+" },
              { label: "Skills", value: "6" },
              { label: "University", value: "KNUST" },
              { label: "Grad", value: "2029" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: "inline-flex", alignItems: "center",
                borderRadius: "0.35rem", overflow: "hidden",
                border: "1px solid #1e293b",
              }}>
                <span style={{
                  padding: "0.25rem 0.65rem",
                  background: "#0d1120",
                  fontSize: "0.65rem", fontWeight: 600,
                  color: "#475569", fontFamily: "var(--font-mono)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>{label}</span>
                <span style={{
                  padding: "0.25rem 0.6rem",
                  background: "#2563eb",
                  fontSize: "0.72rem", fontWeight: 700,
                  color: "#fff", fontFamily: "var(--font-mono)",
                }}>{value}</span>
              </div>
            ))}
          </motion.div>

          {/* Social buttons — unified style */}
          <motion.div {...rise(0.36)} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[
              { icon: Github, label: "GitHub", href: profile.githubUrl, bg: "#0d1120", border: "#1e293b" },
              { icon: Linkedin, label: "LinkedIn", href: profile.linkedinUrl, bg: "#0d1120", border: "#1e293b" },
              { icon: Mail, label: "Contact", href: "#contact", bg: "#2563eb", border: "#2563eb" },
            ].map(({ icon: Icon, label, href, bg, border }) => (
              <a key={label}
                href={href}
                onClick={href === "#contact" ? (e) => { e.preventDefault(); scroll("#contact"); } : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  padding: "0.55rem 1.1rem",
                  background: bg, color: href === "#contact" ? "#fff" : "#94a3b8",
                  borderRadius: "0.45rem",
                  fontSize: "0.78rem", fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  textDecoration: "none",
                  border: `1px solid ${border}`,
                  fontFamily: "var(--font-mono)",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#f1f5f9";
                  el.style.borderColor = "#263347";
                  el.style.background = href === "#contact" ? "#1d4ed8" : "#151c2c";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = href === "#contact" ? "#fff" : "#94a3b8";
                  el.style.borderColor = border;
                  el.style.background = bg;
                }}
              >
                <Icon style={{ width: "0.85rem", height: "0.85rem" }} />
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: terminal ── */}
        <motion.div {...fade(0.45)} style={{ display: "flex", justifyContent: "center" }}>
          <TerminalWidget />
        </motion.div>
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
