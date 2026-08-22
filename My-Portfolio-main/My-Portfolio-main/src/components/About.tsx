import { motion } from "motion/react";
import { UserProfile } from "../types";
import { MapPin, GraduationCap, Target, Calendar } from "lucide-react";
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
    <section id="about" className="section relative" style={{ background: "#0A0A0F" }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div {...inView()} className="mb-16">
          <p className="label mb-3">About</p>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            The person behind the code
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left */}
          <div className="space-y-10">

            {/* Bio */}
            <motion.div {...inView(0.1)}>
              <p className="mono-tag mb-4">profile.bio</p>
              <div className="space-y-4">
                {profile.bio.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#86868B" }}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Career goal */}
            <motion.div
              {...inView(0.15)}
              className="rounded-xl p-5"
              style={{ background: "rgba(10,132,255,0.06)", border: "1px solid rgba(10,132,255,0.15)" }}
            >
              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0A84FF" }} />
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "#F5F5F7" }}>Career Objective</p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#86868B" }}>{profile.careerGoal}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div {...inView(0.2)} className="grid grid-cols-2 gap-3">
              {[
                { icon: GraduationCap, label: "University", value: "KNUST, Ghana" },
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Calendar, label: "Program", value: "BSc. IT" },
                { icon: Calendar, label: "Graduation", value: "Expected 2029" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="card card-hover p-4 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-3.5 h-3.5" style={{ color: "#0A84FF" }} />
                    <span className="mono-tag">{label}</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "#F5F5F7" }}>{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Interests */}
            <motion.div {...inView(0.25)}>
              <p className="mono-tag mb-3">Areas of interest</p>
              <div className="flex flex-wrap gap-2">
                {profile.fieldsOfInterest.map(f => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#86868B",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — ID card + timeline */}
          <div className="space-y-10">

            {/* ID Card */}
            <motion.div
              {...inView(0.1)}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Card header */}
              <div
                className="h-24 relative flex items-end px-6 pb-0"
                style={{ background: "linear-gradient(135deg, #0A0A0F 0%, #0F1A2E 100%)" }}
              >
                <div
                  className="absolute inset-0 dot-grid opacity-30"
                />
                <div
                  className="absolute top-3 right-4 text-xs font-mono rounded-full px-2.5 py-0.5"
                  style={{
                    background: "rgba(10,132,255,0.1)",
                    border: "1px solid rgba(10,132,255,0.2)",
                    color: "#0A84FF",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  ACTIVE · 2026
                </div>
              </div>

              <div
                className="p-6"
                style={{ background: "#141420" }}
              >
                {/* Avatar + name */}
                <div className="flex items-end gap-4 -mt-10 mb-5">
                  <div
                    className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #0A84FF 0%, #005BBB 100%)",
                      border: "3px solid #141420",
                    }}
                  >
                    {profile.fullName.charAt(0)}
                  </div>
                  <div className="pb-1">
                    <h3 className="font-semibold text-sm" style={{ color: "#F5F5F7" }}>{profile.fullName}</h3>
                    <p
                      style={{ fontSize: "0.72rem", color: "#0A84FF", fontFamily: "var(--font-mono)" }}
                    >
                      IT Student · KNUST
                    </p>
                  </div>
                </div>

                <div
                  className="grid grid-cols-2 gap-4 text-xs pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-mono)" }}
                >
                  {[
                    { label: "INSTITUTION", value: "KNUST" },
                    { label: "FACULTY", value: "Computing" },
                    { label: "LOCATION", value: profile.location },
                    { label: "LEVEL", value: "Year 1" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="block mb-0.5" style={{ color: "#515154" }}>{label}</span>
                      <span className="font-semibold" style={{ color: "#F5F5F7" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...inView(0.2)}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4" style={{ color: "#0A84FF" }} />
                <p className="text-sm font-semibold" style={{ color: "#F5F5F7" }}>Academic Timeline</p>
              </div>

              <div
                className="relative pl-5 space-y-7"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              >
                {timelineEvents.map((evt, i) => (
                  <div key={i} className="relative">
                    <div
                      className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full"
                      style={{ background: "#0A84FF", border: "2px solid #0A0A0F" }}
                    />
                    <span
                      className="inline-block mb-2 px-2 py-0.5 rounded-md"
                      style={{
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-mono)",
                        color: "#0A84FF",
                        background: "rgba(10,132,255,0.08)",
                        border: "1px solid rgba(10,132,255,0.15)",
                      }}
                    >
                      {evt.year}
                    </span>
                    <h4 className="text-sm font-semibold mb-0.5" style={{ color: "#F5F5F7" }}>{evt.title}</h4>
                    <p className="text-xs mb-1" style={{ color: "#515154" }}>{evt.institution}</p>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#86868B" }}>{evt.details}</p>
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
