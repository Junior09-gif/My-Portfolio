import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Network, Copy, Check, Info, ShieldCheck, Binary, Sliders } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Convert dotted-quad IP string to 32-bit unsigned integer
function ipToUint(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let uint = 0;
  for (let i = 0; i < 4; i++) {
    const part = Number(parts[i]);
    if (isNaN(part) || part < 0 || part > 255 || parts[i].trim() === "") return null;
    uint = (uint << 8) | part;
  }
  return uint >>> 0;
}

// Convert 32-bit unsigned integer to dotted-quad IP string
function uintToIp(uint: number): string {
  return [
    (uint >>> 24) & 255,
    (uint >>> 16) & 255,
    (uint >>> 8) & 255,
    uint & 255,
  ].join(".");
}

// Convert 32-bit unsigned integer to formatted 4-octet binary string
function uintToBinary(uint: number): string {
  return [
    ((uint >>> 24) & 255).toString(2).padStart(8, "0"),
    ((uint >>> 16) & 255).toString(2).padStart(8, "0"),
    ((uint >>> 8) & 255).toString(2).padStart(8, "0"),
    (uint & 255).toString(2).padStart(8, "0"),
  ].join(".");
}

// Calculate subnet mask integer from CIDR prefix length (0-32)
function cidrToMask(cidr: number): number {
  if (cidr <= 0) return 0;
  if (cidr >= 32) return 0xffffffff;
  return ((0xffffffff << (32 - cidr)) >>> 0);
}

// Detect IP Class & RFC 1918 Private status
function getIpClassification(ipUint: number): { ipClass: string; scope: string; isPrivate: boolean } {
  const octet1 = (ipUint >>> 24) & 255;
  const octet2 = (ipUint >>> 16) & 255;

  let ipClass = "Class A";
  if (octet1 >= 128 && octet1 <= 191) ipClass = "Class B";
  else if (octet1 >= 192 && octet1 <= 223) ipClass = "Class C";
  else if (octet1 >= 224 && octet1 <= 239) ipClass = "Class D (Multicast)";
  else if (octet1 >= 240) ipClass = "Class E (Experimental)";

  let scope = "Public Internet";
  let isPrivate = false;

  if (octet1 === 10) {
    scope = "RFC 1918 Private (10.0.0.0/8)";
    isPrivate = true;
  } else if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) {
    scope = "RFC 1918 Private (172.16.0.0/12)";
    isPrivate = true;
  } else if (octet1 === 192 && octet2 === 168) {
    scope = "RFC 1918 Private (192.168.0.0/16)";
    isPrivate = true;
  } else if (octet1 === 127) {
    scope = "Loopback (127.0.0.0/8)";
    isPrivate = true;
  } else if (octet1 === 169 && octet2 === 254) {
    scope = "Link-Local / APIPA (169.254.0.0/16)";
    isPrivate = true;
  }

  return { ipClass, scope, isPrivate };
}

export default function SubnetCalculatorModal({ isOpen, onClose }: Props) {
  const [ipInput, setIpInput] = useState("192.168.1.50");
  const [cidr, setCidr] = useState(24);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const ipUint = useMemo(() => ipToUint(ipInput), [ipInput]);
  const isValidIp = ipUint !== null;

  const results = useMemo(() => {
    if (ipUint === null) return null;

    const maskUint = cidrToMask(cidr);
    const wildcardUint = (~maskUint) >>> 0;
    const networkUint = (ipUint & maskUint) >>> 0;
    const broadcastUint = (ipUint | wildcardUint) >>> 0;

    let firstHostUint = (networkUint + 1) >>> 0;
    let lastHostUint = (broadcastUint - 1) >>> 0;
    let usableHosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);

    if (cidr === 31) {
      firstHostUint = networkUint;
      lastHostUint = broadcastUint;
      usableHosts = 2; // Point-to-Point RFC 3021
    } else if (cidr === 32) {
      firstHostUint = networkUint;
      lastHostUint = networkUint;
      usableHosts = 1; // Single host
    }

    const { ipClass, scope, isPrivate } = getIpClassification(ipUint);

    return {
      ip: ipInput.trim(),
      cidr,
      netmask: uintToIp(maskUint),
      wildcard: uintToIp(wildcardUint),
      network: uintToIp(networkUint),
      broadcast: uintToIp(broadcastUint),
      firstHost: uintToIp(firstHostUint),
      lastHost: uintToIp(lastHostUint),
      usableRange: cidr === 32 ? uintToIp(firstHostUint) : `${uintToIp(firstHostUint)} – ${uintToIp(lastHostUint)}`,
      usableHosts: usableHosts.toLocaleString(),
      totalAddresses: Math.pow(2, 32 - cidr).toLocaleString(),
      binaryMask: uintToBinary(maskUint),
      binaryIp: uintToBinary(ipUint),
      binaryNetwork: uintToBinary(networkUint),
      ipClass,
      scope,
      isPrivate,
    };
  }, [ipUint, cidr, ipInput]);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const PRESETS = [
    { label: "/8", desc: "16.7M Hosts", cidr: 8 },
    { label: "/16", desc: "65.5K Hosts", cidr: 16 },
    { label: "/24", desc: "254 Hosts", cidr: 24 },
    { label: "/28", desc: "14 Hosts", cidr: 28 },
    { label: "/30", desc: "P2P Links", cidr: 30 },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.8)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
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
                <Network style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>IPv4 Subnet &amp; CIDR Toolkit</h3>
                <p style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  Real-time Bitwise Calculation Engine · Subnetting Utility
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

          {/* Body */}
          <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Input Controls */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem", padding: "1rem", background: "#0a0f1e",
              border: "1px solid #1e293b", borderRadius: "0.6rem",
            }}>
              <div>
                <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  IP Address (IPv4)
                </label>
                <input
                  type="text"
                  value={ipInput}
                  onChange={e => setIpInput(e.target.value)}
                  placeholder="e.g. 192.168.1.1"
                  className="input-field"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: isValidIp ? "rgba(6,182,212,0.3)" : "rgba(239,68,68,0.6)",
                  }}
                />
                {!isValidIp && (
                  <p style={{ fontSize: "0.7rem", color: "#f87171", marginTop: "0.3rem" }}>
                    Please enter a valid IPv4 address (e.g. 10.0.0.1)
                  </p>
                )}
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    CIDR Prefix (/{cidr})
                  </label>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "#22d3ee", fontWeight: 600 }}>
                    {results?.netmask || "255.255.255.0"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input
                    type="range"
                    min={1}
                    max={32}
                    value={cidr}
                    onChange={e => setCidr(Number(e.target.value))}
                    style={{ flex: 1, accentColor: "#06b6d4", cursor: "pointer" }}
                  />
                  <input
                    type="number"
                    min={1}
                    max={32}
                    value={cidr}
                    onChange={e => setCidr(Math.min(32, Math.max(1, Number(e.target.value))))}
                    className="input-field"
                    style={{ width: "4rem", textAlign: "center", padding: "0.4rem 0.2rem", fontFamily: "var(--font-mono)" }}
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#64748b", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Sliders style={{ width: "0.75rem", height: "0.75rem" }} /> Quick Presets:
              </span>
              {PRESETS.map(p => (
                <button
                  key={p.cidr}
                  onClick={() => setCidr(p.cidr)}
                  style={{
                    padding: "0.25rem 0.6rem", borderRadius: "0.35rem",
                    background: cidr === p.cidr ? "rgba(6,182,212,0.18)" : "#0a0f1e",
                    border: `1px solid ${cidr === p.cidr ? "#06b6d4" : "#1e293b"}`,
                    color: cidr === p.cidr ? "#22d3ee" : "#94a3b8",
                    fontSize: "0.72rem", fontFamily: "var(--font-mono)", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <strong>{p.label}</strong> ({p.desc})
                </button>
              ))}
            </div>

            {/* Calculation Output Cards */}
            {results && isValidIp && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                
                {/* Classification badges */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "0.25rem 0.65rem", borderRadius: "999px",
                    background: results.isPrivate ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.12)",
                    border: `1px solid ${results.isPrivate ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.3)"}`,
                    color: results.isPrivate ? "#4ade80" : "#60a5fa",
                    fontSize: "0.7rem", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.3rem",
                  }}>
                    <ShieldCheck style={{ width: "0.75rem", height: "0.75rem" }} />
                    {results.scope}
                  </span>
                  <span style={{
                    padding: "0.25rem 0.65rem", borderRadius: "999px",
                    background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)",
                    color: "#22d3ee", fontSize: "0.7rem", fontFamily: "var(--font-mono)",
                  }}>
                    {results.ipClass}
                  </span>
                  <span style={{
                    padding: "0.25rem 0.65rem", borderRadius: "999px",
                    background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
                    color: "#c084fc", fontSize: "0.7rem", fontFamily: "var(--font-mono)",
                  }}>
                    {results.usableHosts} Usable Hosts
                  </span>
                </div>

                {/* Primary Data Grid */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}>
                  {[
                    { label: "Network Address", value: results.network, key: "net" },
                    { label: "Broadcast Address", value: results.broadcast, key: "bcast" },
                    { label: "Usable Host Range", value: results.usableRange, key: "range" },
                    { label: "Subnet Mask", value: results.netmask, key: "mask" },
                    { label: "Wildcard Mask", value: results.wildcard, key: "wild" },
                    { label: "Total IPv4 Addresses", value: results.totalAddresses, key: "total" },
                  ].map(item => (
                    <div
                      key={item.label}
                      style={{
                        padding: "0.85rem", background: "#0a0f1e",
                        border: "1px solid #1e293b", borderRadius: "0.5rem",
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {item.label}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.3rem" }}>
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>
                          {item.value}
                        </span>
                        <button
                          onClick={() => copyText(item.value, item.key)}
                          title="Copy to clipboard"
                          style={{
                            background: "none", border: "none", color: copiedKey === item.key ? "#22c55e" : "#475569",
                            cursor: "pointer", padding: "0.2rem", display: "flex",
                          }}
                        >
                          {copiedKey === item.key ? <Check style={{ width: "0.85rem", height: "0.85rem" }} /> : <Copy style={{ width: "0.85rem", height: "0.85rem" }} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Binary breakdown section */}
                <div style={{
                  padding: "0.9rem", background: "#090d16",
                  border: "1px solid #1e293b", borderRadius: "0.5rem",
                  fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#06b6d4", marginBottom: "0.6rem" }}>
                    <Binary style={{ width: "0.85rem", height: "0.85rem" }} />
                    <span style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>32-Bit Binary Breakdown</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", color: "#94a3b8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <span style={{ color: "#64748b" }}>IP Address:</span>
                      <span style={{ color: "#e2e8f0" }}>{results.binaryIp}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <span style={{ color: "#64748b" }}>Subnet Mask:</span>
                      <span style={{ color: "#22d3ee" }}>{results.binaryMask}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <span style={{ color: "#64748b" }}>Network Bitmask:</span>
                      <span style={{ color: "#4ade80" }}>{results.binaryNetwork}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Explanatory note */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.65rem 0.85rem", background: "rgba(6,182,212,0.04)",
              border: "1px solid rgba(6,182,212,0.15)", borderRadius: "0.4rem",
              fontSize: "0.72rem", color: "#94a3b8",
            }}>
              <Info style={{ width: "0.9rem", height: "0.9rem", color: "#06b6d4", flexShrink: 0 }} />
              <span>Calculated entirely client-side using JavaScript 32-bit unsigned bitwise shift arithmetic.</span>
            </div>

          </div>

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
