/**
 * ControlsBar
 * Floating control strip — theme toggle, brightness dial, shader pills, speed selector.
 * Fixed bottom-center, frosted glass surface.
 */
import { useState } from "react";
import { ShaderMode, BgConfig } from "./AnimatedBackground";

interface Props {
  config: BgConfig;
  onChange: (next: Partial<BgConfig>) => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODES: { mode: ShaderMode; symbol: string; label: string }[] = [
  { mode: "waves",    symbol: "∿",  label: "Liquid Waves"      },
  { mode: "gravity",  symbol: "⚛",  label: "Gravity Well"      },
  { mode: "polyhedra",symbol: "⌘",  label: "3D Polyhedra"      },
  { mode: "lasers",   symbol: "⚡", label: "Constellation Lasers"},
  { mode: "grid",     symbol: "◈",  label: "Elastic Grid"      },
  { mode: "dust",     symbol: "·",  label: "Minimal Dust"      },
];

const SPEEDS: { value: number; label: string }[] = [
  { value: 0.5, label: "0.5×" },
  { value: 1,   label: "1×"   },
  { value: 1.5, label: "1.5×" },
  { value: 2,   label: "2×"   },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ControlsBar({ config, onChange }: Props) {
  const [open, setOpen] = useState(true);

  const dark = config.dark;

  // Palette
  const surface  = dark ? "rgba(8,12,20,0.75)"  : "rgba(241,245,249,0.75)";
  const border   = dark ? "rgba(56,189,248,0.12)": "rgba(14,165,233,0.15)";
  const text     = dark ? "#94A3B8"               : "#475569";
  const textHi   = dark ? "#E2E8F0"               : "#0F172A";
  const pillBg   = dark ? "rgba(15,39,68,0.9)"   : "rgba(14,165,233,0.1)";
  const pillBgA  = dark ? "rgba(56,189,248,0.18)" : "rgba(14,165,233,0.25)";
  const pillBord = dark ? "rgba(56,189,248,0.25)" : "rgba(14,165,233,0.35)";
  const pillBordA= dark ? "rgba(103,232,249,0.6)" : "rgba(14,165,233,0.7)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {/* Toggle tab */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? "Hide controls" : "Show controls"}
        style={{
          background: surface,
          border: `1px solid ${border}`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "999px",
          padding: "0.25rem 0.9rem",
          fontSize: "0.65rem",
          fontFamily: "monospace",
          letterSpacing: "0.12em",
          color: text,
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        {open ? "▾ controls" : "▴ controls"}
      </button>

      {/* Main bar */}
      {open && (
        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "1rem",
            padding: "0.65rem 1rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            maxWidth: "calc(100vw - 2rem)",
            boxShadow: dark
              ? "0 8px 32px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* ── Theme toggle ── */}
          <Divider />
          <button
            onClick={() => onChange({ dark: !dark })}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              fontSize: "1.1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
              padding: "0.1rem",
              filter: dark ? "none" : "grayscale(0.2)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <Divider />

          {/* ── Brightness slider ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.85rem", color: text }}>◐</span>
            <input
              type="range"
              min={70}
              max={130}
              step={5}
              value={config.brightness}
              onChange={e => onChange({ brightness: Number(e.target.value) })}
              title={`Brightness: ${config.brightness}%`}
              style={{
                width: "72px",
                accentColor: dark ? "#38BDF8" : "#0EA5E9",
                cursor: "pointer",
              }}
            />
            <span style={{ fontSize: "0.85rem", color: text }}>☼</span>
            <span
              style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                color: text,
                minWidth: "2.4rem",
              }}
            >
              {config.brightness}%
            </span>
          </div>

          <Divider />

          {/* ── Shader pills ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap", justifyContent: "center" }}>
            {MODES.map(({ mode, symbol, label }) => {
              const active = config.mode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => onChange({ mode })}
                  title={label}
                  style={{
                    background: active ? pillBgA : pillBg,
                    border: `1px solid ${active ? pillBordA : pillBord}`,
                    borderRadius: "0.4rem",
                    padding: "0.25rem 0.55rem",
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    color: active ? textHi : text,
                    transition: "all 0.18s ease",
                    fontWeight: active ? 600 : 400,
                    lineHeight: 1,
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = pillBordA;
                      (e.currentTarget as HTMLButtonElement).style.color = textHi;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = pillBord;
                      (e.currentTarget as HTMLButtonElement).style.color = text;
                    }
                  }}
                >
                  {symbol}
                </button>
              );
            })}
          </div>

          <Divider />

          {/* ── Speed controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {SPEEDS.map(({ value, label }) => {
              const active = config.speed === value;
              return (
                <button
                  key={value}
                  onClick={() => onChange({ speed: value })}
                  title={`Speed: ${label}`}
                  style={{
                    background: active ? pillBgA : "none",
                    border: `1px solid ${active ? pillBordA : "transparent"}`,
                    borderRadius: "0.35rem",
                    padding: "0.2rem 0.4rem",
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    color: active ? textHi : text,
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = textHi;
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = text;
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "1.4rem",
        background: "rgba(100,116,139,0.2)",
        flexShrink: 0,
      }}
    />
  );
}
