import { motion } from "motion/react";
import { Shield, Network, Code2, Cpu, CheckCircle2, Compass, Award, Terminal, MapPin, Sparkles } from "lucide-react";
import { profile } from "../data";
import headshotPhoto from "../assets/images/edwin_headshot.jpg";

// Viewport reveal: opacity 0→1, translateY 20px→0, once only
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay },
});

const FOCUS = [
  { icon: Shield, title: "Cybersecurity & Defense", desc: "Security fundamentals, ethical hacking principles, threat modeling, vulnerability scanning, and building defensive engineering habits." },
  { icon: Network, title: "Network Infrastructure", desc: "TCP/IP protocol architectures, IPv4 subnetting & VLSM, Cisco router & switch configurations, and designing robust LAN/VLAN topologies." },
  { icon: Code2, title: "Software & Web Development", desc: "Modern full-stack web applications with React, TypeScript, Python, and C++ — emphasizing clean modular code, performance, and UI responsiveness." },
  { icon: Cpu, title: "IT Systems & Automation", desc: "Linux/Unix OS administration, process management, shell automation scripting (Bash & Python), and system diagnostic troubleshooting." },
];

const VALUES = [
  "Security-First Engineering",
  "Hands-On Lab Experimentation",
  "Modular & Scalable Code",
  "African Tech Ecosystem Advancement",
];

export default function About() {
  return (
    <section id="about" className="section" style={{ background: "#0d1424", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About Me</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Academic Journey &amp; Engineering Focus
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "start" }}>

          {/* Left Column: Portrait Card & Bio */}
          <motion.div {...inView(0.05)} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            
            {/* Real photo portrait showcase card */}
            <div style={{
              display: "flex", alignItems: "center", gap: "1.2rem",
              padding: "1.1rem", background: "#0a0f1e",
              border: "1px solid #1e293b", borderRadius: "0.75rem",
            }}>
              <div style={{
                position: "relative", width: "5.2rem", height: "5.2rem",
                borderRadius: "0.65rem", overflow: "hidden", flexShrink: 0,
                border: "2px solid #06b6d4", boxShadow: "0 0 20px rgba(6,182,212,0.35)",
              }}>
                <img
                  src={headshotPhoto}
                  alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>{profile.name}</h3>
                <p style={{ fontSize: "0.75rem", color: "#06b6d4", fontFamily: "var(--font-mono)" }}>aka {profile.alias}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.3rem", color: "#64748b", fontSize: "0.72rem" }}>
                  <MapPin style={{ width: "0.75rem", height: "0.75rem", color: "#22d3ee" }} />
                  <span>KNUST Campus, Kumasi, Ghana</span>
                </div>
              </div>
            </div>

            {profile.bio.map((para, i) => (
              <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.82, color: "#94a3b8" }}>{para}</p>
            ))}

            {/* Values / Core Principles */}
            <div style={{
              padding: "1.1rem", background: "#0a0f1e",
              border: "1px solid #1e293b", borderRadius: "0.65rem",
              marginTop: "0.5rem",
            }}>
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.65rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Compass style={{ width: "0.85rem", height: "0.85rem" }} /> Guiding Engineering Principles
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {VALUES.map(val => (
                  <div key={val} style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "#22d3ee", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Profile Specs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "0.25rem" }}>
              {[
                { label: "Name", value: profile.name },
                { label: "Alias", value: profile.alias },
                { label: "Email", value: profile.email },
                { label: "Institution", value: "KNUST (Kumasi, Ghana)" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "0.75rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                  <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{label}</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e2e8f0", wordBreak: "break-all" }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Focus Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {FOCUS.map((f, i) => (
              <motion.div key={f.title}
                {...inView(0.05 + i * 0.05)}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(6,182,212,0.4)",
                  boxShadow: "0 4px 20px rgba(6,182,212,0.06)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                style={{
                  padding: "1.15rem 1.35rem", display: "flex", gap: "1rem", alignItems: "flex-start",
                  background: "#0a0f1e", borderRadius: "0.75rem", cursor: "default",
                  border: "1px solid #1e293b",
                }}
              >
                <div
                  style={{
                    padding: "0.55rem", background: "rgba(6,182,212,0.08)",
                    borderRadius: "0.45rem", flexShrink: 0,
                    border: "1px solid rgba(6,182,212,0.15)",
                  }}
                >
                  <f.icon style={{ width: "1.15rem", height: "1.15rem", color: "#06b6d4" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#64748b" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
