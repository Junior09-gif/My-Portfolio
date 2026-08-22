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
    <section id="about" className="section" style={{ background: "rgba(8,13,26,0.85)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>About Me</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em" }}>
            The person behind the code
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <motion.div {...inView(0.1)}>
              <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>bio</p>
              {profile.bio.split("\n\n").map((p, i) => (
                <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#8FA3C8", marginBottom: "0.9rem" }}>{p}</p>
              ))}
            </motion.div>

            <motion.div {...inView(0.15)} style={{ padding: "1.1rem 1.25rem", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "0.75rem", display: "flex", gap: "0.75rem" }}>
              <Target style={{ width: "1rem", height: "1rem", color: "#3B82F6", flexShrink: 0, marginTop: "0.1rem" }} />
              <div>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#60A5FA", marginBottom: "0.3rem" }}>Career Objective</p>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#8FA3C8" }}>{profile.careerGoal}</p>
              </div>
            </motion.div>

            <motion.div {...inView(0.2)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              {[
                { icon: GraduationCap, label: "University", value: "KNUST, Ghana" },
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Calendar, label: "Program", value: "BSc. IT" },
                { icon: Calendar, label: "Graduation", value: "2029" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.65rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                    <Icon style={{ width: "0.8rem", height: "0.8rem", color: "#3B82F6" }} />
                    <span className="mono-tag">{label}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div {...inView(0.25)}>
              <p className="mono-tag" style={{ marginBottom: "0.65rem" }}>Areas of Interest</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {profile.fieldsOfInterest.map(f => (
                  <span key={f} style={{ padding: "0.3rem 0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", fontSize: "0.8rem", color: "#8FA3C8" }}>{f}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* ID card */}
            <motion.div {...inView(0.1)} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div style={{ height: "5.5rem", background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(6,182,212,0.15) 100%)", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div style={{ position: "absolute", top: "0.65rem", right: "0.75rem", padding: "0.15rem 0.55rem", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "999px", fontSize: "0.6rem", color: "#60A5FA", fontFamily: "var(--font-mono)" }}>
                  ACTIVE · 2026
                </div>
              </div>
              <div style={{ padding: "0 1.25rem 1.25rem", background: "rgba(13,21,40,0.8)" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.9rem", marginTop: "-1.8rem", marginBottom: "1rem" }}>
                  <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.65rem", background: "linear-gradient(135deg, #3B82F6, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 700, color: "#fff", border: "3px solid rgba(13,21,40,0.8)", boxShadow: "0 0 16px rgba(59,130,246,0.35)", flexShrink: 0 }}>
                    {profile.fullName.charAt(0)}
                  </div>
                  <div style={{ paddingBottom: "0.2rem" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#F0F4FF" }}>{profile.fullName}</p>
                    <p style={{ fontSize: "0.72rem", color: "#3B82F6", fontFamily: "var(--font-mono)" }}>IT Student · KNUST</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "0.8rem" }}>
                  {[
                    { label: "INSTITUTION", value: "KNUST" },
                    { label: "FACULTY", value: "Computing" },
                    { label: "LOCATION", value: "Kumasi, GH" },
                    { label: "LEVEL", value: "Year 1" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mono-tag" style={{ marginBottom: "0.15rem" }}>{label}</p>
                      <p style={{ fontWeight: 600, color: "#F0F4FF" }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...inView(0.2)}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.1rem" }}>
                <GraduationCap style={{ width: "0.95rem", height: "0.95rem", color: "#3B82F6" }} />
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF" }}>Timeline</p>
              </div>
              <div style={{ position: "relative", paddingLeft: "1.25rem", borderLeft: "2px solid rgba(255,255,255,0.08)" }}>
                {timelineEvents.map((evt, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < timelineEvents.length - 1 ? "1.5rem" : 0 }}>
                    <div style={{ position: "absolute", left: "-1.45rem", top: "0.3rem", width: "0.6rem", height: "0.6rem", borderRadius: "50%", background: "#3B82F6", border: "2px solid #080D1A", boxShadow: "0 0 8px rgba(59,130,246,0.5)" }} />
                    <span style={{ display: "inline-block", marginBottom: "0.35rem", padding: "0.12rem 0.55rem", background: "rgba(59,130,246,0.1)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "0.3rem", fontSize: "0.63rem", fontFamily: "var(--font-mono)" }}>{evt.year}</span>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF", marginBottom: "0.12rem" }}>{evt.title}</h4>
                    <p style={{ fontSize: "0.75rem", color: "#4A5F80", marginBottom: "0.35rem" }}>{evt.institution}</p>
                    <p style={{ fontSize: "0.825rem", lineHeight: 1.65, color: "#8FA3C8" }}>{evt.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What I bring */}
            <motion.div {...inView(0.25)} style={{ padding: "1.1rem 1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F0F4FF", marginBottom: "0.7rem" }}>What I bring</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {["Practical software development skills", "Cybersecurity awareness & fundamentals", "Strong problem-solving mindset", "Collaborative team player"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "#22C55E", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.825rem", color: "#8FA3C8" }}>{item}</span>
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
