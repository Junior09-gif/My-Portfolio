import { motion } from "motion/react";
import { UserProfile } from "../types";
import {
  MapPin, GraduationCap, Building2, Target,
  Calendar, Code2, BookOpen
} from "lucide-react";
import { timelineEvents } from "../data";

interface AboutProps {
  profile: UserProfile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-28 bg-[#060810] relative">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            The person behind the code
          </h2>
          <div className="w-10 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — bio + meta */}
          <div className="space-y-8">

            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-7 space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-brand-400">
                <Code2 className="w-3.5 h-3.5" />
                <span>profile.bio</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[15px] whitespace-pre-line">
                {profile.bio}
              </p>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-500/5 border border-brand-500/15">
                <Target className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Career Objective</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{profile.careerGoal}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Building2, label: "University", value: "KNUST, Ghana" },
                { icon: BookOpen, label: "Program", value: profile.program },
                { icon: MapPin, label: "Location", value: profile.location },
                { icon: Calendar, label: "Graduation", value: "Expected 2029" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4 card-hover">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-3.5 h-3.5 text-brand-400" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-sm font-medium text-white leading-snug">{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Fields of interest */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Areas of Interest</p>
              <div className="flex flex-wrap gap-2">
                {profile.fieldsOfInterest.map((field) => (
                  <span
                    key={field}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-700 border border-white/8 text-slate-300"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — ID card + timeline */}
          <div className="space-y-8">

            {/* ID Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-brand-500/20 shadow-xl shadow-brand-900/10"
            >
              {/* Card header gradient */}
              <div className="h-20 bg-gradient-to-r from-brand-900 via-brand-800 to-accent-600/50 relative">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute top-3 right-4 text-[9px] font-mono text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-full bg-brand-950/60">
                  ACTIVE · 2026
                </div>
              </div>

              <div className="bg-surface-800 p-6">
                {/* Avatar + name */}
                <div className="flex items-end gap-4 -mt-10 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-surface-700 border-2 border-surface-800 overflow-hidden flex-shrink-0 shadow-lg flex items-center justify-center">
                    {profile.profilePicUrl ? (
                      <img src={profile.profilePicUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-800 to-accent-600 flex items-center justify-center">
                        <span className="text-2xl font-display font-bold text-white">
                          {profile.fullName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="pb-1">
                    <h3 className="font-display font-bold text-white text-base leading-tight">{profile.fullName}</h3>
                    <p className="text-xs text-brand-400 font-mono mt-0.5">IT Student · Software Eng.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block mb-0.5">INSTITUTION</span>
                    <span className="text-white font-semibold">KNUST</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">FACULTY</span>
                    <span className="text-white font-semibold">Computing</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">LOCATION</span>
                    <span className="text-white flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-brand-400" />
                      {profile.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">LEVEL</span>
                    <span className="text-white font-semibold">Year 1</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-4 h-4 text-brand-400" />
                <h3 className="font-display font-semibold text-white text-sm">Academic Timeline</h3>
              </div>

              <div className="relative pl-5 border-l border-surface-600 space-y-7">
                {timelineEvents.map((evt, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-surface-900 border-2 border-brand-500" />
                    <span className="inline-block text-[10px] font-mono text-brand-400 bg-brand-950/60 border border-brand-800/40 px-2 py-0.5 rounded-md mb-2">
                      {evt.year}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{evt.title}</h4>
                    <p className="text-xs text-slate-500 italic mb-1">{evt.institution}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{evt.details}</p>
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
