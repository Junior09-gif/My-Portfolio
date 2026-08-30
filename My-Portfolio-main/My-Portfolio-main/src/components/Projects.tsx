import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { Terminal, Calculator, Network, AlertCircle, BookOpen, Wifi, RotateCcw, CheckCircle2 } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  accentColor: string;
  setAccentColor: (c: string) => void;
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

const CARD: React.CSSProperties = { background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.75rem" };
const FIELD: React.CSSProperties = { width: "100%", padding: "0.5rem 0.8rem", background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.45rem", fontSize: "0.8rem", color: "#f1f5f9", outline: "none", fontFamily: "var(--font-mono)", transition: "border-color 0.2s" };
const BTN_NUM: React.CSSProperties = { padding: "0.7rem", borderRadius: "0.45rem", cursor: "pointer", background: "#151c2c", border: "1px solid #1e293b", color: "#f1f5f9", fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 600, transition: "background 0.15s" };
const BTN_OP: React.CSSProperties = { padding: "0.7rem", borderRadius: "0.45rem", cursor: "pointer", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", color: "#2563eb", fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, transition: "background 0.15s" };

const ACCENT_OPTIONS = [
  { name: "Cobalt", hex: "#2563eb" },
  { name: "Slate", hex: "#475569" },
  { name: "Indigo", hex: "#6366f1" },
];

export default function Projects({ projects, accentColor, setAccentColor }: ProjectsProps) {
  const [active, setActive] = useState("calculator");

  // Calculator
  const [input, setInput] = useState("");
  const [screen, setScreen] = useState("0");
  const [history, setHistory] = useState<string[]>(["# shell ready"]);

  const append = (ch: string) => {
    if (screen === "Error") { setScreen(ch); setInput(ch); return; }
    const ops = ["+", "-", "*", "/"];
    if (ops.includes(ch) && ops.includes(input.slice(-1))) return;
    const n = input + ch; setInput(n); setScreen(n);
  };
  const clear = () => { setInput(""); setScreen("0"); };
  const evaluate = () => {
    try {
      if (!input) return;
      if (/[^-()\d/*+.]/.test(input)) throw new Error();
      const r = Function(`"use strict";return(${input})`)() as number;
      if (!isFinite(r)) throw new Error();
      const rs = String(r);
      setScreen(rs);
      setHistory(p => [`>>> ${input} = ${rs}`, ...p.slice(0, 4)]);
      setInput(rs);
    } catch { setScreen("Error"); setInput(""); }
  };

  // Subnet
  const [ip, setIp] = useState("192.168.1.45");
  const [cidr, setCidr] = useState(24);
  const [ipErr, setIpErr] = useState("");
  const [subnet, setSubnet] = useState({ mask: "255.255.255.0", network: "192.168.1.0", broadcast: "192.168.1.255", hosts: "254" });

  useEffect(() => {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) { setIpErr("Enter a valid IPv4 address"); return; }
    setIpErr("");
    const c = Math.max(0, Math.min(32, cidr));
    const mb = "1".repeat(c).padEnd(32, "0");
    const mp = [0, 8, 16, 24].map(o => parseInt(mb.slice(o, o + 8), 2));
    const np = parts.map((p, i) => p & mp[i]);
    const hb = "0".repeat(c).padEnd(32, "1");
    const hp = [0, 8, 16, 24].map(o => parseInt(hb.slice(o, o + 8), 2));
    const bp = np.map((p, i) => p | hp[i]);
    setSubnet({ mask: mp.join("."), network: np.join("."), broadcast: bp.join("."), hosts: c >= 31 ? "0" : (Math.pow(2, 32 - c) - 2).toLocaleString() });
  }, [ip, cidr]);

  const applyColor = (hex: string) => {
    setAccentColor(hex);
    document.documentElement.style.setProperty("--color-accent", hex);
  };

  const tabIcon = (id: string) => {
    const s: React.CSSProperties = { width: "0.9rem", height: "0.9rem" };
    if (id === "calculator") return <Calculator style={s} />;
    if (id === "network") return <Network style={s} />;
    return <Terminal style={s} />;
  };

  return (
    <section id="projects" className="section" style={{ background: "#0d1120", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Projects</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Practical solutions I've built
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

          {/* Project cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {projects.map((proj, i) => {
              const isActive = active === proj.id;
              return (
                <motion.div key={proj.id} {...inView(i * 0.07)} onClick={() => setActive(proj.id)} whileHover={{ y: -1 }}
                  style={{
                    padding: "1rem", borderRadius: "0.65rem", cursor: "pointer", transition: "all 0.18s",
                    background: isActive ? "rgba(37,99,235,0.07)" : "#0d1120",
                    border: `1px solid ${isActive ? "rgba(37,99,235,0.28)" : "#1e293b"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{
                      padding: "0.4rem", borderRadius: "0.4rem", flexShrink: 0,
                      background: isActive ? "rgba(37,99,235,0.1)" : "#151c2c",
                      color: isActive ? "#2563eb" : "#475569"
                    }}>
                      {tabIcon(proj.id)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>{proj.title}</h3>
                      <p style={{
                        fontSize: "0.78rem", lineHeight: 1.55, color: "#94a3b8", marginBottom: "0.6rem",
                        overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                      }}>
                        {proj.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {proj.techStack.slice(0, 3).map(t => (
                          <span key={t} style={{ padding: "0.1rem 0.45rem", background: "#090d16", border: "1px solid #1e293b", color: "#475569", fontFamily: "var(--font-mono)", fontSize: "0.6rem", borderRadius: "0.3rem" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Demo panel */}
          <div style={{ ...CARD, display: "flex", flexDirection: "column", minHeight: "420px" }}>

            {/* Panel header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1.1rem", borderBottom: "1px solid #1e293b", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ padding: "0.35rem", borderRadius: "0.35rem", background: "rgba(37,99,235,0.1)", color: "#2563eb" }}>
                  <Terminal style={{ width: "0.8rem", height: "0.8rem" }} />
                </div>
                <div>
                  <p className="mono-tag">Interactive Demo</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f1f5f9", marginTop: "0.1rem" }}>
                    {active === "calculator" ? "Python Calculator" : active === "network" ? "IPv4 Subnet Tool" : "Theme Configurator"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Wifi style={{ width: "0.75rem", height: "0.75rem", color: "#2563eb" }} />
                <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#2563eb", letterSpacing: "0.06em" }}>LIVE</span>
              </div>
            </div>

            {/* Demo content */}
            <div style={{ flex: 1, padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AnimatePresence mode="wait">

                {/* Calculator */}
                {active === "calculator" && (
                  <motion.div key="calc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    style={{ width: "100%", maxWidth: "18rem" }}>
                    <div style={{ background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.65rem", padding: "0.9rem" }}>
                      {/* Screen */}
                      <div style={{ background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.5rem", padding: "0.65rem 0.85rem", marginBottom: "0.75rem", textAlign: "right" }}>
                        <p style={{ fontSize: "0.62rem", color: "#475569", fontFamily: "var(--font-mono)", marginBottom: "0.15rem" }}>{input || "0"}</p>
                        <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)" }}>{screen}</p>
                      </div>
                      {/* Buttons */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem" }}>
                        <button onClick={clear} style={{ ...BTN_OP, gridColumn: "span 2", color: "#ef4444", borderColor: "rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.08)" }}>AC</button>
                        {["/", "*"].map(op => <button key={op} onClick={() => append(op)} style={BTN_OP}>{op}</button>)}
                        {["7", "8", "9"].map(n => <button key={n} onClick={() => append(n)} style={BTN_NUM}>{n}</button>)}
                        <button onClick={() => append("-")} style={BTN_OP}>-</button>
                        {["4", "5", "6"].map(n => <button key={n} onClick={() => append(n)} style={BTN_NUM}>{n}</button>)}
                        <button onClick={() => append("+")} style={BTN_OP}>+</button>
                        {["1", "2", "3"].map(n => <button key={n} onClick={() => append(n)} style={BTN_NUM}>{n}</button>)}
                        <button onClick={evaluate} style={{ ...BTN_OP, gridRow: "span 2", background: "#2563eb", color: "#fff", borderColor: "#2563eb", fontSize: "1.1rem" }}>=</button>
                        <button onClick={() => append("0")} style={{ ...BTN_NUM, gridColumn: "span 2" }}>0</button>
                        <button onClick={() => append(".")} style={BTN_NUM}>.</button>
                      </div>
                      <div style={{ borderTop: "1px solid #1e293b", marginTop: "0.65rem", paddingTop: "0.5rem" }}>
                        {history.slice(0, 3).map((h, i) => (
                          <p key={i} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#475569", marginBottom: "0.1rem" }}>{h}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Subnet */}
                {active === "network" && (
                  <motion.div key="net" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                      <div>
                        <label className="mono-tag" style={{ display: "block", marginBottom: "0.35rem" }}>IP Address</label>
                        <input value={ip} onChange={e => setIp(e.target.value)} style={FIELD}
                          onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)")}
                          onBlur={e => (e.currentTarget.style.borderColor = "#1e293b")} />
                      </div>
                      <div>
                        <label className="mono-tag" style={{ display: "block", marginBottom: "0.35rem" }}>CIDR /{cidr}</label>
                        <select value={cidr} onChange={e => setCidr(+e.target.value)} style={FIELD}>
                          {Array.from({ length: 25 }, (_, i) => i + 8).map(v => <option key={v} value={v}>/{v}</option>)}
                        </select>
                      </div>
                    </div>
                    {ipErr && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 0.85rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: "0.45rem", fontSize: "0.78rem", color: "#fca5a5" }}>
                        <AlertCircle style={{ width: "0.875rem", height: "0.875rem", flexShrink: 0 }} />{ipErr}
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[
                        { label: "Subnet Mask", value: subnet.mask, color: "#2563eb" },
                        { label: "Network Address", value: subnet.network, color: "#f1f5f9" },
                        { label: "Broadcast Address", value: subnet.broadcast, color: "#f1f5f9" },
                        { label: "Usable Hosts", value: `${subnet.hosts} IPs`, color: "#2563eb" },
                      ].map(({ label, value, color }) => (
                        <div key={label} style={{ ...CARD, padding: "0.65rem 0.85rem" }}>
                          <p className="mono-tag" style={{ marginBottom: "0.2rem" }}>{label}</p>
                          <p style={{ fontSize: "0.8rem", fontWeight: 700, color, fontFamily: "var(--font-mono)" }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ ...CARD, padding: "0.85rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.55rem" }}>
                        <BookOpen style={{ width: "0.8rem", height: "0.8rem", color: "#2563eb" }} />
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f1f5f9" }}>Protocol Reference</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.3rem" }}>
                        {[["TCP", "Reliable delivery"], ["IP", "Addressing & routing"], ["DHCP", "Auto IP config"], ["DNS", "Name resolution"]].map(([k, v]) => (
                          <p key={k} style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{k} </span>— {v}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Theme configurator */}
                {active === "portfolio" && (
                  <motion.div key="theme" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                    <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Change the portfolio accent colour live.</p>
                    <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center" }}>
                      {ACCENT_OPTIONS.map(c => (
                        <button key={c.name} onClick={() => applyColor(c.hex)}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer" }}>
                          <span style={{
                            width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: c.hex, display: "flex", alignItems: "center", justifyContent: "center",
                            border: `2px solid ${accentColor === c.hex ? "#fff" : "transparent"}`,
                            boxShadow: accentColor === c.hex ? `0 0 12px ${c.hex}` : "none",
                            transition: "all 0.2s"
                          }}>
                            {accentColor === c.hex && <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "#fff" }} />}
                          </span>
                          <span className="mono-tag">{c.name}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => applyColor("#2563eb")}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "#475569", fontFamily: "var(--font-mono)", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                    >
                      <RotateCcw style={{ width: "0.75rem", height: "0.75rem" }} />Reset to default
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Panel footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1.1rem", borderTop: "1px solid #1e293b", flexShrink: 0 }}>
              <span className="mono-tag">PROTOTYPE · INTERACTIVE</span>
              <button onClick={() => { if (active === "calculator") clear(); if (active === "network") { setIp("192.168.1.45"); setCidr(24); } }}
                className="mono-tag" style={{ background: "none", border: "none", cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >[reset]</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
