import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import {
  FolderGit2, Code2, Play, BookOpen, AlertCircle, Wifi, Database, Info,
  Settings, Terminal, Calculator, HelpCircle, Network, Layers, RefreshCw, ChevronRight, Check
} from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export default function Projects({ projects, accentColor, setAccentColor }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<string>("calculator"); // Preset to Python Calculator to highlight interactive features

  // --- Python Calculator States ---
  const [calcInput, setCalcInput] = useState<string>("");
  const [calcScreen, setCalcScreen] = useState<string>("0");
  const [calcHistory, setCalcHistory] = useState<string[]>(["# Python shell math initialized"]);

  // --- Subnet Calculator States ---
  const [subnetIp, setSubnetIp] = useState<string>("192.168.1.45");
  const [subnetCidr, setSubnetCidr] = useState<number>(24);
  const [subnetError, setSubnetError] = useState<string>("");
  const [subnetResult, setSubnetResult] = useState({
    subnetMask: "255.255.255.0",
    networkAddress: "192.168.1.0",
    broadcastAddress: "192.168.1.255",
    totalHosts: "254"
  });

  // --- Portfolio Customizer States ---
  const [demoTheme, setDemoTheme] = useState<string>("navy-950");
  const [customTitle, setCustomTitle] = useState<string>("");

  // Helper for Calculator execution (safe math parser)
  const calcAppend = (char: string) => {
    if (calcScreen === "Error" || calcScreen === "NaN") {
      setCalcScreen(char);
      setCalcInput(char);
      return;
    }
    const isOperator = ["+", "-", "*", "/"].includes(char);
    const lastChar = calcInput.slice(-1);
    if (isOperator && ["+", "-", "*", "/"].includes(lastChar)) {
      // Avoid repetitive sequential operators
      return;
    }

    const newInput = calcInput + char;
    setCalcInput(newInput);
    setCalcScreen(newInput);
  };

  const calcClear = () => {
    setCalcInput("");
    setCalcScreen("0");
  };

  const calcEvaluate = () => {
    try {
      if (!calcInput) return;
      // Math evaluator regex constraint to prevent arbitrary script threats
      if (/[^-()\d/*+.]/.test(calcInput)) {
        throw new Error("Invalid Syntax");
      }

      // Calculate equation safely
      // Convert expression to valid mathematical evaluate
      // standard operator evaluate:
      const resultValue = Function(`"use strict"; return (${calcInput})`)();

      if (isNaN(resultValue) || !isFinite(resultValue)) {
        throw new Error("Math Error");
      }

      const resStr = String(resultValue);
      setCalcScreen(resStr);
      setCalcHistory(prev => [`>>> ${calcInput} = ${resStr}`, ...prev.slice(0, 4)]);
      setCalcInput(resStr);
    } catch (e) {
      setCalcScreen("Error");
      setCalcInput("");
    }
  };

  // Subnet Calculation logic
  useEffect(() => {
    const parts = subnetIp.split(".").map(p => parseInt(p, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      setSubnetError("Please input a valid IPv4 address (e.g. 192.168.1.45)");
      return;
    }
    setSubnetError("");

    const cidrVal = Math.max(0, Math.min(32, subnetCidr));

    // Subnet calculation formula
    const maskBin = "".padStart(cidrVal, "1").padEnd(32, "0");
    const maskParts = [
      parseInt(maskBin.substring(0, 8), 2),
      parseInt(maskBin.substring(8, 16), 2),
      parseInt(maskBin.substring(16, 24), 2),
      parseInt(maskBin.substring(24, 32), 2),
    ];

    const netParts = parts.map((part, idx) => part & maskParts[idx]);

    const hostBin = "".padStart(cidrVal, "0").padEnd(32, "1");
    const hostParts = [
      parseInt(hostBin.substring(0, 8), 2),
      parseInt(hostBin.substring(8, 16), 2),
      parseInt(hostBin.substring(16, 24), 2),
      parseInt(hostBin.substring(24, 32), 2),
    ];
    const broadParts = netParts.map((part, idx) => part | hostParts[idx]);

    const hosts = cidrVal >= 31 ? 0 : Math.pow(2, 32 - cidrVal) - 2;

    setSubnetResult({
      subnetMask: maskParts.join("."),
      networkAddress: netParts.join("."),
      broadcastAddress: broadParts.join("."),
      totalHosts: hosts.toLocaleString()
    });
  }, [subnetIp, subnetCidr]);

  // Handle Dynamic accent color changing in portfolio
  const handleColorChange = (color: string) => {
    setAccentColor(color);
    // Directly apply the dynamic CSS color changes to standard elements if needed
    // In React Tailwind v4, we can set custom inline css variables on document element!
    document.documentElement.style.setProperty('--color-brand-500', color);
    document.documentElement.style.setProperty('--color-brand-600', color);
    document.documentElement.style.setProperty('--color-brand-400', color);
  };

  const colorPresets = [
    { name: "Sleek Blue", hex: "#3b82f6" },
    { name: "Cyan Protect", hex: "#06b6d4" },
    { name: "Cyber Purple", hex: "#a855f7" },
    { name: "Security Green", hex: "#10b981" },
  ];

  return (
    <section id="projects" className="py-24 bg-navy-950 border-t border-navy-900 relative">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2 font-semibold">Practical Solutions</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Academic Projects</p>
          <div className="w-12 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 2 Column Layout: Project Navigator Cards on Left, Active Interactive Demo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Projects Navigator (5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-4">
            <p className="text-sm text-navy-400 leading-relaxed font-sans mb-4">
              Edwin Kofi prioritises software systems that solve real challenges. Select an engineering module below to activate the fully featured interactive prototype widget directly on-screen.
            </p>

            <div className="flex flex-col gap-4">
              {projects.map((proj) => {
                const isActive = activeProject === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProject(proj.id)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all hover:scale-[1.01] ${isActive
                        ? "bg-navy-900/60 border-brand-500 shadow-xl shadow-brand-500/5"
                        : "bg-navy-900/20 border-navy-850 hover:border-navy-805"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl border ${isActive
                          ? "bg-brand-500/20 border-brand-500/30 text-brand-300"
                          : "bg-navy-950 border-navy-800 text-navy-400"
                        }`}>
                        {proj.id === "calculator" ? (
                          <Calculator className="w-5 h-5" />
                        ) : proj.id === "network" ? (
                          <Network className="w-5 h-5" />
                        ) : (
                          <Code2 className="w-5 h-5" />
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base text-white">{proj.title}</h3>
                    </div>

                    <p className="text-xs text-navy-300 mb-4 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono uppercase font-semibold text-brand-400 bg-brand-950/40 border border-brand-900/50 px-2 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-navy-850/50">
                      <span className="text-[10px] text-navy-400 flex items-center gap-1 font-mono uppercase bg-navy-950 border border-navy-850 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Interactive Prototype Active
                      </span>
                      <ChevronRight className={`w-4 h-4 text-brand-400 transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Interactive Sandbox Drawer (7 Cols) */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="rounded-2xl bg-navy-900 p-6 border border-brand-500/10 shadow-2xl h-full flex flex-col justify-between">

              {/* Box Header containing current target name */}
              <div className="flex items-center justify-between border-b border-navy-850 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-400 animate-pulse">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-brand-400 uppercase leading-none">Running Prototype Simulator</span>
                    <h3 className="font-display font-bold text-white text-base leading-none mt-1">
                      {activeProject === "calculator" && "Python Interactive Calculators"}
                      {activeProject === "network" && "Interactive Subnetting IPv4 Tool"}
                      {activeProject === "portfolio" && "Theme/Appearance Configurer"}
                    </h3>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-navy-400 uppercase bg-navy-950/80 px-2.5 py-1 rounded-md border border-navy-850">
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span>ONLINE CLIENT</span>
                </div>
              </div>

              {/* Dynamic Simulated Window Content */}
              <div className="flex-grow flex flex-col justify-center">
                {activeProject === "calculator" && (
                  <div className="max-w-sm mx-auto w-full bg-navy-950 rounded-2xl border border-navy-800 p-4 shadow-2xl">
                    {/* Screen panel */}
                    <div className="bg-navy-900 rounded-xl px-4 py-3.5 text-right font-mono mb-4 border border-navy-850 flex flex-col justify-between h-20">
                      <span className="text-xs text-navy-500 select-none block tracking-wide">{calcInput || "Input equation..."}</span>
                      <span className="text-2xl font-bold text-white truncate">{calcScreen}</span>
                    </div>

                    {/* Button Pad */}
                    <div className="grid grid-cols-4 gap-2 mb-3 font-mono font-semibold text-sm">
                      {/* Clear and Operators */}
                      <button onClick={calcClear} className="col-span-2 p-3.5 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition-all text-center cursor-pointer">AC</button>
                      <button onClick={() => calcAppend("/")} className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-all text-center cursor-pointer">/</button>
                      <button onClick={() => calcAppend("*")} className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-all text-center cursor-pointer">*</button>

                      {/* Row 2 */}
                      <button onClick={() => calcAppend("7")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">7</button>
                      <button onClick={() => calcAppend("8")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">8</button>
                      <button onClick={() => calcAppend("9")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">9</button>
                      <button onClick={() => calcAppend("-")} className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-all text-center cursor-pointer">-</button>

                      {/* Row 3 */}
                      <button onClick={() => calcAppend("4")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">4</button>
                      <button onClick={() => calcAppend("5")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">5</button>
                      <button onClick={() => calcAppend("6")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">6</button>
                      <button onClick={() => calcAppend("+")} className="p-3.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-all text-center cursor-pointer">+</button>

                      {/* Row 4 */}
                      <button onClick={() => calcAppend("1")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">1</button>
                      <button onClick={() => calcAppend("2")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">2</button>
                      <button onClick={() => calcAppend("3")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">3</button>

                      {/* Equals Button (Spans 2 rows) */}
                      <button onClick={calcEvaluate} className="row-span-2 p-3.5 rounded-xl bg-brand-600 text-white hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center cursor-pointer">=</button>

                      {/* Row 5 */}
                      <button onClick={() => calcAppend("0")} className="col-span-2 p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">0</button>
                      <button onClick={() => calcAppend(".")} className="p-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-850 transition-all text-center cursor-pointer">.</button>
                    </div>

                    {/* Historical mini console logs */}
                    <div className="border-t border-navy-850 pt-2.5">
                      <span className="text-[9px] text-navy-500 uppercase tracking-wider block mb-1 font-mono">Console Logs:</span>
                      <div className="font-mono text-[10px] text-navy-400 space-y-1 bg-navy-900/40 p-2 rounded-lg border border-navy-900">
                        {calcHistory.map((hist, i) => (
                          <p key={i} className="truncate">{hist}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeProject === "network" && (
                  <div className="space-y-6 max-w-lg mx-auto w-full">
                    {/* Input parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-navy-400 mb-1.5 font-mono">IP Address</label>
                        <input
                          type="text"
                          value={subnetIp}
                          onChange={(e) => setSubnetIp(e.target.value)}
                          className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl px-4 py-2 text-sm text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-navy-400 mb-1.5 font-mono">CIDR Prefix (/{subnetCidr})</label>
                        <select
                          value={subnetCidr}
                          onChange={(e) => setSubnetCidr(parseInt(e.target.value))}
                          className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl px-4 py-2 text-sm text-white font-mono"
                        >
                          {Array.from({ length: 25 }, (_, i) => i + 8).map(v => (
                            <option key={v} value={v}>/{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {subnetError && (
                      <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>{subnetError}</span>
                      </div>
                    )}

                    {/* Calculation Output Parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-mono">
                      <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850/80">
                        <span className="text-[10px] text-navy-500 block mb-0.5">SUBNET DECIMAL MASK</span>
                        <span className="text-sm font-semibold text-brand-400">{subnetResult.subnetMask}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850/80">
                        <span className="text-[10px] text-navy-500 block mb-0.5">NETWORK ADDRESS</span>
                        <span className="text-sm font-semibold text-white">{subnetResult.networkAddress}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850/80">
                        <span className="text-[10px] text-navy-500 block mb-0.5">BROADCAST ADDRESS</span>
                        <span className="text-sm font-semibold text-white">{subnetResult.broadcastAddress}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850/80">
                        <span className="text-[10px] text-navy-500 block mb-0.5">ALLOCATABLE HOST IP RANGE</span>
                        <span className="text-sm font-semibold text-emerald-400">{subnetResult.totalHosts} Usable IPs</span>
                      </div>
                    </div>

                    {/* Protocol Quick-ref list */}
                    <div className="p-4 rounded-xl bg-navy-900 border border-navy-850 font-sans text-xs">
                      <div className="flex items-center gap-2 text-brand-400 mb-2 font-display font-semibold">
                        <BookOpen className="w-4 h-4" />
                        <span>Networking Protocol Study Reference</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-navy-300">
                        <div>• <strong className="text-white">TCP (Transmission)</strong>: Connection-oriented reliable delivery.</div>
                        <div>• <strong className="text-white">IP (Internet)</strong>: Addressing & Routing data nodes.</div>
                        <div>• <strong className="text-white">DHCP (Config)</strong>: Dynamic Host Address setups.</div>
                        <div>• <strong className="text-white">DNS (Names)</strong>: Name-to-IP resolution servers.</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProject === "portfolio" && (
                  <div className="space-y-6 max-w-lg mx-auto w-full">
                    <p className="text-xs text-navy-300 leading-relaxed font-sans text-center">
                      The portfolio's architectural design features adjustable colors and components! Interact directly with this configuration dashboard to alter Edwin Kofi's global aesthetic instantly.
                    </p>

                    {/* Accent Preset color select */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-mono text-navy-400 text-center uppercase tracking-wide">Change Active Accent Color</label>
                      <div className="flex gap-4 justify-center">
                        {colorPresets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => handleColorChange(preset.hex)}
                            className="flex flex-col items-center gap-1 cursor-pointer group"
                            title={`Select ${preset.name}`}
                          >
                            <span
                              className="w-10 h-10 rounded-full border-2 transition-transform duration-200 group-hover:scale-105"
                              style={{
                                backgroundColor: preset.hex,
                                borderColor: accentColor === preset.hex ? '#ffffff' : 'transparent'
                              }}
                            ></span>
                            <span className="text-[9px] font-mono text-navy-400 group-hover:text-white mt-1 transition-colors">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white font-display">
                        <Settings className="w-4 h-4 text-brand-400" />
                        <span>Aesthetics Verified Settings</span>
                      </div>
                      <p className="text-[11px] text-navy-300 leading-relaxed">
                        This active workspace tracks changes globally. Standard layouts are rendered using responsive grid definitions, letting KNUST evaluators browse on both smartphones and wide monitors.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Box Footer containing active status parameters */}
              <div className="border-t border-navy-850 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-navy-500">
                <span>COMPILED LOGS: ACTIVE</span>
                <span className="text-brand-400 hover:text-white cursor-pointer select-none" onClick={() => {
                  if (activeProject === "calculator") calcClear();
                  if (activeProject === "network") { setSubnetIp("192.168.1.45"); setSubnetCidr(24); }
                }}>
                  [Reset Simulator State]
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
