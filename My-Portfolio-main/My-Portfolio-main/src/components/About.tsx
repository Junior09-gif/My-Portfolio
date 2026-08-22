import { motion } from "motion/react";
import { UserProfile } from "../types";
import { MapPin, GraduationCap, Target, Calendar, CheckCircle2 } from "lucide-react";
import { timelineEvents } from "../data";

interface AboutProps { profile: UserProfile; }

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section" style={{ background: "#fff" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About Me</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>
            The person behind the code
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3.5rem" }}>

          {/* Left col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Bio */}
            <motion.div {...inView(0.1)}>
              <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>profile.bio</p>
              {profile.bio.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#6B7280", marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Career goal */}
            <motion.div
              {...inView(0.15)}
              style={{
                padding: "1.25rem",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: "0.75rem",
                display: "flex", gap: "0.75rem",
              }}
            >
              <Target style={{ width: "1.1rem", height: "1.1rem", color: "#2563EB", flexShrink: 0, marginTop: "0.1rem" }} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1D4ED8", marginBottom: "0.3rem" }}>Career Objective</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#3B82F6" }}>{profile.careerGoal}</p>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div {...inView(0.2)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST, Ghana" },
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Calendar, label: "Program", value: "BSc. IT" },
                { icon: Calendar, label: "Graduation", value: "2029" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: "0.9rem",
                    background: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                    <Icon style={{ width: "0.85rem", height: "0.85rem", color: "#2563EB" }} />
                    <span className="mono-tag">{label}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Interests */}
            <motion.div {...inView(0.25)}>
              <p className="mono-tag" style={{ marginBottom: "0.65rem" }}>Areas of Interest</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {profile.fieldsOfInterest.map(f => (
                  <span
                    key={f}
                    style={{
                      padding: "0.3rem 0.75rem",
                      background: "#F3F4F6",
                      border: "1px solid #E5E7EB",
                      borderRadius: "999px",
                      fontSize: "0.8rem", color: "#374151",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Profile card */}
            <motion.div
              {...inView(0.1)}
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Card banner */}
              <div style={{
                height: "6rem",
                background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  padding: "0.2rem 0.65rem",
                  background: "#fff",
                  border: "1px solid #BFDBFE",
                  borderRadius: "999px",
                  fontSize: "0.65rem", color: "#2563EB", fontFamily: "var(--font-mono)",
                }}>
                  ACTIVE · 2026
                </div>
              </div>

              <div style={{ padding: "0 1.5rem 1.5rem", background: "#fff" }}>
                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginTop: "-2rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: "4rem", height: "4rem", borderRadius: "0.75rem",
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", fontWeight: 700, color: "#fff",
                    border: "3px solid #fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    flexShrink: 0,
                  }}>
                    {profile.fullName.charAt(0)}
                  </div>
                  <div style={{ paddingBottom: "0.25rem" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>{profile.fullName}</p>
                    <p style={{ fontSize: "0.75rem", color: "#2563EB", fontFamily: "var(--font-mono)" }}>IT Student · KNUST</p>
                  </div>
                </div>

                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem",
                  paddingTop: "1rem", borderTop: "1px solid #E5E7EB",
                  fontSize: "0.8rem",
                }}>
                  {[
                    { label: "INSTITUTION", value: "KNUST" },
                    { label: "FACULTY", value: "Computing" },
                    { label: "LOCATION", value: "Kumasi, GH" },
                    { label: "LEVEL", value: "Year 1" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mono-tag" style={{ marginBottom: "0.2rem" }}>{label}</p>
                      <p style={{ fontWeight: 600, color: "#111827" }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...inView(0.2)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <GraduationCap style={{ width: "1rem", height: "1rem", color: "#2563EB" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827" }}>Academic Timeline</p>
              </div>

              <div style={{ position: "relative", paddingLeft: "1.25rem", borderLeft: "2px solid #E5E7EB" }}>
                {timelineEvents.map((evt, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < timelineEvents.length - 1 ? "1.75rem" : 0 }}>
                    <div style={{
                      position: "absolute", left: "-1.5rem", top: "0.25rem",
                      width: "0.65rem", height: "0.65rem", borderRadius: "50%",
                      background: "#2563EB", border: "2px solid #fff",
                      boxShadow: "0 0 0 2px #BFDBFE",
                    }} />
                    <span style={{
                      display: "inline-block", marginBottom: "0.4rem",
                      padding: "0.15rem 0.6rem",
                      background: "#EFF6FF", color: "#2563EB",
                      border: "1px solid #BFDBFE",
                      borderRadius: "0.35rem",
                      fontSize: "0.65rem", fontFamily: "var(--font-mono)",
                    }}>
                      {evt.year}
                    </span>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", marginBottom: "0.15rem" }}>{evt.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.4rem" }}>{evt.institution}</p>
                    <p style={{ fontSize: "0.825rem", lineHeight: 1.65, color: "#6B7280" }}>{evt.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What I bring */}
            <motion.div
              {...inView(0.25)}
              style={{ padding: "1.25rem", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "0.75rem" }}
            >
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", marginBottom: "0.75rem" }}>What I bring</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Practical software development skills",
                  "Cybersecurity awareness & fundamentals",
                  "Strong problem-solving mindset",
                  "Collaborative team player",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 style={{ width: "0.9rem", height: "0.9rem", color: "#16A34A", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.825rem", color: "#6B7280" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
