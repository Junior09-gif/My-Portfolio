import { motion } from "motion/react";
import { GraduationCap, Award, ExternalLink, Clock, CheckCircle, BookOpen } from "lucide-react";
import { education, certifications } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay },
});

const CERT_STATUS: Record<string, { color: string; label: string }> = {
  "earned":      { color: "#22c55e", label: "Earned"      },
  "in-progress": { color: "#f59e0b", label: "In Progress" },
  "planned":     { color: "#06b6d4", label: "Target"      },
};

export default function EducationSection() {
  return (
    <section id="education" className="section section-alt" style={{ position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Education</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Education &amp; Professional Credentials
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Formal undergraduate degree coursework at KNUST alongside industry-standard certifications.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>

          {/* Education card */}
          <motion.div {...inView(0.08)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
              <GraduationCap style={{ width: "1.1rem", height: "1.1rem", color: "#06b6d4" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>Academic Background</h3>
            </div>

            <div className="card card-accent" style={{ padding: "1.5rem", background: "#0a0f1e" }}>
              <div style={{
                height: "4.2rem", background: "linear-gradient(135deg, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0.03) 100%)",
                borderRadius: "0.6rem 0.6rem 0 0", margin: "-1.5rem -1.5rem 1.35rem",
                padding: "1rem 1.5rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
                borderBottom: "1px solid rgba(6,182,212,0.18)",
              }}>
                <span style={{ fontSize: "1.6rem" }}>🎓</span>
                <div>
                  <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#22d3ee", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                    {education.period}
                  </span>
                  <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>KNUST Department of Computer Science</p>
                </div>
              </div>

              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.3rem" }}>{education.degree}</h4>
              <p style={{ fontSize: "0.875rem", color: "#06b6d4", fontFamily: "var(--font-mono)", marginBottom: "0.2rem" }}>{education.institution}</p>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.2rem" }}>{education.location}</p>

              {/* Coursework Modules */}
              {education.coursework && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94a3b8", marginBottom: "0.5rem" }}>
                    <BookOpen style={{ width: "0.8rem", height: "0.8rem", color: "#06b6d4" }} />
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Key Academic Modules:
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {education.coursework.map(c => (
                      <span key={c} style={{
                        fontSize: "0.72rem", padding: "0.2rem 0.55rem",
                        background: "#0d1424", border: "1px solid #1e293b",
                        borderRadius: "0.35rem", color: "#cbd5e1",
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ height: "1px", background: "#1e293b", marginBottom: "1rem" }} />
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {education.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                    <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "#06b6d4", flexShrink: 0, marginTop: "0.55rem" }} />
                    <span style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.6 }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div {...inView(0.12)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
              <Award style={{ width: "1.1rem", height: "1.1rem", color: "#06b6d4" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>Certifications &amp; Credentials</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {certifications.map((cert, i) => {
                const S = CERT_STATUS[cert.status];
                return (
                  <motion.div key={cert.id} {...inView(0.14 + i * 0.06)}
                    className="card card-accent"
                    style={{ padding: "1.15rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", background: "#0a0f1e" }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {cert.status === "earned"
                          ? <CheckCircle style={{ width: "0.85rem", height: "0.85rem", color: "#22c55e", flexShrink: 0 }} />
                          : <Clock style={{ width: "0.85rem", height: "0.85rem", color: S.color, flexShrink: 0 }} />
                        }
                        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cert.title}</h4>
                      </div>
                      <p style={{ fontSize: "0.76rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>{cert.issuer}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.35rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.65rem", color: S.color, fontFamily: "var(--font-mono)", padding: "0.15rem 0.55rem", background: `${S.color}15`, border: `1px solid ${S.color}35`, borderRadius: "999px" }}>
                        {S.label}
                      </span>
                      {cert.link && cert.link !== "#" && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer"
                          aria-label={`${cert.title} certificate syllabus & verification`}
                          style={{ color: "#06b6d4", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", fontFamily: "var(--font-mono)", textDecoration: "none" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#22d3ee")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#06b6d4")}
                        >
                          Verify <ExternalLink style={{ width: "0.65rem", height: "0.65rem" }} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <div style={{
                padding: "0.75rem 1rem", background: "rgba(6,182,212,0.04)",
                border: "1px dashed rgba(6,182,212,0.2)", borderRadius: "0.5rem",
                fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--font-mono)", textAlign: "center", marginTop: "0.5rem",
              }}>
                ⚡ Continuous preparation for CompTIA Security+ &amp; Cisco CCNA certification exams
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
