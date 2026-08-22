/**
 * AnimatedBackground — Premium cinematic canvas
 * 6 switchable shaders, all mouse-reactive, 60fps optimised.
 */
import { useEffect, useRef } from "react";

export type ShaderMode = "dust" | "waves" | "gravity" | "polyhedra" | "lasers" | "grid";

export interface BgConfig {
  mode: ShaderMode;
  speed: number;
  brightness: number;
  dark: boolean;
}

interface Props { config: BgConfig; }

// ─── utils ────────────────────────────────────────────────────────────────────
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── SHADER: DEEP SPACE (default "dust") ─────────────────────────────────────
// Layered star field + slow aurora bands + nebula wisps

interface Star {
  x: number; y: number; z: number;   // z = depth 0..1
  r: number; alpha: number;
  twinkle: number; twinkleSpeed: number;
  color: string;
}

interface AuroraPoint { x: number; phase: number; speed: number; amp: number; }

interface Wisp {
  cx: number; cy: number;
  rx: number; ry: number;
  angle: number; rotSpeed: number;
  color: string; alpha: number;
  pulsePhase: number;
}

const STAR_COLORS = ["#FFFFFF", "#E8F4FD", "#D4E9FA", "#A8D4F5", "#C8E8FF", "#F0F8FF"];
const AURORA_PALETTES = [
  ["rgba(10,132,255,", "rgba(94,92,230,", "rgba(48,209,88,"],
  ["rgba(94,92,230,", "rgba(10,132,255,", "rgba(191,90,242,"],
];

function makeStars(w: number, h: number): Star[] {
  return Array.from({ length: 220 }, () => {
    const z = Math.random();
    return {
      x: rand(0, w), y: rand(0, h), z,
      r: 0.3 + z * 1.4,
      alpha: 0.15 + z * 0.65,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: rand(0.004, 0.018),
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    };
  });
}

function makeAurora(w: number): AuroraPoint[] {
  return Array.from({ length: 7 }, (_, i) => ({
    x: (i / 6) * w,
    phase: Math.random() * Math.PI * 2,
    speed: rand(0.0008, 0.002),
    amp: rand(60, 160),
  }));
}

function makeWisps(w: number, h: number): Wisp[] {
  const palette = ["rgba(10,132,255,", "rgba(94,92,230,", "rgba(48,209,88,", "rgba(191,90,242,"];
  return Array.from({ length: 6 }, () => ({
    cx: rand(w * 0.1, w * 0.9),
    cy: rand(h * 0.1, h * 0.9),
    rx: rand(w * 0.08, w * 0.22),
    ry: rand(h * 0.06, h * 0.16),
    angle: rand(0, Math.PI),
    rotSpeed: rand(-0.0003, 0.0003),
    color: palette[Math.floor(Math.random() * palette.length)],
    alpha: rand(0.012, 0.032),
    pulsePhase: Math.random() * Math.PI * 2,
  }));
}

function drawDeepSpace(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  stars: Star[], aurora: AuroraPoint[], wisps: Wisp[],
  mouse: { x: number; y: number }, speed: number
) {
  const mx = (mouse.x / w - 0.5);
  const my = (mouse.y / h - 0.5);

  // ── 1. Nebula wisps (elliptical blobs) ──
  for (const wp of wisps) {
    wp.angle += wp.rotSpeed * speed;
    const pulse = 0.7 + 0.3 * Math.sin(t * 0.4 + wp.pulsePhase);
    ctx.save();
    ctx.translate(wp.cx, wp.cy);
    ctx.rotate(wp.angle);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, wp.rx);
    g.addColorStop(0, `${wp.color}${wp.alpha * pulse * 2})`);
    g.addColorStop(0.5, `${wp.color}${wp.alpha * pulse})`);
    g.addColorStop(1, `${wp.color}0)`);
    ctx.scale(1, wp.ry / wp.rx);
    ctx.beginPath();
    ctx.arc(0, 0, wp.rx, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  }

  // ── 2. Aurora bands ──
  const palette = AURORA_PALETTES[0];
  for (let band = 0; band < 3; band++) {
    const yBase = h * (0.18 + band * 0.28);
    const alpha = 0.022 + band * 0.008;

    for (let pass = 0; pass < 2; pass++) {
      ctx.beginPath();
      aurora.forEach((pt, i) => {
        const phaseShift = band * 1.1 + pass * 0.6;
        const y = yBase
          + pt.amp * Math.sin(pt.phase + t * pt.speed * speed * 200 + phaseShift)
          + my * 40 * (1 - band * 0.25);
        const px = pt.x + mx * 30 * (1 - band * 0.2);
        i === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      });
      ctx.lineTo(w, h * 0.5);
      ctx.lineTo(0, h * 0.5);
      ctx.closePath();

      const g2 = ctx.createLinearGradient(0, yBase - 120, 0, yBase + 120);
      g2.addColorStop(0, `${palette[band]}0)`);
      g2.addColorStop(0.4, `${palette[band]}${alpha * (pass === 0 ? 1 : 0.5)})`);
      g2.addColorStop(1, `${palette[band]}0)`);
      ctx.fillStyle = g2;
      ctx.fill();
    }
  }

  // ── 3. Stars ──
  for (const s of stars) {
    s.twinkle += s.twinkleSpeed * speed;
    const tw = 0.6 + 0.4 * Math.sin(s.twinkle);
    const ox = mx * s.z * 18;
    const oy = my * s.z * 18;

    ctx.beginPath();
    ctx.arc(s.x + ox, s.y + oy, s.r * tw, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = s.alpha * tw;
    ctx.fill();

    // soft glow on bright stars
    if (s.z > 0.75 && s.r > 1.2) {
      const glow = ctx.createRadialGradient(
        s.x + ox, s.y + oy, 0,
        s.x + ox, s.y + oy, s.r * 4
      );
      glow.addColorStop(0, `rgba(168,212,245,${0.12 * tw})`);
      glow.addColorStop(1, "rgba(168,212,245,0)");
      ctx.beginPath();
      ctx.arc(s.x + ox, s.y + oy, s.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // ── 4. Shooting star (occasional) ──
  const shootCycle = (t * speed * 0.12) % 1;
  if (shootCycle < 0.015) {
    const progress = shootCycle / 0.015;
    const sx = w * 0.7 * progress;
    const sy = h * 0.05 + h * 0.2 * progress;
    const len = 80 * (1 - progress);
    const sg = ctx.createLinearGradient(sx - len, sy - len * 0.5, sx, sy);
    sg.addColorStop(0, "rgba(255,255,255,0)");
    sg.addColorStop(1, `rgba(255,255,255,${0.7 * (1 - progress)})`);
    ctx.beginPath();
    ctx.moveTo(sx - len, sy - len * 0.5);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = sg;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// ─── SHADER: LIQUID WAVES ─────────────────────────────────────────────────────
function drawWaves(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  mouse: { x: number; y: number }, speed: number
) {
  const mx = mouse.x / w - 0.5;
  const my = mouse.y / h - 0.5;
  const layers = 7;
  const palette = [
    "rgba(10,132,255,", "rgba(94,92,230,", "rgba(48,209,88,",
    "rgba(10,132,255,", "rgba(191,90,242,", "rgba(10,132,255,", "rgba(94,92,230,",
  ];
  for (let l = 0; l < layers; l++) {
    const p = l / layers;
    const amp = h * (0.03 + p * 0.05);
    const freq = 0.003 + p * 0.003;
    const ph = t * speed * (0.3 + p * 0.25) + l * 1.2;
    const yB = h * (0.2 + p * 0.1);
    const alpha = 0.028 + p * 0.022;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const ci = amp * 0.5 * Math.exp(-Math.pow((x / w - 0.5 - mx) * 3, 2));
      const y = yB
        + Math.sin(x * freq + ph) * amp
        + Math.sin(x * freq * 1.9 + ph * 0.7) * amp * 0.35
        + ci * (my * 2.5);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = `${palette[l]}${alpha})`;
    ctx.fill();
  }
}

// ─── SHADER: GRAVITY WELL ────────────────────────────────────────────────────
interface GPart { x: number; y: number; vx: number; vy: number; mass: number; alpha: number; color: string; }

function makeGParts(w: number, h: number): GPart[] {
  const colors = ["rgba(10,132,255,", "rgba(148,163,184,", "rgba(103,232,249,", "rgba(226,232,240,"];
  return Array.from({ length: 100 }, () => ({
    x: rand(0, w), y: rand(0, h),
    vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3),
    mass: rand(0.6, 2.5), alpha: rand(0.06, 0.22),
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function drawGravity(
  ctx: CanvasRenderingContext2D, parts: GPart[],
  w: number, h: number, mouse: { x: number; y: number }, speed: number
) {
  const G = 0.2 * speed, CONN = 110;
  for (const p of parts) {
    const dx = mouse.x - p.x, dy = mouse.y - p.y;
    const d = Math.max(Math.hypot(dx, dy), 30);
    const f = (G * p.mass) / (d * d) * Math.min(d / 80, 1);
    p.vx += (dx / d) * f; p.vy += (dy / d) * f;
    p.vx *= 0.991; p.vy *= 0.991;
    const sp = Math.hypot(p.vx, p.vy);
    if (sp > 1.8) { p.vx = p.vx / sp * 1.8; p.vy = p.vy / sp * 1.8; }
    p.x += p.vx * speed; p.y += p.vy * speed;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
  }
  for (let i = 0; i < parts.length; i++) {
    let c = 0;
    for (let j = i + 1; j < parts.length && c < 3; j++) {
      const d = Math.hypot(parts[i].x - parts[j].x, parts[i].y - parts[j].y);
      if (d < CONN) {
        ctx.beginPath();
        ctx.moveTo(parts[i].x, parts[i].y);
        ctx.lineTo(parts[j].x, parts[j].y);
        ctx.strokeStyle = `rgba(56,189,248,${(1 - d / CONN) * 0.07})`;
        ctx.lineWidth = 0.4; ctx.stroke(); c++;
      }
    }
  }
  for (const p of parts) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.mass * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = `${p.color}${p.alpha})`; ctx.fill();
  }
}

// ─── SHADER: 3D POLYHEDRA ────────────────────────────────────────────────────
type Vec3 = [number, number, number];
const rotX = (p: Vec3, a: number): Vec3 => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const rotY = (p: Vec3, a: number): Vec3 => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
const rotZ = (p: Vec3, a: number): Vec3 => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];
const proj = (p: Vec3, cx: number, cy: number, f: number): [number, number] => { const z = p[2] + f; return [cx + (p[0] * f) / z, cy + (p[1] * f) / z]; };

const SOLIDS = [
  { v: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] as Vec3[], e: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]] },
  { v: [[0, 0, -1.4], [0, 0, 1.4], [0, -1.4, 0], [0, 1.4, 0], [-1.4, 0, 0], [1.4, 0, 0]] as Vec3[], e: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [4, 3], [3, 5], [5, 2]] },
  { v: [[0, 1.3, 0], [-1, -0.7, -1], [1, -0.7, -1], [1, -0.7, 1], [-1, -0.7, 1]] as Vec3[], e: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1]] },
  { v: [[0, 1.2, 0], [-1, -0.6, -0.6], [1, -0.6, -0.6], [0, -0.6, 1.2]] as Vec3[], e: [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]] },
];

function drawPolyhedra(
  ctx: CanvasRenderingContext2D, w: number, h: number, t: number,
  mouse: { x: number; y: number }, speed: number
) {
  const positions: [[number, number, number]] = [
    [w * 0.15, h * 0.25, 0], [w * 0.82, h * 0.2, 0], [w * 0.12, h * 0.7, 0], [w * 0.8, h * 0.7, 0],
  ] as never;
  const scales = [65, 55, 50, 58];
  SOLIDS.forEach((s, si) => {
    const [cx, cy] = positions[si]; const sc = scales[si];
    const rx = t * speed * (0.2 + si * 0.06) + (mouse.y / h - 0.5) * 0.5;
    const ry = t * speed * (0.17 + si * 0.05) + (mouse.x / w - 0.5) * 0.5;
    const rz = t * speed * 0.07;
    const rv = s.v.map(v => { let p = rotX(v, rx); p = rotY(p, ry); p = rotZ(p, rz); return [p[0] * sc, p[1] * sc, p[2] * sc] as Vec3; });
    ctx.strokeStyle = "rgba(148,163,184,0.16)"; ctx.lineWidth = 0.7;
    for (const [a, b] of s.e) {
      const [ax, ay] = proj(rv[a], cx, cy, 280);
      const [bx, by] = proj(rv[b], cx, cy, 280);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    }
    for (const v of rv) {
      const [px, py] = proj(v, cx, cy, 280);
      ctx.beginPath(); ctx.arc(px, py, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(148,163,184,0.3)"; ctx.fill();
    }
  });
}

// ─── SHADER: CONSTELLATION LASERS ───────────────────────────────────────────
interface LNode { angle: number; radius: number; speed: number; ox: number; oy: number; color: string; }
function makeLNodes(w: number, h: number): LNode[] {
  const cols = ["rgba(56,189,248,", "rgba(103,232,249,", "rgba(148,163,184,"];
  return Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * Math.PI * 2, radius: rand(80, 150),
    speed: rand(0.004, 0.012) * (Math.random() > 0.5 ? 1 : -1),
    ox: rand(w * 0.15, w * 0.85), oy: rand(h * 0.15, h * 0.85),
    color: cols[Math.floor(Math.random() * cols.length)],
  }));
}
function drawLasers(ctx: CanvasRenderingContext2D, nodes: LNode[], mouse: { x: number; y: number }, t: number, speed: number) {
  for (const n of nodes) {
    n.angle += n.speed * speed;
    const nx = n.ox + Math.cos(n.angle) * n.radius;
    const ny = n.oy + Math.sin(n.angle) * n.radius;
    const g = ctx.createLinearGradient(nx, ny, mouse.x, mouse.y);
    g.addColorStop(0, `${n.color}0.2)`); g.addColorStop(1, `${n.color}0)`);
    ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = g; ctx.lineWidth = 0.6; ctx.stroke();
    ctx.beginPath(); ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `${n.color}0.45)`; ctx.fill();
  }
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 7 + pulse * 5, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(56,189,248,${0.12 + pulse * 0.1})`; ctx.lineWidth = 1; ctx.stroke();
}

// ─── SHADER: ELASTIC GRID ────────────────────────────────────────────────────
interface GNode { ox: number; oy: number; x: number; y: number; vx: number; vy: number; }
function makeGrid(w: number, h: number): GNode[] {
  const cols = Math.ceil(w / 55), rows = Math.ceil(h / 55), nodes: GNode[] = [];
  for (let r = 0; r <= rows; r++)for (let c = 0; c <= cols; c++) {
    const ox = (c / cols) * w, oy = (r / rows) * h;
    nodes.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
  }
  return nodes;
}
function drawGrid(ctx: CanvasRenderingContext2D, nodes: GNode[], w: number, h: number, mouse: { x: number; y: number }, speed: number) {
  const cols = Math.ceil(w / 55) + 1, K = 0.04 * speed, D = 0.88, R = 90;
  for (const n of nodes) {
    const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
    if (d < R && d > 0) { const f = (1 - d / R) * 1.8; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
    n.vx += (n.ox - n.x) * K; n.vy += (n.oy - n.y) * K;
    n.vx *= D; n.vy *= D; n.x += n.vx; n.y += n.vy;
  }
  ctx.strokeStyle = "rgba(100,116,139,0.1)"; ctx.lineWidth = 0.5;
  for (let i = 0; i < nodes.length; i++) {
    const r = i + 1, b = i + cols;
    if (r < nodes.length && (i + 1) % cols !== 0) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[r].x, nodes[r].y); ctx.stroke(); }
    if (b < nodes.length) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke(); }
  }
  for (const n of nodes) {
    const d = Math.hypot(n.x - n.ox, n.y - n.oy), g = Math.min(d / 20, 1);
    ctx.beginPath(); ctx.arc(n.x, n.y, 1.1 + g, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(103,232,249,${0.07 + g * 0.2})`; ctx.fill();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AnimatedBackground({ config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<{
    t: number; raf: number;
    mouse: { x: number; y: number };
    stars: Star[]; aurora: AuroraPoint[]; wisps: Wisp[];
    gParts: GPart[]; lNodes: LNode[]; grid: GNode[];
    config: BgConfig;
  }>({
    t: 0, raf: 0, mouse: { x: 0, y: 0 },
    stars: [], aurora: [], wisps: [],
    gParts: [], lNodes: [], grid: [],
    config,
  });

  useEffect(() => { state.current.config = config; }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const w = canvas.width, h = canvas.height;
      state.current.stars = makeStars(w, h);
      state.current.aurora = makeAurora(w);
      state.current.wisps = makeWisps(w, h);
      state.current.gParts = makeGParts(w, h);
      state.current.lNodes = makeLNodes(w, h);
      state.current.grid = makeGrid(w, h);
      state.current.mouse = { x: w / 2, y: h / 2 };
    };
    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    const onMove = (e: MouseEvent) => { state.current.mouse = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { state.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const BG = "#080C14";

    const tick = () => {
      const s = state.current;
      s.t += 0.008 * s.config.speed;
      const w = canvas.width, h = canvas.height;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      switch (s.config.mode) {
        case "dust":
          drawDeepSpace(ctx, w, h, s.t, s.stars, s.aurora, s.wisps, s.mouse, s.config.speed);
          break;
        case "waves":
          drawWaves(ctx, w, h, s.t, s.mouse, s.config.speed);
          break;
        case "gravity":
          drawGravity(ctx, s.gParts, w, h, s.mouse, s.config.speed);
          break;
        case "polyhedra":
          drawPolyhedra(ctx, w, h, s.t, s.mouse, s.config.speed);
          break;
        case "lasers":
          drawLasers(ctx, s.lNodes, s.mouse, s.t, s.config.speed);
          break;
        case "grid":
          drawGrid(ctx, s.grid, w, h, s.mouse, s.config.speed);
          break;
      }

      ctx.globalAlpha = 1;
      s.raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(state.current.raf);
      window.removeEventListener("resize", onResize);
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
