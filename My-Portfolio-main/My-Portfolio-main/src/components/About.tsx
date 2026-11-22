import { motion } from "motion/react";
import { GraduationCap, MapPin, BookOpen, Code2, Shield, Network, Cpu, Users } from "lucide-react";

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
        <motion.div {...inView()} style={{ marginBottom: "3.5rem", maxWidth: "42rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>About Me</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Who I Am</h2>
          <p className="section-subtitle">
            An IT student at KNUST passionate about building useful technology and understanding how digital systems work.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3.5rem", alignItems: "start" }}>

          {/* Left — Bio + Leadership + Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            
            {/* Bio paragraphs */}
            <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <p style={{ fontSize: "0.975rem", lineHeight: 1.82, color: "#0F172A" }}>
                I'm <strong style={{ color: "#315EFB", fontWeight: 700 }}>Boadu Kofi Junior Edwin</strong>, an Information Technology student at the <strong style={{ color: "#0F172A", fontWeight: 700 }}>Kwame Nkrumah University of Science and Technology (KNUST)</strong> in Kumasi, Ghana. My interest in technology began with a childhood curiosity about computers, how they work, how software is developed, and how networks connect people.
              </p>
              <p style={{ fontSize: "0.975rem", lineHeight: 1.82, color: "#0F172A" }}>
                I'm currently building a strong foundation in <strong style={{ color: "#315EFB", fontWeight: 700 }}>software development, networking, and cybersecurity</strong> through coursework, personal projects, and independent learning. My goal is to become a well rounded IT professional capable of building secure and practical solutions to real world problems.
              </p>
            </motion.div>

            {/* PENSA Leadership Distinct Highlight Card */}
            <motion.div
              {...inView(0.12)}
              style={{
                padding: "1.25rem 1.4rem",
                background: "rgba(255, 255, 255, 0.82)",
                border: "1px solid #C7D7FD",
                borderLeft: "3.5px solid #315EFB",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 16px rgba(49, 94, 251, 0.05)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ padding: "0.35rem", background: "#EEF2FF", borderRadius: "0.4rem", display: "flex" }}>
                    <Users style={{ width: "0.95rem", height: "0.95rem", color: "#315EFB" }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#315EFB", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                    Leadership &amp; Service
                  </span>
                </div>
                <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#64748B", background: "rgba(238, 242, 255, 0.8)", padding: "0.15rem 0.55rem", borderRadius: "999px", border: "1px solid #C7D7FD" }}>
                  2026 / 2027
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#334155" }}>
                Alongside my academic and technical pursuits, I currently serve as the <strong style={{ color: "#315EFB", fontWeight: 700 }}>Assistant Web and App Head</strong> of the <strong style={{ color: "#0F172A", fontWeight: 600 }}>PENSA KNUST Media Department</strong> for the <strong style={{ color: "#315EFB", fontWeight: 600 }}>2026/2027 Spiritual and Academic Year</strong>. In this role, I contribute to the department's digital presence and support its web and application platforms.
              </p>
            </motion.div>

            {/* Info grid */}
            <motion.div {...inView(0.14)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST" },
                { icon: BookOpen, label: "Programme", value: "BSc. Information Technology" },
                { icon: MapPin, label: "Location", value: "Kumasi, Ghana" },
                { icon: Users, label: "Leadership", value: "PENSA Web & App" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{
                  padding: "0.9rem 1rem", background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.85)", borderRadius: "0.65rem",
                  boxShadow: "0 2px 8px rgba(49,94,251,0.03)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <Icon style={{ width: "0.85rem", height: "0.85rem", color: "#315EFB" }} />
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0F172A" }}>{value}</p>
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
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#315EFB", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                📚 Currently Learning
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {LEARNING.map(item => (
                  <span key={item} style={{
                    padding: "0.28rem 0.75rem",
                    background: "rgba(255,255,255,0.75)",
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
                  background: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "0.75rem",
                }}
              >
                <div style={{ padding: "0.5rem", background: "#EEF2FF", borderRadius: "0.45rem", flexShrink: 0 }}>
                  <f.icon style={{ width: "1.1rem", height: "1.1rem", color: "#315EFB" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.3rem" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#475569" }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





