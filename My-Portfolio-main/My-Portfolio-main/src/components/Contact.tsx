import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { profile } from "../data";

type FormState = "idle" | "loading" | "success" | "error";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => { const n = { ...p }; delete n[e.target.name]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1600);
  };

  return (
    <section id="contact" className="section" style={{ background: "#0a0f1e", position: "relative", zIndex: 1 }}>
      <div className="section-sep" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Contact</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Get in touch
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.5rem" }}>
            Open to internships, IT roles, collaborations, and academic projects.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>

          {/* Info */}
          <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: MapPin, label: "Location", value: "KNUST Campus, Kumasi, Ghana", href: null },
              { icon: Github, label: "GitHub", value: "Junior09-gif", href: profile.github },
              { icon: Linkedin, label: "LinkedIn", value: "boadu-kofi-junior-edwin", href: profile.linkedin },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card" style={{ padding: "0.9rem 1rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ padding: "0.45rem", background: "rgba(6,182,212,0.08)", borderRadius: "0.4rem", flexShrink: 0 }}>
                  <Icon style={{ width: "0.9rem", height: "0.9rem", color: "#06b6d4" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.15rem" }}>{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontSize: "0.875rem", fontWeight: 500, color: "#22d3ee", textDecoration: "none", wordBreak: "break-all" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#67e8f9")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#22d3ee")}
                    >{value}</a>
                    : <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0" }}>{value}</p>
                  }
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div {...inView(0.12)}>
            <div className="card" style={{ padding: "1.75rem" }}>
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 1rem", textAlign: "center" }}
                  >
                    <CheckCircle style={{ width: "2.5rem", height: "2.5rem", color: "#22c55e" }} />
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9" }}>Message received!</h3>
                    <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>Thanks for reaching out. I'll get back to you as soon as possible.</p>
                    <button className="btn-secondary" onClick={() => setFormState("idle")}>Send another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate
                    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {[
                        { name: "name", label: "Name *", type: "text", placeholder: "Ama Serwaa" },
                        { name: "email", label: "Email *", type: "email", placeholder: "ama@email.com" },
                      ].map(({ name, label, type, placeholder }) => (
                        <div key={name}>
                          <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>{label}</label>
                          <input name={name} type={type} value={form[name as keyof typeof form]}
                            onChange={handleChange} placeholder={placeholder}
                            className="input-field"
                            aria-invalid={!!errors[name]}
                            style={{ borderColor: errors[name] ? "rgba(239,68,68,0.5)" : undefined }}
                          />
                          {errors[name] && <p style={{ fontSize: "0.72rem", color: "#f87171", marginTop: "0.3rem" }}>{errors[name]}</p>}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Subject</label>
                      <input name="subject" type="text" value={form.subject} onChange={handleChange}
                        placeholder="e.g. Internship enquiry" className="input-field" />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..." rows={5}
                        className="input-field" style={{ resize: "none", borderColor: errors.message ? "rgba(239,68,68,0.5)" : undefined }}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p style={{ fontSize: "0.72rem", color: "#f87171", marginTop: "0.3rem" }}>{errors.message}</p>}
                    </div>

                    <button type="submit" disabled={formState === "loading"}
                      className="btn-primary"
                      style={{ justifyContent: "center", opacity: formState === "loading" ? 0.7 : 1, cursor: formState === "loading" ? "not-allowed" : "pointer" }}
                    >
                      {formState === "loading"
                        ? <><Loader style={{ width: "0.9rem", height: "0.9rem" }} className="animate-spin" />Sending...</>
                        : <><Send style={{ width: "0.9rem", height: "0.9rem" }} />Send Message</>
                      }
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
