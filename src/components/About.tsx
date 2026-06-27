import { ChangeEvent } from "react";
import { motion } from "motion/react";
import { UserProfile } from "../types";
import { Building2, GraduationCap, MapPin, Target, Quote, Cpu, AppWindow, Camera } from "lucide-react";
import { timelineEvents } from "../data";

interface AboutProps {
  profile: UserProfile;
  setProfile: (val: UserProfile) => void;
  editMode: boolean;
}

export default function About({ profile, setProfile, editMode }: AboutProps) {
  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, bio: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="py-24 bg-navy-950 border-t border-navy-900 relative">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-900/30 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2">My Story</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">About Me</p>
          <div className="w-12 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Interactive Biography Card / Live Bio Editor (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-navy-900/50 border border-navy-800 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Quote className="w-32 h-32 text-brand-400" />
              </div>

              <div className="flex items-center gap-2 mb-6 text-brand-400 font-mono text-xs">
                <Cpu className="w-4 h-4" />
                <span>mission_briefing.sh</span>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <span className="block text-xs font-semibold text-amber-500 font-mono">Edit professional biography:</span>
                  <textarea
                    value={profile.bio}
                    onChange={handleBioChange}
                    rows={8}
                    className="w-full text-sm leading-relaxed text-navy-200 bg-navy-950 border-2 border-amber-500/50 rounded-xl p-4 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-navy-400 italic">Tips: Describe your passion, field interests, and specialized goals at KNUST.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Styled Quotes around the copy */}
                  <div className="relative z-10">
                    <p className="text-navy-200 leading-relaxed font-sans text-base sm:text-lg whitespace-pre-line">
                      {profile.bio}
                    </p>
                  </div>
                  
                  <div className="h-px bg-navy-800 my-4"></div>

                  {/* Career Goal callout */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
                    <Target className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-display font-medium text-white text-sm">Long-Term Career Objective</h4>
                      <p className="text-xs text-navy-300 mt-1 leading-relaxed">
                        To contribute to cybercrime prevention frameworks, secure networking systems, and build resilient, client-first computing systems.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* University Details widget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-navy-900/30 border border-navy-900 hover:border-navy-800 transition-all">
                <div className="flex items-center gap-3 text-brand-400 mb-2">
                  <Building2 className="w-5 h-5" />
                  <h3 className="font-display font-semibold text-white text-sm">Institution Info</h3>
                </div>
                <p className="text-xs text-navy-300 font-medium">{profile.university}</p>
                <span className="text-[10px] text-navy-400 block mt-1">Kumasi, Ashanti Region</span>
              </div>

              <div className="p-5 rounded-xl bg-navy-900/30 border border-navy-900 hover:border-navy-800 transition-all">
                <div className="flex items-center gap-3 text-brand-400 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="font-display font-semibold text-white text-sm">Current Major</h3>
                </div>
                <p className="text-xs text-navy-300 font-medium">{profile.program}</p>
                <span className="text-[10px] text-navy-400 block mt-1">BSc Graduate Program Track</span>
              </div>
            </div>
          </div>

          {/* Column 2: Elegant University ID Placeholder and Timeline (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Styled ID Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-full rounded-2xl p-6 bg-gradient-to-br from-navy-900 via-navy-920 to-brand-950 border border-brand-500/20 shadow-2xl relative overflow-hidden"
            >
              {/* Card Holographic watermark overlay */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-gradient-to-br from-brand-500/15 to-transparent rounded-full filter blur-xl"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-white font-bold tracking-wide text-xs">KNUST</h3>
                  <p className="text-[9px] text-brand-400 font-mono tracking-widest uppercase">STUDENT IDENTITY</p>
                </div>
                <div className="text-[9px] px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 font-mono">
                  ACTIVE
                </div>
              </div>

              <div className="flex gap-4 items-center mb-6">
                {/* Real Profile Image with Upload Target */}
                <div className="relative group flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-brand-950 border-2 border-brand-500/35 overflow-hidden relative shadow-md flex items-center justify-center p-0.5">
                    {profile.profilePicUrl ? (
                      <img 
                        src={profile.profilePicUrl} 
                        alt="Edwin Kofi Student Avatar" 
                        className="w-full h-full object-cover object-center rounded-lg bg-navy-950"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-navy-900 flex flex-col justify-end items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-to-t from-brand-500/10 via-transparent to-transparent"></div>
                        {/* Head */}
                        <div className="w-6 h-6 rounded-full bg-brand-400/40 border border-brand-400/20 mb-1 z-10"></div>
                        {/* Shoulders */}
                        <div className="w-12 h-6 rounded-t-xl bg-brand-500/30 border-t border-brand-400/20 z-10"></div>
                      </div>
                    )}
                    <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none"></div>
                  </div>
                  {editMode && (
                    <label 
                      htmlFor="student-avatar-upload"
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 rounded-xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border border-amber-500/50"
                      title="Upload your photo"
                    >
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span className="text-[8px] text-amber-400 font-mono tracking-wider font-bold mt-1 uppercase">Upload</span>
                    </label>
                  )}
                  {editMode && (
                    <input 
                      type="file" 
                      id="student-avatar-upload" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  )}
                </div>

                <div>
                  <h4 className="font-display font-bold text-white text-base leading-none mb-1">{profile.fullName}</h4>
                  <p className="text-[11px] text-navy-300">{profile.program}</p>
                  <p className="text-[11px] text-navy-400 italic">Faculty of Computer Science</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-navy-800/80 pt-4 text-left font-mono text-[10px]">
                <div>
                  <span className="text-navy-500 block mb-0.5">LOCATION</span>
                  <span className="text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-400" />
                    {profile.location}
                  </span>
                </div>
                <div>
                  <span className="text-navy-500 block mb-0.5">EST. GRADUATION</span>
                  <span className="text-white">2029</span>
                </div>
              </div>
            </motion.div>

            {/* Academic Academic Studies Timeline */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-white text-lg tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                Academic Timeline
              </h3>

              <div className="relative border-l border-navy-800 pl-4 space-y-6 ml-2">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Ring */}
                    <div className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-navy-950 border-2 border-brand-500 z-10 group-hover:bg-brand-500 transition-colors"></div>
                    
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-brand-400 uppercase bg-brand-950/40 border border-brand-800/20 px-2 py-0.5 rounded-md">
                        {evt.year}
                      </span>
                      <h4 className="font-display font-semibold text-white text-sm mt-2">{evt.title}</h4>
                      <p className="text-xs text-navy-400 italic font-medium">{evt.institution}</p>
                      <p className="text-xs text-navy-300 mt-1 leading-relaxed">{evt.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
