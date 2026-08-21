/**
 * Hero v2
 * Frosted-glass card layout that sits above AnimatedBackground.
 * Receives `dark` from App so glass tints match the active theme.
 * Updated: 2026-08-20
 */
import { motion } from "motion/react";
import { ArrowDown, Github, Mail, FileText, Shield, Code2 } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
  dark?: boolean;
}

// ─── Animation helpers ────────────────────────────────────────────────────────

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut", delay },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
});

// ─── Glass card style helper ──────────────────────────────────────────────────

function glassStyle(dark: boolean): React.CSSProperties {
  return {
    background: dark
      ? "rgba(8, 14, 28, 0.55)"
      : "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: `1px solid ${dark
      ? "rgba(56,189,248,0.1)"
      : "rgba(14,165,233,0.18)"}`,
    borderRadius: "1rem",
  };
}

// ─── Small reusable components ────────────────────────────────────────────────

function Tag({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.65rem",
        borderRadius: "999px",
        fontSize: "0.68rem",
        fontFamily: "monospace",
        letterSpacing: "0.08em",
        background: dark ? "rgba(56,189,248,0.08)" : "rgba(14,165,233,0.1)",
        border: `1px solid ${dark ? "rgba(56,189,248,0.2)" : "rgba(14,165,233,0.25)"}`,
        color: dark ? "#7DD3FC" : "#0369A1",
      }}
    >
      {children}
    </span>
  );
}

function GlassButton({
  children,
  onClick,
  href,
  target,
  rel,
  icon,
  variant = "outline",
  dark,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  dark: boolean;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: dark ? "rgba(14,165,233,0.18)" : "rgba(14,165,233,0.15)",
      border: `1px solid ${dark ? "rgba(56,189,248,0.35)" : "rgba(14,165,233,0.4)"}`,
      color: dark ? "#BAE6FD" : "#0369A1",
    },
    outline: {
      background: dark ? "rgba(15,39,68,0.4)" : "rgba(255,255,255,0.3)",
      border: `1px solid ${dark ? "rgba(56,189,248,0.15)" : "rgba(14,165,233,0.2)"}`,
      color: dark ? "#94A3B8" : "#475569",
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: dark ? "#475569" : "#94A3B8",
    },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: dark ? "rgba(14,165,233,0.28)" : "rgba(14,165,233,0.22)",
      border: `1px solid ${dark ? "rgba(103,232,249,0.55)" : "rgba(14,165,233,0.55)"}`,
      color: dark ? "#E0F2FE" : "#0C4A6E",
    },
    outline: {
      background: dark ? "rgba(15,39,68,0.6)" : "rgba(255,255,255,0.5)",
      border: `1px solid ${dark ? "rgba(56,189,248,0.35)" : "rgba(14,165,233,0.4)"}`,
      color: dark ? "#E2E8F0" : "#0F172A",
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: dark ? "#94A3B8" : "#475569",
    },
  };

  const base = styles[variant];
  const hover = hoverStyles[variant];

  const shared: React.CSSProperties = {
    ...base,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.55rem 1.1rem",
    borderRadius: "0.6rem",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
  };

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
      Object.assign((e.currentTarget as HTMLElement).style, hover),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
      Object.assign((e.currentTarget as HTMLElement).style, base),
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} style={shared} {...handlers}>
        {icon}{children}
      </a>
    );
  }
  return (
    <button onClick={onClick} style={shared} {...handlers}>
      {icon}{children}
    </button>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({ profile, dark = true }: HeroProps) {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const firstName = profile.fullName.split(" ")[0];
  const lastName = profile.fullName.split(" ").slice(1).join(" ");
  const textPrimary = dark ? "#F1F5F9" : "#0F172A";
  const textMuted = dark ? "#94A3B8" : "#475569";
  const textDim = dark ? "#475569" : "#94A3B8";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 1, background: "transparent" }}
    >
      {/* ── Centre content column ── */}
      <div
        className="relative w-full max-w-5xl mx-auto px-5 sm:px-10 pt-28 pb-32"
        style={{ zIndex: 2 }}
      >
        {/* Eyebrow label */}
        <motion.div {...slideLeft(0.15)} className="flex items-center gap-3 mb-9">
          <span
            className="h-px w-7 block flex-shrink-0"
            style={{ backgroundColor: dark ? "#38BDF8" : "#0EA5E9" }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              fontFamily: "monospace",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: dark ? "#38BDF8" : "#0EA5E9",
            }}
          >
            BSc. Information Technology &nbsp;·&nbsp; KNUST, Ghana
          </span>
        </motion.div>

        {/* ── Main frosted card ── */}
        <motion.div {...rise(0.22)} style={{ ...glassStyle(dark), padding: "2.2rem 2.4rem", marginBottom: "1.25rem" }}>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "'Inter', sans-serif",
              color: textPrimary,
              marginBottom: "0.25rem",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: dark
                  ? "linear-gradient(135deg, #E2E8F0 0%, #7DD3FC 55%, #38BDF8 100%)"
                  : "linear-gradient(135deg, #0369A1 0%, #0EA5E9 60%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {firstName}
            </span>
          </h1>
          <h1
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "'Inter', sans-serif",
              color: dark ? "#1E3A5F" : "#CBD5E1",
              marginBottom: "1.4rem",
            }}
          >
            {lastName}.
          </h1>

          {/* Bio */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              color: textMuted,
              maxWidth: "36rem",
              marginBottom: "0.6rem",
            }}
          >
            IT student building practical software &amp; exploring
            the edges of cybersecurity.
          </p>
          <p
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.65,
              color: textDim,
              maxWidth: "30rem",
              marginBottom: "1.8rem",
            }}
          >
            {profile.tagline}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
            <GlassButton
              variant="primary"
              dark={dark}
              onClick={() => scroll("#projects")}
              icon={<Code2 className="w-4 h-4" />}
            >
              View Projects
            </GlassButton>
            <GlassButton
              variant="outline"
              dark={dark}
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<Github className="w-4 h-4" />}
            >
              GitHub
            </GlassButton>
            <GlassButton
              variant="outline"
              dark={dark}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
              icon={<Mail className="w-4 h-4" />}
            >
              Contact
            </GlassButton>
            <GlassButton
              variant="ghost"
              dark={dark}
              href="#about"
              onClick={(e) => { e.preventDefault(); scroll("#about"); }}
              icon={<FileText className="w-4 h-4" />}
            >
              Résumé
            </GlassButton>
          </div>
        </motion.div>

        {/* ── Bottom row: stats card + interests card ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* Stats card */}
          <motion.div {...rise(0.38)} style={{ ...glassStyle(dark), padding: "1.4rem 1.8rem" }}>
            <p
              style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: textDim,
                marginBottom: "1rem",
              }}
            >
              At a glance
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              {[
                { value: "3+", label: "Projects" },
                { value: "6", label: "Skills" },
                { value: "2026", label: "Grad. Year" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      color: dark ? "#E2E8F0" : "#0F172A",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: textDim,
                      marginTop: "0.2rem",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interests card */}
          <motion.div {...rise(0.46)} style={{ ...glassStyle(dark), padding: "1.4rem 1.8rem" }}>
            <p
              style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: textDim,
                marginBottom: "0.9rem",
              }}
            >
              Focus areas
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {profile.fieldsOfInterest.map(f => (
                <Tag key={f} dark={dark}>{f}</Tag>
              ))}
            </div>
          </motion.div>

          {/* Security badge card */}
          <motion.div
            {...rise(0.54)}
            style={{
              ...glassStyle(dark),
              padding: "1.4rem 1.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.9rem",
            }}
          >
            <div
              style={{
                width: "2.8rem",
                height: "2.8rem",
                borderRadius: "0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: dark ? "rgba(56,189,248,0.1)" : "rgba(14,165,233,0.1)",
                border: `1px solid ${dark ? "rgba(56,189,248,0.2)" : "rgba(14,165,233,0.2)"}`,
                flexShrink: 0,
              }}
            >
              <Shield
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  color: dark ? "#38BDF8" : "#0EA5E9",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: dark ? "#CBD5E1" : "#334155",
                  marginBottom: "0.2rem",
                }}
              >
                Cybersecurity
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: textDim,
                  lineHeight: 1.45,
                }}
              >
                {profile.careerGoal.slice(0, 72)}…
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        {...fade(1.5)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group cursor-pointer"
        style={{ color: textDim, background: "none", border: "none" }}
      >
        <span
          style={{
            fontSize: "0.58rem",
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
          className="group-hover:opacity-80 transition-opacity"
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown style={{ width: "0.85rem", height: "0.85rem" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
