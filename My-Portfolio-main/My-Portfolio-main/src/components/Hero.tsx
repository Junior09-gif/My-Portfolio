import { motion } from "motion/react";
import { ArrowDown, Github, Mail, FileText } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
  dark?: boolean;
}

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "transparent", zIndex: 1 }}
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pt-24 pb-20 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div {...fade(0.1)} className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(10,132,255,0.1)",
              border: "1px solid rgba(10,132,255,0.2)",
              color: "#409CFF",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#0A84FF", animation: "pulse-ring 2s infinite" }}
            />
            BSc. Information Technology · KNUST, Ghana
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.18)}
          className="font-bold tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-sans)",
            color: "#F5F5F7",
          }}
        >
          Building software.<br />
          <span
            style={{
              background: "linear-gradient(135deg, #F5F5F7 20%, #409CFF 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Securing systems.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...rise(0.28)}
          className="mb-3 max-w-xl"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.18rem)",
            lineHeight: 1.65,
            color: "#86868B",
          }}
        >
          I'm <strong style={{ color: "#F5F5F7", fontWeight: 600 }}>Boadu Kofi Junior Edwin</strong> — an IT student at KNUST
          building practical software and exploring the edges of cybersecurity.
        </motion.p>

        <motion.p
          {...rise(0.34)}
          className="mb-12 max-w-md"
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.6,
            color: "#515154",
          }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div {...rise(0.42)} className="flex flex-wrap items-center justify-center gap-3 mb-20">
          <button
            onClick={() => scroll("#projects")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-all duration-200"
            style={{ background: "#0A84FF" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#409CFF")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0A84FF")}
          >
            View Projects
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              color: "#86868B",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#86868B";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scroll("#contact"); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{
              color: "#86868B",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#86868B";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>

          <button
            onClick={() => scroll("#about")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            style={{ color: "#515154", background: "transparent", border: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#86868B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#515154")}
          >
            <FileText className="w-4 h-4" />
            Résumé
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fade(0.58)}
          className="flex items-center gap-0 divide-x"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", divideColor: "rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "3+", label: "Projects built" },
            { value: "6", label: "Core skills" },
            { value: "KNUST", label: "University" },
            { value: "2026", label: "Graduation" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="px-8 text-center first:pl-0 last:pr-0"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="font-bold mb-0.5"
                style={{
                  fontSize: "1.3rem",
                  color: "#F5F5F7",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: i < 2 ? "-0.02em" : "0",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
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

      {/* Scroll cue */}
      <motion.button
        {...fade(1.2)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        style={{ background: "none", border: "none", color: "#515154" }}
      >
        <span
          style={{
            fontSize: "0.58rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
          className="group-hover:opacity-60 transition-opacity"
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
