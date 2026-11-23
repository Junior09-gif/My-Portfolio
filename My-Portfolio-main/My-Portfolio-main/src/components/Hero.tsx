import { motion } from "motion/react";
import { ArrowRight, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data";
import { useState, useEffect } from "react";

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

// ── Rotating role typewriter ───────────────────────────────────────────────────
const ROLES = [
  "Information Technology Student",
  "Aspiring Cybersecurity Professional",
  "Full-Stack Developer",
  "Network Engineering Learner",
  "Python Programmer",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const current = ROLES[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setIndex(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      padding: "0.6rem 1.4rem",
      background: "rgba(34,211,238,0.06)",
      border: "1px solid rgba(34,211,238,0.25)",
      borderRadius: "0.65rem",
      minWidth: "min(26rem, 100%)",
    }}>
      <span style={{ fontSize: "0.9rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#22d3ee" }}>
        &gt;_
      </span>
      <span style={{ fontSize: "0.9rem", fontWeight: 500, fontFamily: "var(--font-mono)", color: "#22d3ee", letterSpacing: "0.02em" }}>
        {displayed}
        <span style={{ opacity: cursor ? 1 : 0, marginLeft: "1px" }}>▋</span>
      </span>
    </div>
  );
}

// ── NameReveal — typewriter with blinking cursor ───────────────────────────────
// Types "Boadu Kofi" (cyan) then "Junior Edwin" (white) one character at a time
// Cursor moves with the typing position
// Pauses 5 seconds after fully typed, then erases and retypes
const LINE1 = "Boadu Kofi";
const LINE2 = "Junior Edwin";
const FULL = LINE1 + "\n" + LINE2; // \n = line break marker
const TYPE_MS = 90;   // ms per character typed
const ERASE_MS = 35;   // ms per character erased
const PAUSE_MS = 5000; // pause after fully typed

function NameReveal() {
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [cursor, setCursor] = useState(true);
  // Check prefers-reduced-motion AFTER mount so mobile doesn't false-positive
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    // If reduced motion — show full name instantly
    if (mq.matches) setCount(FULL.length);
  }, []);

  // Blinking cursor — always runs (even mobile)
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Type / erase loop
  useEffect(() => {
    if (reducedMotion) return;
    let t: ReturnType<typeof setTimeout>;

    if (!erasing) {
      if (count < FULL.length) {
        t = setTimeout(() => setCount(c => c + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setErasing(true), PAUSE_MS);
      }
    } else {
      if (count > 0) {
        t = setTimeout(() => setCount(c => c - 1), ERASE_MS);
      } else {
        setErasing(false);
      }
    }
    return () => clearTimeout(t);
  }, [count, erasing, reducedMotion]);

  // Build visible text from count
  const visible = FULL.slice(0, count);
  const parts = visible.split("\n");
  const line1v = parts[0] ?? "";
  const line2v = parts[1] ?? "";
  const onLine1 = count <= LINE1.length;

  const Cursor = ({ color }: { color: string }) => (
    <span style={{
      display: "inline-block",
      width: "2.5px", height: "0.9em",
      background: color,
      marginLeft: "1px",
      verticalAlign: "text-bottom",
      borderRadius: "1px",
      opacity: cursor ? 1 : 0,
      transition: "opacity 0.1s",
    }} />
  );

  return (
    <h1
      aria-label="Boadu Kofi Junior Edwin"
      style={{
        fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
        fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15,
        marginBottom: "1.5rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Line 1 — cyan */}
      <span style={{ display: "block", color: "#22d3ee", minHeight: "1.15em" }}>
        {line1v || "\u00A0"}
        {onLine1 && <Cursor color="#22d3ee" />}
      </span>

      {/* Line 2 — white */}
      <span style={{ display: "block", color: "#f1f5f9", minHeight: "1.15em" }}>
        {line2v || (onLine1 ? "" : "\u00A0")}
        {!onLine1 && <Cursor color="#f1f5f9" />}
      </span>
    </h1>
  );
}

export default function Hero({ onOpenResume }: HeroProps) {
  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "transparent", paddingTop: "5rem", paddingBottom: "3rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle background circle */}
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "45vw", height: "45vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(49,94,251,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{ maxWidth: "46rem", display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          <motion.div {...fadeUp(0.08)}>
            <div style={{
              background: "#0f172a",
              borderRadius: "1.25rem",
              padding: "2rem 2.2rem 1.75rem",
              width: "100%", maxWidth: "100%", overflow: "hidden",
            }}>
              {/* Hi, I'm */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  fontWeight: 600, color: "#94a3b8",
                  marginBottom: "0.4rem",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.02em",
                }}
              >
                Hi, I'm
              </motion.p>

              {/* Typewriter name */}
              <NameReveal />

              {/* Rotating role pill */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              >
                <RotatingRole />
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p {...fadeUp(0.25)} style={{
            fontSize: "1.05rem", lineHeight: 1.75,
            color: "#475569", maxWidth: "34rem",
          }}>
            Building my skills in software development and cybersecurity to create
            secure, useful technology solutions for a better tomorrow.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.32)} style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <motion.button
              className="btn-primary"
              onClick={() => scroll("#about")}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              View My Work
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
            <span style={{ fontSize: "0.875rem", color: "#475569" }}>
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
                  background: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "0.45rem", color: "#475569",
                  transition: "all 0.18s", textDecoration: "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#315EFB"; (e.currentTarget as HTMLElement).style.borderColor = "#315EFB"; (e.currentTarget as HTMLElement).style.background = "#EEF2FF"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.75)"; }}
              >
                <Icon style={{ width: "0.95rem", height: "0.95rem" }} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
