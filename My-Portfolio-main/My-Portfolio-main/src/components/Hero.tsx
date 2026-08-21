import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Mail, FileText } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
}

// ─── Particle types ───────────────────────────────────────────────────────────

type Shape = "circle" | "square" | "triangle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  color: string;
  shape: Shape;
  rotation: number;
  rotSpeed: number;
}

// ─── Palette — warm neutrals only, zero neon ─────────────────────────────────
const COLORS = [
  "#E2E8F0", // off-white
  "#CBD5E1", // cool slate
  "#94A3B8", // medium slate
  "#A7F3D0", // soft sage
  "#BAE6FD", // powder blue
  "#FDE68A", // warm straw
];
const SHAPES: Shape[] = ["circle", "circle", "circle", "square", "triangle"];
const COUNT = 88;

function makeParticles(w: number, h: number): Particle[] {
  return Array.from({ length: COUNT }, () => {
    const speed = 0.05 + Math.random() * 0.15;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseVx: Math.cos(angle) * speed,
      baseVy: Math.sin(angle) * speed,
      size: 0.6 + Math.random() * 1.8,
      opacity: 0.06 + Math.random() * 0.13,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
    };
  });
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  p: Particle
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;

  const s = p.size;

  if (p.shape === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.shape === "square") {
    ctx.fillRect(-s, -s, s * 2, s * 2);
  } else {
    // equilateral triangle
    ctx.beginPath();
    ctx.moveTo(0, -s * 1.2);
    ctx.lineTo(s * 1.05, s * 0.7);
    ctx.lineTo(-s * 1.05, s * 0.7);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

// ─── Canvas component ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    particles: Particle[];
    mouse: { x: number; y: number };
    raf: number;
  }>({ particles: [], mouse: { x: -9999, y: -9999 }, raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stateRef.current.particles = makeParticles(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse tracking on the section element (parent), not the canvas,
    // so we capture movement over text/buttons too
    const section = canvas.parentElement?.parentElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => {
      stateRef.current.mouse = { x: -9999, y: -9999 };
    };
    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);

    const REPEL_R = 130;
    const REPEL_F = 0.009;
    const DAMP = 0.988;

    const tick = () => {
      const { particles, mouse } = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < REPEL_R && dist > 0) {
          const f = (1 - dist / REPEL_R) * REPEL_F;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Drift back to base velocity
        p.vx = p.vx * DAMP + p.baseVx * (1 - DAMP);
        p.vy = p.vy * DAMP + p.baseVy * (1 - DAMP);

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 0.6) {
          p.vx = (p.vx / spd) * 0.6;
          p.vy = (p.vy / spd) * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Wrap
        if (p.x < -6) p.x = w + 6;
        else if (p.x > w + 6) p.x = -6;
        if (p.y < -6) p.y = h + 6;
        else if (p.y > h + 6) p.y = -6;

        drawShape(ctx, p);
      }

      ctx.globalAlpha = 1;
      stateRef.current.raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

// ─── Animation helpers ────────────────────────────────────────────────────────

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
    delay,
  },
});

const appear = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, ease: "easeOut", delay },
});

const slideIn = (delay = 0) => ({
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({ profile }: HeroProps) {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const firstName = profile.fullName.split(" ")[0];
  const lastName = profile.fullName.split(" ").slice(1).join(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: "#0B1120" }}
    >
      {/* Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* Subtle top edge fade */}
      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,17,32,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Subtle bottom edge fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(11,17,32,0.85) 0%, transparent 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 pt-32 pb-28">

        {/* Left accent line + eyebrow */}
        <motion.div
          {...slideIn(0.15)}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="block h-px w-10 rounded-full"
            style={{ backgroundColor: "#A7F3D0" }}
          />
          <span
            className="text-[10.5px] font-mono tracking-[0.22em] uppercase"
            style={{ color: "#A7F3D0" }}
          >
            BSc. Information Technology &nbsp;·&nbsp; KNUST
          </span>
        </motion.div>

        {/* Headline — two lines, large editorial */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            {...rise(0.25)}
            className="font-bold leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 5.2rem)",
              color: "#F1F5F9",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E2E8F0 0%, #A7F3D0 60%, #BAE6FD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {firstName}
            </span>
          </motion.h1>
          <motion.h1
            {...rise(0.35)}
            className="font-bold leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 5.2rem)",
              color: "#475569",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {lastName}.
          </motion.h1>
        </div>

        {/* Bio */}
        <motion.p
          {...rise(0.45)}
          className="text-lg sm:text-xl leading-relaxed mb-3 max-w-2xl"
          style={{ color: "#94A3B8" }}
        >
          IT student building practical software &amp; exploring
          the edges of cybersecurity.
        </motion.p>
        <motion.p
          {...rise(0.52)}
          className="text-sm sm:text-base leading-relaxed max-w-xl mb-12"
          style={{ color: "#64748B" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...rise(0.6)}
          className="flex flex-wrap items-center gap-3 mb-20"
        >
          <HoverButton
            onClick={() => scroll("#projects")}
            variant="filled"
          >
            View Projects
          </HoverButton>

          <HoverButton
            as="a"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            icon={<Github className="w-4 h-4" />}
          >
            GitHub
          </HoverButton>

          <HoverButton
            as="a"
            href="#contact"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scroll("#contact"); }}
            variant="outline"
            icon={<Mail className="w-4 h-4" />}
          >
            Contact
          </HoverButton>

          <HoverButton
            as="a"
            href="#resume"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scroll("#about"); }}
            variant="ghost"
            icon={<FileText className="w-4 h-4" />}
          >
            Résumé
          </HoverButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...appear(0.75)}
          className="flex items-center gap-8 sm:gap-12"
        >
          {[
            { value: "3+", label: "Projects" },
            { value: "6", label: "Skills" },
            { value: "KNUST", label: "University" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-8 sm:gap-12">
              {i > 0 && (
                <span
                  className="block h-8 w-px"
                  style={{ backgroundColor: "#1E293B" }}
                />
              )}
              <div>
                <div
                  className="text-xl font-bold font-mono"
                  style={{ color: "#E2E8F0" }}
                >
                  {value}
                </div>
                <div
                  className="text-[10px] font-mono tracking-widest uppercase mt-0.5"
                  style={{ color: "#475569" }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue — bottom center */}
      <motion.button
        {...appear(1.3)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        style={{ color: "#334155" }}
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase group-hover:text-slate-400 transition-colors duration-300">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 group-hover:text-slate-400 transition-colors duration-300" />
        </motion.div>
      </motion.button>
    </section>
  );
}

// ─── Reusable hover button ────────────────────────────────────────────────────

type ButtonVariant = "filled" | "outline" | "ghost";

interface HoverButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const STYLES: Record<ButtonVariant, {
  base: React.CSSProperties;
  hover: React.CSSProperties;
}> = {
  filled: {
    base: {
      backgroundColor: "#1E293B",
      color: "#E2E8F0",
      border: "1px solid #2D3F55",
    },
    hover: {
      backgroundColor: "#263447",
      color: "#F8FAFC",
      border: "1px solid #94A3B8",
    },
  },
  outline: {
    base: {
      backgroundColor: "transparent",
      color: "#94A3B8",
      border: "1px solid #1E293B",
    },
    hover: {
      backgroundColor: "transparent",
      color: "#E2E8F0",
      border: "1px solid #94A3B8",
    },
  },
  ghost: {
    base: {
      backgroundColor: "transparent",
      color: "#475569",
      border: "1px solid transparent",
    },
    hover: {
      backgroundColor: "transparent",
      color: "#94A3B8",
      border: "1px solid transparent",
    },
  },
};

function HoverButton({
  children,
  onClick,
  variant = "outline",
  icon,
  as: Tag = "button",
  ...rest
}: HoverButtonProps & Record<string, unknown>) {
  const { base, hover } = STYLES[variant];

  return (
    <Tag
      {...rest}
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer"
      style={base}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        Object.assign((e.currentTarget as HTMLElement).style, hover);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        Object.assign((e.currentTarget as HTMLElement).style, base);
      }}
    >
      {icon}
      {children}
    </Tag>
  );
}
