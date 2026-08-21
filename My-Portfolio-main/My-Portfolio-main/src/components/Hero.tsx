import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Mail, FileText } from "lucide-react";
import { UserProfile } from "../types";

interface HeroProps {
  profile: UserProfile;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  r: number;          // radius
  alpha: number;      // base opacity
  depth: number;      // 0 (far) → 1 (near) for parallax & blur
  color: string;
}

interface GeoLine {
  x1: number; y1: number;
  x2: number; y2: number;
  alpha: number;
  pulse: number;      // phase offset for breathing opacity
  speed: number;
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const DOT_COLORS = [
  "rgba(148,163,184,",   // slate-400
  "rgba(100,116,139,",   // slate-500
  "rgba(71,85,105,",     // slate-600
  "rgba(103,232,249,",   // cyan-300
  "rgba(56,189,248,",    // sky-400
  "rgba(226,232,240,",   // off-white
];

// ─── Canvas scene ─────────────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 768;
const DOT_COUNT_DESKTOP = 110;
const DOT_COUNT_MOBILE = 55;
const CONNECT_DIST = 140;  // px — max distance to draw network line
const MAX_CONNECTIONS = 3;    // per dot — keeps density restrained

function buildDots(w: number, h: number, isMobile: boolean): Dot[] {
  const count = isMobile ? DOT_COUNT_MOBILE : DOT_COUNT_DESKTOP;
  return Array.from({ length: count }, () => {
    const depth = 0.2 + Math.random() * 0.8;
    const speed = (0.04 + Math.random() * 0.12) * depth;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseVx: Math.cos(angle) * speed,
      baseVy: Math.sin(angle) * speed,
      r: (0.5 + Math.random() * 1.6) * depth,
      alpha: (0.04 + Math.random() * 0.18) * depth,
      depth,
      color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
    };
  });
}

function buildGeoLines(w: number, h: number): GeoLine[] {
  // A handful of static faint geometric structures — thin rectangles / diagonals
  const lines: GeoLine[] = [];
  const add = (x1: number, y1: number, x2: number, y2: number) =>
    lines.push({
      x1: x1 * w, y1: y1 * h, x2: x2 * w, y2: y2 * h,
      alpha: 0.018 + Math.random() * 0.022,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.004
    });

  // sparse triangle structures anchored to corners/edges
  add(0.05, 0.1, 0.22, 0.35);
  add(0.22, 0.35, 0.08, 0.55);
  add(0.08, 0.55, 0.05, 0.1);

  add(0.78, 0.08, 0.95, 0.28);
  add(0.95, 0.28, 0.82, 0.48);
  add(0.82, 0.48, 0.78, 0.08);

  add(0.12, 0.72, 0.28, 0.92);
  add(0.28, 0.92, 0.38, 0.75);
  add(0.38, 0.75, 0.12, 0.72);

  add(0.65, 0.68, 0.88, 0.82);
  add(0.88, 0.82, 0.75, 0.95);
  add(0.75, 0.95, 0.65, 0.68);

  return lines;
}

function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    dots: Dot[];
    geoLines: GeoLine[];
    mouse: { x: number; y: number };
    raf: number;
    t: number;
  }>({ dots: [], geoLines: [], mouse: { x: 0, y: 0 }, raf: 0, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stateRef.current.dots = buildDots(canvas.width, canvas.height, isMobile());
      stateRef.current.geoLines = buildGeoLines(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const section = canvas.closest("section");
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      stateRef.current.mouse = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };
    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("touchmove", onTouch, { passive: true });

    const REPEL_R = 120;
    const REPEL_F = 0.007;
    const DAMP = 0.990;

    const tick = () => {
      const { dots, geoLines, mouse } = stateRef.current;
      stateRef.current.t += 0.008;
      const t = stateRef.current.t;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Geo lines (static structures, breathing alpha) ──
      for (const gl of geoLines) {
        const a = gl.alpha * (0.6 + 0.4 * Math.sin(t * gl.speed * 200 + gl.pulse));
        ctx.beginPath();
        ctx.moveTo(gl.x1, gl.y1);
        ctx.lineTo(gl.x2, gl.y2);
        ctx.strokeStyle = `rgba(100,116,139,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── 2. Network lines between close dots ──
      for (let i = 0; i < dots.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < dots.length && connections < MAX_CONNECTIONS; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const depthFactor = (dots[i].depth + dots[j].depth) * 0.5;
            const a = (1 - dist / CONNECT_DIST) * 0.08 * depthFactor;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${a})`;
            ctx.lineWidth = 0.4 * depthFactor;
            ctx.stroke();
            connections++;
          }
        }
      }

      // ── 3. Dots (with cursor repulsion & depth parallax) ──
      const mx = mouse.x || cx;
      const my = mouse.y || cy;
      // parallax offset relative to center
      const px = (mx - cx) / cx;
      const py = (my - cy) / cy;

      for (const d of dots) {
        // cursor repulsion
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_R && dist > 0) {
          const f = (1 - dist / REPEL_R) * REPEL_F;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }

        // drift back
        d.vx = d.vx * DAMP + d.baseVx * (1 - DAMP);
        d.vy = d.vy * DAMP + d.baseVy * (1 - DAMP);

        // speed cap
        const spd = Math.hypot(d.vx, d.vy);
        if (spd > 0.5) { d.vx = d.vx / spd * 0.5; d.vy = d.vy / spd * 0.5; }

        d.x += d.vx;
        d.y += d.vy;

        // wrap
        if (d.x < -4) d.x = w + 4; else if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4; else if (d.y > h + 4) d.y = -4;

        // parallax draw offset — deeper dots move less
        const ox = px * d.depth * 14;
        const oy = py * d.depth * 14;

        // soft depth-of-field: far dots get a larger, fuzzier circle
        const blurR = d.r * (1 + (1 - d.depth) * 2.5);

        // breathing alpha
        const breathe = 0.85 + 0.15 * Math.sin(t * 0.8 + d.depth * 12);
        const alpha = d.alpha * breathe;

        ctx.beginPath();
        ctx.arc(d.x + ox, d.y + oy, blurR, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${alpha})`;
        ctx.fill();
      }

      // ── 4. Atmospheric soft vignette over particles ──
      // (done in CSS — see section style)

      ctx.globalAlpha = 1;
      stateRef.current.raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("touchmove", onTouch);
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

// ─── Animation presets ────────────────────────────────────────────────────────

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, ease: "easeOut", delay },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#080C14" }}
    >
      {/* ── Cinematic canvas ── */}
      <div className="absolute inset-0 pointer-events-none">
        <CinematicCanvas />
      </div>

      {/* ── Atmospheric lighting — very faint radial at top-right ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", right: "-5%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.032) 0%, transparent 70%)",
        }}
      />
      {/* faint bottom-left warmth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-8%", left: "-4%",
          width: "40vw", height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,116,139,0.028) 0%, transparent 70%)",
        }}
      />

      {/* ── Edge fades ── */}
      <div
        className="absolute top-0 inset-x-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #080C14 0%, transparent 100%)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, #080C14 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 pt-32 pb-28">

        {/* Eyebrow */}
        <motion.div {...slideLeft(0.2)} className="flex items-center gap-3 mb-10">
          <span className="h-px w-8 block" style={{ backgroundColor: "#38BDF8" }} />
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase"
            style={{ color: "#38BDF8" }}
          >
            BSc. Information Technology &nbsp;·&nbsp; KNUST, Ghana
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...rise(0.3)}
          className="font-bold tracking-tight leading-[1.04] mb-3"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 5.6rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#F1F5F9",
          }}
        >
          Hi, I'm{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #E2E8F0 0%, #7DD3FC 55%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {firstName}
          </span>
        </motion.h1>

        <motion.h1
          {...rise(0.38)}
          className="font-bold tracking-tight leading-[1.04] mb-8"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 5.6rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#1E3A5F",
          }}
        >
          {lastName}.
        </motion.h1>

        {/* Bio */}
        <motion.p
          {...rise(0.48)}
          className="text-lg sm:text-xl leading-relaxed mb-3 max-w-2xl"
          style={{ color: "#94A3B8" }}
        >
          IT student building practical software &amp; exploring
          the edges of cybersecurity.
        </motion.p>
        <motion.p
          {...rise(0.55)}
          className="text-sm sm:text-base leading-relaxed max-w-xl mb-14"
          style={{ color: "#475569" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...rise(0.63)}
          className="flex flex-wrap items-center gap-3 mb-24"
        >
          <CinematicButton
            onClick={() => scroll("#projects")}
            variant="primary"
          >
            View Projects
          </CinematicButton>

          <CinematicButton
            as="a"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            icon={<Github className="w-4 h-4" />}
          >
            GitHub
          </CinematicButton>

          <CinematicButton
            as="a"
            href="#contact"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scroll("#contact"); }}
            variant="outline"
            icon={<Mail className="w-4 h-4" />}
          >
            Contact
          </CinematicButton>

          <CinematicButton
            as="a"
            href="#about"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); scroll("#about"); }}
            variant="ghost"
            icon={<FileText className="w-4 h-4" />}
          >
            Résumé
          </CinematicButton>
        </motion.div>

        {/* Stats */}
        <motion.div {...fade(0.78)} className="flex items-center gap-10 sm:gap-16">
          {[
            { value: "3+", label: "Projects" },
            { value: "6", label: "Skills" },
            { value: "KNUST", label: "University" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-10 sm:gap-16">
              {i > 0 && (
                <span className="h-8 w-px block" style={{ backgroundColor: "#0F2744" }} />
              )}
              <div>
                <div className="text-xl font-bold font-mono" style={{ color: "#CBD5E1" }}>
                  {value}
                </div>
                <div
                  className="text-[10px] font-mono tracking-widest uppercase mt-0.5"
                  style={{ color: "#334155" }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        {...fade(1.4)}
        onClick={() => scroll("#about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        style={{ color: "#1E3A5F" }}
      >
        <span
          className="text-[9px] font-mono tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-slate-500"
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-slate-500" />
        </motion.div>
      </motion.button>
    </section>
  );
}

// ─── Button component ─────────────────────────────────────────────────────────

type BtnVariant = "primary" | "outline" | "ghost";

interface CinematicButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: BtnVariant;
  icon?: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const BTN: Record<BtnVariant, { base: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    base: { backgroundColor: "#0F2744", color: "#7DD3FC", border: "1px solid #1E3A5F" },
    hover: { backgroundColor: "#162F56", color: "#BAE6FD", border: "1px solid #38BDF8" },
  },
  outline: {
    base: { backgroundColor: "transparent", color: "#64748B", border: "1px solid #0F2744" },
    hover: { backgroundColor: "transparent", color: "#94A3B8", border: "1px solid #1E3A5F" },
  },
  ghost: {
    base: { backgroundColor: "transparent", color: "#334155", border: "1px solid transparent" },
    hover: { backgroundColor: "transparent", color: "#64748B", border: "1px solid transparent" },
  },
};

function CinematicButton({
  children, onClick, variant = "outline", icon,
  as: Tag = "button", ...rest
}: CinematicButtonProps & Record<string, unknown>) {
  const { base, hover } = BTN[variant];
  return (
    <Tag
      {...rest}
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer"
      style={base}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) =>
        Object.assign((e.currentTarget as HTMLElement).style, hover)
      }
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) =>
        Object.assign((e.currentTarget as HTMLElement).style, base)
      }
    >
      {icon}{children}
    </Tag>
  );
}
