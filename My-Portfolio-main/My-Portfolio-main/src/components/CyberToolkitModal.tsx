import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, Lock, Hash, Key, Copy, Check, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Compute SHA-256 using standard Web Crypto API
async function sha256(str: string): Promise<string> {
  const buf = new TextEncoder().encode(str);
  const hashBuf = await crypto.subtle.digest("SHA-256", buf);
  const hashArray = Array.from(new Uint8Array(hashBuf));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Calculate password entropy (bits) & crack time
function calculateEntropy(pwd: string): {
  entropy: number;
  poolSize: number;
  crackTime: string;
  strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";
  color: string;
} {
  if (!pwd) {
    return { entropy: 0, poolSize: 0, crackTime: "0 seconds", strength: "Very Weak", color: "#ef4444" };
  }

  let poolSize = 0;
  if (/[a-z]/.test(pwd)) poolSize += 26;
  if (/[A-Z]/.test(pwd)) poolSize += 26;
  if (/[0-9]/.test(pwd)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

  const entropy = Math.round(pwd.length * (Math.log2(Math.max(1, poolSize))));

  // Assuming 100 Billion (10^11) guesses per second (modern GPU cluster)
  const totalCombinations = Math.pow(poolSize, pwd.length);
  const seconds = totalCombinations / 1e11;

  let crackTime = "Instant";
  if (seconds < 1) crackTime = "Less than 1 second";
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 31536000000) crackTime = `${Math.round(seconds / 31536000)} years`;
  else if (seconds < 31536000000000) crackTime = `${Math.round(seconds / 31536000000)} thousand years`;
  else crackTime = "Trillions of years";

  let strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong" = "Very Weak";
  let color = "#ef4444";

  if (entropy >= 80) {
    strength = "Very Strong";
    color = "#22c55e";
  } else if (entropy >= 60) {
    strength = "Strong";
    color = "#06b6d4";
  } else if (entropy >= 45) {
    strength = "Moderate";
    color = "#f59e0b";
  } else if (entropy >= 28) {
    strength = "Weak";
    color = "#f97316";
  }

  return { entropy, poolSize, crackTime, strength, color };
}

export default function CyberToolkitModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"entropy" | "hash">("entropy");
  
  // Entropy state
  const [password, setPassword] = useState("CyberKNUST#2026!");
  const [showPassword, setShowPassword] = useState(true);

  // Hash & Encoder state
  const [inputText, setInputText] = useState("KNUST Information Technology");
  const [shaHash, setShaHash] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const entropyData = useMemo(() => calculateEntropy(password), [password]);

  const base64Encoded = useMemo(() => {
    try {
      return btoa(inputText);
    } catch {
      return "Encoding error";
    }
  }, [inputText]);

  useEffect(() => {
    sha256(inputText).then(setShaHash);
  }, [inputText]);

  const generateRandomPass = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let gen = "";
    for (let i = 0; i < 16; i++) {
      gen += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(gen);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.82)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        {/* Backdrop click */}
        <div style={{ position: "absolute", inset: 0 }} onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "46rem", maxHeight: "90vh",
            background: "#0d1424", border: "1px solid #1e293b",
            borderRadius: "0.85rem", boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "1.1rem 1.4rem", borderBottom: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#090d16", position: "sticky", top: 0, zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ padding: "0.45rem", background: "rgba(6,182,212,0.12)", borderRadius: "0.4rem", color: "#22d3ee" }}>
                <Shield style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>Cybersecurity Analyst Toolkit</h3>
                <p style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  Password Entropy Analyzer · SHA-256 &amp; Base64 Cryptographic Inspector
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "1px solid #1e293b", color: "#94a3b8",
                borderRadius: "0.4rem", padding: "0.35rem", cursor: "pointer", display: "flex",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >
              <X style={{ width: "1.1rem", height: "1.1rem" }} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: "flex", borderBottom: "1px solid #1e293b",
            background: "#0a0f1e", padding: "0 1.4rem", gap: "1rem",
          }}>
            <button
              onClick={() => setActiveTab("entropy")}
              style={{
                padding: "0.75rem 0", background: "none", border: "none",
                borderBottom: `2px solid ${activeTab === "entropy" ? "#06b6d4" : "transparent"}`,
                color: activeTab === "entropy" ? "#22d3ee" : "#64748b",
                fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-mono)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem",
              }}
            >
              <Lock style={{ width: "0.85rem", height: "0.85rem" }} />
              Password Entropy &amp; Crack Time
            </button>

            <button
              onClick={() => setActiveTab("hash")}
              style={{
                padding: "0.75rem 0", background: "none", border: "none",
                borderBottom: `2px solid ${activeTab === "hash" ? "#06b6d4" : "transparent"}`,
                color: activeTab === "hash" ? "#22d3ee" : "#64748b",
                fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-mono)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem",
              }}
            >
              <Hash style={{ width: "0.85rem", height: "0.85rem" }} />
              SHA-256 Hash &amp; Encoding
            </button>
          </div>

          {/* Tab 1: Password Entropy */}
          {activeTab === "entropy" && (
            <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.6rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Test Target Password
                  </label>
                  <button
                    onClick={generateRandomPass}
                    style={{
                      background: "none", border: "none", color: "#22d3ee",
                      fontSize: "0.72rem", fontFamily: "var(--font-mono)", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: "0.25rem",
                    }}
                  >
                    <RefreshCw style={{ width: "0.75rem", height: "0.75rem" }} /> Generate Strong Key
                  </button>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="input-field"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      padding: "0.5rem 0.8rem", background: "#0d1424",
                      border: "1px solid #1e293b", borderRadius: "0.45rem",
                      color: "#94a3b8", fontSize: "0.75rem", fontFamily: "var(--font-mono)",
                      cursor: "pointer", whiteSpace: "nowrap",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Entropy Results Card */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.85rem",
              }}>
                <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase" }}>
                    Entropy Score
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginTop: "0.3rem" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 800, color: entropyData.color, fontFamily: "var(--font-mono)" }}>
                      {entropyData.entropy}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>bits</span>
                  </div>
                  <span style={{
                    display: "inline-block", marginTop: "0.4rem",
                    fontSize: "0.7rem", fontFamily: "var(--font-mono)",
                    color: entropyData.color, background: `${entropyData.color}15`,
                    padding: "0.1rem 0.5rem", borderRadius: "999px",
                  }}>
                    {entropyData.strength}
                  </span>
                </div>

                <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase" }}>
                    Brute-Force Attack Time
                  </span>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", marginTop: "0.3rem", lineHeight: 1.3 }}>
                    {entropyData.crackTime}
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>
                    @ 100B guesses/sec GPU cluster
                  </p>
                </div>

                <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase" }}>
                    Character Pool Diversity
                  </span>
                  <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", marginTop: "0.3rem" }}>
                    {entropyData.poolSize} possible symbols
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>
                    Length: {password.length} characters
                  </p>
                </div>
              </div>

              {/* Password Composition Check */}
              <div style={{ padding: "0.9rem", background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
                  Security Composition Audit
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.4rem" }}>
                  {[
                    { label: "Lowercase (a-z)", met: /[a-z]/.test(password) },
                    { label: "Uppercase (A-Z)", met: /[A-Z]/.test(password) },
                    { label: "Numbers (0-9)", met: /[0-9]/.test(password) },
                    { label: "Special Symbols", met: /[^a-zA-Z0-9]/.test(password) },
                    { label: "12+ Chars Length", met: password.length >= 12 },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: item.met ? "#e2e8f0" : "#64748b" }}>
                      <CheckCircle2 style={{ width: "0.75rem", height: "0.75rem", color: item.met ? "#22c55e" : "#475569" }} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: SHA-256 & Base64 Encoder */}
          {activeTab === "hash" && (
            <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.6rem" }}>
                <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Raw Input Text / String
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Enter text to hash or encode..."
                  className="input-field"
                  style={{ fontFamily: "var(--font-mono)" }}
                />
              </div>

              {/* SHA-256 Output */}
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#22d3ee", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                    SHA-256 Cryptographic Hash (256 bits / 64 hex chars)
                  </span>
                  <button
                    onClick={() => copyText(shaHash, "sha")}
                    style={{
                      background: "none", border: "none", color: copiedKey === "sha" ? "#22c55e" : "#94a3b8",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem",
                    }}
                  >
                    {copiedKey === "sha" ? <Check style={{ width: "0.8rem", height: "0.8rem" }} /> : <Copy style={{ width: "0.8rem", height: "0.8rem" }} />}
                    {copiedKey === "sha" ? "Copied" : "Copy"}
                  </button>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#e2e8f0", fontFamily: "var(--font-mono)", wordBreak: "break-all", background: "#090d16", padding: "0.6rem 0.8rem", borderRadius: "0.35rem", border: "1px solid #1e293b" }}>
                  {shaHash}
                </p>
              </div>

              {/* Base64 Output */}
              <div style={{ padding: "1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#22d3ee", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                    Base64 RFC 4648 Encoding
                  </span>
                  <button
                    onClick={() => copyText(base64Encoded, "b64")}
                    style={{
                      background: "none", border: "none", color: copiedKey === "b64" ? "#22c55e" : "#94a3b8",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem",
                    }}
                  >
                    {copiedKey === "b64" ? <Check style={{ width: "0.8rem", height: "0.8rem" }} /> : <Copy style={{ width: "0.8rem", height: "0.8rem" }} />}
                    {copiedKey === "b64" ? "Copied" : "Copy"}
                  </button>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#e2e8f0", fontFamily: "var(--font-mono)", wordBreak: "break-all", background: "#090d16", padding: "0.6rem 0.8rem", borderRadius: "0.35rem", border: "1px solid #1e293b" }}>
                  {base64Encoded}
                </p>
              </div>

            </div>
          )}

          {/* Footer */}
          <div style={{
            padding: "0.9rem 1.4rem", borderTop: "1px solid #1e293b",
            background: "#090d16", display: "flex", justifyContent: "flex-end",
          }}>
            <button className="btn-secondary" onClick={onClose} style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}>
              Close Toolkit
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
