import { motion } from "motion/react";
import { experiences } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

export default function ExperienceSection() {
  return (
    <section id="experience" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
      <div className="container">
        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Experience</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Practical Work & Activities</h2>
          <p className="section-subtitle">Authentic — no fabricated roles or inflated claims.</p>
        </motion.div>

        <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
          <div className="timeline-line" />
          {experiences.map((exp, i) => (
            <motion.div key={exp.id} {...inView(i * 0.08)}
              style={{ position: "relative", marginBottom: i < experiences.length - 1 ? "2rem" : 0 }}
            >
              <div className="timeline-dot" />
              <div style={{
                padding: "1.35rem 1.5rem",
                background: "#FFFFFF", border: "1px solid #E5E7EB",
                borderRadius: "0.75rem",
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.85rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#171A21", marginBottom: "0.2rem" }}>{exp.role}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#315EFB", fontWeight: 500 }}>{exp.org}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.18rem 0.65rem", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: "0.35rem", color: "#374151", fontFamily: "var(--font-mono)" }}>
                      {exp.period}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#315EFB", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.18rem 0.65rem", background: "#EEF2FF", borderRadius: "0.35rem" }}>
                      {exp.type}
                    </span>
                  </div>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                      <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "#315EFB", flexShrink: 0, marginTop: "0.55rem" }} />
                      <span style={{ fontSize: "0.875rem", lineHeight: 1.68, color: "#374151" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
