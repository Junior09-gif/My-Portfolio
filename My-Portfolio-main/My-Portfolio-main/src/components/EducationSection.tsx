import { motion } from "motion/react";
import { GraduationCap, Award, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { education, certifications } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

const CERT_STATUS: Record<string, { color: string; label: string }> = {
  "earned":      { color: "#22c55e", label: "Earned"      },
  "in-progress": { color: "#f59e0b", label: "In Progress" },
  "planned":     { color: "#475569", label: "Planned"     },
};

export default function EducationSection() {
  return (
    <section id="education" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Education</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Education &amp; certifications
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>

          {/* Education card */}
          <motion.div {...inView(0.08)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
              <GraduationCap style={{ width: "1rem", height: "1rem", color: "#06b6d4" }} />
              <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9" }}>Academic Background</h3>
            </div>

            <div className="card card-accent" style={{ padding: "1.35rem" }}>
              <div style={{
                height: "4rem", background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 100%)",
                borderRadius: "0.5rem 0.5rem 0 0", margin: "-1.35rem -1.35rem 1.25rem",
                padding: "1rem 1.35rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
                borderBottom: "1px solid rgba(6,182,212,0.15)",
              }}>
                <span style={{ fontSize: "1.5rem" }}>🎓</span>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#06b6d4", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {education.period}
                </span>
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.3rem" }}>{education.degree}</h4>
              <p style={{ fontSize: "0.875rem", color: "#06b6d4", fontFamily: "var(--font-mono)", marginBottom: "0.2rem" }}>{education.institution}</p>
              <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "1rem" }}>{education.location}</p>

              <div style={{ height: "1px", background: "#1e293b", marginBottom: "1rem" }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {education.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                    <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "#06b6d4", flexShrink: 0, marginTop: "0.55rem" }} />
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6 }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div {...inView(0.12)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
              <Award style={{ width: "1rem", height: "1rem", color: "#06b6d4" }} />
              <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9" }}>Certifications</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {certifications.map((cert, i) => {
                const S = CERT_STATUS[cert.status];
                return (
                  <motion.div key={cert.id} {...inView(0.14 + i * 0.06)}
                    className="card card-accent"
                    style={{ padding: "1rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                        {cert.status === "earned"
                          ? <CheckCircle style={{ width: "0.8rem", height: "0.8rem", color: "#22c55e", flexShrink: 0 }} />
                          : <Clock style={{ width: "0.8rem", height: "0.8rem", color: S.color, flexShrink: 0 }} />
                        }
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cert.title}</h4>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#475569", fontFamily: "var(--font-mono)" }}>{cert.issuer}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.65rem", color: S.color, fontFamily: "var(--font-mono)", padding: "0.12rem 0.5rem", background: `${S.color}12`, border: `1px solid ${S.color}25`, borderRadius: "999px" }}>
                        {S.label}
                      </span>
                      {cert.link !== "#" && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer"
                          aria-label={`${cert.title} certificate link`}
                          style={{ color: "#06b6d4", display: "flex", alignItems: "center" }}>
                          <ExternalLink style={{ width: "0.75rem", height: "0.75rem" }} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <p style={{ fontSize: "0.75rem", color: "#334155", fontFamily: "var(--font-mono)", textAlign: "center", marginTop: "0.5rem" }}>
                * Section updates automatically as certifications are earned
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
