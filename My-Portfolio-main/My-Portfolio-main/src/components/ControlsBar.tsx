import { Sun, Moon } from "lucide-react";
import { ShaderMode, BgConfig } from "./AnimatedBackground";

interface Props { config: BgConfig; onChange: (next: Partial<BgConfig>) => void; }

const MODES: { mode: ShaderMode; symbol: string; label: string }[] = [
  { mode: "aurora", symbol: "✦", label: "Aurora" },
  { mode: "dust", symbol: "·", label: "Dust" },
  { mode: "waves", symbol: "∿", label: "Waves" },
  { mode: "grid", symbol: "◈", label: "Grid" },
];

export default function ControlsBar({ config, onChange }: Props) {
  return (
    <div
      style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.85rem", borderRadius: "999px", background: "rgba(8,13,26,0.6)", border: "1px solid rgba(255,255,255,0.07)", opacity: 0.45, transition: "opacity 0.3s ease", backdropFilter: "blur(16px)" }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}
    >
      {/* Theme */}
      <button onClick={() => onChange({ dark: !config.dark })} style={{ background: "none", border: "none", cursor: "pointer", color: config.dark ? "#FCD34D" : "#60A5FA", display: "flex", alignItems: "center", padding: "0.15rem" }}>
        {config.dark ? <Sun style={{ width: "0.85rem", height: "0.85rem" }} /> : <Moon style={{ width: "0.85rem", height: "0.85rem" }} />}
      </button>

      <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />

      {/* Brightness */}
      <input type="range" min={70} max={130} step={5} value={config.brightness}
        onChange={e => onChange({ brightness: Number(e.target.value) })}
        style={{ width: "52px", accentColor: "#3B82F6", cursor: "pointer" }}
      />

      <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />

      {/* Shaders */}
      {MODES.map(({ mode, symbol, label }) => {
        const isActive = config.mode === mode;
        return (
          <button key={mode} onClick={() => onChange({ mode })} title={label}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", lineHeight: 1, padding: "0.15rem 0.25rem", borderRadius: "0.3rem", color: isActive ? "#60A5FA" : "#4A5F80", transition: "color 0.15s" }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#8FA3C8"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#4A5F80"; }}
          >
            {symbol}
          </button>
        );
      })}
    </div>
  );
}
