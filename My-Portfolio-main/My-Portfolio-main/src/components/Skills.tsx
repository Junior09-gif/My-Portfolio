import { motion } from "motion/react";
import { Code2, Globe, Network, Shield, Wrench } from "lucide-react";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const SKILLS = [
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    icon: Globe,
    title: "Web Development",
    skills: ["HTML5", "CSS3", "React", "Tailwind CSS", "Node.js (Basics)"],
  },
  {
    icon: Network,
    title: "Networking",
    skills: ["TCP/IP", "IPv4 Subnetting", "CIDR", "DNS & DHCP", "Cisco Packet Tracer"],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    skills: ["Security Fundamentals", "Linux CLI", "Ethical Hacking Basics", "Password Security", "Cryptography Basics"],
  },
  {
    icon: Wrench,
    title: "Development Tools",
    skills: ["Git & GitHub", "VS Code", "Bash / Shell", "Vite", "Command Line"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" style={{ background: "#F8F9FB", position: "relative", zIndex: 1 }}>
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3.5rem", maxWidth: "40rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Skills</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>What I Work With</h2>
          <p className="section-subtitle">
            Technologies and tools I'm learning and using in coursework, personal projects, and self-study.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {SKILLS.map((cat, ci) => (
            <motion.div key={cat.title}
              {...inView(ci * 0.06)}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(23,26,33,0.09)", borderColor: "#D1D5DB", transition: { duration: 0.2 } }}
              style={{
                padding: "1.5rem",
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "0.85rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <div style={{ padding: "0.5rem", background: "#EEF2FF", borderRadius: "0.5rem" }}>
                  <cat.icon style={{ width: "1.1rem", height: "1.1rem", color: "#315EFB" }} />
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#171A21" }}>{cat.title}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {cat.skills.map(s => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
