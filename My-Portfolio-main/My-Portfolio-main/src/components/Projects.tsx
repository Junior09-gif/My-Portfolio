import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import {
  Terminal, Calculator, Network, AlertCircle,
  BookOpen, Wifi, RotateCcw, CheckCircle2
} from "lucide-react";

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

// Monochromatic — single cobalt accent only
const COLORS = [
  { name: "Cobalt", hex: "#2563eb" },
  { name: "Slate", hex: "#475569" },
  { name: "Muted", hex: "#1e293b" },
];

const CARD: React.CSSProperties = { background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.75rem" };
const FIELD: React.CSSProperties = { width: "100%", padding: "0.5rem 0.8rem", background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.5rem", fontSize: "0.8rem", color: "#f1f5f9", outline: "none", fontFamily: "var(--font-mono)" };

export default function Projects({ projects, accentColor, setAccentColor }: ProjectsProps) {
  const [active, setActive] = useState("calculator");

  // ── Calculator ──
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

  // ── Subnet ──
  const [ip, setIp] = useState("192.168.1.45");
  const [cidr, setCidr] = useState(24);
  const [ipErr, setIpErr] = useState("");
  const [subnet, setSubnet] = useState({
    mask: "255.255.255.0", network: "192.168.1.0",
    broadcast: "192.168.1.255", hosts: "254",
  });

  useEffect(() => {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      setIpErr("Enter a valid IPv4 address"); return;
    }
    setIpErr("");
    const c = Math.max(0, Math.min(32, cidr));
    const mb = "1".repeat(c).padEnd(32, "0");
    const mp = [0, 8, 16, 24].map(o => parseInt(mb.slice(o, o + 8), 2));
    const np = parts.map((p, i) => p & mp[i]);
    const hb = "0".repeat(c).padEnd(32, "1");
    const hp = [0, 8, 16, 24].map(o => parseInt(hb.slice(o, o + 8), 2));
    const bp = np.map((p, i) => p | hp[i]);
    setSubnet({
      mask: mp.join("."),
      network: np.join("."),
      broadcast: bp.join("."),
      hosts: c >= 31 ? "0" : (Math.pow(2, 32 - c) - 2).toLocaleString(),
    });
  }, [ip, cidr]);

  const applyColor = (hex: string) => {
    setAccentColor(hex);
    document.documentElement.style.setProperty("--color-brand-500", hex);
    document.documentElement.style.setProperty("--color-brand-400", hex);
    document.documentElement.style.setProperty("--color-brand-600", hex);
  };

  const tabIcon = (id: string) => {
    if (id === "calculator") return <Calculator className="w-4 h-4" />;
    if (id === "network") return <Network className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  };

  const fieldStyle: React.CSSProperties = { ...FIELD };

  return (
    <section id="projects" className="section" style={{ background: "#0d1120", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Projects</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Practical solutions I've built
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>

          {/* Project list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {projects.map((proj, i) => {
              const isActive = active === proj.id;
              return (
                <motion.div
                  key={proj.id}
                  {...inView(i * 0.07)}
                  onClick={() => setActive(proj.id)}
                  style={{
                    padding: "1rem", borderRadius: "0.65rem", cursor: "pointer",
                    background: isActive ? "rgba(37,99,235,0.07)" : "#0d1120",
                    border: `1px solid ${isActive ? "rgba(37,99,235,0.28)" : "#1e293b"}`,
                    transition: "all 0.18s",
                  }}
                  whileHover={{ y: -1 }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ padding: "0.4rem", borderRadius: "0.4rem", flexShrink: 0, marginTop: "0.05rem", background: isActive ? "rgba(37,99,235,0.1)" : "#151c2c", color: isActive ? "#2563eb" : "#475569" }}>
                      {tabIcon(proj.id)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>{proj.title}</h3>
                      <p style={{ fontSize: "0.78rem", lineHeight: 1.55, color: "#94a3b8", marginBottom: "0.65rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {proj.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                        {proj.techStack.slice(0, 3).map(t => (
                          <span key={t} style={{ padding: "0.12rem 0.5rem", background: "#090d16", border: "1px solid #1e293b", color: "#475569", fontFamily: "var(--font-mono)", fontSize: "0.62rem", borderRadius: "0.3rem" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Demo panel */}
          <div className="xl:col-span-7">
            <div
              className="rounded-2xl flex flex-col"
              style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.07)", minHeight: "480px" }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ background: "rgba(10,132,255,0.1)", color: "#0A84FF" }}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="mono-tag">Interactive Demo</p>
                    <h3 className="text-sm font-semibold mt-0.5" style={{ color: "#F5F5F7" }}>
                      {active === "calculator" && "Python Calculator"}
                      {active === "network" && "IPv4 Subnet Tool"}
                      {active === "portfolio" && "Theme Configurator"}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3" style={{ color: "#30D158" }} />
                  <span className="mono-tag" style={{ color: "#30D158" }}>LIVE</span>
                </div>
              </div>

              {/* Demo content */}
              <div className="flex-1 p-6 flex items-center justify-center">
                <AnimatePresence mode="wait">

                  {/* ── Calculator ── */}
                  {active === "calculator" && (
                    <motion.div
                      key="calc"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="w-full max-w-xs mx-auto"
                    >
                      <div
                        className="rounded-2xl p-4"
                        style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {/* Screen */}
                        <div
                          className="rounded-xl px-4 py-3 mb-4 text-right"
                          style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <p
                            className="min-h-4 truncate"
                            style={{ fontSize: "0.65rem", color: "#515154", fontFamily: "var(--font-mono)" }}
                          >
                            {input || "0"}
                          </p>
                          <p
                            className="text-2xl font-bold truncate"
                            style={{ color: "#F5F5F7", fontFamily: "var(--font-mono)" }}
                          >
                            {screen}
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-4 gap-2 text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                          <button
                            onClick={clear}
                            className="col-span-2 py-3 rounded-xl cursor-pointer transition-all duration-150"
                            style={{ background: "rgba(255,55,95,0.12)", color: "#FF375F", border: "1px solid rgba(255,55,95,0.2)" }}
                          >
                            AC
                          </button>
                          {["/", "*"].map(op => (
                            <button
                              key={op}
                              onClick={() => append(op)}
                              className="py-3 rounded-xl cursor-pointer transition-all duration-150"
                              style={{ background: "rgba(10,132,255,0.1)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.2)" }}
                            >
                              {op}
                            </button>
                          ))}
                          {["7", "8", "9"].map(n => (
                            <button
                              key={n}
                              onClick={() => append(n)}
                              className="py-3 rounded-xl cursor-pointer transition-colors"
                              style={{ background: "rgba(255,255,255,0.05)", color: "#F5F5F7" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            onClick={() => append("-")}
                            className="py-3 rounded-xl cursor-pointer"
                            style={{ background: "rgba(10,132,255,0.1)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.2)" }}
                          >
                            -
                          </button>
                          {["4", "5", "6"].map(n => (
                            <button
                              key={n}
                              onClick={() => append(n)}
                              className="py-3 rounded-xl cursor-pointer"
                              style={{ background: "rgba(255,255,255,0.05)", color: "#F5F5F7" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            onClick={() => append("+")}
                            className="py-3 rounded-xl cursor-pointer"
                            style={{ background: "rgba(10,132,255,0.1)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.2)" }}
                          >
                            +
                          </button>
                          {["1", "2", "3"].map(n => (
                            <button
                              key={n}
                              onClick={() => append(n)}
                              className="py-3 rounded-xl cursor-pointer"
                              style={{ background: "rgba(255,255,255,0.05)", color: "#F5F5F7" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            onClick={evaluate}
                            className="row-span-2 rounded-xl cursor-pointer font-bold text-lg text-white transition-colors"
                            style={{ background: "#0A84FF" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#409CFF")}
                            onMouseLeave={e => (e.currentTarget.style.background = "#0A84FF")}
                          >
                            =
                          </button>
                          <button
                            onClick={() => append("0")}
                            className="col-span-2 py-3 rounded-xl cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.05)", color: "#F5F5F7" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                          >
                            0
                          </button>
                          <button
                            onClick={() => append(".")}
                            className="py-3 rounded-xl cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.05)", color: "#F5F5F7" }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                          >
                            .
                          </button>
                        </div>

                        {/* Log */}
                        <div
                          className="mt-3 pt-2.5 space-y-0.5"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#515154" }}
                        >
                          {history.slice(0, 3).map((h, i) => (
                            <p key={i} className="truncate">{h}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Subnet ── */}
                  {active === "network" && (
                    <motion.div
                      key="net"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="w-full max-w-md mx-auto space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mono-tag block mb-1.5">IP Address</label>
                          <input
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                            style={fieldStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = "rgba(10,132,255,0.4)")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                          />
                        </div>
                        <div>
                          <label className="mono-tag block mb-1.5">CIDR /{cidr}</label>
                          <select
                            value={cidr}
                            onChange={e => setCidr(+e.target.value)}
                            style={fieldStyle}
                          >
                            {Array.from({ length: 25 }, (_, i) => i + 8).map(v => (
                              <option key={v} value={v}>/{v}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {ipErr && (
                        <div
                          className="flex items-center gap-2 p-3 rounded-xl text-xs"
                          style={{ background: "rgba(255,55,95,0.08)", border: "1px solid rgba(255,55,95,0.2)", color: "#FF375F" }}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {ipErr}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Subnet Mask", value: subnet.mask, color: "#0A84FF" },
                          { label: "Network Address", value: subnet.network, color: "#F5F5F7" },
                          { label: "Broadcast Address", value: subnet.broadcast, color: "#F5F5F7" },
                          { label: "Usable Hosts", value: `${subnet.hosts} IPs`, color: "#30D158" },
                        ].map(({ label, value, color }) => (
                          <div
                            key={label}
                            className="p-3.5 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <p className="mono-tag mb-1">{label}</p>
                            <p
                              className="text-sm font-semibold"
                              style={{ color, fontFamily: "var(--font-mono)" }}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div
                        className="p-4 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-3.5 h-3.5" style={{ color: "#0A84FF" }} />
                          <span className="text-xs font-semibold" style={{ color: "#F5F5F7" }}>Protocol Reference</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-xs" style={{ color: "#86868B" }}>
                          <p><span style={{ color: "#F5F5F7", fontWeight: 500 }}>TCP</span> — Reliable delivery</p>
                          <p><span style={{ color: "#F5F5F7", fontWeight: 500 }}>IP</span>  — Addressing & routing</p>
                          <p><span style={{ color: "#F5F5F7", fontWeight: 500 }}>DHCP</span>— Auto IP config</p>
                          <p><span style={{ color: "#F5F5F7", fontWeight: 500 }}>DNS</span> — Name resolution</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Theme ── */}
                  {active === "portfolio" && (
                    <motion.div
                      key="theme"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="w-full max-w-xs mx-auto text-center space-y-6"
                    >
                      <p className="text-sm" style={{ color: "#86868B" }}>
                        Change the portfolio accent color live.
                      </p>
                      <div className="flex justify-center gap-5">
                        {COLORS.map(c => (
                          <button
                            key={c.name}
                            onClick={() => applyColor(c.hex)}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <span
                              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                              style={{
                                background: c.hex,
                                border: `2px solid ${accentColor === c.hex ? "#fff" : "transparent"}`,
                              }}
                            >
                              {accentColor === c.hex && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </span>
                            <span className="mono-tag">{c.name}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => applyColor("#0A84FF")}
                        className="flex items-center gap-1.5 text-xs mx-auto cursor-pointer transition-colors"
                        style={{ color: "#515154", background: "none", border: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F7")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#515154")}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset to default
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Panel footer */}
              <div
                className="px-6 py-3 flex justify-between flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="mono-tag">PROTOTYPE · INTERACTIVE</span>
                <button
                  onClick={() => {
                    if (active === "calculator") clear();
                    if (active === "network") { setIp("192.168.1.45"); setCidr(24); }
                  }}
                  className="mono-tag cursor-pointer transition-colors"
                  style={{ background: "none", border: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F7")}
                  onMouseLeave={e => (e.currentTarget.style.color = "")}
                >
                  [reset]
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
