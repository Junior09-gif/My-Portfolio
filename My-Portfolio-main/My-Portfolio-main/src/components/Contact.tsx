import React, { useState, ChangeEvent, FormEvent } from "react";
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

const CARD: React.CSSProperties = { background: "#0d1120", border: "1px solid #1e293b", borderRadius: "0.75rem" };

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
    <section id="contact" className="section" style={{ background: "#090d16", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Contact</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>Let's work together</h2>
          <p style={{ fontSize: "0.925rem", color: "#94a3b8", marginTop: "0.5rem" }}>Open to internships, IT roles, and collaborative projects.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>

          <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { icon: Mail, label: "Email", value: profile.email, action: copyEmail },
              { icon: MapPin, label: "Location", value: profile.location, action: null },
              ...(profile.phone1 ? [{ icon: Phone, label: "Phone", value: profile.phone1, action: null }] : []),
            ].map(({ icon: Icon, label, value, action }) => (
              <div key={label} style={{ ...CARD, padding: "0.85rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                  <div style={{ padding: "0.4rem", background: "rgba(37,99,235,0.08)", borderRadius: "0.4rem", color: "#2563eb" }}>
                    <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
                  </div>
                  <div>
                    <p className="mono-tag">{label}</p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#f1f5f9", marginTop: "0.1rem" }}>{value}</p>
                  </div>
                </div>
                {action && (
                  <button onClick={action} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "0.2rem" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                  >
                    {copied ? <Check style={{ width: "0.825rem", height: "0.825rem", color: "#2563eb" }} /> : <Copy style={{ width: "0.825rem", height: "0.825rem" }} />}
                  </button>
                )}
              </div>
            ))}

            <div style={{ marginTop: "0.35rem" }}>
              <p className="mono-tag" style={{ marginBottom: "0.6rem" }}>Find me online</p>
              <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                {[{ icon: Github, label: "GitHub", href: profile.githubUrl }, { icon: Linkedin, label: "LinkedIn", href: profile.linkedinUrl }].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.85rem", background: "transparent", color: "#475569", border: "1px solid #1e293b", borderRadius: "0.4rem", fontSize: "0.78rem", fontWeight: 500, textDecoration: "none", transition: "all 0.18s", fontFamily: "var(--font-mono)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; (e.currentTarget as HTMLElement).style.borderColor = "#263347"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}
                  >
                    <Icon style={{ width: "0.8rem", height: "0.8rem" }} />{label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...inView(0.12)}>
            <div style={{ ...CARD, padding: "1.5rem" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
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
                      style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.9rem 1rem", borderRadius: "0.5rem", background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.2)" }}>
                      <ShieldCheck style={{ width: "1rem", height: "1rem", color: "#2563eb", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9" }}>Message sent!</p>
                        <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.1rem" }}>I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <button key="btn" type="submit" disabled={sending}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.7rem", background: sending ? "#1d4ed8" : "#2563eb", color: "#fff", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: sending ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                      onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#1d4ed8"; }}
                      onMouseLeave={e => { if (!sending) e.currentTarget.style.background = "#2563eb"; }}
                    >
                      {sending ? <><div className="animate-spin" style={{ width: "0.9rem", height: "0.9rem", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />Sending...</> : <><Send style={{ width: "0.9rem", height: "0.9rem" }} />Send Message</>}
                    </button>
                  )}
                </AnimatePresence>
              </form>

              {messages.length > 0 && (
                <div style={{ marginTop: "1.1rem", paddingTop: "1.1rem", borderTop: "1px solid #1e293b" }}>
                  <p className="mono-tag" style={{ marginBottom: "0.55rem" }}>Inbox ({messages.length})</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", maxHeight: "9rem", overflowY: "auto" }}>
                    {messages.map((m, i) => (
                      <div key={i} style={{ padding: "0.65rem 0.85rem", background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f1f5f9" }}>{m.name}</span>
                          <span style={{ fontSize: "0.65rem", color: "#475569", fontFamily: "var(--font-mono)" }}>{m.timestamp}</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "#2563eb", marginBottom: "0.15rem" }}>{m.subject}</p>
                        <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{m.message}</p>
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
