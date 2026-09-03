import { motion } from "motion/react";
import { experiences } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function ExperienceSection() {
  return (
    <section id="experience" className="section" style={{ background: "#0a0f1e", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Experience</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Practical work &amp; activities
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            University labs, self-directed study, and technical activities — all authentic, no fabricated roles.
          </p>
        </motion.div>

        <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <motion.div key={exp.id} {...inView(i * 0.08)}
              style={{ position: "relative", marginBottom: i < experiences.length - 1 ? "2.25rem" : 0 }}
            >
              <div className="timeline-dot" />

              <div className="card card-accent" style={{ padding: "1.35rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.2rem" }}>{exp.role}</h3>
                    <p style={{ fontSize: "0.82rem", color: "#06b6d4", fontFamily: "var(--font-mono)" }}>{exp.org}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                    <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#475569", padding: "0.18rem 0.6rem", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "0.3rem" }}>
                      {exp.period}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#06b6d4", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: "0.1rem" }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "#06b6d4", flexShrink: 0, marginTop: "0.55rem" }} />
                      <span style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#94a3b8" }}>{b}</span>
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
