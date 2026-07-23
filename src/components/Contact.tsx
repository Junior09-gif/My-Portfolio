import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, ContactMessage } from "../types";
import {
  Mail, Github, Linkedin, Send, MessageSquareCode, ShieldCheck, Check,
  Copy, Clock, Terminal, Globe, MapPin, Phone, Ghost, Instagram, Music
} from "lucide-react";

interface ContactProps {
  profile: UserProfile;
  messages: ContactMessage[];
  onAddMessage: (msg: ContactMessage) => void;
}

export default function Contact({ profile, messages, onAddMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate real-world server endpoint latency
    setTimeout(() => {
      const newMsg: ContactMessage = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "No Subject Proposal",
        message: formData.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onAddMessage(newMsg);
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Automatically reset success checkmark after a few seconds to let them send another
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-navy-950 border-t border-navy-900 relative">
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2 font-semibold">Get In Touch</h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Contact Me</p>
          <div className="w-12 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Details & Social Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-white text-xl">Let's connect, collaborate, or secure algorithms.</h3>
              <p className="text-sm text-navy-300 leading-relaxed font-sans">
                I am actively seeking internship opportunities, IT support challenges, and networking solution tasks. If you are an academic director, tech recruiter, or employer focused on software safety, reach out!
              </p>
            </div>

            {/* Micro Details Cards list */}
            <div className="space-y-4">
              {/* Email clickable card */}
              <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-850 hover:border-brand-500/20 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-navy-500 block uppercase tracking-wider font-mono">My Email</span>
                    <a href={`mailto:${profile.email}`} className="text-sm text-white hover:text-brand-400 transition-colors font-medium break-all">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-navy-800 text-navy-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Geographic Region card */}
              <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-850 flex items-center gap-3.5">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-brand-400">
                  <MapPin className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <span className="text-[10px] text-navy-500 block uppercase tracking-wider font-mono">Location</span>
                  <span className="text-sm text-white font-medium">{profile.location}</span>
                </div>
              </div>

              {/* University Location Info card */}
              <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-850 flex items-center gap-3.5">
                <div className="p-2 bg-blue-500/10 rounded-lg text-brand-400">
                  <Globe className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <span className="text-[10px] text-navy-500 block uppercase tracking-wider font-mono">Primary Campus</span>
                  <span className="text-sm text-navy-300 font-medium">KNUST campus, Kumasi</span>
                </div>
              </div>

              {/* Phone Contacts card */}
              {(profile.phone1 || profile.phone2) && (
                <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-850 hover:border-brand-500/20 transition-all flex items-center gap-3.5">
                  <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400">
                    <Phone className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-navy-500 block uppercase tracking-wider font-mono">Phone Contacts</span>
                    <div className="flex gap-2.5 text-sm font-medium text-white">
                      {profile.phone1 && (
                        <a href={`tel:${profile.phone1}`} className="hover:text-brand-400 transition-colors">
                          {profile.phone1}
                        </a>
                      )}
                      {profile.phone1 && profile.phone2 && <span className="text-navy-700">|</span>}
                      {profile.phone2 && (
                        <a href={`tel:${profile.phone2}`} className="hover:text-brand-400 transition-colors">
                          {profile.phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp direct click card */}
              {profile.whatsapp && (
                <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-850 hover:border-brand-500/20 transition-all flex items-center gap-3.5">
                  <div className="p-0.5 rounded-lg overflow-hidden flex-shrink-0 bg-emerald-500/10">
                    <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5.5" fill="url(#whatsapp_card_grad)" />
                      <path
                        d="M12.012 4.5c-4.14 0-7.5 3.36-7.5 7.5 0 1.433.407 2.767 1.1 3.916L4.5 19.5l3.708-1.075c1.116.634 2.4.975 3.804.975 4.14 0 7.5-3.36 7.5-7.5s-3.36-7.5-7.5-7.5zm3.834 10.742c-.158.4-.808.75-1.108.775-.3-.008-.6-.083-1.95-.641-1.725-.709-2.834-2.459-2.917-2.575-.083-.109-.675-.9-1.325-2.009s-.425-1.958-.233-2.15c.191-.192.416-.242.558-.242s.275.008.391.017c.125.008.292-.042.459.358.166.4.575 1.392.625 1.5.05.1.083.225.016.358s-.1.225-.2.342c-.1.116-.208.258-.3.35-.1.1-.208.208-.092.408.117.200.517.85 1.109 1.375.766.684 1.408.892 1.608.992s.316.083.433-.05c.117-.134.508-.592.642-.792.133-.2.267-.167.45-.1s1.175.55 1.375.65c.2.1.333.15.383.234.05.083.05.491-.108.891z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient id="whatsapp_card_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#29D854" />
                          <stop offset="1" stopColor="#07C233" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-navy-500 block uppercase tracking-wider font-mono">WhatsApp Call/Chat</span>
                    <a
                      href={`https://wa.me/233${profile.whatsapp.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-400 hover:text-white transition-colors"
                    >
                      {profile.whatsapp} (Direct Link)
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social Icons grid */}
            <div className="pt-4">
              <span className="text-xs uppercase font-mono tracking-wider text-navy-500 block mb-3.5">Digital Handles & Networks:</span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-navy-200 hover:text-white hover:border-navy-700 transition-all font-sans text-[11px] font-semibold cursor-pointer"
                >
                  <Github className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span className="truncate">GitHub</span>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-navy-200 hover:text-white hover:border-navy-700 transition-all font-sans text-[11px] font-semibold cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </a>

                {/* Instagram */}
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-navy-200 hover:text-white hover:border-navy-700 transition-all font-sans text-[11px] font-semibold cursor-pointer"
                  >
                    <Instagram className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span className="truncate">Instagram</span>
                  </a>
                )}

                {/* Snapchat */}
                {profile.snapchat && (
                  <a
                    href={`https://snapchat.com/add/${profile.snapchat.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-navy-200 hover:text-white hover:border-navy-700 transition-all font-sans text-[11px] font-semibold cursor-pointer"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 rounded-[4px] shadow-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#FFFC00" />
                      <path
                        d="M12 5.5c-2.1 0-3.3 1.3-3.3 3 0 .5.1.8.3 1.1-.8.1-1.3.6-1.3 1.2 0 .4.2.7.5.8-.1.2-.1.4-.1.6 0 1.1 1.2 1.5 2.2 1.7.1.3.3.5.6.6-.7.4-1.3 1.1-1.3 1.9 0 .2.2.3.3.3h.3c.4 0 .9-.2 1.3-.4.4-.3.9-.6 1.6-.6s1.2.3 1.6.6c.4.2.9.4 1.3.4h.3c.2 0 .3-.1.3-.3 0-.8-.6-1.5-1.3-1.9.3-.1.5-.3.6-.6.9-.2 2.2-.6 2.2-1.7 0-.2 0-.4-.1-.6.3-.1.5-.4.5-.8 0-.6-.5-1.1-1.3-1.2.2-.3.3-.6.3-1.1 0-1.7-1.2-3-3.3-3z"
                        fill="white"
                        stroke="black"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="truncate">Snapchat</span>
                  </a>
                )}

                {/* TikTok */}
                {profile.tiktok && (
                  <a
                    href={`https://tiktok.com/@${profile.tiktok.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-navy-200 hover:text-white hover:border-navy-700 transition-all font-sans text-[11px] font-semibold col-span-2 cursor-pointer justify-center"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="11" fill="black" />
                      {/* Cyan offset note */}
                      <path d="M12.3 6.3v7.2c0 1.25-1 2.25-2.25 2.25s-2.25-1-2.25-2.25 1-2.25 2.25-2.25c.3 0 .6.06.86.17V9.1c-.27-.05-.54-.08-.86-.08-2.29 0-4.15 1.76-4.15 4.05s1.86 4.05 4.15 4.05 4.15-1.76 4.15-4.05V9.45c.81.58 1.8 1 2.88 1v-2.16c-.81 0-1.56-.31-2.16-.9-.396-.396-.657-.918-.711-1.485h-1.809z" fill="#00f2fe" />
                      {/* Red offset note */}
                      <path d="M12.7 6.7v7.2c0 1.25-1 2.25-2.25 2.25s-2.25-1-2.25-2.25 1-2.25 2.25-2.25c.3 0 .6.06.86.17V9.5c-.27-.05-.54-.08-.86-.08-2.29 0-4.15 1.76-4.15 4.05s1.86 4.05 4.15 4.05 4.15-1.76 4.15-4.05V9.85c.81.58 1.8 1 2.88 1V8.68c-.81 0-1.56-.31-2.16-.9-.396-.396-.657-.918-.711-1.485H12.7z" fill="#fe2c55" />
                      {/* White note */}
                      <path d="M12.5 6.5v7.2c0 1.25-1 2.25-2.25 2.25s-2.25-1-2.25-2.25 1-2.25 2.25-2.25c.3 0 .6.06.86.17v-2.1c-.27-.05-.54-.08-.86-.08-2.29 0-4.15 1.76-4.15 4.05s1.86 4.05 4.15 4.05 4.15-1.76 4.15-4.05V9.65c.81.58 1.8 1 2.88 1V8.42c-.81 0-1.56-.31-2.16-.9-.396-.396-.657-.918-.711-1.485h-1.809z" fill="white" stroke="white" strokeWidth="0.1" />
                    </svg>
                    <span>TikTok ({profile.tiktok})</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Form with Live local feedback (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/50 border border-navy-800 shadow-xl">
              <div className="flex items-center justify-between border-b border-navy-850 pb-4 mb-6">
                <div className="flex items-center gap-2 font-display text-white font-bold text-sm">
                  <Mail className="w-5 h-5 text-brand-400" />
                  <span>Send a Message</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded-md border border-emerald-900/30">
                  GET IN TOUCH
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-navy-400 mb-1.5 uppercase tracking-wide">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ama Serwaa"
                      className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-navy-400 mb-1.5 uppercase tracking-wide">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ama@gmail.com"
                      className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-navy-400 mb-1.5 uppercase tracking-wide">Subject Line</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Internship Proposal / Project Hire"
                    className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-navy-400 mb-1.5 uppercase tracking-wide">Message Content</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Write details of your inquiries, suggestions, or greetings here..."
                    className="w-full bg-navy-950 border border-navy-800 focus:border-brand-500 focus:outline-hidden rounded-xl p-4 text-sm text-white resize-none"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <strong className="block text-sm">Message Sent Successfully!</strong>
                        <span className="opacity-80">Thank you for reaching out. I will get back to you as soon as possible!</span>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-500 disabled:bg-brand-800 text-white rounded-xl text-center font-semibold text-sm tracking-wide shadow-md hover:shadow-brand-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin"></div>
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  )}
                </AnimatePresence>
              </form>

              {/* Memory Review Logs segment for client test confirmation */}
              {messages.length > 0 && (
                <div className="border-t border-navy-850 pt-6 mt-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-navy-500 uppercase tracking-widest mb-3.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-400" />
                    <span>Submitted Messages ({messages.length})</span>
                  </div>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {messages.map((m, idx) => (
                      <div key={idx} className="p-3 bg-navy-950 rounded-xl border border-navy-850 space-y-1.5 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white font-bold">{m.name} <span className="text-navy-450 font-normal">({m.email})</span></span>
                          <span className="text-brand-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {m.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-brand-300">Sub: {m.subject}</p>
                        <p className="text-xs text-navy-400 line-clamp-3 leading-relaxed font-sans mt-0.5">{m.message}</p>
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
