/**
 * ControlsBar
 * Compact floating panel — bottom-right corner, collapsed by default.
 * Only expands when the user clicks the gear icon.
 */
import { useState } from "react";
import { Settings, X, Sun, Moon } from "lucide-react";
import { ShaderMode, BgConfig } from "./AnimatedBackground";

interface Props {
  config: BgConfig;
  onChange: (next: Partial<BgConfig>) => void;
}

const MODES: { mode: ShaderMode; symbol: string; label: string }[] = [
  { mode: "dust", symbol: "·", label: "Dust" },
  { mode: "waves", symbol: "∿", label: "Waves" },
  { mode: "gravity", symbol: "⚛", label: "Gravity" },
  { mode: "polyhedra", symbol: "⌘", label: "Polyhedra" },
  { mode: "lasers", symbol: "⚡", label: "Lasers" },
  { mode: "grid", symbol: "◈", label: "Grid" },
];

const SPEEDS = [
  { value: 0.5, label: "0.5×" },
  { value: 1, label: "1×" },
  { value: 1.5, label: "1.5×" },
  { value: 2, label: "2×" },
];

export default function ControlsBar({ config, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {/* Expanded panel */}
      {open && (
        <div
          style={{
            background: "rgba(10,10,15,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            padding: "1rem",
            width: "220px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}
        >
          {/* Theme + Brightness */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#515154" }}>
              Appearance
            </p>
            {/* Theme toggle */}
            <button
              onClick={() => onChange({ dark: !config.dark })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0.6rem",
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
                color: "#86868B",
                fontSize: "0.8rem",
                width: "100%",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F7")}
              onMouseLeave={e => (e.currentTarget.style.color = "#86868B")}
            >
              {config.dark
                ? <Sun className="w-3.5 h-3.5" style={{ color: "#F5C842" }} />
                : <Moon className="w-3.5 h-3.5" style={{ color: "#0A84FF" }} />
              }
              <span>{config.dark ? "Light mode" : "Dark mode"}</span>
            </button>

            {/* Brightness */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "#515154" }}>Brightness</span>
                <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#86868B" }}>
                  {config.brightness}%
                </span>
              </div>
              <input
                type="range"
                min={70} max={130} step={5}
                value={config.brightness}
                onChange={e => onChange({ brightness: Number(e.target.value) })}
                style={{ width: "100%", accentColor: "#0A84FF", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Shader modes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#515154" }}>
              Background
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
              {MODES.map(({ mode, symbol, label }) => {
                const isActive = config.mode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => onChange({ mode })}
                    title={label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.5rem 0.25rem",
                      borderRadius: "0.5rem",
                      background: isActive ? "rgba(10,132,255,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? "rgba(10,132,255,0.35)" : "rgba(255,255,255,0.07)"}`,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: "1rem", lineHeight: 1 }}>{symbol}</span>
                    <span style={{
                      fontSize: "0.55rem",
                      fontFamily: "var(--font-mono)",
                      color: isActive ? "#0A84FF" : "#515154",
                      letterSpacing: "0.05em",
                    }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Speed */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", color: "#515154" }}>
              Speed
            </p>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {SPEEDS.map(({ value, label }) => {
                const isActive = config.speed === value;
                return (
                  <button
                    key={value}
                    onClick={() => onChange({ speed: value })}
                    style={{
                      flex: 1,
                      padding: "0.4rem 0",
                      borderRadius: "0.45rem",
                      background: isActive ? "rgba(10,132,255,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? "rgba(10,132,255,0.35)" : "rgba(255,255,255,0.07)"}`,
                      cursor: "pointer",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-mono)",
                      color: isActive ? "#0A84FF" : "#515154",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? "Close controls" : "Background controls"}
        style={{
          width: "2.4rem",
          height: "2.4rem",
          borderRadius: "50%",
          background: open ? "#0A84FF" : "rgba(10,10,15,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${open ? "rgba(10,132,255,0.5)" : "rgba(255,255,255,0.1)"}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: open ? "#fff" : "#86868B",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => {
          if (!open) {
            (e.currentTarget.style.color = "#F5F5F7");
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)");
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            (e.currentTarget.style.color = "#86868B");
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
          }
        }}
      >
        {open
          ? <X className="w-4 h-4" />
          : <Settings className="w-4 h-4" />
        }
      </button>
    </div>
  );
}
