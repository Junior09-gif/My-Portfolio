import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, X, Minimize2, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react";
import { profile, skillCategories, projects, certifications, education } from "../data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenSubnet?: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const WELCOME_BANNER = `
  ███████╗██╗██╗     ██╗███╗   ██╗██████╗ 
  ██╔════╝██║██║     ██║████╗  ██║██╔══██╗
  █████╗  ██║██║     ██║██╔██╗ ██║██████╔╝
  ██╔══╝  ██║██║     ██║██║╚██╗██║██╔══██╗
  ███████╗██║███████╗██║██║ ╚████║██║  ██║
  ╚══════╝╚═╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝
  ----------------------------------------
  Welcome to eii.jnr's Cybersecurity & IT Shell
  Host: knust-student-lab (Ubuntu 24.04 LTS / x86_64)
  Type 'help' to see available commands.
`;

export default function CyberTerminalModal({ isOpen, onClose, onOpenSubnet }: Props) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "init",
      output: (
        <div style={{ color: "#22d3ee", whiteSpace: "pre", fontFamily: "var(--font-mono)", fontSize: "0.72rem", lineHeight: 1.2 }}>
          {WELCOME_BANNER}
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const parts = raw.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCmdHistory(prev => [...prev, raw]);
    setHistoryIdx(-1);

    let output: React.ReactNode = null;

    switch (command) {
      case "help":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>Available System Commands:</span>
            <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "0.35rem 1rem", color: "#94a3b8" }}>
              <span style={{ color: "#22d3ee" }}>whoami</span><span>Display student profile summary</span>
              <span style={{ color: "#22d3ee" }}>about / bio</span><span>Read background &amp; engineering journey</span>
              <span style={{ color: "#22d3ee" }}>skills</span><span>Display technical competencies matrix</span>
              <span style={{ color: "#22d3ee" }}>projects</span><span>List built projects &amp; repositories</span>
              <span style={{ color: "#22d3ee" }}>subnet &lt;ip/cidr&gt;</span><span>Perform quick IPv4 subnet calculation</span>
              <span style={{ color: "#22d3ee" }}>education</span><span>View KNUST degree details &amp; coursework</span>
              <span style={{ color: "#22d3ee" }}>certs</span><span>Show cybersecurity &amp; networking certifications</span>
              <span style={{ color: "#22d3ee" }}>contact</span><span>Get email, GitHub &amp; LinkedIn handles</span>
              <span style={{ color: "#22d3ee" }}>ping &lt;host&gt;</span><span>Simulate ICMP ping test</span>
              <span style={{ color: "#22d3ee" }}>cisco</span><span>View Cisco Packet Tracer lab notes</span>
              <span style={{ color: "#22d3ee" }}>sudo</span><span>Attempt privileged superuser access</span>
              <span style={{ color: "#22d3ee" }}>matrix</span><span>Activate cyber matrix stream mode</span>
              <span style={{ color: "#22d3ee" }}>clear</span><span>Clear terminal screen buffer</span>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", color: "#e2e8f0" }}>
            <p><strong style={{ color: "#06b6d4" }}>Name:</strong> {profile.name} (aka <span style={{ color: "#22d3ee" }}>{profile.alias}</span>)</p>
            <p><strong style={{ color: "#06b6d4" }}>Role:</strong> {profile.title}</p>
            <p><strong style={{ color: "#06b6d4" }}>Institution:</strong> KNUST, Department of Computer Science</p>
            <p><strong style={{ color: "#06b6d4" }}>Location:</strong> {profile.location}</p>
            <p><strong style={{ color: "#06b6d4" }}>Status:</strong> <span style={{ color: "#22c55e" }}>● Open to Internships, IT Roles &amp; Security Projects</span></p>
          </div>
        );
        break;

      case "about":
      case "bio":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "#94a3b8" }}>
            {profile.bio.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        );
        break;

      case "skills":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {skillCategories.map(cat => (
              <div key={cat.title}>
                <span style={{ color: "#22d3ee", fontWeight: 600 }}>[{cat.title}]</span>
                <p style={{ color: "#94a3b8", marginTop: "0.2rem" }}>
                  {cat.skills.map(s => s.name).join(" • ")}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>Built Projects &amp; Lab Repositories:</span>
            {projects.map(p => (
              <div key={p.id} style={{ padding: "0.4rem 0.6rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.35rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#22d3ee", fontWeight: 600 }}>{p.title}</span>
                  <span style={{ color: p.status === "completed" ? "#22c55e" : "#f59e0b", fontSize: "0.7rem" }}>[{p.status}]</span>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "0.2rem" }}>{p.description}</p>
                <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.3rem", flexWrap: "wrap" }}>
                  {p.tech.map(t => <span key={t} style={{ color: "#67e8f9", fontSize: "0.68rem", background: "rgba(6,182,212,0.1)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "subnet":
        if (args.length === 0) {
          output = (
            <div style={{ color: "#f59e0b" }}>
              <p>Usage: <code>subnet &lt;IP_ADDRESS/CIDR&gt;</code> (e.g. <code>subnet 192.168.1.1/24</code> or <code>subnet 10.0.0.1/16</code>)</p>
              {onOpenSubnet && (
                <button
                  onClick={() => { onClose(); onOpenSubnet(); }}
                  style={{ marginTop: "0.4rem", background: "#06b6d4", color: "#fff", border: "none", padding: "0.3rem 0.75rem", borderRadius: "0.3rem", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}
                >
                  🚀 Open Full GUI Subnet Toolkit
                </button>
              )}
            </div>
          );
        } else {
          const inputSub = args[0];
          const [ipPart, cidrPart] = inputSub.split("/");
          const cidrNum = cidrPart ? Number(cidrPart) : 24;
          output = (
            <div style={{ color: "#22d3ee", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span style={{ color: "#38bdf8", fontWeight: 600 }}>[+] IPv4 Subnetting Quick Parse for: {inputSub}</span>
              <span style={{ color: "#94a3b8" }}>Target Host IP: <strong style={{ color: "#f1f5f9" }}>{ipPart}</strong></span>
              <span style={{ color: "#94a3b8" }}>Prefix: <strong style={{ color: "#f1f5f9" }}>/{cidrNum}</strong></span>
              <span style={{ color: "#94a3b8" }}>Usable Hosts: <strong style={{ color: "#22c55e" }}>{Math.max(0, Math.pow(2, 32 - cidrNum) - 2).toLocaleString()}</strong></span>
              {onOpenSubnet && (
                <button
                  onClick={() => { onClose(); onOpenSubnet(); }}
                  style={{ alignSelf: "flex-start", marginTop: "0.4rem", background: "rgba(6,182,212,0.15)", border: "1px solid #06b6d4", color: "#22d3ee", padding: "0.25rem 0.6rem", borderRadius: "0.3rem", cursor: "pointer", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}
                >
                  View Full Bitwise Breakdown in GUI &rarr;
                </button>
              )}
            </div>
          );
        }
        break;

      case "education":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", color: "#e2e8f0" }}>
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>🎓 {education.degree}</span>
            <span style={{ color: "#94a3b8" }}>{education.institution} ({education.period})</span>
            <span style={{ color: "#22d3ee", marginTop: "0.3rem", fontWeight: 600 }}>Relevant Coursework:</span>
            <ul style={{ paddingLeft: "1.2rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {education.coursework.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        );
        break;

      case "certs":
      case "certifications":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>Certifications &amp; Professional Badges:</span>
            {certifications.map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", borderBottom: "1px dashed #1e293b", paddingBottom: "0.3rem" }}>
                <span style={{ color: "#e2e8f0" }}>{c.title} ({c.issuer})</span>
                <span style={{ color: c.status === "earned" ? "#22c55e" : "#f59e0b", fontFamily: "var(--font-mono)" }}>[{c.status}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", color: "#e2e8f0" }}>
            <p>✉️ <strong style={{ color: "#06b6d4" }}>Email:</strong> <a href={`mailto:${profile.email}`} style={{ color: "#22d3ee" }}>{profile.email}</a></p>
            <p>🐙 <strong style={{ color: "#06b6d4" }}>GitHub:</strong> <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: "#22d3ee" }}>{profile.github}</a></p>
            <p>💼 <strong style={{ color: "#06b6d4" }}>LinkedIn:</strong> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#22d3ee" }}>{profile.linkedin}</a></p>
            <p>📍 <strong style={{ color: "#06b6d4" }}>Location:</strong> {profile.location}</p>
          </div>
        );
        break;

      case "ping":
        const host = args[0] || "knust.edu.gh";
        output = (
          <div style={{ color: "#22d3ee", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <span>PING {host} (56 data bytes):</span>
            <span>64 bytes from {host}: icmp_seq=1 ttl=56 time=18.42 ms</span>
            <span>64 bytes from {host}: icmp_seq=2 ttl=56 time=19.11 ms</span>
            <span>64 bytes from {host}: icmp_seq=3 ttl=56 time=17.89 ms</span>
            <span style={{ color: "#22c55e" }}>--- {host} ping statistics ---</span>
            <span style={{ color: "#94a3b8" }}>3 packets transmitted, 3 received, 0% packet loss, time 2003ms</span>
          </div>
        );
        break;

      case "cisco":
        output = (
          <div style={{ color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>[Cisco Packet Tracer Lab Notes - KNUST CS Labs]</span>
            <p>• Multi-VLAN Trunking configured with 802.1Q encapsulation</p>
            <p>• Router-on-a-Stick sub-interface routing (Fa0/0.10, Fa0/0.20)</p>
            <p>• DHCP Pools configured with excluded-address ranges for gateways and static servers</p>
            <p>• Standard ACL 10 applied to VTY lines to restrict SSH management access</p>
          </div>
        );
        break;

      case "sudo":
        output = (
          <div style={{ color: "#f87171" }}>
            <span>[SECURITY WARNING] User eii.jnr is not in the sudoers file. This incident has been reported to the campus SOC. 😉</span>
          </div>
        );
        break;

      case "matrix":
        output = (
          <div style={{ color: "#22c55e" }}>
            <span>[+] Cyber Matrix mode stream initiated. Check the background shader controls bar! 🟢</span>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <div style={{ color: "#f87171" }}>
            <span>Command not found: '{command}'. Type '<strong style={{ color: "#22d3ee" }}>help</strong>' for valid commands.</span>
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        command: raw,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.8)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        {/* Backdrop click */}
        <div style={{ position: "absolute", inset: 0 }} onClick={onClose} />

        {/* Terminal Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "52rem", height: "34rem", maxHeight: "85vh",
            background: "#080c16", border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: "0.85rem", boxShadow: "0 0 40px rgba(6,182,212,0.15), 0 20px 50px rgba(0,0,0,0.8)",
            display: "flex", flexDirection: "column", overflow: "hidden",
            fontFamily: "var(--font-mono)",
          }}
        >
          {/* Terminal Title Bar */}
          <div style={{
            padding: "0.65rem 1rem", background: "#050810",
            borderBottom: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#ef4444", cursor: "pointer", display: "inline-block" }} onClick={onClose} />
                <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginLeft: "0.75rem", color: "#64748b", fontSize: "0.75rem" }}>
                <Terminal style={{ width: "0.85rem", height: "0.85rem", color: "#06b6d4" }} />
                <span>eii.jnr@knust-lab: ~ (bash)</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={copyEmail}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
                  color: copied ? "#22c55e" : "#22d3ee", borderRadius: "0.3rem",
                  padding: "0.2rem 0.55rem", fontSize: "0.68rem", cursor: "pointer",
                }}
              >
                {copied ? <Check style={{ width: "0.75rem", height: "0.75rem" }} /> : <Copy style={{ width: "0.75rem", height: "0.75rem" }} />}
                {copied ? "Copied Email" : "Copy Email"}
              </button>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex" }}>
                <X style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          </div>

          {/* Quick command buttons strip */}
          <div style={{
            padding: "0.4rem 1rem", background: "#060912",
            borderBottom: "1px solid #1e293b",
            display: "flex", gap: "0.4rem", overflowX: "auto",
            alignItems: "center",
          }}>
            <span style={{ fontSize: "0.65rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>Quick:</span>
            {["whoami", "skills", "projects", "subnet 192.168.1.1/24", "certs", "contact", "clear"].map(q => (
              <button
                key={q}
                onClick={() => handleCommand(q)}
                style={{
                  padding: "0.15rem 0.5rem", borderRadius: "0.25rem",
                  background: "#0d1424", border: "1px solid #1e293b",
                  color: "#94a3b8", fontSize: "0.68rem", cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#22d3ee"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.4)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              flex: 1, padding: "1rem", overflowY: "auto",
              display: "flex", flexDirection: "column", gap: "0.85rem",
              fontSize: "0.82rem", lineHeight: 1.6,
            }}
          >
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {h.command !== "init" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "#06b6d4" }}>
                    <span style={{ color: "#22c55e" }}>eii.jnr@knust:~$</span>
                    <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{h.command}</span>
                    <span style={{ marginLeft: "auto", color: "#334155", fontSize: "0.68rem" }}>{h.timestamp}</span>
                  </div>
                )}
                <div style={{ paddingLeft: h.command !== "init" ? "0.5rem" : 0 }}>
                  {h.output}
                </div>
              </div>
            ))}

            {/* Current prompt input line */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginTop: "0.2rem" }}>
              <span style={{ color: "#22c55e", flexShrink: 0 }}>eii.jnr@knust:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'skills', 'projects'..."
                style={{
                  flex: 1, background: "transparent", border: "none",
                  outline: "none", color: "#f1f5f9", fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem", caretColor: "#06b6d4",
                }}
              />
              <CornerDownLeft style={{ width: "0.75rem", height: "0.75rem", color: "#334155" }} />
            </div>

            <div ref={bottomRef} />
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
