import { motion } from "motion/react";
import { GraduationCap, MapPin, BookOpen, Code2, Shield, Network, Cpu } from "lucide-react";
import { profile } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const FOCUS = [
  { icon: Shield, title: "Cybersecurity & Defense", desc: "Learning security fundamentals, ethical hacking basics, and how to build resilient systems." },
  { icon: Network, title: "Networking", desc: "TCP/IP, subnetting, router configuration, and understanding how data moves across networks." },
  { icon: Code2, title: "Software & Web Development", desc: "Building practical web applications with React, JavaScript, and modern tooling." },
  { icon: Cpu, title: "IT Systems", desc: "Operating systems, system administration, and scripting to automate technical tasks." },
];

const LEARNING = [
  "Programming Fundamentals (Python, JavaScript)",
  "Web Development (HTML, CSS, React)",
  "Network Protocols & Subnetting",
  "Cybersecurity Concepts",
  "Linux & Command Line",
  "Database Basics (SQL)",
];

export default function About() {
  return (
    <section id="about" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
      <div className="container">

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3.5rem", maxWidth: "40rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>About Me</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Who I Am</h2>
          <p className="section-subtitle">
            An IT student at KNUST passionate about building useful technology and understanding how digital systems work.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3.5rem", alignItems: "start" }}>

          {/* Left — Bio + info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.975rem", lineHeight: 1.82, color: "#374151" }}>
                I'm Boadu Kofi Junior Edwin, an Information Technology student at the Kwame Nkrumah University of Science
                and Technology (KNUST) in Kumasi, Ghana. My interest in technology started with a childhood curiosity about
                computers — how they work, how software is built, and how networks connect people.
              </p>
              <p style={{ fontSize: "0.975rem", lineHeight: 1.82, color: "#374151" }}>
                I'm currently building my foundation in software development, networking, and cybersecurity through
                coursework, personal projects, and self-directed study. My goal is to become a well-rounded IT professional
                who can build secure, practical solutions to real problems.
              </p>
            </motion.div>

            {/* Info grid */}
            <motion.div {...inView(0.12)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST" },
                { icon: BookOpen, label: "Programme", value: "BSc. Information Technology" },
                { icon: MapPin, label: "Location", value: "Kumasi, Ghana" },
                { icon: Code2, label: "Focus", value: "Learning & Building" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{
                  padding: "0.9rem 1rem", background: "#F8F9FB",
                  border: "1px solid #E5E7EB", borderRadius: "0.65rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <Icon style={{ width: "0.85rem", height: "0.85rem", color: "#315EFB" }} />
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#9BA3AE", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#171A21" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Currently Learning card */}
            <motion.div {...inView(0.16)} style={{
              padding: "1.25rem 1.35rem",
              background: "#EEF2FF",
              border: "1px solid #C7D7FD",
              borderRadius: "0.75rem",
            }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#315EFB", marginBottom: "0.85rem', display: 'flex", alignItems: "center", gap: "0.4rem" }}>
                📚 Currently Learning
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {LEARNING.map(item => (
                  <span key={item} style={{
                    padding: "0.28rem 0.75rem",
                    background: "#FFFFFF",
                    border: "1px solid #C7D7FD",
                    borderRadius: "999px",
                    fontSize: "0.78rem", fontWeight: 500, color: "#315EFB",
                  }}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Focus cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {FOCUS.map((f, i) => (
              <motion.div key={f.title}
                {...inView(0.08 + i * 0.06)}
                whileHover={{ y: -3, borderColor: "#315EFB", transition: { duration: 0.2 } }}
                style={{
                  padding: "1.15rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start",
                  background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.75rem",
                }}
              >
                <div style={{ padding: "0.5rem", background: "#EEF2FF", borderRadius: "0.45rem", flexShrink: 0 }}>
                  <f.icon style={{ width: "1.1rem", height: "1.1rem", color: "#315EFB" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#171A21", marginBottom: "0.3rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#667085" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
