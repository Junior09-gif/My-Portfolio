/**
 * AnimatedBackground — Monochromatic ambient canvas
 * Subtle stardust nodes + fine geometric grid
 * No nebula blobs, no aurora, no competing colour
 */
import { useEffect, useRef } from "react";

export type ShaderMode = "stardust" | "grid" | "none";

export interface BgConfig {
  mode: ShaderMode;
  speed: number;
  brightness: number;
  dark: boolean;
}

interface Props { config: BgConfig; }

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  twinkle: number; twinkleSpeed: number;
}

function makeStars(w: number, h: number): Star[] {
  return Array.from({ length: 140 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.03 + Math.random() * 0.07;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 0.3 + Math.random() * 0.9,
      alpha: 0.06 + Math.random() * 0.18,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.004 + Math.random() * 0.012,
    };
  });
}

interface GridNode { ox: number; oy: number; x: number; y: number; vx: number; vy: number; }

function makeGrid(w: number, h: number): GridNode[] {
  const cols = Math.ceil(w / 60);
  const rows = Math.ceil(h / 60);
  const nodes: GridNode[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const ox = (c / cols) * w;
      const oy = (r / rows) * h;
      nodes.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
    }
  }
  return nodes;
}

export default function AnimatedBackground({ config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    t: number; raf: number;
    mouse: { x: number; y: number };
    stars: Star[]; grid: GridNode[];
    config: BgConfig;
  }>({ t: 0, raf: 0, mouse: { x: 0, y: 0 }, stars: [], grid: [], config });

  useEffect(() => { stateRef.current.config = config; }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stateRef.current.stars = makeStars(canvas.width, canvas.height);
      stateRef.current.grid = makeGrid(canvas.width, canvas.height);
      stateRef.current.mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    };
    init();

    window.addEventListener("resize", init);
    const onMove = (e: MouseEvent) => { stateRef.current.mouse = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { stateRef.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const tick = () => {
      const s = stateRef.current;
      s.t += 0.008 * s.config.speed;
      const w = canvas.width;
      const h = canvas.height;
      const mx = s.mouse.x;
      const my = s.mouse.y;

      // Deep midnight base
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, w, h);

      // Soft top-center glow — very faint
      const glow = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, w * 0.55);
      glow.addColorStop(0, "rgba(37,99,235,0.06)");
      glow.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      if (s.config.mode === "none") {
        s.raf = requestAnimationFrame(tick);
        return;
      }

      if (s.config.mode === "grid") {
        // Elastic grid with mouse repulsion
        const cols = Math.ceil(w / 60) + 1;
        const K = 0.035 * s.config.speed;
        const D = 0.88;
        const R = 80;

        for (const n of s.grid) {
          const dx = n.x - mx;
          const dy = n.y - my;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0) {
            const f = (1 - d / R) * 1.5;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
          n.vx += (n.ox - n.x) * K;
          n.vy += (n.oy - n.y) * K;
          n.vx *= D; n.vy *= D;
          n.x += n.vx; n.y += n.vy;
        }

        ctx.strokeStyle = "rgba(30,41,59,0.55)";
        ctx.lineWidth = 0.5;

        for (let i = 0; i < s.grid.length; i++) {
          const r = i + 1;
          const b = i + cols;
          if (r < s.grid.length && (i + 1) % cols !== 0) {
            ctx.beginPath();
            ctx.moveTo(s.grid[i].x, s.grid[i].y);
            ctx.lineTo(s.grid[r].x, s.grid[r].y);
            ctx.stroke();
          }
          if (b < s.grid.length) {
            ctx.beginPath();
            ctx.moveTo(s.grid[i].x, s.grid[i].y);
            ctx.lineTo(s.grid[b].x, s.grid[b].y);
            ctx.stroke();
          }
        }

        for (const n of s.grid) {
          const disp = Math.hypot(n.x - n.ox, n.y - n.oy);
          const g = Math.min(disp / 20, 1);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 0.9 + g * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37,99,235,${0.06 + g * 0.18})`;
          ctx.fill();
        }
      }

      // Stardust (always drawn on top of grid or alone)
      if (s.config.mode === "stardust" || s.config.mode === "grid") {
        for (const star of s.stars) {
          star.twinkle += star.twinkleSpeed * s.config.speed;
          const tw = 0.6 + 0.4 * Math.sin(star.twinkle);

          // Gentle mouse repulsion
          const dx = star.x - mx;
          const dy = star.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            star.vx += (dx / dist) * 0.004;
            star.vy += (dy / dist) * 0.004;
          }
          star.vx = star.vx * 0.996 + star.vx * 0.004;
          star.vy = star.vy * 0.996 + star.vy * 0.004;

          star.x += star.vx * s.config.speed;
          star.y += star.vy * s.config.speed;

          if (star.x < 0) star.x = w; else if (star.x > w) star.x = 0;
          if (star.y < 0) star.y = h; else if (star.y > h) star.y = 0;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * tw, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148,163,184,${star.alpha * tw})`;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      s.raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        zIndex: 0, pointerEvents: "none",
        filter: `brightness(${config.brightness}%)`,
        transition: "filter 0.4s ease",
      }}
    />
  );
}
