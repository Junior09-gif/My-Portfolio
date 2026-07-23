import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, ShieldAlert, Terminal, Play, Lock, Unlock, Key,
  RefreshCw, AlertTriangle, Eye, EyeOff, CheckCircle2
} from "lucide-react";

interface PortResult {
  port: number; service: string; status: "open" | "secure";
  threat: string; remediation: string;
}

const mockPorts: PortResult[] = [
  { port: 21, service: "FTP", status: "open", threat: "Anonymous login allowed; unencrypted data transfer.", remediation: "Disable anonymous FTP, migrate to SFTP (Port 22)." },
  { port: 22, service: "SSH", status: "secure", threat: "Secure cryptographic terminal login active.", remediation: "Maintain public-key auth. Disable password login." },
  { port: 80, service: "HTTP", status: "open", threat: "Plaintext transmission — vulnerable to sniffing.", remediation: "Force redirect to HTTPS (Port 443) with TLS 1.3." },
  { port: 443, service: "HTTPS", status: "secure", threat: "Encrypted web communication channel.", remediation: "Keep TLS certificates updated." },
  { port: 3306, service: "MySQL", status: "open", threat: "Remote DB access open — SQL injection risk.", remediation: "Bind to localhost 127.0.0.1, add firewall rules." },
];

export default function CyberLab() {
  const [tab, setTab] = useState<"scanner" | "entropy" | "cipher">("scanner");

  // Scanner
  const [targetIp, setTargetIp] = useState("192.168.1.102");
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<PortResult[]>([]);
  const [progress, setProgress] = useState(0);

  const runScan = () => {
    setScanning(true); setProgress(0); setResults([]);
    const scanLogs = [
      `[sys] Initializing scanner → ${targetIp}`,
      "[sys] Setting socket timeout: 2500ms",
      "[probe] TCP SYN sweep on ports [21, 22, 80, 443, 3306]",
      "[alert] Port 21 (FTP) — anonymous login detected",
      "[probe] SSL handshake verification running...",
      "[alert] Port 3306 (MySQL) — external binding detected",
      "[sys] Generating vulnerability assessment report...",
    ];
    setLogs([]);
    let i = 0;
    const iv = setInterval(() => {
      if (i < scanLogs.length) {
        setLogs(p => [...p, scanLogs[i]]);
        setProgress(Math.round(((i + 1) / scanLogs.length) * 100));
        i++;
      } else {
        clearInterval(iv);
        setResults(mockPorts);
        setScanning(false);
        setProgress(100);
      }
    }, 550);
  };

  // Entropy
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [entropy, setEntropy] = useState({ bits: 0, charset: 0, tier: "—", crack: "—", recs: [] as string[] });

  useEffect(() => {
    const len = pw.length;
    if (!len) { setEntropy({ bits: 0, charset: 0, tier: "—", crack: "—", recs: [] }); return; }
    let cs = 0;
    const h = { lo: /[a-z]/.test(pw), up: /[A-Z]/.test(pw), di: /[0-9]/.test(pw), sp: /[^A-Za-z0-9]/.test(pw) };
    if (h.lo) cs += 26; if (h.up) cs += 26; if (h.di) cs += 10; if (h.sp) cs += 33;
    const bits = Math.round(len * (Math.log(cs || 1) / Math.log(2)));
    const tier = bits >= 80 ? "Strong" : bits >= 60 ? "Moderate" : bits >= 35 ? "Weak" : "Very Weak";
    const crack = bits >= 80 ? "Centuries" : bits >= 60 ? "Weeks–Months" : bits >= 35 ? "Hours" : bits >= 10 ? "Seconds" : "Instant";
    const recs: string[] = [];
    if (!h.up) recs.push("Add uppercase letters (A–Z).");
    if (!h.di) recs.push("Include digits (0–9).");
    if (!h.sp) recs.push("Use special characters (e.g. #, @, $).");
    if (len < 12) recs.push("Target 12+ characters.");
    setEntropy({ bits, charset: cs, tier, crack, recs });
  }, [pw]);

  // Cipher
  const [plain, setPlain] = useState("Boadu Edwin");
  const [shift, setShift] = useState(13);
  const [cipher, setCipher] = useState("");

  useEffect(() => {
    setCipher(plain.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      return c;
    }).join(""));
  }, [plain, shift]);

  const tabs = [
    { id: "scanner" as const, label: "Port Scanner" },
    { id: "entropy" as const, label: "Password Strength" },
    { id: "cipher" as const, label: "Caesar Cipher" },
  ];

  return (
    <section id="cyber-lab" className="py-28 bg-surface-900 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3" style={{ color: "#34d399" }}>Cyber Lab</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Cybersecurity interactive tools
          </h2>
          <div className="w-10 h-0.5 bg-emerald-500 mt-4" />
          <p className="text-sm text-slate-400 mt-3 max-w-xl">
            Hands-on security simulations — scan for vulnerabilities, analyse password entropy, and explore classical cryptography.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-surface-800 border border-white/6 rounded-xl w-fit mb-10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${tab === t.id ? "bg-surface-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── Scanner ── */}
          {tab === "scanner" && (
            <motion.div key="scan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Controls */}
              <div className="lg:col-span-5 card p-5 flex flex-col gap-5">
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-emerald-400">
                  <Terminal className="w-4 h-4" />TCP/IP Audit Console
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Simulate a network port scan to discover vulnerable endpoints on a target host.</p>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Target IP</label>
                  <div className="flex gap-2">
                    <input value={targetIp} onChange={e => setTargetIp(e.target.value)} disabled={scanning}
                      className="flex-1 bg-surface-900 border border-white/8 focus:border-emerald-500 focus:outline-none rounded-xl px-3 py-2 font-mono text-xs text-emerald-400" />
                    <button onClick={runScan} disabled={scanning}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-emerald-900/30">
                      <Play className="w-3.5 h-3.5 fill-current" />Scan
                    </button>
                  </div>
                </div>
                {/* Terminal log */}
                <div className="flex-1 bg-surface-900 border border-white/6 rounded-xl p-3.5 h-48 font-mono text-[10px] text-emerald-400 overflow-y-auto space-y-1 flex flex-col">
                  {logs.length === 0 && <span className="text-slate-600 m-auto">Run a scan to see live logs.</span>}
                  {logs.map((l, i) => <p key={i} className="break-all">{l}</p>)}
                  {scanning && (
                    <div className="flex items-center gap-1.5 text-emerald-300 animate-pulse border-t border-emerald-900/30 pt-2 mt-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />{progress}% complete
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-7 card p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />Audit Results
                </div>
                {results.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/6 rounded-xl p-8 text-center">
                    <AlertTriangle className="w-8 h-8 text-slate-600 mb-3" />
                    <p className="text-xs text-slate-500 font-semibold">Waiting for scan results</p>
                    <p className="text-[10px] text-slate-600 mt-1">Run a scan on the left to populate this report.</p>
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
                    {results.map(r => (
                      <div key={r.port} className={`p-4 rounded-xl border ${r.status === "open" ? "bg-rose-500/5 border-rose-500/20" : "bg-emerald-500/5 border-emerald-500/15"}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-white">Port {r.port} <span className="text-slate-400 font-normal">({r.service})</span></span>
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${r.status === "open" ? "bg-rose-950/40 border-rose-500/30 text-rose-400" : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"}`}>
                            {r.status === "open" ? "At Risk" : "Secure"}
                          </span>
                        </div>
                        <p className={`text-[11px] mb-2 leading-relaxed ${r.status === "open" ? "text-rose-300" : "text-emerald-300"}`}>{r.threat}</p>
                        <p className="text-[10px] text-slate-400 bg-surface-900 rounded-lg p-2 border border-white/5">
                          <span className="text-white font-medium">Fix: </span>{r.remediation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Entropy ── */}
          {tab === "entropy" && (
            <motion.div key="ent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              className="card p-6 max-w-3xl">
              <div className="flex items-center gap-2 text-base font-display font-bold text-white mb-1">
                <Lock className="w-5 h-5 text-emerald-400" />Password Entropy Analyser
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Evaluate how resistant a password is to brute-force attacks using Shannon entropy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Test Credential</label>
                    <div className="relative">
                      <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="e.g. MyS3cure@Pass!"
                        className="w-full bg-surface-900 border border-white/8 focus:border-emerald-500 focus:outline-none rounded-xl pl-4 pr-10 py-2.5 font-mono text-xs text-white" />
                      <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-relaxed space-y-1.5 p-3 bg-surface-900 rounded-xl border border-white/5">
                    <p className="font-semibold text-slate-300">How it works</p>
                    <p>Entropy = length × log₂(charset size). Higher bits = harder to crack.</p>
                  </div>
                </div>

                {!pw ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/6 rounded-xl text-slate-600 text-xs gap-2">
                    <Unlock className="w-7 h-7 opacity-40" />Enter a password to analyse
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                      {[
                        { k: "Entropy", v: `${entropy.bits} bits`, c: "text-emerald-400" },
                        { k: "Charset", v: `${entropy.charset} syms`, c: "text-white" },
                        { k: "Strength", v: entropy.tier, c: entropy.bits >= 60 ? "text-emerald-400" : "text-rose-400" },
                        { k: "Crack Time", v: entropy.crack, c: "text-white" },
                      ].map(({ k, v, c }) => (
                        <div key={k} className="bg-surface-900 border border-white/6 p-3 rounded-xl">
                          <p className="text-[9px] text-slate-500 uppercase mb-1">{k}</p>
                          <p className={`font-bold text-sm ${c}`}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-surface-900 border border-white/6 rounded-xl text-[11px]">
                      <p className="font-mono text-slate-300 font-semibold mb-2">Recommendations</p>
                      {entropy.recs.length === 0 ? (
                        <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Strong credentials — no issues found.</div>
                      ) : entropy.recs.map((r, i) => <p key={i} className="text-rose-400 mb-1">• {r}</p>)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Cipher ── */}
          {tab === "cipher" && (
            <motion.div key="cip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              className="card p-6 max-w-3xl">
              <div className="flex items-center gap-2 text-base font-display font-bold text-white mb-1">
                <Key className="w-5 h-5 text-emerald-400" />Caesar Cipher — Symmetric Encryption
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Shift each letter by a fixed offset. One of the oldest encryption schemes, still used to teach substitution ciphers today.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Plaintext</label>
                    <textarea value={plain} onChange={e => setPlain(e.target.value)} rows={3}
                      className="w-full bg-surface-900 border border-white/8 focus:border-emerald-500 focus:outline-none rounded-xl p-3 text-sm font-mono text-white resize-none" />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                      <span>Shift offset</span>
                      <span className="text-white font-semibold">+{shift} positions</span>
                    </div>
                    <input type="range" min="1" max="25" value={shift} onChange={e => setShift(+e.target.value)}
                      className="w-full h-1.5 rounded-full accent-emerald-500 cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Ciphertext Output</label>
                    <div className="w-full bg-surface-900 border border-white/8 rounded-xl p-3 h-24 font-mono text-sm text-emerald-400 break-all overflow-y-auto select-all flex items-start">
                      {cipher || <span className="text-slate-600">Start typing...</span>}
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[11px] text-slate-400 leading-relaxed font-mono">
                    <span className="text-white font-semibold block mb-1">Lab Note</span>
                    To decode, set shift to <span className="text-emerald-400">{26 - shift}</span> and paste the ciphertext as input.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
