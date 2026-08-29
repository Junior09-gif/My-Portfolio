import { motion } from "motion/react";
import { UserProfile } from "../types";
import {
  MapPin, GraduationCap, Target, Calendar,
  CheckCircle2, Code2, Shield, Network,
  Mail, Github, Linkedin
} from "lucide-react";
import { timelineEvents, defaultSkills } from "../data";

interface AboutProps { profile: UserProfile; }

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const SKILL_COLORS: Record<string, string> = {
  Python: "#3B82F6", HTML: "#F97316", CSS: "#8B5CF6",
  JavaScript: "#F59E0B", Networking: "#06B6D4", "Cybersecurity Basics": "#10B981",
};

const INTEREST_ICONS: Record<string, typeof Code2> = {
  "Technology": Code2, "Software Development": Code2,
  "Networking": Network, "Cybersecurity": Shield,
};

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section" style={{ background: "rgba(8,13,26,0.85)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Header ── */}
        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About Me</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em" }}>
            The person behind the code
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#8FA3C8", marginTop: "0.5rem", maxWidth: "32rem" }}>
            IT student, builder, and cybersecurity enthusiast from Kumasi, Ghana.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem" }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Bio */}
            <motion.div {...inView(0.1)}>
              <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>bio</p>
              {profile.bio.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.82, color: "#8FA3C8", marginBottom: "0.9rem" }}>{para}</p>
              ))}
            </motion.div>

            {/* Career objective */}
            <motion.div
              {...inView(0.15)}
              style={{
                padding: "1.1rem 1.25rem",
                background: "rgba(59,130,246,0.07)",
                border: "1px solid rgba(59,130,246,0.18)",
                borderRadius: "0.85rem",
                display: "flex", gap: "0.75rem",
              }}
            >
              <div style={{ padding: "0.4rem", background: "rgba(59,130,246,0.12)", borderRadius: "0.45rem", height: "fit-content", flexShrink: 0 }}>
                <Target style={{ width: "0.9rem", height: "0.9rem", color: "#60A5FA" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#60A5FA", marginBottom: "0.35rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Career Objective</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#8FA3C8" }}>{profile.careerGoal}</p>
              </div>
            </motion.div>

            {/* Quick facts grid */}
            <motion.div {...inView(0.2)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST, Ghana" },
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Calendar, label: "Program", value: "BSc. IT" },
                { icon: Calendar, label: "Year", value: "Year 1 · 2026" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.7rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                    <Icon style={{ width: "0.8rem", height: "0.8rem", color: "#3B82F6" }} />
                    <span className="mono-tag">{label}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Skill snapshot */}
            <motion.div {...inView(0.25)}>
              <p className="mono-tag" style={{ marginBottom: "0.85rem" }}>Skill snapshot</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {defaultSkills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "#F0F4FF", fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#4A5F80" }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                        style={{
                          height: "100%", borderRadius: "999px",
                          background: SKILL_COLORS[skill.name] || "#3B82F6",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div {...inView(0.3)}>
              <p className="mono-tag" style={{ marginBottom: "0.65rem" }}>Areas of interest</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {profile.fieldsOfInterest.map(f => {
                  const Icon = INTEREST_ICONS[f] || Code2;
                  return (
                    <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", fontSize: "0.78rem", color: "#8FA3C8" }}>
                      <Icon style={{ width: "0.75rem", height: "0.75rem", color: "#3B82F6" }} />
                      {f}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Profile card */}
            <motion.div
              {...inView(0.1)}
              style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.1rem", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
            >
              {/* Banner */}
              <div style={{ height: "6rem", background: "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.18) 50%, rgba(139,92,246,0.15) 100%)", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div style={{ position: "absolute", top: "0.75rem", right: "0.85rem", display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.2rem 0.65rem", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "999px" }}>
                  <span style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 5px #22C55E" }} />
                  <span style={{ fontSize: "0.6rem", color: "#60A5FA", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>ACTIVE · 2026</span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "0 1.4rem 1.4rem", background: "rgba(10,16,32,0.9)" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginTop: "-2.1rem", marginBottom: "1.1rem" }}>
                  <div style={{
                    width: "4rem", height: "4rem", borderRadius: "0.9rem", flexShrink: 0,
                    background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", fontWeight: 800, color: "#fff",
                    border: "3px solid rgba(10,16,32,0.9)",
                    boxShadow: "0 0 20px rgba(59,130,246,0.4)",
                  }}>
                    {profile.fullName.charAt(0)}
                  </div>
                  <div style={{ paddingBottom: "0.25rem" }}>
                    <p style={{ fontSize: "0.925rem", fontWeight: 700, color: "#F0F4FF" }}>{profile.fullName}</p>
                    <p style={{ fontSize: "0.72rem", color: "#3B82F6", fontFamily: "var(--font-mono)", marginTop: "0.1rem" }}>IT Student · KNUST</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    { label: "INSTITUTION", value: "KNUST" },
                    { label: "FACULTY", value: "Computing" },
                    { label: "LOCATION", value: "Kumasi, GH" },
                    { label: "LEVEL", value: "Year 1" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mono-tag" style={{ marginBottom: "0.2rem" }}>{label}</p>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
                    { icon: Github, href: profile.githubUrl, label: "GitHub" },
                    { icon: Linkedin, href: profile.linkedinUrl, label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.5rem", fontSize: "0.75rem", color: "#8FA3C8", textDecoration: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F0F4FF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.35)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8FA3C8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <Icon style={{ width: "0.8rem", height: "0.8rem" }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...inView(0.2)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <GraduationCap style={{ width: "0.95rem", height: "0.95rem", color: "#3B82F6" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF" }}>Academic Timeline</p>
              </div>
              <div style={{ position: "relative", paddingLeft: "1.35rem", borderLeft: "2px solid rgba(255,255,255,0.07)" }}>
                {timelineEvents.map((evt, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < timelineEvents.length - 1 ? "1.75rem" : 0 }}>
                    <div style={{ position: "absolute", left: "-1.5rem", top: "0.3rem", width: "0.65rem", height: "0.65rem", borderRadius: "50%", background: "#3B82F6", border: "2px solid #080D1A", boxShadow: "0 0 10px rgba(59,130,246,0.5)" }} />
                    <span style={{ display: "inline-block", marginBottom: "0.4rem", padding: "0.12rem 0.6rem", background: "rgba(59,130,246,0.1)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.22)", borderRadius: "0.35rem", fontSize: "0.63rem", fontFamily: "var(--font-mono)" }}>
                      {evt.year}
                    </span>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "0.15rem" }}>{evt.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: "#4A5F80", marginBottom: "0.4rem" }}>{evt.institution}</p>
                    <p style={{ fontSize: "0.825rem", lineHeight: 1.68, color: "#8FA3C8" }}>{evt.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What I bring */}
            <motion.div
              {...inView(0.25)}
              style={{ padding: "1.1rem 1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.85rem" }}
            >
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF", marginBottom: "0.85rem" }}>What I bring</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {[
                  "Practical software development skills",
                  "Cybersecurity awareness & fundamentals",
                  "Strong analytical problem-solving mindset",
                  "Collaborative team player",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                    <CheckCircle2 style={{ width: "0.875rem", height: "0.875rem", color: "#22C55E", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#8FA3C8" }}>{item}</span>
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
