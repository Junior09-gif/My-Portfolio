import { motion } from "motion/react";
import { Shield, Network, Code2, Cpu } from "lucide-react";
import { profile } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const FOCUS = [
  {
    icon: Shield,
    title: "Cybersecurity & Defense",
    desc: "Security fundamentals, ethical hacking basics, vulnerability assessment, and building defensive security mindsets.",
    color: "#06b6d4",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    desc: "TCP/IP networking, subnetting, router & switch configuration, and designing reliable network architectures.",
    color: "#06b6d4",
  },
  {
    icon: Code2,
    title: "Software & Web Development",
    desc: "Full-stack web development with React, Node.js, and modern tooling — building clean, functional applications.",
    color: "#06b6d4",
  },
  {
    icon: Cpu,
    title: "IT Systems & Automation",
    desc: "System administration, OS management, shell scripting, and automating repetitive IT tasks with Python and Bash.",
    color: "#06b6d4",
  },
];

export default function About() {
  return (
    <section id="about" className="section" style={{ background: "#0d1424", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            A little about me
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>

          {/* Bio */}
          <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {profile.bio.map((para, i) => (
              <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.82, color: "#94a3b8" }}>{para}</p>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "0.5rem" }}>
              {[
                { label: "Name", value: "Boadu Kofi Junior Edwin" },
                { label: "Alias", value: "eii.jnr" },
                { label: "Email", value: profile.email },
                { label: "Location", value: "Kumasi, Ghana" },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "0.75rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                  <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{label}</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e2e8f0", wordBreak: "break-all" }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Focus cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FOCUS.map((f, i) => (
              <motion.div key={f.title} {...inView(0.1 + i * 0.07)}
                className="card card-accent"
                style={{ padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}
              >
                <div style={{ padding: "0.5rem", background: "rgba(6,182,212,0.08)", borderRadius: "0.45rem", flexShrink: 0 }}>
                  <f.icon style={{ width: "1.1rem", height: "1.1rem", color: "#06b6d4" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.3rem" }}>{f.title}</h3>
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
