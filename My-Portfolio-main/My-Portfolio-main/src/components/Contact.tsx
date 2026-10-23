import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, Loader } from "lucide-react";
import { profile } from "../data";

type FormState = "idle" | "loading" | "success" | "error";

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const shakeVariants = {
  idle: { x: 0 },
  shake: { x: [0, -6, 6, -4, 4, -2, 2, 0], transition: { duration: 0.4 } },
};

const FORMSPREE_URL = "https://formspree.io/f/xzzbnwvj";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs); setFormState("error");
      setTimeout(() => setFormState("idle"), 500); return;
    }
    setFormState("loading");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject || "Portfolio Contact", message: form.message }),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormState("error"); setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error"); setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: "#F8F9FB", position: "relative", zIndex: 1 }}>
      <div className="container">

        <motion.div {...inView()} style={{ marginBottom: "3.5rem", maxWidth: "40rem" }}>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Contact</p>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Let's Work Together</h2>
          <p className="section-subtitle">
            Reach out about projects, collaboration, or professional opportunities. I'm always open to connecting.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>

          {/* Info column */}
          <motion.div {...inView(0.08)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: MapPin, label: "Location", value: "KNUST Campus, Kumasi, Ghana", href: null },
              { icon: Github, label: "GitHub", value: "github.com/Junior09-gif", href: profile.github },
              { icon: Linkedin, label: "LinkedIn", value: "boadu-kofi-junior-edwin", href: profile.linkedin },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "0.9rem",
                padding: "1rem 1.1rem",
                background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.75rem",
              }}>
                <div style={{ padding: "0.5rem", background: "#EEF2FF", borderRadius: "0.5rem", flexShrink: 0 }}>
                  <Icon style={{ width: "1rem", height: "1rem", color: "#315EFB" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#9BA3AE", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.15rem" }}>{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      style={{ fontSize: "0.875rem", fontWeight: 500, color: "#315EFB", textDecoration: "none", wordBreak: "break-all" }}
                    >{value}</a>
                    : <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#171A21" }}>{value}</p>
                  }
                </div>
              </div>
            ))}

            <div style={{ padding: "1.25rem", background: "#EEF2FF", border: "1px solid #C7D7FD", borderRadius: "0.75rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#315EFB", marginBottom: "0.4rem" }}>Send a message</p>
              <p style={{ fontSize: "0.82rem", color: "#667085", lineHeight: 1.6 }}>
                Use the form or email me directly at{" "}
                <a href={`mailto:${profile.email}`} style={{ color: "#315EFB", textDecoration: "none", fontWeight: 600 }}>
                  {profile.email}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...inView(0.12)}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "0.875rem", padding: "2rem", boxShadow: "0 2px 12px rgba(23,26,33,0.05)" }}>
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 1rem", textAlign: "center" }}
                  >
                    <div style={{ width: "3rem", height: "3rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle style={{ width: "1.5rem", height: "1.5rem", color: "#16a34a" }} />
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#171A21" }}>Message sent!</h3>
                    <p style={{ fontSize: "0.875rem", color: "#667085" }}>Thanks for reaching out. I'll get back to you as soon as possible.</p>
                    <button className="btn-secondary" onClick={() => setFormState("idle")}>Send another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate
                    style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                      {[
                        { name: "name", label: "Name *", type: "text", placeholder: "Your name" },
                        { name: "email", label: "Email *", type: "email", placeholder: "your@email.com" },
                      ].map(({ name, label, type, placeholder }) => (
                        <motion.div key={name} variants={shakeVariants} animate={errors[name] ? "shake" : "idle"}>
                          <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>{label}</label>
                          <input name={name} type={type} value={form[name as keyof typeof form]}
                            onChange={handleChange} placeholder={placeholder} className="input-field"
                            aria-invalid={!!errors[name]}
                            style={{ borderColor: errors[name] ? "#ef4444" : undefined }}
                          />
                          {errors[name] && <p style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors[name]}</p>}
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Subject</label>
                      <input name="subject" type="text" value={form.subject} onChange={handleChange}
                        placeholder="e.g. Internship enquiry" className="input-field" />
                    </div>
                    <motion.div variants={shakeVariants} animate={errors.message ? "shake" : "idle"}>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.4rem" }}>Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..." rows={5}
                        className="input-field" style={{ resize: "none", borderColor: errors.message ? "#ef4444" : undefined }}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.message}</p>}
                    </motion.div>
                    <motion.button type="submit" disabled={formState === "loading"}
                      className="btn-primary"
                      style={{ justifyContent: "center", opacity: formState === "loading" ? 0.8 : 1, cursor: formState === "loading" ? "not-allowed" : "pointer" }}
                      whileHover={formState !== "loading" ? { scale: 1.02 } : {}}
                      whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                      transition={{ duration: 0.15 }}
                    >
                      {formState === "loading"
                        ? <><Loader style={{ width: "0.9rem", height: "0.9rem" }} className="animate-spin" />Sending...</>
                        : <><Send style={{ width: "0.9rem", height: "0.9rem" }} />Send Message</>
                      }
                    </motion.button>
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
