import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { profile } from "../data";
import headshotPhoto from "../assets/images/edwin_headshot.jpg";
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

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        // Fully typed — pause then start erasing
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        // Fully erased — move to next role
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

// ── NameReveal ────────────────────────────────────────────────────────────────
// Letter-by-letter reveal for "Boadu Kofi Junior Edwin"
// - 110ms stagger, 0.35s per letter, 12px slide-up
// - Auto-refreshes every 3 minutes (timer starts AFTER animation finishes)
// - Pauses while tab is hidden (visibilitychange)
// - prefers-reduced-motion: shows full name instantly, no refresh

const LINE1 = "Boadu Kofi";
const LINE2 = "Junior Edwin";
const TOTAL = LINE1.length + LINE2.length;  // 22 chars
const STAGGER_MS = 110;
const DURATION_MS = 350;
const REFRESH_MS = 5_000; // 5 seconds

function NameReveal() {
  // visibleCount: how many letters are currently revealed (0 = hidden, TOTAL = all shown)
  const [visibleCount, setVisibleCount] = useState(0);
  const [key, setKey] = useState(0); // increment to force re-mount & restart

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) { setVisibleCount(TOTAL); return; }

    // --- Animate letters one by one ---
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < TOTAL; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * STAGGER_MS));
    }

    // --- Schedule refresh 3 min AFTER last letter finishes ---
    const animationFinishes = (TOTAL - 1) * STAGGER_MS + DURATION_MS;
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    let pausedAt: number | null = null;
    let remaining = REFRESH_MS;

    const scheduleRefresh = (delay: number) => {
      refreshTimer = setTimeout(() => {
        setVisibleCount(0);     // hide all letters
        setKey(k => k + 1);    // will trigger re-mount of children via key
      }, delay);
    };

    const startRefreshTimer = () => {
      const afterAnim = setTimeout(() => {
        scheduleRefresh(remaining);
      }, animationFinishes);
      timers.push(afterAnim);
    };

    // Visibility pause/resume
    const onVisChange = () => {
      if (document.hidden) {
        // Tab hidden — record how much time is left
        if (refreshTimer) {
          clearTimeout(refreshTimer);
          pausedAt = Date.now();
        }
      } else {
        // Tab visible again — resume with remaining time
        if (pausedAt !== null) {
          remaining = Math.max(0, remaining - (Date.now() - pausedAt));
          pausedAt = null;
          scheduleRefresh(remaining);
        }
      }
    };

    startRefreshTimer();
    document.addEventListener("visibilitychange", onVisChange);

    return () => {
      timers.forEach(clearTimeout);
      if (refreshTimer) clearTimeout(refreshTimer);
      document.removeEventListener("visibilitychange", onVisChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Render
  const renderLine = (text: string, offset: number, color: string) => (
    <span style={{ display: "block" }}>
      {text.split("").map((char, i) => {
        const globalIdx = offset + i;
        const revealed = prefersReduced || visibleCount > globalIdx;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color,
              whiteSpace: "pre",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(12px)",
              transition: revealed
                ? `opacity ${DURATION_MS}ms ease-out, transform ${DURATION_MS}ms ease-out`
                : "none",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );

  return (
    <h1
      aria-label="Boadu Kofi Junior Edwin"
      style={{
        fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
        fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15,
        marginBottom: "1.5rem",
      }}
    >
      {renderLine(LINE1, 0, "#22d3ee")}
      {renderLine(LINE2, LINE1.length, "#f1f5f9")}
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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "4rem", alignItems: "center",
        }}>

          {/* ── Left: Text ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* ── Hero heading card — dark style from screenshot ── */}
            <motion.div {...fadeUp(0.08)}>
              {/* Dark card wrapping the heading */}
              <div style={{
                background: "#0f172a",
                borderRadius: "1.25rem",
                padding: "2rem 2.2rem 1.75rem",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}>
                {/* Line 1: Hi, I'm — static */}
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

                {/* Name: letter-by-letter reveal with 3-min auto-refresh */}
                <NameReveal />

                {/* Animated rotating role terminal pill */}
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
              color: "#475569", maxWidth: "32rem",
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
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}
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
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div style={{ position: "relative", width: "clamp(220px, 30vw, 320px)" }}>
              {/* Photo — white card, soft blue shadow */}
              <div style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                background: "rgba(255,255,255,0.75)",
                width: "100%",
                aspectRatio: "3/4",
                boxShadow: "0 10px 40px rgba(49,94,251,0.12), 0 2px 10px rgba(49,94,251,0.06)",
              }}>
                <img
                  src={headshotPhoto}
                  alt="Edwin Boadu"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




