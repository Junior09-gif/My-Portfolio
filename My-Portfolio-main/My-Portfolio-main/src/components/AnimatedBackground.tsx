/**
 * AnimatedBackground — Premium morphing aurora canvas
 * Plasma blobs + star field + flow lines + cursor reactive
 * Fixed behind all UI, 60fps, pointer-events-none
 */
import { useEffect, useRef } from "react";

export type ShaderMode = "aurora" | "dust" | "waves" | "grid";

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

// ─── AURORA PLASMA ────────────────────────────────────────────────────────────

interface PlasmaBlob {
  x: number; y: number;
  vx: number; vy: number;
  tx: number; ty: number;
  radius: number;
  hue: number; sat: number; lit: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  z: number;
}

interface Star {
  x: number; y: number;
  r: number; alpha: number;
  twinkle: number; speed: number;
  z: number;
}

interface FlowLine {
  points: { x: number; y: number }[];
  alpha: number;
  hue: number;
  width: number;
  speed: number;
  phase: number;
}

function makeBlobs(w: number, h: number): PlasmaBlob[] {
  const HUES = [220, 195, 260, 210, 240, 200, 280];
  return Array.from({ length: 7 }, (_, i) => ({
    x: rand(w * 0.1, w * 0.9),
    y: rand(h * 0.1, h * 0.9),
    vx: 0, vy: 0,
    tx: rand(w * 0.1, w * 0.9),
    ty: rand(h * 0.1, h * 0.9),
    radius: rand(w * 0.18, w * 0.32),
    hue: HUES[i % HUES.length],
    sat: rand(70, 90),
    lit: rand(45, 65),
    alpha: rand(0.055, 0.11),
    pulsePhase: rand(0, Math.PI * 2),
    pulseSpeed: rand(0.003, 0.008),
    z: rand(0.3, 1.0),
  }));
}

function makeStars(w: number, h: number): Star[] {
  return Array.from({ length: 180 }, () => {
    const z = Math.random();
    return {
      x: rand(0, w), y: rand(0, h),
      r: 0.3 + z * 1.2,
      alpha: 0.1 + z * 0.55,
      twinkle: rand(0, Math.PI * 2),
      speed: rand(0.005, 0.022),
      z,
    };
  });
}

function makeFlowLines(w: number, h: number): FlowLine[] {
  return Array.from({ length: 12 }, () => {
    const startX = rand(-w * 0.1, w * 1.1);
    const startY = rand(h * 0.1, h * 0.9);
    const points = Array.from({ length: 8 }, (_, i) => ({
      x: startX + (w / 7) * i + rand(-40, 40),
      y: startY + rand(-60, 60),
    }));
    return {
      points,
      alpha: rand(0.018, 0.045),
      hue: rand(195, 260),
      width: rand(0.5, 1.4),
      speed: rand(0.0008, 0.002),
      phase: rand(0, Math.PI * 2),
    };
  });
}

function drawAurora(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  blobs: PlasmaBlob[], stars: Star[], lines: FlowLine[],
  mouse: { x: number; y: number },
  speed: number
) {
  const mx = mouse.x / w - 0.5;
  const my = mouse.y / h - 0.5;

  // ── 1. Plasma blobs ──
  ctx.globalCompositeOperation = "screen";
  for (const b of blobs) {
    // Wander toward target
    b.vx = lerp(b.vx, (b.tx - b.x) * 0.0008, 0.05);
    b.vy = lerp(b.vy, (b.ty - b.y) * 0.0008, 0.05);

    // Gentle cursor attract
    b.vx += (mouse.x - b.x) * 0.000012;
    b.vy += (mouse.y - b.y) * 0.000012;

    b.vx *= 0.985; b.vy *= 0.985;
    b.x += b.vx * speed; b.y += b.vy * speed;

    // Pick new target when close
    if (Math.hypot(b.x - b.tx, b.y - b.ty) < 40) {
      b.tx = rand(w * 0.08, w * 0.92);
      b.ty = rand(h * 0.08, h * 0.92);
    }

    b.pulsePhase += b.pulseSpeed * speed;
    const pulse = 0.72 + 0.28 * Math.sin(b.pulsePhase);
    const r = b.radius * pulse;

    // Parallax offset
    const ox = mx * b.z * 0 + 0; // subtle
    const oy = my * b.z * 0 + 0;

    const g = ctx.createRadialGradient(b.x + ox, b.y + oy, 0, b.x + ox, b.y + oy, r);
    g.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, ${b.lit}%, ${b.alpha * pulse * 2.2})`);
    g.addColorStop(0.35, `hsla(${b.hue}, ${b.sat}%, ${b.lit}%, ${b.alpha * pulse * 1.1})`);
    g.addColorStop(0.7, `hsla(${b.hue + 15}, ${b.sat - 10}%, ${b.lit - 8}%, ${b.alpha * pulse * 0.4})`);
    g.addColorStop(1, `hsla(${b.hue}, ${b.sat}%, ${b.lit}%, 0)`);

    ctx.beginPath();
    ctx.arc(b.x + ox, b.y + oy, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  // ── 2. Flow lines ──
  for (const fl of lines) {
    fl.phase += fl.speed * speed;
    const waveAmt = 18 + 10 * Math.sin(fl.phase * 3);

    ctx.beginPath();
    fl.points.forEach((pt, i) => {
      const offsetY = waveAmt * Math.sin(fl.phase + i * 0.7) + my * 15;
      const offsetX = mx * 8;
      const x = pt.x + offsetX;
      const y = pt.y + offsetY;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = `hsla(${fl.hue}, 80%, 70%, ${fl.alpha})`;
    ctx.lineWidth = fl.width;
    ctx.stroke();
  }

  // ── 3. Stars ──
  for (const s of stars) {
    s.twinkle += s.speed * speed;
    const tw = 0.55 + 0.45 * Math.sin(s.twinkle);
    const ox = mx * s.z * 16;
    const oy = my * s.z * 16;

    ctx.beginPath();
    ctx.arc(s.x + ox, s.y + oy, s.r * tw, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.alpha * tw})`;
    ctx.fill();

    // Glow for bright close stars
    if (s.z > 0.7 && s.r > 0.9) {
      const gl = ctx.createRadialGradient(
        s.x + ox, s.y + oy, 0,
        s.x + ox, s.y + oy, s.r * 5
      );
      gl.addColorStop(0, `rgba(160,200,255,${0.1 * tw})`);
      gl.addColorStop(1, `rgba(160,200,255,0)`);
      ctx.beginPath();
      ctx.arc(s.x + ox, s.y + oy, s.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = gl;
      ctx.fill();
    }
  }

  // ── 4. Shooting star ──
  const shootT = (t * speed * 0.08) % 1;
  if (shootT < 0.018) {
    const p = shootT / 0.018;
    const sx = w * 0.15 + w * 0.6 * p;
    const sy = h * 0.04 + h * 0.18 * p;
    const len = 90 * (1 - p);
    const sg = ctx.createLinearGradient(sx - len, sy - len * 0.5, sx, sy);
    sg.addColorStop(0, "rgba(200,220,255,0)");
    sg.addColorStop(1, `rgba(200,220,255,${0.8 * (1 - p)})`);
    ctx.beginPath();
    ctx.moveTo(sx - len, sy - len * 0.5);
    ctx.lineTo(sx, sy);
    ctx.strokeStyle = sg;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // ── 5. Cursor halo ──
  const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
  halo.addColorStop(0, "rgba(99,179,255,0.045)");
  halo.addColorStop(1, "rgba(99,179,255,0)");
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
  ctx.fillStyle = halo;
  ctx.fill();
}

// ─── DUST shader ──────────────────────────────────────────────────────────────
interface Dust { x: number; y: number; vx: number; vy: number; r: number; alpha: number; }
function makeDust(w: number, h: number): Dust[] {
  return Array.from({ length: 80 }, () => {
    const a = rand(0, Math.PI * 2), s = rand(0.04, 0.14);
    return {
      x: rand(0, w), y: rand(0, h), vx: Math.cos(a) * s, vy: Math.sin(a) * s,
      r: rand(0.5, 1.8), alpha: rand(0.05, 0.18)
    };
  });
}
function drawDust(ctx: CanvasRenderingContext2D, dust: Dust[], w: number, h: number,
  mouse: { x: number; y: number }, speed: number) {
  for (const d of dust) {
    const dx = d.x - mouse.x, dy = d.y - mouse.y, dist = Math.hypot(dx, dy);
    if (dist < 90 && dist > 0) { d.vx += (dx / dist) * 0.005; d.vy += (dy / dist) * 0.005; }
    d.vx *= 0.998; d.vy *= 0.998;
    d.x += d.vx * speed; d.y += d.vy * speed;
    if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
    if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(140,180,255,${d.alpha})`; ctx.fill();
  }
}

// ─── WAVES shader ─────────────────────────────────────────────────────────────
function drawWaves(ctx: CanvasRenderingContext2D, w: number, h: number, t: number,
  mouse: { x: number; y: number }, speed: number) {
  const mx = mouse.x / w - 0.5, my = mouse.y / h - 0.5;
  for (let l = 0; l < 6; l++) {
    const p = l / 6, amp = h * (0.03 + p * 0.05), freq = 0.003 + p * 0.003;
    const ph = t * speed * (0.3 + p * 0.25) + l * 1.2, yB = h * (0.18 + p * 0.12);
    const hue = 210 + p * 40, alpha = 0.025 + p * 0.02;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const ci = amp * 0.5 * Math.exp(-Math.pow((x / w - 0.5 - mx) * 3, 2));
      const y = yB + Math.sin(x * freq + ph) * amp + Math.sin(x * freq * 1.9 + ph * 0.7) * amp * 0.35 + ci * (my * 2.5);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = `hsla(${hue},70%,60%,${alpha})`; ctx.fill();
  }
}

// ─── GRID shader ──────────────────────────────────────────────────────────────
interface GNode { ox: number; oy: number; x: number; y: number; vx: number; vy: number; }
function makeGrid(w: number, h: number): GNode[] {
  const cols = Math.ceil(w / 55), rows = Math.ceil(h / 55), nodes: GNode[] = [];
  for (let r = 0; r <= rows; r++)for (let c = 0; c <= cols; c++) {
    const ox = (c / cols) * w, oy = (r / rows) * h;
    nodes.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
  }
  return nodes;
}
function drawGrid(ctx: CanvasRenderingContext2D, nodes: GNode[], w: number, h: number,
  mouse: { x: number; y: number }, speed: number) {
  const cols = Math.ceil(w / 55) + 1, K = 0.04 * speed, D = 0.88, R = 90;
  for (const n of nodes) {
    const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
    if (d < R && d > 0) { const f = (1 - d / R) * 1.8; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
    n.vx += (n.ox - n.x) * K; n.vy += (n.oy - n.y) * K; n.vx *= D; n.vy *= D; n.x += n.vx; n.y += n.vy;
  }
  ctx.strokeStyle = "rgba(99,150,255,0.1)"; ctx.lineWidth = 0.6;
  for (let i = 0; i < nodes.length; i++) {
    const r = i + 1, b = i + cols;
    if (r < nodes.length && (i + 1) % cols !== 0) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[r].x, nodes[r].y); ctx.stroke(); }
    if (b < nodes.length) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke(); }
  }
  for (const n of nodes) {
    const d = Math.hypot(n.x - n.ox, n.y - n.oy), g = Math.min(d / 20, 1);
    ctx.beginPath(); ctx.arc(n.x, n.y, 1.1 + g, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,255,${0.08 + g * 0.22})`; ctx.fill();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AnimatedBackground({ config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<{
    t: number; raf: number;
    mouse: { x: number; y: number };
    blobs: PlasmaBlob[]; stars: Star[]; lines: FlowLine[];
    dust: Dust[]; grid: GNode[];
    config: BgConfig;
  }>({ t: 0, raf: 0, mouse: { x: 0, y: 0 }, blobs: [], stars: [], lines: [], dust: [], grid: [], config });

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
      state.current.blobs = makeBlobs(w, h);
      state.current.stars = makeStars(w, h);
      state.current.lines = makeFlowLines(w, h);
      state.current.dust = makeDust(w, h);
      state.current.grid = makeGrid(w, h);
      state.current.mouse = { x: w / 2, y: h / 2 };
    };
    init();

    window.addEventListener("resize", init);
    const onMove = (e: MouseEvent) => { state.current.mouse = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { state.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const tick = () => {
      const s = state.current;
      s.t += 0.01 * s.config.speed;
      const w = canvas.width, h = canvas.height;

      // Deep navy base
      ctx.fillStyle = "#080D1A";
      ctx.fillRect(0, 0, w, h);

      switch (s.config.mode) {
        case "aurora":
          drawAurora(ctx, w, h, s.t, s.blobs, s.stars, s.lines, s.mouse, s.config.speed);
          break;
        case "dust":
          drawDust(ctx, s.dust, w, h, s.mouse, s.config.speed);
          break;
        case "waves":
          drawWaves(ctx, w, h, s.t, s.mouse, s.config.speed);
          break;
        case "grid":
          drawGrid(ctx, s.grid, w, h, s.mouse, s.config.speed);
          break;
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      s.raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(state.current.raf);
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
