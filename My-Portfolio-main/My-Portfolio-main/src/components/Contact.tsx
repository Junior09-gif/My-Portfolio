import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, ContactMessage } from "../types";
import { Mail, MapPin, Phone, Send, Check, Copy, Github, Linkedin, ShieldCheck } from "lucide-react";

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
    setCopied(true); setTimeout(() => setCopied(false), 2000);
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

  return (
    <section id="contact" className="section" style={{ background: "rgba(8,13,26,0.9)", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3.5rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Contact</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em" }}>Let's work together</h2>
          <p style={{ fontSize: "0.95rem", color: "#8FA3C8", marginTop: "0.5rem", maxWidth: "28rem" }}>Open to internships, IT roles, and collaborative projects.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>

          {/* Info */}
          <motion.div {...inView(0.1)} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {[
              { icon: Mail, label: "Email", value: profile.email, action: copyEmail },
              { icon: MapPin, label: "Location", value: profile.location, action: null },
              ...(profile.phone1 ? [{ icon: Phone, label: "Phone", value: profile.phone1, action: null }] : []),
            ].map(({ icon: Icon, label, value, action }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ padding: "0.45rem", background: "rgba(59,130,246,0.1)", borderRadius: "0.45rem", color: "#60A5FA" }}><Icon style={{ width: "0.9rem", height: "0.9rem" }} /></div>
                  <div>
                    <p className="mono-tag">{label}</p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#F0F4FF", marginTop: "0.1rem" }}>{value}</p>
                  </div>
                </div>
                {action && (
                  <button onClick={action} style={{ background: "none", border: "none", cursor: "pointer", color: "#4A5F80", padding: "0.2rem" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F0F4FF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#4A5F80")}
                  >
                    {copied ? <Check style={{ width: "0.85rem", height: "0.85rem", color: "#22C55E" }} /> : <Copy style={{ width: "0.85rem", height: "0.85rem" }} />}
                  </button>
                )}
              </div>
            ))}

            <div style={{ marginTop: "0.4rem" }}>
              <p className="mono-tag" style={{ marginBottom: "0.65rem" }}>Find me online</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[{ icon: Github, label: "GitHub", href: profile.githubUrl }, { icon: Linkedin, label: "LinkedIn", href: profile.linkedinUrl }].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 0.9rem", background: "rgba(255,255,255,0.04)", color: "#8FA3C8", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.5rem", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F0F4FF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8FA3C8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <Icon style={{ width: "0.85rem", height: "0.85rem" }} />{label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...inView(0.15)}>
            <div style={{ padding: "1.75rem", background: "rgba(13,21,40,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Internship enquiry" className="input-field" />
                </div>
                <div>
                  <label className="mono-tag" style={{ display: "block", marginBottom: "0.4rem" }}>Message *</label>
                  <textarea name="message" required value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." rows={5} className="input-field" style={{ resize: "none" }} />
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <ShieldCheck style={{ width: "1rem", height: "1rem", color: "#22C55E", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#22C55E" }}>Message sent!</p>
                        <p style={{ fontSize: "0.8rem", color: "#8FA3C8", marginTop: "0.1rem" }}>I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button key="btn" type="submit" disabled={sending}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.75rem", background: sending ? "#1D4ED8" : "#3B82F6", color: "#fff", borderRadius: "0.65rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: sending ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: "0 0 20px rgba(59,130,246,0.25)" }}
                      onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#2563EB"; }}
                      onMouseLeave={e => { if (!sending) e.currentTarget.style.background = "#3B82F6"; }}
                    >
                      {sending ? <><div className="animate-spin" style={{ width: "1rem", height: "1rem", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />Sending...</> : <><Send style={{ width: "1rem", height: "1rem" }} />Send Message</>}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>

              {messages.length > 0 && (
                <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="mono-tag" style={{ marginBottom: "0.6rem" }}>Inbox ({messages.length})</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "10rem", overflowY: "auto" }}>
                    {messages.map((m, i) => (
                      <div key={i} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.6rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#F0F4FF" }}>{m.name}</span>
                          <span style={{ fontSize: "0.68rem", color: "#4A5F80", fontFamily: "var(--font-mono)" }}>{m.timestamp}</span>
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "#3B82F6", marginBottom: "0.15rem" }}>{m.subject}</p>
                        <p style={{ fontSize: "0.75rem", color: "#8FA3C8" }}>{m.message}</p>
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
