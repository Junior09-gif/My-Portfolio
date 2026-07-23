import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, ContactMessage } from "../types";
import {
  Mail, Github, Linkedin, Send, ShieldCheck, Check, Copy,
  MapPin, Phone, Globe, Instagram, Clock, MessageSquare
} from "lucide-react";

interface ContactProps {
  profile: UserProfile;
  messages: ContactMessage[];
  onAddMessage: (m: ContactMessage) => void;
}

export default function Contact({ profile, messages, onAddMessage }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedEmail, setCopied] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      onAddMessage({
        name: form.name, email: form.email,
        subject: form.subject || "No Subject",
        message: form.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
      setSending(false); setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1400);
  };

  const socials = [
    { icon: Github, label: "GitHub", href: profile.githubUrl, color: "hover:border-white/30" },
    { icon: Linkedin, label: "LinkedIn", href: profile.linkedinUrl, color: "hover:border-blue-500/40" },
    ...(profile.instagram ? [{ icon: Instagram, label: "Instagram", href: `https://instagram.com/${profile.instagram.replace(/^@/, "")}`, color: "hover:border-pink-500/40" }] : []),
  ];

  return (
    <section id="contact" className="py-28 bg-[#060810] relative">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Let's work together
          </h2>
          <div className="w-10 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left — contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">Open to opportunities</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                I'm actively seeking internships, IT support roles, and collaborative projects. If you're a recruiter, academic, or developer — reach out.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="card p-4 flex items-center justify-between group card-hover">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-sm text-white hover:text-brand-400 transition-colors font-medium">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button onClick={copyEmail} className="p-1.5 rounded-lg hover:bg-surface-700 text-slate-500 hover:text-white transition-colors cursor-pointer">
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="card p-4 flex items-center gap-3">
                <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400"><MapPin className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm text-white font-medium">{profile.location}</p>
                </div>
              </div>

              {/* Campus */}
              <div className="card p-4 flex items-center gap-3">
                <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400"><Globe className="w-4 h-4" /></div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">University</p>
                  <p className="text-sm text-white font-medium">KNUST, Kumasi</p>
                </div>
              </div>

              {/* Phone */}
              {(profile.phone1 || profile.phone2) && (
                <div className="card p-4 flex items-center gap-3">
                  <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400"><Phone className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Phone</p>
                    <div className="flex gap-3 text-sm text-white font-medium">
                      {profile.phone1 && <a href={`tel:${profile.phone1}`} className="hover:text-brand-400 transition-colors">{profile.phone1}</a>}
                      {profile.phone2 && <a href={`tel:${profile.phone2}`} className="hover:text-brand-400 transition-colors">{profile.phone2}</a>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3">Find me online</p>
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-800 border border-white/8 text-slate-400 hover:text-white text-xs font-medium transition-all ${color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="card p-7">
              <div className="flex items-center gap-2 mb-6 pb-5 border-b border-white/6">
                <MessageSquare className="w-4 h-4 text-brand-400" />
                <h3 className="font-display font-semibold text-white text-sm">Send a message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Your Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Ama Serwaa"
                      className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="ama@gmail.com"
                      className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 font-mono transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Internship enquiry / Project collaboration"
                    className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 transition-colors" />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5">Message *</label>
                  <textarea name="message" required value={form.message} onChange={handleChange} rows={4}
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    className="w-full bg-surface-900 border border-white/8 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 resize-none transition-colors" />
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Message sent!</p>
                        <p className="text-xs opacity-80 mt-0.5">I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button key="btn" type="submit" disabled={sending}
                      className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-900 text-white rounded-xl font-semibold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-900/40">
                      {sending
                        ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</>
                        : <><Send className="w-4 h-4" />Send Message</>
                      }
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>

              {/* Message log */}
              {messages.length > 0 && (
                <div className="border-t border-white/6 pt-5 mt-6 space-y-3">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Inbox ({messages.length})</p>
                  <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                    {messages.map((m, i) => (
                      <div key={i} className="p-3 bg-surface-900 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white font-bold">{m.name} <span className="text-slate-500 font-normal">({m.email})</span></span>
                          <span className="text-brand-400 flex items-center gap-1"><Clock className="w-3 h-3" />{m.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-brand-300 font-semibold">{m.subject}</p>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
