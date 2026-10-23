import { motion } from "motion/react";
import { GraduationCap, Award, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { education, certifications } from "../data";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const CERT_STATUS: Record<string, { color: string; bg: string; label: string }> = {
  "earned": { color: "#16a34a", bg: "#f0fdf4", label: "Earned" },
  "in-progress": { color: "#d97706", bg: "#fffbeb", label: "In Progress" },
  "planned": { color: "#9BA3AE", bg: "#F3F4F6", label: "Planned" },
};

export default function EducationSection() {
  return (
    <section id="education" className="section" style={{ background: "#F8F9FB", position: "relative", zIndex: 1 }}>
      <div className="container">
        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Education</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Education & Certifications</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>

          {/* Education card */}
          <motion.div {...inView(0.08)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <GraduationCap style={{ width: "1rem", height: "1rem", color: "#315EFB" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#171A21" }}>Academic Background</h3>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.875rem", overflow: "hidden" }}>
              <div style={{ height: "4rem", background: "linear-gradient(135deg, #EEF2FF 0%, #DBEAFE 100%)", display: "flex", alignItems: "center", padding: "0 1.5rem" }}>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#315EFB", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                  {education.period}
                </span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#171A21", marginBottom: "0.3rem" }}>{education.degree}</h4>
                <p style={{ fontSize: "0.875rem", color: "#315EFB", fontWeight: 500, marginBottom: "0.15rem" }}>{education.institution}</p>
                <p style={{ fontSize: "0.8rem", color: "#667085", marginBottom: "1.1rem" }}>{education.location}</p>
                <div style={{ height: "1px", background: "#E5E7EB", marginBottom: "1.1rem" }} />
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {education.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                      <span style={{ width: "0.35rem", height: "0.35rem", borderRadius: "50%", background: "#315EFB", flexShrink: 0, marginTop: "0.55rem" }} />
                      <span style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div {...inView(0.12)}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Award style={{ width: "1rem", height: "1rem", color: "#315EFB" }} />
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#171A21" }}>Certifications</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {certifications.map((cert, i) => {
                const S = CERT_STATUS[cert.status] || CERT_STATUS["planned"];
                return (
                  <motion.div key={cert.id}
                    {...inView(0.14 + i * 0.06)}
                    whileHover={{ y: -2, borderColor: "#D1D5DB", transition: { duration: 0.2 } }}
                    style={{ padding: "1rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.75rem" }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                        {cert.status === "earned"
                          ? <CheckCircle style={{ width: "0.8rem", height: "0.8rem", color: "#16a34a", flexShrink: 0 }} />
                          : <Clock style={{ width: "0.8rem", height: "0.8rem", color: S.color, flexShrink: 0 }} />
                        }
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#171A21", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cert.title}</h4>
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#667085", fontFamily: "var(--font-mono)" }}>{cert.issuer}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.68rem", fontWeight: 600, color: S.color, background: S.bg, padding: "0.12rem 0.55rem", borderRadius: "999px" }}>
                        {S.label}
                      </span>
                      {cert.link !== "#" && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer"
                          aria-label={`${cert.title} link`}
                          style={{ color: "#315EFB", display: "flex", alignItems: "center" }}
                        >
                          <ExternalLink style={{ width: "0.75rem", height: "0.75rem" }} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              <p style={{ fontSize: "0.72rem", color: "#9BA3AE", textAlign: "center", fontFamily: "var(--font-mono)", marginTop: "0.25rem" }}>
                Updates automatically as certifications are earned
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
