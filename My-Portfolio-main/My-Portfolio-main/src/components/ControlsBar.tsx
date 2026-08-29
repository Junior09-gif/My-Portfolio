import { BgConfig, ShaderMode } from "./AnimatedBackground";

interface Props { config: BgConfig; onChange: (next: Partial<BgConfig>) => void; }

const MODES: { mode: ShaderMode; label: string }[] = [
  { mode: "stardust", label: "·· dust" },
  { mode: "grid", label: "## grid" },
  { mode: "none", label: "   off" },
];

export default function ControlsBar({ config, onChange }: Props) {
  return (
    <div
      style={{
        position: "fixed", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.35rem 0.8rem",
        background: "rgba(9,13,22,0.7)",
        border: "1px solid #1e293b",
        borderRadius: "999px",
        backdropFilter: "blur(12px)",
        opacity: 0.4, transition: "opacity 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
    >
      <input type="range" min={70} max={130} step={5} value={config.brightness}
        onChange={e => onChange({ brightness: Number(e.target.value) })}
        style={{ width: "52px", accentColor: "#2563eb", cursor: "pointer" }}
        title={`Brightness ${config.brightness}%`}
      />
      <div style={{ width: "1px", height: "12px", background: "#1e293b" }} />
      {MODES.map(({ mode, label }) => (
        <button key={mode} onClick={() => onChange({ mode })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "0.62rem", fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
            color: config.mode === mode ? "#2563eb" : "#475569",
            transition: "color 0.15s", padding: "0.1rem 0.25rem",
          }}
          onMouseEnter={e => { if (config.mode !== mode) e.currentTarget.style.color = "#94a3b8"; }}
          onMouseLeave={e => { if (config.mode !== mode) e.currentTarget.style.color = "#475569"; }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
