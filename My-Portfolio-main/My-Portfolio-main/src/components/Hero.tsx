import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Mail } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
}

// ─── Canvas particle system ───────────────────────────────────────────────────

const PARTICLE_COUNT = 72;
const PARTICLE_COLORS = ["#E2E8F0", "#CBD5E1", "#A7F3D0", "#BAE6FD"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  // original speed — used to restore after hover
  baseVx: number;
  baseVy: number;
}

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const speed = 0.08 + Math.random() * 0.18;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseVx: Math.cos(angle) * speed,
      baseVy: Math.sin(angle) * speed,
      radius: 0.8 + Math.random() * 1.4,
      opacity: 0.08 + Math.random() * 0.14,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    };
  });
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const HOVER_RADIUS = 110;
    const REPEL_STRENGTH = 0.012; // very gentle nudge
    const DAMPING = 0.985;

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        // Gentle mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < HOVER_RADIUS && dist > 0) {
          const force = (1 - dist / HOVER_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Soft drift back toward base velocity
        p.vx = p.vx * DAMPING + p.baseVx * (1 - DAMPING);
        p.vy = p.vy * DAMPING + p.baseVy * (1 - DAMPING);

        // Cap speed so they never sprint
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 0.55;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;

        // Draw speck
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      // We attach mouse listeners on the canvas itself, but the parent div
      // needs to NOT have pointer-events-none so the canvas can receive events.
      // We'll handle this by making the canvas pointer-events-auto inside the
      // pointer-events-none wrapper – see ParticleLayer below.
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay },
});

export default function Hero({ profile }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // First name only for the headline
  const firstName = profile.fullName.split(" ")[0];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* ── Canvas layer ── */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        <ParticleCanvas />
      </div>

      {/* ── Very faint vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(15,23,42,0.55) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pt-28 pb-24 text-center">

        {/* Eyebrow label */}
        <motion.p
          {...fadeIn(0.1)}
          className="mb-7 text-[11px] tracking-[0.2em] uppercase font-mono text-slate-500"
        >
          BSc. Information Technology &nbsp;·&nbsp; KNUST, Ghana
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-display font-bold leading-[1.08] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)", color: "#F1F5F9" }}
        >
          Hi, I'm{" "}
          <span style={{ color: "#E2E8F0" }}>{firstName}</span>
          <span style={{ color: "#94A3B8" }}>.</span>
        </motion.h1>

        {/* Two-line bio */}
        <motion.p
          {...fadeUp(0.32)}
          className="text-lg sm:text-xl leading-relaxed mb-3 max-w-xl mx-auto"
          style={{ color: "#94A3B8" }}
        >
          IT student building practical software &amp; exploring
          the edges of cybersecurity.
        </motion.p>
        <motion.p
          {...fadeUp(0.4)}
          className="text-sm leading-relaxed max-w-lg mx-auto mb-12"
          style={{ color: "#64748B" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {/* Primary — filled, muted */}
          <button
            onClick={() => scroll("#projects")}
            className="px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "#1E293B",
              color: "#E2E8F0",
              border: "1px solid #334155",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#94A3B8";
              (e.currentTarget as HTMLButtonElement).style.color = "#F8FAFC";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155";
              (e.currentTarget as HTMLButtonElement).style.color = "#E2E8F0";
            }}
          >
            View Projects
          </button>

          {/* Outline — GitHub */}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              color: "#94A3B8",
              border: "1px solid #334155",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#94A3B8";
              (e.currentTarget as HTMLAnchorElement).style.color = "#E2E8F0";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#334155";
              (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8";
            }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          {/* Outline — Contact */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              color: "#94A3B8",
              border: "1px solid #334155",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#94A3B8";
              (e.currentTarget as HTMLAnchorElement).style.color = "#E2E8F0";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#334155";
              (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8";
            }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>
        </motion.div>

        {/* Thin divider + stats */}
        <motion.div
          {...fadeIn(0.65)}
          className="grid grid-cols-3 gap-6 max-w-xs mx-auto"
          style={{ borderTop: "1px solid #1E293B", paddingTop: "2rem" }}
        >
          {[
            { value: "3+", label: "Projects" },
            { value: "6", label: "Skills" },
            { value: "2026", label: "KNUST" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-display font-bold"
                style={{ color: "#E2E8F0" }}
              >
                {value}
              </div>
              <div
                className="text-[11px] tracking-wide mt-0.5 font-mono uppercase"
                style={{ color: "#475569" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          {...fadeIn(1.1)}
          onClick={() => scroll("#about")}
          className="mt-14 flex flex-col items-center gap-1.5 mx-auto transition-opacity duration-200 cursor-pointer hover:opacity-60"
          style={{ color: "#475569" }}
          aria-label="Scroll to About"
        >
          <span
            className="text-[10px] font-mono tracking-[0.18em] uppercase"
          >
            Scroll
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
