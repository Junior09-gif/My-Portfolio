import React from "react";
import { motion } from "motion/react";
import { UserProfile } from "../types";
import { MapPin, GraduationCap, Target, Calendar, CheckCircle2, Mail, Github, Linkedin } from "lucide-react";
import { timelineEvents, defaultSkills } from "../data";

interface AboutProps { profile: UserProfile; }

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

const CARD: React.CSSProperties = { background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.75rem" };

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section" style={{ background: "#090d16", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            The person behind the code
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "2.5rem" }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            <motion.div {...inView(0.08)}>
              <p className="mono-tag" style={{ marginBottom: "0.65rem" }}>bio</p>
              {profile.bio.split("\n\n").map((p, i) => (
                <p key={i} style={{ fontSize: "0.925rem", lineHeight: 1.82, color: "#94a3b8", marginBottom: "0.85rem" }}>{p}</p>
              ))}
            </motion.div>

            <motion.div {...inView(0.12)} style={{ ...CARD, padding: "1rem 1.15rem", display: "flex", gap: "0.75rem" }}>
              <Target style={{ width: "0.9rem", height: "0.9rem", color: "#2563eb", flexShrink: 0, marginTop: "0.15rem" }} />
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#2563eb", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Career Objective</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#94a3b8" }}>{profile.careerGoal}</p>
              </div>
            </motion.div>

            <motion.div {...inView(0.16)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST" },
                { icon: MapPin, label: "Location", value: "Kumasi, GH" },
                { icon: Calendar, label: "Program", value: "BSc. IT" },
                { icon: Calendar, label: "Year", value: "Year 1 · 2026" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ ...CARD, padding: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <Icon style={{ width: "0.75rem", height: "0.75rem", color: "#2563eb" }} />
                    <span className="mono-tag">{label}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div {...inView(0.2)}>
              <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>Skill snapshot</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {defaultSkills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.28rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{skill.name}</span>
                      <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#475569" }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "2px", background: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        style={{ height: "100%", background: "#2563eb", borderRadius: "999px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* Profile card */}
            <motion.div {...inView(0.08)} style={{ border: "1px solid #1e293b", borderRadius: "0.85rem", overflow: "hidden" }}>
              <div style={{ height: "5rem", background: "#0d1120", borderBottom: "1px solid #1e293b", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.3 }} />
                <div style={{ position: "absolute", top: "0.65rem", right: "0.85rem", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.18rem 0.6rem", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "999px" }}>
                  <span style={{ width: "0.38rem", height: "0.38rem", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 4px #22c55e" }} />
                  <span style={{ fontSize: "0.58rem", color: "#60a5fa", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>ACTIVE · 2026</span>
                </div>
              </div>
              <div style={{ padding: "0 1.25rem 1.25rem", background: "#0d1120" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.9rem", marginTop: "-1.8rem", marginBottom: "1rem" }}>
                  <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.65rem", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: "#fff", border: "3px solid #0d1120", flexShrink: 0 }}>
                    {profile.fullName.charAt(0)}
                  </div>
                  <div style={{ paddingBottom: "0.2rem" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9" }}>{profile.fullName}</p>
                    <p style={{ fontSize: "0.68rem", color: "#2563eb", fontFamily: "var(--font-mono)" }}>IT Student · KNUST</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", paddingTop: "0.85rem", borderTop: "1px solid #1e293b" }}>
                  {[{ label: "INSTITUTION", value: "KNUST" }, { label: "FACULTY", value: "Computing" }, { label: "LOCATION", value: "Kumasi, GH" }, { label: "LEVEL", value: "Year 1" }].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mono-tag" style={{ marginBottom: "0.18rem" }}>{label}</p>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>{value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.45rem", marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid #1e293b" }}>
                  {[
                    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
                    { icon: Github, href: profile.githubUrl, label: "GitHub" },
                    { icon: Linkedin, href: profile.linkedinUrl, label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.7rem", background: "transparent", border: "1px solid #1e293b", borderRadius: "0.4rem", fontSize: "0.72rem", color: "#475569", textDecoration: "none", transition: "all 0.2s", fontFamily: "var(--font-mono)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; (e.currentTarget as HTMLElement).style.borderColor = "#263347"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}
                    >
                      <Icon style={{ width: "0.75rem", height: "0.75rem" }} />{label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...inView(0.16)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "1.1rem" }}>
                <GraduationCap style={{ width: "0.875rem", height: "0.875rem", color: "#2563eb" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>Academic Timeline</p>
              </div>
              <div style={{ position: "relative", paddingLeft: "1.25rem", borderLeft: "2px solid #1e293b" }}>
                {timelineEvents.map((evt, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < timelineEvents.length - 1 ? "1.5rem" : 0 }}>
                    <div style={{ position: "absolute", left: "-1.45rem", top: "0.3rem", width: "0.6rem", height: "0.6rem", borderRadius: "50%", background: "#2563eb", border: "2px solid #090d16" }} />
                    <span style={{ display: "inline-block", marginBottom: "0.35rem", padding: "0.1rem 0.55rem", background: "rgba(37,99,235,0.08)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.18)", borderRadius: "0.3rem", fontSize: "0.62rem", fontFamily: "var(--font-mono)" }}>{evt.year}</span>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.12rem" }}>{evt.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "0.35rem" }}>{evt.institution}</p>
                    <p style={{ fontSize: "0.825rem", lineHeight: 1.68, color: "#94a3b8" }}>{evt.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What I bring */}
            <motion.div {...inView(0.2)} style={{ ...CARD, padding: "1rem 1.15rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.75rem" }}>What I bring</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Practical software development skills", "Cybersecurity awareness & fundamentals", "Strong analytical problem-solving", "Collaborative team player"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 style={{ width: "0.825rem", height: "0.825rem", color: "#2563eb", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{item}</span>
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
