import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "../data";

interface FooterProps { onOpenResume: () => void; }

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ onOpenResume }: FooterProps) {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#0B1020", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="container" style={{ padding: "3rem 1.5rem 1.75rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.02em" }}>
              Edwin <span style={{ color: "#6E8BFF" }}>Boadu</span>
            </span>
            <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, maxWidth: "16rem" }}>
              IT student at KNUST building practical software and exploring cybersecurity.
            </p>
            <div style={{ display: "flex", gap: "0.45rem" }}>
              {[
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
                { icon: Github, href: profile.github, label: "GitHub" },
                { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  style={{ padding: "0.4rem", background: "rgba(255,255,255,0.05)", color: "#64748B", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "0.4rem", transition: "all 0.18s", display: "flex" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#315EFB"; (e.currentTarget as HTMLElement).style.borderColor = "#315EFB"; (e.currentTarget as HTMLElement).style.background = "#EEF2FF"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.background = "#F6F7FB"; }}
                >
                  <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.85rem", fontWeight: 600 }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {NAV.map(({ label, href }) => (
                <button key={label} onClick={() => scroll(href)}
                  style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", color: "#64748B", transition: "color 0.15s", padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#315EFB")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.85rem", fontWeight: 600 }}>Quick Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button onClick={onOpenResume} className="btn-ghost" style={{ justifyContent: "flex-start" }}>
                View CV
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-ghost" style={{ justifyContent: "flex-start" }}>
                <ArrowUp style={{ width: "0.8rem", height: "0.8rem" }} />Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.5)" }}>
          <p style={{ fontSize: "0.8rem", color: "#64748B" }}>
            © {new Date().getFullYear()} Edwin Boadu. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#64748B", fontStyle: "italic" }}>
            Build · Learn · Grow
          </p>
        </div>
      </div>
    </footer>
  );
}




