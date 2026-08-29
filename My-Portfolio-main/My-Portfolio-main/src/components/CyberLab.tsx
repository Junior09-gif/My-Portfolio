import React, { useState, useEffect } from "react";
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

const CARD: React.CSSProperties = {
  background: "rgba(13,21,40,0.8)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
};

const INPUT: React.CSSProperties = {
  width: "100%", padding: "0.55rem 0.9rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.6rem",
  fontSize: "0.8rem", color: "#F0F4FF",
  outline: "none", fontFamily: "var(--font-mono)",
};

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function CyberLab() {
  const [tab, setTab] = useState<"scanner" | "entropy" | "cipher">("scanner");

  // Scanner
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
      "[alert] Port 21 (FTP) — anonymous login detected",
      "[probe] SSL handshake verification running...",
      "[alert] Port 3306 (MySQL) — external binding detected",
      "[sys] Generating vulnerability assessment report...",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < scanLogs.length) {
        setLogs(p => [...p, scanLogs[i]]);
        setProgress(Math.round(((i + 1) / scanLogs.length) * 100));
        i++;
      } else {
        clearInterval(iv); setResults(mockPorts); setScanning(false); setProgress(100);
      }
    }, 550);
  };

  // Entropy
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
    if (!h.up) recs.push("Add uppercase letters (A–Z)."); if (!h.di) recs.push("Include digits (0–9).");
    if (!h.sp) recs.push("Use special characters (#, @, $)."); if (pw.length < 12) recs.push("Target 12+ characters.");
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

  const TABS = [
    { id: "scanner" as const, label: "Port Scanner" },
    { id: "entropy" as const, label: "Password Strength" },
    { id: "cipher" as const, label: "Caesar Cipher" },
  ];

  return (
    <section id="cyber-lab" className="section" style={{ background: "rgba(8,13,26,0.88)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem", color: "#34D399" }}>Cyber Lab</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em" }}>
            Cybersecurity interactive tools
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#8FA3C8", marginTop: "0.5rem", maxWidth: "36rem" }}>
            Hands-on security simulations — scan for vulnerabilities, analyse password entropy, and explore classical cryptography.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div {...inView(0.1)} style={{ display: "flex", gap: "0.25rem", padding: "0.3rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", width: "fit-content", marginBottom: "2rem" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: "0.4rem 1rem", borderRadius: "0.55rem",
                fontSize: "0.8rem", fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? "#F0F4FF" : "#8FA3C8",
                background: tab === t.id ? "rgba(59,130,246,0.15)" : "transparent",
                border: tab === t.id ? "1px solid rgba(59,130,246,0.3)" : "1px solid transparent",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Scanner ── */}
          {tab === "scanner" && (
            <motion.div key="scan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}
            >
              {/* Controls */}
              <div style={{ ...CARD, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 700, color: "#34D399", fontFamily: "var(--font-mono)" }}>
                  <Terminal style={{ width: "1rem", height: "1rem" }} />TCP/IP Audit Console
                </div>
                <p style={{ fontSize: "0.8rem", color: "#8FA3C8", lineHeight: 1.6 }}>Simulate a network port scan to discover vulnerable endpoints on a target host.</p>
                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Target IP</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input value={targetIp} onChange={e => setTargetIp(e.target.value)} disabled={scanning} style={{ ...INPUT, flex: 1, color: "#34D399" }} />
                    <button onClick={runScan} disabled={scanning}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: scanning ? "#065F46" : "#059669", color: "#fff", borderRadius: "0.55rem", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: scanning ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                      onMouseEnter={e => { if (!scanning) e.currentTarget.style.background = "#047857"; }}
                      onMouseLeave={e => { if (!scanning) e.currentTarget.style.background = "#059669"; }}
                    >
                      <Play style={{ width: "0.8rem", height: "0.8rem" }} />Scan
                    </button>
                  </div>
                </div>
                {/* Terminal log */}
                <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.6rem", padding: "0.85rem", height: "11rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#34D399", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {logs.length === 0 && <span style={{ color: "#4A5F80", margin: "auto" }}>Run a scan to see live logs.</span>}
                  {logs.map((l, i) => <p key={i}>{l}</p>)}
                  {scanning && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6EE7B7", borderTop: "1px solid rgba(52,211,153,0.15)", paddingTop: "0.4rem", marginTop: "0.2rem" }}>
                      <RefreshCw style={{ width: "0.75rem", height: "0.75rem" }} className="animate-spin" />{progress}% complete
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div style={{ ...CARD, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF" }}>
                  <ShieldAlert style={{ width: "1rem", height: "1rem", color: "#34D399" }} />Audit Results
                </div>
                {results.length === 0 ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.07)", borderRadius: "0.75rem", padding: "2rem", textAlign: "center" }}>
                    <AlertTriangle style={{ width: "2rem", height: "2rem", color: "#4A5F80", marginBottom: "0.75rem" }} />
                    <p style={{ fontSize: "0.8rem", color: "#4A5F80", fontWeight: 600 }}>Waiting for scan results</p>
                    <p style={{ fontSize: "0.75rem", color: "#2A3F60", marginTop: "0.25rem" }}>Run a scan on the left to populate this report.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", overflowY: "auto", maxHeight: "22rem", paddingRight: "0.25rem" }}>
                    {results.map(r => (
                      <div key={r.port} style={{ padding: "0.85rem", borderRadius: "0.65rem", background: r.status === "open" ? "rgba(239,68,68,0.06)" : "rgba(52,211,153,0.06)", border: `1px solid ${r.status === "open" ? "rgba(239,68,68,0.2)" : "rgba(52,211,153,0.15)"}` }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                          <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "#F0F4FF" }}>Port {r.port} <span style={{ color: "#8FA3C8", fontWeight: 400 }}>({r.service})</span></span>
                          <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", padding: "0.12rem 0.55rem", borderRadius: "999px", background: r.status === "open" ? "rgba(239,68,68,0.12)" : "rgba(52,211,153,0.1)", color: r.status === "open" ? "#F87171" : "#34D399", border: `1px solid ${r.status === "open" ? "rgba(239,68,68,0.25)" : "rgba(52,211,153,0.2)"}` }}>
                            {r.status === "open" ? "At Risk" : "Secure"}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", marginBottom: "0.4rem", color: r.status === "open" ? "#FCA5A5" : "#6EE7B7", lineHeight: 1.5 }}>{r.threat}</p>
                        <p style={{ fontSize: "0.72rem", color: "#8FA3C8", background: "rgba(0,0,0,0.25)", padding: "0.5rem 0.7rem", borderRadius: "0.45rem", lineHeight: 1.55 }}>
                          <span style={{ color: "#F0F4FF", fontWeight: 600 }}>Fix: </span>{r.remediation}
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
              style={{ ...CARD, padding: "1.5rem", maxWidth: "48rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "0.35rem" }}>
                <Lock style={{ width: "1rem", height: "1rem", color: "#34D399" }} />Password Entropy Analyser
              </div>
              <p style={{ fontSize: "0.8rem", color: "#8FA3C8", marginBottom: "1.5rem", lineHeight: 1.6 }}>Evaluate how resistant a password is to brute-force attacks using Shannon entropy.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Test Credential</label>
                    <div style={{ position: "relative" }}>
                      <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="e.g. MyS3cure@Pass!" style={{ ...INPUT, paddingRight: "2.5rem" }} />
                      <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.65rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4A5F80" }}>
                        {showPw ? <EyeOff style={{ width: "0.9rem", height: "0.9rem" }} /> : <Eye style={{ width: "0.9rem", height: "0.9rem" }} />}
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#8FA3C8", lineHeight: 1.6, padding: "0.75rem", background: "rgba(0,0,0,0.25)", borderRadius: "0.55rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontWeight: 600, color: "#F0F4FF", marginBottom: "0.3rem" }}>How it works</p>
                    <p>Entropy = length × log₂(charset size). Higher bits = harder to crack.</p>
                  </div>
                </div>

                {!pw ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.07)", borderRadius: "0.75rem", color: "#4A5F80", fontSize: "0.8rem", gap: "0.5rem" }}>
                    <Unlock style={{ width: "1.5rem", height: "1.5rem", opacity: 0.4 }} />Enter a password to analyse
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[
                        { k: "Entropy", v: `${entropy.bits} bits`, c: "#34D399" },
                        { k: "Charset", v: `${entropy.charset} sym`, c: "#F0F4FF" },
                        { k: "Strength", v: entropy.tier, c: entropy.bits >= 60 ? "#34D399" : "#F87171" },
                        { k: "Crack Time", v: entropy.crack, c: "#F0F4FF" },
                      ].map(({ k, v, c }) => (
                        <div key={k} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", padding: "0.65rem 0.75rem", borderRadius: "0.55rem" }}>
                          <p className="mono-tag" style={{ marginBottom: "0.25rem" }}>{k}</p>
                          <p style={{ fontSize: "1rem", fontWeight: 700, color: c, fontFamily: "var(--font-mono)" }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "0.75rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.55rem" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#F0F4FF", marginBottom: "0.45rem" }}>Recommendations</p>
                      {entropy.recs.length === 0 ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#34D399" }}><CheckCircle2 style={{ width: "0.85rem", height: "0.85rem" }} />Strong credentials — no issues found.</div>
                      ) : entropy.recs.map((r, i) => <p key={i} style={{ fontSize: "0.78rem", color: "#F87171", marginBottom: "0.2rem" }}>• {r}</p>)}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Cipher ── */}
          {tab === "cipher" && (
            <motion.div key="cip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ ...CARD, padding: "1.5rem", maxWidth: "48rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "0.35rem" }}>
                <Key style={{ width: "1rem", height: "1rem", color: "#34D399" }} />Caesar Cipher — Symmetric Encryption
              </div>
              <p style={{ fontSize: "0.8rem", color: "#8FA3C8", marginBottom: "1.5rem", lineHeight: 1.6 }}>Shift each letter by a fixed offset. One of the oldest encryption schemes, still used to teach substitution ciphers today.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Plaintext</label>
                    <textarea value={plain} onChange={e => setPlain(e.target.value)} rows={3} style={{ ...INPUT, resize: "none" }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span className="mono-tag">Shift offset</span>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#F0F4FF", fontWeight: 600 }}>+{shift}</span>
                    </div>
                    <input type="range" min="1" max="25" value={shift} onChange={e => setShift(+e.target.value)} style={{ width: "100%", accentColor: "#34D399", cursor: "pointer" }} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Ciphertext Output</label>
                    <div style={{ padding: "0.65rem 0.9rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "#34D399", minHeight: "5rem", wordBreak: "break-all", lineHeight: 1.6 }}>
                      {cipher || <span style={{ color: "#4A5F80" }}>Start typing...</span>}
                    </div>
                  </div>
                  <div style={{ padding: "0.75rem", background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.12)", borderRadius: "0.55rem", fontSize: "0.78rem", color: "#8FA3C8", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
                    <span style={{ color: "#F0F4FF", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Lab Note</span>
                    To decode, set shift to <span style={{ color: "#34D399" }}>{26 - shift}</span> and paste ciphertext as input.
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
