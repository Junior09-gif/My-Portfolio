import { Github, Linkedin, Mail, ArrowUp, Download } from "lucide-react";
import { profile } from "../data";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#060d1a", borderTop: "1px solid #1e293b", position: "relative", zIndex: 1 }}>
      <div className="container" style={{ padding: "3rem 1.5rem 1.75rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#e2e8f0", fontFamily: "var(--font-mono)" }}>
              eii<span style={{ color: "#06b6d4" }}>.jnr</span>
            </span>
            <p style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.65, maxWidth: "16rem" }}>
              IT student at KNUST building practical software and exploring the frontiers of cybersecurity.
            </p>
            <div style={{ display: "flex", gap: "0.45rem" }}>
              {[
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  style={{ padding: "0.4rem", background: "transparent", color: "#475569", border: "1px solid #1e293b", borderRadius: "0.4rem", transition: "all 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#22d3ee"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}
                >
                  <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {NAV.map(({ label, href }) => (
                <button key={label} onClick={() => scroll(href)}
                  style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", color: "#64748b", transition: "color 0.15s", padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#e2e8f0")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>Quick Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href={profile.cvUrl} download className="btn-ghost" style={{ justifyContent: "flex-start" }}>
                <Download style={{ width: "0.825rem", height: "0.825rem" }} />Download CV
              </a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-ghost"
                style={{ justifyContent: "flex-start" }}>
                <ArrowUp style={{ width: "0.825rem", height: "0.825rem" }} />Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", paddingTop: "1.25rem", borderTop: "1px solid #1e293b" }}>
          <p style={{ fontSize: "0.75rem", color: "#334155", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} Boadu Kofi Junior Edwin (eii.jnr). All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#334155", fontFamily: "var(--font-mono)" }}>
            BSc. IT · KNUST · Kumasi, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
