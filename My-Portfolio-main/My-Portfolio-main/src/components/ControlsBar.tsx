/**
 * ControlsBar — simple floating pill, bottom-center
 * Theme toggle · Brightness slider · Shader switcher
 */
import { Sun, Moon } from "lucide-react";
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

export default function ControlsBar({ config, onChange }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 1rem",
        borderRadius: "999px",
        background: "rgba(10,10,15,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        whiteSpace: "nowrap",
      }}
    >
      {/* Theme toggle */}
      <button
        onClick={() => onChange({ dark: !config.dark })}
        title={config.dark ? "Light mode" : "Dark mode"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "0.2rem",
          color: config.dark ? "#F5C842" : "#0A84FF",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        {config.dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Divider */}
      <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.1)" }} />

      {/* Brightness */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <span style={{ fontSize: "0.7rem", color: "#515154" }}>◐</span>
        <input
          type="range"
          min={70} max={130} step={5}
          value={config.brightness}
          onChange={e => onChange({ brightness: Number(e.target.value) })}
          title={`Brightness ${config.brightness}%`}
          style={{ width: "64px", accentColor: "#0A84FF", cursor: "pointer" }}
        />
        <span style={{ fontSize: "0.7rem", color: "#515154" }}>☼</span>
      </div>

      {/* Divider */}
      <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.1)" }} />

      {/* Shader pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {MODES.map(({ mode, symbol, label }) => {
          const isActive = config.mode === mode;
          return (
            <button
              key={mode}
              onClick={() => onChange({ mode })}
              title={label}
              style={{
                width: "1.8rem",
                height: "1.8rem",
                borderRadius: "0.4rem",
                background: isActive ? "rgba(10,132,255,0.2)" : "transparent",
                border: `1px solid ${isActive ? "rgba(10,132,255,0.4)" : "transparent"}`,
                cursor: "pointer",
                fontSize: "0.85rem",
                color: isActive ? "#0A84FF" : "#515154",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
                lineHeight: 1,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget.style.color = "#86868B");
                  (e.currentTarget.style.background = "rgba(255,255,255,0.05)");
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget.style.color = "#515154");
                  (e.currentTarget.style.background = "transparent");
                }
              }}
            >
              {symbol}
            </button>
          );
        })}
      </div>
    </div>
  );
}
