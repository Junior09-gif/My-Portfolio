import { Sun, Moon } from "lucide-react";
import { ShaderMode, BgConfig } from "./AnimatedBackground";

interface Props {
  config: BgConfig;
  onChange: (next: Partial<BgConfig>) => void;
}

const MODES: { mode: ShaderMode; symbol: string }[] = [
  { mode: "dust", symbol: "·" },
  { mode: "waves", symbol: "∿" },
  { mode: "gravity", symbol: "⚛" },
  { mode: "polyhedra", symbol: "⌘" },
  { mode: "lasers", symbol: "⚡" },
  { mode: "grid", symbol: "◈" },
];

export default function ControlsBar({ config, onChange }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.75rem",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: 0.4,
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
    >
      {/* Theme */}
      <button
        onClick={() => onChange({ dark: !config.dark })}
        title={config.dark ? "Light mode" : "Dark mode"}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: config.dark ? "#F5C842" : "#0A84FF",
          display: "flex", alignItems: "center", padding: "0.15rem",
        }}
      >
        {config.dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>

      <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.08)" }} />

      {/* Brightness */}
      <input
        type="range" min={70} max={130} step={5}
        value={config.brightness}
        onChange={e => onChange({ brightness: Number(e.target.value) })}
        title={`Brightness ${config.brightness}%`}
        style={{ width: "56px", accentColor: "#0A84FF", cursor: "pointer" }}
      />

      <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.08)" }} />

      {/* Shaders */}
      {MODES.map(({ mode, symbol }) => {
        const isActive = config.mode === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange({ mode })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
              lineHeight: 1,
              padding: "0.15rem 0.2rem",
              borderRadius: "0.3rem",
              color: isActive ? "#0A84FF" : "#515154",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#86868B"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#515154"; }}
          >
            {symbol}
          </button>
        );
      })}
    </div>
  );
}
