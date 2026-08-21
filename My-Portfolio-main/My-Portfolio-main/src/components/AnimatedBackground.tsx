/**
 * AnimatedBackground
 * Full-screen fixed canvas with 6 switchable motion shaders.
 * Sits behind all UI content (z-index: 0).
 */
import { useEffect, useRef } from "react";

export type ShaderMode = "waves" | "gravity" | "polyhedra" | "lasers" | "grid" | "dust";

export interface BgConfig {
  mode: ShaderMode;
  speed: number;       // multiplier: 0.5 | 1 | 1.5 | 2
  brightness: number;  // 70–130
  dark: boolean;
}

interface Props {
  config: BgConfig;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function rand(min: number, max: number) { return min + Math.random() * (max - min); }

// ─── Shader: Liquid Waves ─────────────────────────────────────────────────────

function drawWaves(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  t: number,
  mouse: { x: number; y: number },
  dark: boolean
) {
  const mx = mouse.x / w - 0.5;
  const my = mouse.y / h - 0.5;
  const layers = 6;

  for (let l = 0; l < layers; l++) {
    const prog = l / layers;
    const amp  = h * (0.04 + prog * 0.06);
    const freq = 0.004 + prog * 0.003;
    const phase = t * (0.4 + prog * 0.3) + l * 1.1;
    const yBase = h * (0.25 + prog * 0.12);
    const alpha = dark ? 0.04 + prog * 0.035 : 0.03 + prog * 0.025;
    const hue   = dark ? 200 + prog * 30 : 210 + prog * 20;

    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      const cursorInfluence = amp * 0.6 * Math.exp(-Math.pow((x / w - 0.5 - mx) * 3, 2));
      const y = yBase
        + Math.sin(x * freq + phase) * amp
        + Math.sin(x * freq * 1.7 + phase * 0.8) * amp * 0.4
        + cursorInfluence * (my * 2);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = `hsla(${hue}, 70%, ${dark ? 55 : 45}%, ${alpha})`;
    ctx.fill();
  }
}

// ─── Shader: Gravity Well ─────────────────────────────────────────────────────

interface GParticle {
  x: number; y: number;
  vx: number; vy: number;
  mass: number; alpha: number; color: string;
}

function makeGParticles(w: number, h: number, dark: boolean): GParticle[] {
  const colors = dark
    ? ["rgba(56,189,248,", "rgba(148,163,184,", "rgba(103,232,249,", "rgba(226,232,240,"]
    : ["rgba(14,165,233,",  "rgba(71,85,105,",   "rgba(6,182,212,",   "rgba(30,58,138,"];
  return Array.from({ length: 90 }, () => ({
    x: rand(0, w), y: rand(0, h),
    vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3),
    mass: rand(0.5, 2.5),
    alpha: rand(0.06, 0.22),
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function stepGravity(
  particles: GParticle[],
  w: number, h: number,
  mouse: { x: number; y: number },
  speed: number,
  ctx: CanvasRenderingContext2D,
  dark: boolean
) {
  const G = 0.18 * speed;
  const MAX_CONNECT = 100;

  for (const p of particles) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.max(Math.hypot(dx, dy), 30);
    const force = (G * p.mass) / (dist * dist) * Math.min(dist / 80, 1);
    p.vx += (dx / dist) * force;
    p.vy += (dy / dist) * force;
    p.vx *= 0.992;
    p.vy *= 0.992;
    const spd = Math.hypot(p.vx, p.vy);
    if (spd > 1.8) { p.vx = p.vx / spd * 1.8; p.vy = p.vy / spd * 1.8; }
    p.x += p.vx * speed;
    p.y += p.vy * speed;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
  }

  // connection web
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < MAX_CONNECT) {
        const a = (1 - d / MAX_CONNECT) * 0.09;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = dark ? `rgba(56,189,248,${a})` : `rgba(14,165,233,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.mass * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = `${p.color}${p.alpha})`;
    ctx.fill();
  }
}

// ─── Shader: 3D Polyhedra ─────────────────────────────────────────────────────

type Vec3 = [number, number, number];
type Edge = [number, number];

function rotX(p: Vec3, a: number): Vec3 {
  return [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
}
function rotY(p: Vec3, a: number): Vec3 {
  return [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
}
function rotZ(p: Vec3, a: number): Vec3 {
  return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];
}
function project(p: Vec3, cx: number, cy: number, fov: number): [number, number] {
  const z = p[2] + fov;
  return [cx + (p[0] * fov) / z, cy + (p[1] * fov) / z];
}

const SOLIDS: { verts: Vec3[]; edges: Edge[] }[] = [
  // Cube
  {
    verts: [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
    edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],
  },
  // Octahedron
  {
    verts: [[0,0,-1.4],[0,0,1.4],[0,-1.4,0],[0,1.4,0],[-1.4,0,0],[1.4,0,0]],
    edges: [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]],
  },
  // Pyramid
  {
    verts: [[0,1.3,0],[-1,-0.7,-1],[1,-0.7,-1],[1,-0.7,1],[-1,-0.7,1]],
    edges: [[0,1],[0,2],[0,3],[0,4],[1,2],[2,3],[3,4],[4,1]],
  },
  // Tetrahedron
  {
    verts: [[0,1.2,0],[-1,-0.6,-0.6],[1,-0.6,-0.6],[0,-0.6,1.2]],
    edges: [[0,1],[0,2],[0,3],[1,2],[2,3],[3,1]],
  },
];

function drawPolyhedra(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  t: number,
  mouse: { x: number; y: number },
  dark: boolean,
  speed: number
) {
  const positions: [number, number, number][] = [
    [w * 0.18, h * 0.28, 0],
    [w * 0.82, h * 0.22, 0],
    [w * 0.14, h * 0.72, 0],
    [w * 0.78, h * 0.68, 0],
  ];
  const scales = [65, 55, 50, 60];
  const color  = dark ? "rgba(148,163,184," : "rgba(71,85,105,";

  SOLIDS.forEach((solid, si) => {
    const [cx, cy] = positions[si];
    const sc  = scales[si];
    const rx  = t * speed * (0.22 + si * 0.07) + (mouse.y / h - 0.5) * 0.5;
    const ry  = t * speed * (0.18 + si * 0.05) + (mouse.x / w - 0.5) * 0.5;
    const rz  = t * speed * 0.08;
    const fov = 280;

    const rotated = solid.verts.map(v => {
      let p = rotX(v, rx);
      p = rotY(p, ry);
      p = rotZ(p, rz);
      return [p[0] * sc, p[1] * sc, p[2] * sc] as Vec3;
    });

    ctx.strokeStyle = `${color}${dark ? 0.18 : 0.14})`;
    ctx.lineWidth   = 0.8;

    for (const [a, b] of solid.edges) {
      const [ax, ay] = project(rotated[a], cx, cy, fov);
      const [bx, by] = project(rotated[b], cx, cy, fov);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    // vertices
    for (const v of rotated) {
      const [px, py] = project(v, cx, cy, fov);
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${dark ? 0.35 : 0.28})`;
      ctx.fill();
    }
  });
}

// ─── Shader: Constellation Lasers ────────────────────────────────────────────

interface LaserNode {
  angle: number; radius: number; speed: number;
  orbitX: number; orbitY: number;
  color: string;
}

function makeLaserNodes(w: number, h: number, dark: boolean): LaserNode[] {
  const colors = dark
    ? ["rgba(56,189,248,", "rgba(103,232,249,", "rgba(148,163,184,"]
    : ["rgba(14,165,233,",  "rgba(6,182,212,",   "rgba(71,85,105,"];
  return Array.from({ length: 14 }, (_, i) => ({
    angle:  (i / 14) * Math.PI * 2,
    radius: 90 + rand(-30, 60),
    speed:  rand(0.004, 0.012) * (Math.random() > 0.5 ? 1 : -1),
    orbitX: rand(w * 0.15, w * 0.85),
    orbitY: rand(h * 0.15, h * 0.85),
    color:  colors[Math.floor(Math.random() * colors.length)],
  }));
}

function drawLasers(
  ctx: CanvasRenderingContext2D,
  nodes: LaserNode[],
  mouse: { x: number; y: number },
  t: number,
  speed: number,
  dark: boolean
) {
  for (const n of nodes) {
    n.angle += n.speed * speed;
    const nx = n.orbitX + Math.cos(n.angle) * n.radius;
    const ny = n.orbitY + Math.sin(n.angle) * n.radius;

    // laser ray to cursor
    const grad = ctx.createLinearGradient(nx, ny, mouse.x, mouse.y);
    grad.addColorStop(0, `${n.color}0.22)`);
    grad.addColorStop(1, `${n.color}0)`);
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 0.6;
    ctx.stroke();

    // node dot
    ctx.beginPath();
    ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `${n.color}0.5)`;
    ctx.fill();
  }

  // pulsing cursor ring
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 8 + pulse * 6, 0, Math.PI * 2);
  ctx.strokeStyle = dark
    ? `rgba(56,189,248,${0.15 + pulse * 0.1})`
    : `rgba(14,165,233,${0.12 + pulse * 0.08})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ─── Shader: Elastic Grid ─────────────────────────────────────────────────────

interface GridNode {
  ox: number; oy: number;  // origin
  x:  number; y:  number;  // current
  vx: number; vy: number;
}

function makeGrid(w: number, h: number): GridNode[] {
  const cols = Math.ceil(w / 55);
  const rows = Math.ceil(h / 55);
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

function drawGrid(
  ctx: CanvasRenderingContext2D,
  nodes: GridNode[],
  w: number, h: number,
  mouse: { x: number; y: number },
  speed: number,
  dark: boolean
) {
  const cols = Math.ceil(w / 55) + 1;
  const REPEL = 90;
  const K     = 0.04 * speed;
  const DAMP  = 0.88;

  for (const n of nodes) {
    const dx   = n.x - mouse.x;
    const dy   = n.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < REPEL && dist > 0) {
      const f = (1 - dist / REPEL) * 1.8;
      n.vx += (dx / dist) * f;
      n.vy += (dy / dist) * f;
    }
    // spring back
    n.vx += (n.ox - n.x) * K;
    n.vy += (n.oy - n.y) * K;
    n.vx *= DAMP;
    n.vy *= DAMP;
    n.x  += n.vx;
    n.y  += n.vy;
  }

  ctx.strokeStyle = dark ? "rgba(100,116,139,0.12)" : "rgba(71,85,105,0.1)";
  ctx.lineWidth   = 0.5;

  const total = nodes.length;
  for (let i = 0; i < total; i++) {
    const right = i + 1;
    const below = i + cols;
    if (right < total && (i + 1) % cols !== 0) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[right].x, nodes[right].y);
      ctx.stroke();
    }
    if (below < total) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[below].x, nodes[below].y);
      ctx.stroke();
    }
  }

  // dots at intersections
  for (const n of nodes) {
    const d   = Math.hypot(n.x - n.ox, n.y - n.oy);
    const glow = Math.min(d / 20, 1);
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.2 + glow, 0, Math.PI * 2);
    ctx.fillStyle = dark
      ? `rgba(103,232,249,${0.08 + glow * 0.22})`
      : `rgba(14,165,233,${0.07 + glow * 0.18})`;
    ctx.fill();
  }
}

// ─── Shader: Minimal Dust ─────────────────────────────────────────────────────

interface Dust {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  color: string;
}

function makeDust(w: number, h: number, dark: boolean): Dust[] {
  const colors = dark
    ? ["rgba(226,232,240,", "rgba(148,163,184,", "rgba(167,243,208,"]
    : ["rgba(71,85,105,",   "rgba(100,116,139,", "rgba(6,182,212,"];
  return Array.from({ length: 70 }, () => {
    const spd = 0.04 + Math.random() * 0.1;
    const ang = Math.random() * Math.PI * 2;
    return {
      x: rand(0, w), y: rand(0, h),
      vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
      r: 0.5 + Math.random() * 1.2,
      alpha: 0.05 + Math.random() * 0.12,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
}

function drawDust(
  ctx: CanvasRenderingContext2D,
  dust: Dust[],
  w: number, h: number,
  mouse: { x: number; y: number },
  speed: number
) {
  for (const d of dust) {
    const dx   = d.x - mouse.x;
    const dy   = d.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 80 && dist > 0) {
      d.vx += (dx / dist) * 0.004;
      d.vy += (dy / dist) * 0.004;
    }
    d.vx *= 0.998;
    d.vy *= 0.998;
    d.x  += d.vx * speed;
    d.y  += d.vy * speed;
    if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
    if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `${d.color}${d.alpha})`;
    ctx.fill();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AnimatedBackground({ config }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<{
    t: number; raf: number;
    mouse: { x: number; y: number };
    gParticles: GParticle[];
    laserNodes: LaserNode[];
    gridNodes: GridNode[];
    dust: Dust[];
    config: BgConfig;
  }>({
    t: 0, raf: 0,
    mouse: { x: 0, y: 0 },
    gParticles: [], laserNodes: [], gridNodes: [], dust: [],
    config,
  });

  // Keep config ref in sync without re-mounting
  useEffect(() => { stateRef.current.config = config; }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const w = canvas.width;
      const h = canvas.height;
      const dark = stateRef.current.config.dark;
      stateRef.current.gParticles = makeGParticles(w, h, dark);
      stateRef.current.laserNodes = makeLaserNodes(w, h, dark);
      stateRef.current.gridNodes  = makeGrid(w, h);
      stateRef.current.dust       = makeDust(w, h, dark);
      stateRef.current.mouse      = { x: w / 2, y: h / 2 };
    };
    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      stateRef.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const tick = () => {
      const { t, mouse, gParticles, laserNodes, gridNodes, dust, config } = stateRef.current;
      stateRef.current.t += 0.008 * config.speed;

      const w = canvas.width;
      const h = canvas.height;
      const bg = config.dark ? "#080C14" : "#F1F5F9";

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      switch (config.mode) {
        case "waves":
          drawWaves(ctx, w, h, t, mouse, config.dark);
          break;
        case "gravity":
          stepGravity(gParticles, w, h, mouse, config.speed, ctx, config.dark);
          break;
        case "polyhedra":
          drawPolyhedra(ctx, w, h, t, mouse, config.dark, config.speed);
          break;
        case "lasers":
          drawLasers(ctx, laserNodes, mouse, t, config.speed, config.dark);
          break;
        case "grid":
          drawGrid(ctx, gridNodes, w, h, mouse, config.speed, config.dark);
          break;
        case "dust":
          drawDust(ctx, dust, w, h, mouse, config.speed);
          break;
      }

      stateRef.current.raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const brightnessFilter = `brightness(${config.brightness}%)`;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        filter: brightnessFilter,
        transition: "filter 0.4s ease",
      }}
    />
  );
}
