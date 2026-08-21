import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import {
  Terminal, Calculator, Network, AlertCircle, BookOpen,
  ChevronRight, Wifi, RotateCcw, CheckCircle2
} from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  accentColor: string;
  setAccentColor: (c: string) => void;
}

export default function Projects({ projects, accentColor, setAccentColor }: ProjectsProps) {
  const [active, setActive] = useState("calculator");

  // ── Calculator ──
  const [input, setInput] = useState("");
  const [screen, setScreen] = useState("0");
  const [history, setHistory] = useState<string[]>(["# shell ready"]);

  const calcAppend = (ch: string) => {
    if (screen === "Error") { setScreen(ch); setInput(ch); return; }
    const ops = ["+", "-", "*", "/"];
    if (ops.includes(ch) && ops.includes(input.slice(-1))) return;
    const next = input + ch;
    setInput(next); setScreen(next);
  };
  const calcClear = () => { setInput(""); setScreen("0"); };
  const calcEval = () => {
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
  const [subnet, setSubnet] = useState({ mask: "255.255.255.0", network: "192.168.1.0", broadcast: "192.168.1.255", hosts: "254" });

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
    const hosts = c >= 31 ? 0 : Math.pow(2, 32 - c) - 2;
    setSubnet({ mask: mp.join("."), network: np.join("."), broadcast: bp.join("."), hosts: hosts.toLocaleString() });
  }, [ip, cidr]);

  // ── Theme ──
  const colorPresets = [
    { name: "Blue", hex: "#0ea5e9" },
    { name: "Violet", hex: "#8b5cf6" },
    { name: "Emerald", hex: "#10b981" },
    { name: "Rose", hex: "#f43f5e" },
  ];
  const applyColor = (hex: string) => {
    setAccentColor(hex);
    document.documentElement.style.setProperty("--color-brand-500", hex);
    document.documentElement.style.setProperty("--color-brand-600", hex);
    document.documentElement.style.setProperty("--color-brand-400", hex);
  };

  const tabIcon = (id: string) => {
    if (id === "calculator") return <Calculator className="w-4 h-4" />;
    if (id === "network") return <Network className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  };

  return (
    <section id="projects" className="py-28 bg-[#060810] relative">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-brand-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">Academic Projects</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Practical solutions I've built
          </h2>
          <div className="w-10 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

          {/* Project list */}
          <div className="xl:col-span-5 space-y-3">
            {projects.map((proj) => {
              const isActive = active === proj.id;
              return (
                <motion.div
                  key={proj.id}
                  whileHover={{ x: 2 }}
                  onClick={() => setActive(proj.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${isActive
                      ? "bg-brand-500/8 border-brand-500/40 shadow-lg shadow-brand-900/10"
                      : "bg-surface-800 border-white/6 hover:border-white/15"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border mt-0.5 flex-shrink-0 ${isActive ? "bg-brand-500/15 border-brand-500/30 text-brand-400" : "bg-surface-700 border-white/8 text-slate-400"
                      }`}>
                      {tabIcon(proj.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-semibold text-white text-sm">{proj.title}</h3>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "rotate-90 text-brand-400" : "text-slate-600"}`} />
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-700 border border-white/6 text-slate-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive demo panel */}
          <div className="xl:col-span-7">
            <div className="card h-full flex flex-col">

              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-400 animate-pulse">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Interactive Demo</p>
                    <h3 className="text-sm font-display font-bold text-white leading-tight">
                      {active === "calculator" && "Python Calculator"}
                      {active === "network" && "IPv4 Subnet Tool"}
                      {active === "portfolio" && "Theme Configurator"}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Demo content */}
              <div className="flex-1 p-6 flex items-center justify-center">
                <AnimatePresence mode="wait">

                  {/* Calculator */}
                  {active === "calculator" && (
                    <motion.div key="calc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-xs mx-auto">
                      <div className="bg-surface-900 rounded-2xl border border-white/6 p-4 shadow-xl">
                        {/* Screen */}
                        <div className="bg-[#060810] rounded-xl px-4 py-3 mb-4 text-right border border-white/5">
                          <p className="text-[10px] font-mono text-slate-600 min-h-4">{input || "0"}</p>
                          <p className="text-2xl font-mono font-bold text-white truncate">{screen}</p>
                        </div>
                        {/* Buttons */}
                        <div className="grid grid-cols-4 gap-2 text-sm font-mono font-semibold">
                          <button onClick={calcClear} className="col-span-2 py-3 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 cursor-pointer transition-colors">AC</button>
                          {["/", "*"].map(op => <button key={op} onClick={() => calcAppend(op)} className="py-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 cursor-pointer transition-colors">{op}</button>)}
                          {["7", "8", "9"].map(n => <button key={n} onClick={() => calcAppend(n)} className="py-3 rounded-xl bg-surface-700 text-white hover:bg-surface-600 cursor-pointer transition-colors">{n}</button>)}
                          <button onClick={() => calcAppend("-")} className="py-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 cursor-pointer transition-colors">-</button>
                          {["4", "5", "6"].map(n => <button key={n} onClick={() => calcAppend(n)} className="py-3 rounded-xl bg-surface-700 text-white hover:bg-surface-600 cursor-pointer transition-colors">{n}</button>)}
                          <button onClick={() => calcAppend("+")} className="py-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 cursor-pointer transition-colors">+</button>
                          {["1", "2", "3"].map(n => <button key={n} onClick={() => calcAppend(n)} className="py-3 rounded-xl bg-surface-700 text-white hover:bg-surface-600 cursor-pointer transition-colors">{n}</button>)}
                          <button onClick={calcEval} className="row-span-2 rounded-xl bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-900/40 cursor-pointer transition-colors flex items-center justify-center text-lg">=</button>
                          <button onClick={() => calcAppend("0")} className="col-span-2 py-3 rounded-xl bg-surface-700 text-white hover:bg-surface-600 cursor-pointer transition-colors">0</button>
                          <button onClick={() => calcAppend(".")} className="py-3 rounded-xl bg-surface-700 text-white hover:bg-surface-600 cursor-pointer transition-colors">.</button>
                        </div>
                        {/* Log */}
                        <div className="mt-3 border-t border-white/5 pt-2.5 font-mono text-[10px] text-slate-500 space-y-0.5">
                          {history.slice(0, 3).map((h, i) => <p key={i} className="truncate">{h}</p>)}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Subnet */}
                  {active === "network" && (
                    <motion.div key="net" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-md mx-auto space-y-5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">IP Address</label>
                          <input value={ip} onChange={e => setIp(e.target.value)} className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-mono text-white" />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">CIDR /{cidr}</label>
                          <select value={cidr} onChange={e => setCidr(+e.target.value)} className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-mono text-white">
                            {Array.from({ length: 25 }, (_, i) => i + 8).map(v => <option key={v} value={v}>/{v}</option>)}
                          </select>
                        </div>
                      </div>
                      {ipErr && <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3"><AlertCircle className="w-4 h-4 flex-shrink-0" />{ipErr}</div>}
                      <div className="grid grid-cols-2 gap-3 font-mono">
                        {[
                          { label: "Subnet Mask", value: subnet.mask, color: "text-brand-400" },
                          { label: "Network Address", value: subnet.network, color: "text-white" },
                          { label: "Broadcast Address", value: subnet.broadcast, color: "text-white" },
                          { label: "Usable Hosts", value: `${subnet.hosts} IPs`, color: "text-emerald-400" },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="p-3.5 rounded-xl bg-surface-900 border border-white/6">
                            <p className="text-[9px] text-slate-500 uppercase mb-1">{label}</p>
                            <p className={`text-sm font-semibold ${color}`}>{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-surface-900 border border-white/6 text-xs">
                        <div className="flex items-center gap-2 text-brand-400 mb-2 font-semibold">
                          <BookOpen className="w-3.5 h-3.5" />Protocol Reference
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-slate-400">
                          <p><span className="text-white font-medium">TCP</span> — Reliable delivery</p>
                          <p><span className="text-white font-medium">IP</span> — Addressing & routing</p>
                          <p><span className="text-white font-medium">DHCP</span> — Auto IP config</p>
                          <p><span className="text-white font-medium">DNS</span> — Name resolution</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Portfolio theme */}
                  {active === "portfolio" && (
                    <motion.div key="port" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-sm mx-auto space-y-6 text-center">
                      <p className="text-sm text-slate-400">Change the portfolio's accent color live.</p>
                      <div className="flex justify-center gap-5">
                        {colorPresets.map(p => (
                          <button key={p.name} onClick={() => applyColor(p.hex)} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <span className="w-10 h-10 rounded-full border-2 transition-transform group-hover:scale-110 flex items-center justify-center"
                              style={{ backgroundColor: p.hex, borderColor: accentColor === p.hex ? "#fff" : "transparent" }}>
                              {accentColor === p.hex && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 group-hover:text-white transition-colors">{p.name}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <button onClick={() => applyColor("#0ea5e9")} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                          <RotateCcw className="w-3.5 h-3.5" /> Reset to default
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Panel footer */}
              <div className="px-6 py-3 border-t border-white/6 flex justify-between text-[10px] font-mono text-slate-600">
                <span>PROTOTYPE · INTERACTIVE</span>
                <button onClick={() => { if (active === "calculator") calcClear(); if (active === "network") { setIp("192.168.1.45"); setCidr(24); } }} className="hover:text-white transition-colors cursor-pointer">
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
