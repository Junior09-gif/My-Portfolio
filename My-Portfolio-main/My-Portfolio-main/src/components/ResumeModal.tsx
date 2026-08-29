import React from "react";
import { X, Printer, GraduationCap, Award, MapPin, Mail, Globe } from "lucide-react";
import { UserProfile } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export default function ResumeModal({ isOpen, onClose, profile }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(4,8,16,0.92)",
      backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", overflowY: "auto",
    }}>
      <div style={{
        position: "relative", width: "100%", maxWidth: "52rem",
        background: "#fff", color: "#111827",
        borderRadius: "1rem", overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        display: "flex", flexDirection: "column",
        maxHeight: "90vh",
      }}>

        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.9rem 1.5rem",
          background: "#0D1528", borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ padding: "0.3rem", background: "rgba(59,130,246,0.12)", borderRadius: "0.4rem", color: "#60A5FA" }}>
              <Award style={{ width: "0.9rem", height: "0.9rem" }} />
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>Applicant Résumé</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => window.print()}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.9rem", background: "rgba(255,255,255,0.08)", color: "#F0F4FF", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.45rem", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer" }}>
              <Printer style={{ width: "0.8rem", height: "0.8rem" }} />Print
            </button>
            <button onClick={onClose}
              style={{ padding: "0.4rem", background: "none", border: "none", cursor: "pointer", color: "#8FA3C8", borderRadius: "0.4rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F0F4FF")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8FA3C8")}
            >
              <X style={{ width: "1.1rem", height: "1.1rem" }} />
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div style={{ padding: "2.5rem 3rem", overflowY: "auto", background: "#fff", flexGrow: 1, fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#111827" }}>
          <div style={{ maxWidth: "44rem", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "1.5rem", borderBottom: "2px solid #E5E7EB", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{profile.fullName}</h1>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2563EB", marginBottom: "0.2rem" }}>Information Technology Specialist · Cybersecurity Enthusiast</p>
                <p style={{ fontSize: "0.78rem", color: "#6B7280", fontStyle: "italic" }}>BSc. IT — KNUST, Kumasi</p>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#6B7280", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {[
                  { icon: Mail, text: profile.email },
                  { icon: MapPin, text: profile.location },
                  { icon: Globe, text: "github.com/kingslayer5543" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Icon style={{ width: "0.8rem", height: "0.8rem", color: "#2563EB" }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section helper */}
            {([
              {
                title: "Professional Statement",
                content: (
                  <p style={{ color: "#374151", lineHeight: 1.75 }}>
                    Passionate and solution-oriented Information Technology undergraduate at KNUST. Equipped with
                    foundational abilities in Python automation, responsive web engineering, networking protocols,
                    and cybersecurity baselines. Committed to building practical computing applications that
                    mitigate software vulnerabilities and thwart cybercrime.
                  </p>
                ),
              },
              {
                title: "Education",
                content: (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                        <GraduationCap style={{ width: "0.9rem", height: "0.9rem", color: "#2563EB" }} />
                        BSc. Information Technology
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.2rem" }}>Kwame Nkrumah University of Science and Technology (KNUST)</p>
                      <p style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>Computing topologies, databases, web technologies, and security audits.</p>
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151", background: "#F3F4F6", padding: "0.2rem 0.65rem", borderRadius: "0.35rem", whiteSpace: "nowrap" }}>2026 – Present</span>
                  </div>
                ),
              },
              {
                title: "Core Capabilities",
                content: (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.5rem" }}>
                    {["Python Programming", "HTML5 Markup", "CSS3 Styling", "JavaScript Logic", "IPv4 Subnetting", "Cybersecurity Basics"].map(skill => (
                      <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "#374151" }}>
                        <span style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: "#2563EB", flexShrink: 0 }} />
                        <strong>{skill}</strong>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "Project Deliverables",
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { title: "Personal Portfolio Platform", role: "Frontend Developer · React, Tailwind CSS", points: ["Adaptive interface with responsive grid systems.", "Real-time workspace preview controllers."] },
                      { title: "Python Calculator", role: "Software Engineer · Python, React", points: ["Arithmetic parsing with proper operator precedence.", "Validation logs catching NaN and syntax errors."] },
                      { title: "Network Subnet Study Project", role: "Network Architect · IPv4 CIDR Algorithms", points: ["IPv4 CIDR conversion from binary masks.", "Instant network/broadcast/host count output."] },
                    ].map(p => (
                      <div key={p.title}>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", marginBottom: "0.15rem" }}>{p.title}</h4>
                        <p style={{ fontSize: "0.75rem", color: "#6B7280", fontStyle: "italic", marginBottom: "0.35rem" }}>{p.role}</p>
                        <ul style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          {p.points.map(pt => <li key={pt} style={{ fontSize: "0.78rem", color: "#374151" }}>{pt}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                ),
              },
            ] as { title: string; content: React.ReactNode }[]).map(({ title, content }) => (
              <div key={title} style={{ marginBottom: "1.75rem" }}>
                <h3 style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: "1px solid #E5E7EB", paddingBottom: "0.4rem", marginBottom: "0.9rem", fontFamily: "var(--font-mono)" }}>
                  {title}
                </h3>
                {content}
              </div>
            ))}

            {/* Footer */}
            <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "1.25rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", color: "#9CA3AF", fontStyle: "italic" }}>
                Verified candidate. Generated for BSc. IT academic review — KNUST.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
