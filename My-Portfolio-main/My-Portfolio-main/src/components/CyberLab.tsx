import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, ShieldAlert, Terminal, Play, Lock, Unlock,
  Key, RefreshCw, AlertTriangle, Eye, EyeOff, CheckCircle2,
  Hash, Activity, Wifi, Server, Database, Globe
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortResult {
  port: number; service: string;
  status: "open" | "secure";
  severity: "critical" | "medium" | "safe";
  threat: string; remediation: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const mockPorts: PortResult[] = [
  { port: 21, service: "FTP", status: "open", severity: "critical", threat: "Anonymous login allowed; unencrypted data transfer.", remediation: "Disable anonymous FTP, migrate to SFTP (Port 22)." },
  { port: 22, service: "SSH", status: "secure", severity: "safe", threat: "Secure cryptographic terminal login active.", remediation: "Maintain public-key auth. Disable password login." },
  { port: 80, service: "HTTP", status: "open", severity: "medium", threat: "Plaintext transmission — vulnerable to sniffing.", remediation: "Force redirect to HTTPS (Port 443) with TLS 1.3." },
  { port: 443, service: "HTTPS", status: "secure", severity: "safe", threat: "TLS encrypted web communication channel active.", remediation: "Keep TLS certificates updated annually." },
  { port: 3306, service: "MySQL", status: "open", severity: "critical", threat: "Remote DB access exposed — SQL injection risk.", remediation: "Bind to localhost 127.0.0.1, apply firewall rules." },
];

const SEVERITY_COLOR: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  critical: { bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.22)", text: "#FCA5A5", badge: "#EF4444" },
  medium: { bg: "rgba(251,146,60,0.06)", border: "rgba(251,146,60,0.22)", text: "#FCD34D", badge: "#F97316" },
  safe: { bg: "rgba(52,211,153,0.06)", border: "rgba(52,211,153,0.18)", text: "#6EE7B7", badge: "#10B981" },
};

// ─── Simple hash function (demo-only, not cryptographic) ─────────────────────

function simpleHash(str: string, algo: "md5-like" | "sha1-like" | "sha256-like"): string {
  if (!str) return "";
  // Deterministic pseudo-hash for demo purposes
  const seeds: Record<string, number> = { "md5-like": 0x9747b28c, "sha1-like": 0x811c9dc5, "sha256-like": 0x01000193 };
  let h = seeds[algo];
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
    h ^= (h >>> 13); h = Math.imul(h, 0xc2b2ae35) >>> 0;
    h ^= (h >>> 16);
  }
  const lengths: Record<string, number> = { "md5-like": 32, "sha1-like": 40, "sha256-like": 64 };
  const len = lengths[algo];
  let result = "";
  let seed = h;
  while (result.length < len) {
    seed = (Math.imul(seed ^ (seed >>> 16), 0x45d9f3b) >>> 0);
    seed = (Math.imul(seed ^ (seed >>> 16), 0x45d9f3b) >>> 0);
    result += (seed >>> 0).toString(16).padStart(8, "0");
  }
  return result.slice(0, len);
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: "rgba(10,16,32,0.85)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.875rem",
};

const INPUT: React.CSSProperties = {
  width: "100%", padding: "0.6rem 0.9rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.65rem",
  fontSize: "0.825rem", color: "#F0F4FF",
  outline: "none", fontFamily: "var(--font-mono)",
  transition: "border-color 0.2s",
};

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

// ─── Threat Dashboard ─────────────────────────────────────────────────────────

function ThreatDashboard() {
  const stats = [
    { icon: Server, label: "Hosts Scanned", value: "1", color: "#3B82F6" },
    { icon: Activity, label: "Ports Probed", value: "5", color: "#8B5CF6" },
    { icon: ShieldAlert, label: "Vulnerabilities", value: "3", color: "#EF4444" },
    { icon: ShieldCheck, label: "Secure Ports", value: "2", color: "#10B981" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} style={{ ...CARD, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ padding: "0.4rem", borderRadius: "0.45rem", background: `${color}18` }}>
              <Icon style={{ width: "0.9rem", height: "0.9rem", color }} />
            </div>
            <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#F0F4FF", fontFamily: "var(--font-mono)", letterSpacing: "-0.02em" }}>{value}</span>
          </div>
          <p style={{ fontSize: "0.65rem", color: "#4A5F80", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Log line colorizer ───────────────────────────────────────────────────────

function LogLine({ line }: { line: string }) {
  let color = "#34D399";
  if (line.startsWith("[alert]")) color = "#FCA5A5";
  if (line.startsWith("[probe]")) color = "#93C5FD";
  if (line.startsWith("[sys]")) color = "#A5B4FC";
  if (line.startsWith("[warn]")) color = "#FCD34D";
  const parts = line.split(/(\[.*?\])/);
  return (
    <p style={{ color, lineHeight: 1.5 }}>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]")
          ? <span key={i} style={{ opacity: 0.6 }}>{p}</span>
          : p
      )}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CyberLab() {
  const [tab, setTab] = useState<"scanner" | "entropy" | "cipher" | "hash">("scanner");

  // ── Scanner ──
  const [targetIp, setTargetIp] = useState("192.168.1.102");
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<PortResult[]>([]);
  const [progress, setProgress] = useState(0);

  const runScan = () => {
    setScanning(true); setProgress(0); setResults([]); setLogs([]);
    const scanLogs = [
      `[sys] Initializing scanner → ${targetIp}`,
      "[sys] Setting socket timeout: 2500ms",
      "[probe] TCP SYN sweep on ports [21, 22, 80, 443, 3306]",
      "[probe] Checking port 21 (FTP)...",
      "[alert] Port 21 — anonymous login detected (CRITICAL)",
      "[probe] SSL/TLS handshake verification on port 443...",
      "[sys] Port 443 — TLS 1.3 certificate valid",
      "[probe] Checking port 3306 (MySQL)...",
      "[alert] Port 3306 — external binding detected (CRITICAL)",
      "[warn] Port 80 — plaintext HTTP active, redirect missing",
      "[sys] Generating vulnerability assessment report...",
      "[sys] Scan complete — 3 issues found, 2 ports secure.",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < scanLogs.length) {
        setLogs(p => [...p, scanLogs[i]]);
        setProgress(Math.round(((i + 1) / scanLogs.length) * 100));
        i++;
      } else {
        clearInterval(iv); setResults(mockPorts); setScanning(false);
      }
    }, 420);
  };

  // ── Entropy ──
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [entropy, setEntropy] = useState({ bits: 0, charset: 0, tier: "—", crack: "—", recs: [] as string[] });

  useEffect(() => {
    if (!pw.length) { setEntropy({ bits: 0, charset: 0, tier: "—", crack: "—", recs: [] }); return; }
    let cs = 0;
    const h = { lo: /[a-z]/.test(pw), up: /[A-Z]/.test(pw), di: /[0-9]/.test(pw), sp: /[^A-Za-z0-9]/.test(pw) };
    if (h.lo) cs += 26; if (h.up) cs += 26; if (h.di) cs += 10; if (h.sp) cs += 33;
    const bits = Math.round(pw.length * (Math.log(cs || 1) / Math.log(2)));
    const tier = bits >= 80 ? "Strong" : bits >= 60 ? "Moderate" : bits >= 35 ? "Weak" : "Very Weak";
    const crack = bits >= 80 ? "Centuries" : bits >= 60 ? "Weeks–Months" : bits >= 35 ? "Hours" : bits >= 10 ? "Seconds" : "Instant";
    const recs: string[] = [];
    if (!h.up) recs.push("Add uppercase letters (A–Z).");
    if (!h.di) recs.push("Include digits (0–9).");
    if (!h.sp) recs.push("Use special characters (#, @, $).");
    if (pw.length < 12) recs.push("Target 12+ characters.");
    setEntropy({ bits, charset: cs, tier, crack, recs });
  }, [pw]);

  // ── Cipher ──
  const [plain, setPlain] = useState("Boadu Edwin");
  const [shift, setShift] = useState(13);
  const [cipherText, setCipherText] = useState("");

  useEffect(() => {
    setCipherText(plain.split("").map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      return c;
    }).join(""));
  }, [plain, shift]);

  // ── Hash ──
  const [hashInput, setHashInput] = useState("hello world");
  const [hashAlgo, setHashAlgo] = useState<"md5-like" | "sha1-like" | "sha256-like">("sha256-like");
  const [hashCopied, setHashCopied] = useState(false);
  const hashOutput = simpleHash(hashInput, hashAlgo);

  const copyHash = () => {
    navigator.clipboard.writeText(hashOutput);
    setHashCopied(true);
    setTimeout(() => setHashCopied(false), 2000);
  };

  const TABS = [
    { id: "scanner" as const, label: "Port Scanner", icon: Wifi },
    { id: "entropy" as const, label: "Password Strength", icon: Lock },
    { id: "cipher" as const, label: "Caesar Cipher", icon: Key },
    { id: "hash" as const, label: "Hash Generator", icon: Hash },
  ];

  return (
    <section id="cyber-lab" className="section" style={{ background: "rgba(8,13,26,0.9)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <div style={{ padding: "0.35rem", background: "rgba(52,211,153,0.1)", borderRadius: "0.4rem" }}>
              <ShieldCheck style={{ width: "0.9rem", height: "0.9rem", color: "#34D399" }} />
            </div>
            <p className="label" style={{ color: "#34D399" }}>Cyber Lab</p>
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Cybersecurity interactive tools
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#8FA3C8", maxWidth: "40rem", lineHeight: 1.65 }}>
            Hands-on security simulations — scan for vulnerabilities, analyse password entropy, explore classical cryptography, and generate cryptographic hashes.
          </p>
        </motion.div>

        {/* Threat dashboard */}
        <motion.div {...inView(0.08)}>
          <ThreatDashboard />
        </motion.div>

        {/* Tab bar */}
        <motion.div {...inView(0.12)} style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", padding: "0.35rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.85rem", width: "fit-content", marginBottom: "2rem" }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.45rem 1rem", borderRadius: "0.6rem",
                fontSize: "0.8rem", fontWeight: tab === id ? 600 : 400,
                color: tab === id ? "#F0F4FF" : "#8FA3C8",
                background: tab === id ? "rgba(52,211,153,0.12)" : "transparent",
                border: tab === id ? "1px solid rgba(52,211,153,0.28)" : "1px solid transparent",
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (tab !== id) { e.currentTarget.style.color = "#F0F4FF"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={e => { if (tab !== id) { e.currentTarget.style.color = "#8FA3C8"; e.currentTarget.style.background = "transparent"; } }}
            >
              <Icon style={{ width: "0.8rem", height: "0.8rem" }} />
              {label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ══ PORT SCANNER ══ */}
          {tab === "scanner" && (
            <motion.div key="scan"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}
            >
              {/* Console */}
              <div style={{ ...CARD, padding: "1.35rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Terminal style={{ width: "0.9rem", height: "0.9rem", color: "#34D399" }} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#34D399", fontFamily: "var(--font-mono)" }}>TCP/IP Audit Console</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    {["#EF4444", "#F59E0B", "#22C55E"].map(c => (
                      <span key={c} style={{ width: "0.55rem", height: "0.55rem", borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: "0.8rem", color: "#8FA3C8", lineHeight: 1.6 }}>
                  Simulate a TCP SYN port scan to discover vulnerable endpoints on a target host.
                </p>

                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Target Host</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div style={{ position: "relative", flex: 1 }}>
                      <Globe style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "0.8rem", height: "0.8rem", color: "#34D399" }} />
                      <input value={targetIp} onChange={e => setTargetIp(e.target.value)} disabled={scanning}
                        style={{ ...INPUT, paddingLeft: "2.25rem", color: "#34D399" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                    <button onClick={runScan} disabled={scanning}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.1rem", background: scanning ? "rgba(5,150,105,0.5)" : "#059669", color: "#fff", borderRadius: "0.6rem", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: scanning ? "not-allowed" : "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                      onMouseEnter={e => { if (!scanning) e.currentTarget.style.background = "#047857"; }}
                      onMouseLeave={e => { if (!scanning) e.currentTarget.style.background = "#059669"; }}
                    >
                      {scanning
                        ? <><RefreshCw style={{ width: "0.8rem", height: "0.8rem" }} className="animate-spin" />Scanning</>
                        : <><Play style={{ width: "0.8rem", height: "0.8rem" }} />Scan</>
                      }
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                {(scanning || progress > 0) && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span className="mono-tag">Progress</span>
                      <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#34D399" }}>{progress}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#059669,#34D399)", borderRadius: "999px", transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                )}

                {/* Terminal output */}
                <div style={{ background: "#030712", border: "1px solid rgba(52,211,153,0.12)", borderRadius: "0.65rem", padding: "0.9rem", height: "10rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.18rem" }}>
                  <p style={{ color: "#4A5F80", marginBottom: "0.3rem" }}>$ net-audit v2.1 — educational simulation</p>
                  {logs.length === 0 && <span style={{ color: "#2A3F60" }}>Ready. Enter target IP and click Scan.</span>}
                  {logs.map((l, i) => {
                    let color = "#34D399";
                    if (l.startsWith("[alert]")) color = "#FCA5A5";
                    if (l.startsWith("[probe]")) color = "#93C5FD";
                    if (l.startsWith("[sys]")) color = "#A5B4FC";
                    if (l.startsWith("[warn]")) color = "#FCD34D";
                    return <p key={i} style={{ color, lineHeight: 1.5 }}>{l}</p>;
                  })}
                </div>
              </div>

              {/* Results panel */}
              <div style={{ ...CARD, padding: "1.35rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <ShieldAlert style={{ width: "0.9rem", height: "0.9rem", color: "#34D399" }} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF" }}>Vulnerability Report</span>
                  </div>
                  {results.length > 0 && (
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", padding: "0.15rem 0.6rem", borderRadius: "999px", background: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.22)" }}>
                      {results.filter(r => r.status === "open").length} issues
                    </span>
                  )}
                </div>

                {results.length === 0 ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "2.5rem 1.5rem", textAlign: "center", minHeight: "16rem" }}>
                    <div style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem", marginBottom: "0.9rem" }}>
                      <AlertTriangle style={{ width: "1.75rem", height: "1.75rem", color: "#2A3F60" }} />
                    </div>
                    <p style={{ fontSize: "0.825rem", color: "#4A5F80", fontWeight: 600 }}>Awaiting scan results</p>
                    <p style={{ fontSize: "0.75rem", color: "#2A3F60", marginTop: "0.3rem", lineHeight: 1.5 }}>Run a scan to generate the vulnerability report.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", overflowY: "auto", maxHeight: "22rem" }}>
                    {results.map(r => {
                      const sc = SEVERITY_COLOR[r.severity];
                      return (
                        <div key={r.port} style={{ padding: "0.9rem", borderRadius: "0.7rem", background: sc.bg, border: `1px solid ${sc.border}` }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.45rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ width: "0.45rem", height: "0.45rem", borderRadius: "50%", background: sc.badge }} />
                              <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#F0F4FF" }}>
                                :{r.port} <span style={{ color: "#8FA3C8", fontWeight: 400 }}>{r.service}</span>
                              </span>
                            </div>
                            <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", padding: "0.1rem 0.5rem", borderRadius: "999px", background: `${sc.badge}18`, color: sc.badge, border: `1px solid ${sc.badge}44`, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              {r.severity}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.78rem", color: sc.text, lineHeight: 1.55, marginBottom: "0.45rem" }}>{r.threat}</p>
                          <div style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start", background: "rgba(0,0,0,0.3)", padding: "0.45rem 0.65rem", borderRadius: "0.45rem" }}>
                            <CheckCircle2 style={{ width: "0.75rem", height: "0.75rem", color: "#34D399", flexShrink: 0, marginTop: "0.1rem" }} />
                            <p style={{ fontSize: "0.72rem", color: "#8FA3C8", lineHeight: 1.55 }}>{r.remediation}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ══ PASSWORD STRENGTH ══ */}
          {tab === "entropy" && (
            <motion.div key="ent"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ ...CARD, padding: "1.75rem", maxWidth: "52rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <Lock style={{ width: "1rem", height: "1rem", color: "#34D399" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F0F4FF" }}>Password Entropy Analyser</h3>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#8FA3C8", marginBottom: "1.75rem", lineHeight: 1.65 }}>
                Evaluate credential resistance to brute-force attacks using Shannon entropy — Entropy = length × log₂(charset).
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {/* Input side */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Test Credential</label>
                    <div style={{ position: "relative" }}>
                      <input type={showPw ? "text" : "password"} value={pw}
                        onChange={e => setPw(e.target.value)}
                        placeholder="e.g. MyS3cure@Pass!"
                        style={{ ...INPUT, paddingRight: "2.5rem" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                      <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.7rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4A5F80" }}>
                        {showPw ? <EyeOff style={{ width: "0.9rem", height: "0.9rem" }} /> : <Eye style={{ width: "0.9rem", height: "0.9rem" }} />}
                      </button>
                    </div>
                  </div>

                  {/* Strength bar */}
                  {pw && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <span className="mono-tag">Strength meter</span>
                        <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: entropy.bits >= 60 ? "#34D399" : entropy.bits >= 35 ? "#FCD34D" : "#F87171", fontWeight: 600 }}>{entropy.tier}</span>
                      </div>
                      <div style={{ height: "5px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: "999px", transition: "width 0.5s ease, background 0.5s ease",
                          width: `${Math.min((entropy.bits / 100) * 100, 100)}%`,
                          background: entropy.bits >= 80 ? "#10B981" : entropy.bits >= 60 ? "#34D399" : entropy.bits >= 35 ? "#F59E0B" : "#EF4444",
                        }} />
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "0.85rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.6rem", fontSize: "0.78rem", color: "#8FA3C8", lineHeight: 1.65 }}>
                    <p style={{ fontWeight: 600, color: "#F0F4FF", marginBottom: "0.3rem" }}>Shannon Entropy Formula</p>
                    <p style={{ fontFamily: "var(--font-mono)", color: "#34D399" }}>H = L × log₂(N)</p>
                    <p style={{ marginTop: "0.3rem" }}>L = password length, N = charset size</p>
                  </div>
                </div>

                {/* Results side */}
                {!pw ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.07)", borderRadius: "0.75rem", color: "#4A5F80", fontSize: "0.8rem", gap: "0.6rem", minHeight: "14rem" }}>
                    <Unlock style={{ width: "1.75rem", height: "1.75rem", opacity: 0.3 }} />
                    <p>Enter a password to analyse</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[
                        { k: "Entropy", v: `${entropy.bits} bits`, c: "#34D399" },
                        { k: "Charset", v: `${entropy.charset} sym`, c: "#F0F4FF" },
                        { k: "Strength", v: entropy.tier, c: entropy.bits >= 60 ? "#34D399" : entropy.bits >= 35 ? "#FCD34D" : "#F87171" },
                        { k: "Crack Time", v: entropy.crack, c: "#F0F4FF" },
                      ].map(({ k, v, c }) => (
                        <div key={k} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", padding: "0.7rem 0.85rem", borderRadius: "0.6rem" }}>
                          <p className="mono-tag" style={{ marginBottom: "0.3rem" }}>{k}</p>
                          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: c, fontFamily: "var(--font-mono)" }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "0.85rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.6rem" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#F0F4FF", marginBottom: "0.5rem" }}>Recommendations</p>
                      {entropy.recs.length === 0
                        ? <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#34D399" }}><CheckCircle2 style={{ width: "0.8rem", height: "0.8rem" }} />Strong — no issues found.</div>
                        : entropy.recs.map((r, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", marginBottom: "0.3rem" }}>
                            <AlertTriangle style={{ width: "0.75rem", height: "0.75rem", color: "#F87171", flexShrink: 0, marginTop: "0.1rem" }} />
                            <p style={{ fontSize: "0.78rem", color: "#FCA5A5" }}>{r}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ══ CAESAR CIPHER ══ */}
          {tab === "cipher" && (
            <motion.div key="cip"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ ...CARD, padding: "1.75rem", maxWidth: "52rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <Key style={{ width: "1rem", height: "1rem", color: "#34D399" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F0F4FF" }}>Caesar Cipher — Substitution Encryption</h3>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#8FA3C8", marginBottom: "1.75rem", lineHeight: 1.65 }}>
                A shift cipher that replaces each letter with one a fixed number of positions down the alphabet. One of the oldest encryption techniques in history.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Plaintext Input</label>
                    <textarea value={plain} onChange={e => setPlain(e.target.value)} rows={4}
                      style={{ ...INPUT, resize: "none" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span className="mono-tag">Shift Offset</span>
                      <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "#34D399", fontWeight: 700 }}>+{shift}</span>
                    </div>
                    <input type="range" min="1" max="25" value={shift} onChange={e => setShift(+e.target.value)}
                      style={{ width: "100%", accentColor: "#34D399", cursor: "pointer" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                      <span style={{ fontSize: "0.62rem", color: "#4A5F80", fontFamily: "var(--font-mono)" }}>+1 (ROT1)</span>
                      <span style={{ fontSize: "0.62rem", color: "#4A5F80", fontFamily: "var(--font-mono)" }}>+13 (ROT13)</span>
                      <span style={{ fontSize: "0.62rem", color: "#4A5F80", fontFamily: "var(--font-mono)" }}>+25</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Encrypted Output</label>
                    <div style={{ padding: "0.85rem", background: "#030712", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "0.65rem", fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#34D399", minHeight: "6.5rem", wordBreak: "break-all", lineHeight: 1.65 }}>
                      {cipherText || <span style={{ color: "#2A3F60" }}>Start typing plaintext...</span>}
                    </div>
                  </div>
                  <div style={{ padding: "0.85rem", background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.12)", borderRadius: "0.6rem", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                    <p style={{ color: "#F0F4FF", fontWeight: 600, marginBottom: "0.4rem" }}>Decode Key</p>
                    <p style={{ color: "#8FA3C8" }}>To decrypt, set shift to <span style={{ color: "#34D399", fontWeight: 700 }}>{26 - shift}</span> and paste the ciphertext as input.</p>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "0.6rem", fontSize: "0.75rem", color: "#FCA5A5" }}>
                    ⚠ Caesar cipher has only 25 possible keys — trivially breakable by modern computers. For real security use AES-256 or RSA.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ HASH GENERATOR ══ */}
          {tab === "hash" && (
            <motion.div key="hash"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ ...CARD, padding: "1.75rem", maxWidth: "52rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <Hash style={{ width: "1rem", height: "1rem", color: "#34D399" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F0F4FF" }}>Hash Generator — One-Way Functions</h3>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#8FA3C8", marginBottom: "1.75rem", lineHeight: 1.65 }}>
                A hash function maps arbitrary data to a fixed-length digest. Used in password storage, digital signatures, and file integrity verification.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Algorithm selector */}
                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Algorithm</label>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {([
                      { id: "md5-like" as const, label: "MD5", bits: "128-bit", color: "#F59E0B" },
                      { id: "sha1-like" as const, label: "SHA-1", bits: "160-bit", color: "#F97316" },
                      { id: "sha256-like" as const, label: "SHA-256", bits: "256-bit", color: "#34D399" },
                    ]).map(({ id, label, bits, color }) => (
                      <button key={id} onClick={() => setHashAlgo(id)}
                        style={{
                          padding: "0.45rem 0.9rem", borderRadius: "0.6rem",
                          fontSize: "0.8rem", fontWeight: hashAlgo === id ? 700 : 400,
                          color: hashAlgo === id ? color : "#8FA3C8",
                          background: hashAlgo === id ? `${color}15` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${hashAlgo === id ? `${color}40` : "rgba(255,255,255,0.08)"}`,
                          cursor: "pointer", transition: "all 0.15s",
                        }}
                      >
                        {label} <span style={{ opacity: 0.6, fontSize: "0.68rem", marginLeft: "0.25rem" }}>({bits})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.5rem" }}>Input Message</label>
                  <textarea value={hashInput} onChange={e => setHashInput(e.target.value)} rows={3}
                    placeholder="Enter any text to hash..."
                    style={{ ...INPUT, resize: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Output */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <label className="mono-tag">Hash Output</label>
                    {hashOutput && (
                      <button onClick={copyHash}
                        style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: hashCopied ? "#34D399" : "#4A5F80", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}>
                        {hashCopied ? <><CheckCircle2 style={{ width: "0.75rem", height: "0.75rem" }} />Copied!</> : "Copy"}
                      </button>
                    )}
                  </div>
                  <div style={{ padding: "1rem", background: "#030712", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "0.65rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#34D399", wordBreak: "break-all", lineHeight: 1.7, minHeight: "3.5rem" }}>
                    {hashOutput || <span style={{ color: "#2A3F60" }}>Enter a message above to generate hash...</span>}
                  </div>
                </div>

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.65rem" }}>
                  {[
                    { label: "Output Length", value: hashOutput ? `${hashOutput.length} chars` : "—" },
                    { label: "Deterministic", value: "Yes" },
                    { label: "Reversible", value: "No" },
                    { label: "Use Case", value: "Integrity" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ padding: "0.75rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.6rem" }}>
                      <p className="mono-tag" style={{ marginBottom: "0.25rem" }}>{label}</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F0F4FF", fontFamily: "var(--font-mono)" }}>{value}</p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "0.85rem", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "0.6rem", fontSize: "0.78rem", color: "#93C5FD", lineHeight: 1.65 }}>
                  <span style={{ fontWeight: 600, color: "#F0F4FF" }}>Note: </span>
                  This is a deterministic pseudo-hash for educational demonstration. For production use, implement Web Crypto API: <span style={{ fontFamily: "var(--font-mono)", color: "#34D399" }}>crypto.subtle.digest("SHA-256", data)</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
