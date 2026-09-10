import { BgConfig, ShaderMode } from "./AnimatedBackground";

interface Props { config: BgConfig; onChange: (next: Partial<BgConfig>) => void; }

const MODES: { mode: ShaderMode; label: string }[] = [
  { mode: "stardust", label: "·· dust" },
  { mode: "grid", label: "## grid" },
  { mode: "matrix", label: ">_ matrix" },
  { mode: "none", label: "off" },
];

export default function ControlsBar({ config, onChange }: Props) {
  return (
    <div
      style={{
        position: "fixed", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.35rem 0.85rem",
        background: "rgba(9,13,22,0.85)",
        border: "1px solid rgba(6,182,212,0.25)",
        borderRadius: "999px",
        backdropFilter: "blur(14px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        opacity: 0.6, transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = "0.6";
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.25)";
      }}
    >
      <input
        type="range" min={70} max={130} step={5} value={config.brightness}
        onChange={e => onChange({ brightness: Number(e.target.value) })}
        style={{ width: "50px", accentColor: "#06b6d4", cursor: "pointer" }}
        title={`Brightness ${config.brightness}%`}
      />
      <div style={{ width: "1px", height: "12px", background: "#1e293b" }} />
      {MODES.map(({ mode, label }) => {
        const isActive = config.mode === mode;
        return (
          <button key={mode} onClick={() => onChange({ mode })}
            style={{
              background: isActive ? "rgba(6,182,212,0.15)" : "none",
              border: isActive ? "1px solid rgba(6,182,212,0.4)" : "1px solid transparent",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "0.65rem", fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
              color: isActive ? "#22d3ee" : "#64748b",
              transition: "all 0.15s", padding: "0.15rem 0.45rem",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#94a3b8"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#64748b"; }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
