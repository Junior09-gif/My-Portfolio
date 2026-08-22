import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, ContactMessage } from "../types";
import { Mail, Github, Linkedin, Send, Check, Copy, MapPin, Phone, Instagram, ShieldCheck } from "lucide-react";

interface ContactProps {
  profile: UserProfile;
  messages: ContactMessage[];
  onAddMessage: (m: ContactMessage) => void;
}

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Contact({ profile, messages, onAddMessage }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

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
      onAddMessage({ name: form.name, email: form.email, subject: form.subject || "No Subject", message: form.message, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
      setSending(false); setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1400);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "0.75rem",
    padding: "0.65rem 1rem",
    fontSize: "0.875rem",
    color: "#F5F5F7",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "var(--font-sans)",
  };

  return (
    <section id="contact" className="section relative" style={{ background: "#0A0A0F" }}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Header */}
        <motion.div {...inView()} className="mb-16">
          <p className="label mb-3">Contact</p>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#F5F5F7", letterSpacing: "-0.02em" }}
          >
            Let's work together
          </h2>
          <p className="mt-3" style={{ fontSize: "0.95rem", color: "#86868B", maxWidth: "28rem" }}>
            Open to internships, IT roles, and collaborative projects. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left */}
          <motion.div {...inView(0.1)} className="lg:col-span-4 space-y-6">

            {/* Contact cards */}
            {[
              { icon: Mail, label: "Email", value: profile.email, action: copyEmail, actionIcon: copied ? <Check className="w-3.5 h-3.5" style={{ color: "#30D158" }} /> : <Copy className="w-3.5 h-3.5" /> },
              { icon: MapPin, label: "Location", value: profile.location, action: null, actionIcon: null },
              ...(profile.phone1 ? [{ icon: Phone, label: "Phone", value: profile.phone1, action: null, actionIcon: null }] : []),
            ].map(({ icon: Icon, label, value, action, actionIcon }) => (
              <div
                key={label}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: "rgba(10,132,255,0.08)", color: "#0A84FF" }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="mono-tag">{label}</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#F5F5F7" }}>{value}</p>
                  </div>
                </div>
                {action && (
                  <button
                    onClick={action}
                    className="p-1.5 rounded-lg cursor-pointer transition-colors"
                    style={{ color: "#515154", background: "none", border: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F7")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#515154")}
                  >
                    {actionIcon}
                  </button>
                )}
              </div>
            ))}

            {/* Socials */}
            <div>
              <p className="mono-tag mb-3">Find me online</p>
              <div className="flex gap-2">
                {[
                  { icon: Github, label: "GitHub", href: profile.githubUrl },
                  { icon: Linkedin, label: "LinkedIn", href: profile.linkedinUrl },
                  ...(profile.instagram ? [{ icon: Instagram, label: "Instagram", href: `https://instagram.com/${profile.instagram.replace(/^@/, "")}` }] : []),
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#86868B",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = "#86868B";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...inView(0.15)} className="lg:col-span-8">
            <div
              className="rounded-2xl p-7"
              style={{ background: "#141420", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mono-tag block mb-1.5">Your Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="e.g. Ama Serwaa"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(10,132,255,0.4)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div>
                    <label className="mono-tag block mb-1.5">Email Address *</label>
                    <input
                      name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="ama@gmail.com"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(10,132,255,0.4)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                </div>

                <div>
                  <label className="mono-tag block mb-1.5">Subject</label>
                  <input
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder="e.g. Internship enquiry"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(10,132,255,0.4)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                <div>
                  <label className="mono-tag block mb-1.5">Message *</label>
                  <textarea
                    name="message" required value={form.message} onChange={handleChange} rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(10,132,255,0.4)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(48,209,88,0.08)", border: "1px solid rgba(48,209,88,0.2)" }}
                    >
                      <ShieldCheck className="w-5 h-5 flex-shrink-0" style={{ color: "#30D158" }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#30D158" }}>Message sent!</p>
                        <p className="text-xs mt-0.5" style={{ color: "#86868B" }}>I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                      style={{ background: sending ? "#005BBB" : "#0A84FF" }}
                      whileHover={{ background: "#409CFF" } as never}
                    >
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
                <div
                  className="mt-6 pt-5 space-y-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="mono-tag">Inbox ({messages.length})</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl space-y-1"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold" style={{ color: "#F5F5F7" }}>{m.name}</span>
                          <span className="text-xs" style={{ color: "#515154", fontFamily: "var(--font-mono)" }}>{m.timestamp}</span>
                        </div>
                        <p className="text-xs" style={{ color: "#0A84FF" }}>{m.subject}</p>
                        <p className="text-xs line-clamp-2" style={{ color: "#86868B" }}>{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
