import { Github, Mail, ArrowUp, FileText, Linkedin } from "lucide-react";

interface FooterProps {
  fullName: string;
  onOpenResume: () => void;
}

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Cyber Lab", href: "#cyber-lab" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ fullName, onOpenResume }: FooterProps) {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#F9FAFB", borderTop: "1px solid #E5E7EB" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: "2rem", height: "2rem", borderRadius: "0.5rem",
                background: "#2563EB", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700,
              }}>
                BK
              </div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
                Edwin<span style={{ color: "#2563EB" }}>.</span>dev
              </span>
            </div>
            <p style={{ fontSize: "0.825rem", color: "#6B7280", lineHeight: 1.65, maxWidth: "16rem" }}>
              IT student at KNUST building real-world software and exploring cybersecurity.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[
                { icon: Mail, href: `mailto:kingslayer5543@gmail.com` },
                { icon: Github, href: "https://github.com/Junior09-gif" },
                { icon: Linkedin, href: "https://linkedin.com/in/boadu-kofi-junior-edwin" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.45rem",
                    background: "#fff", color: "#6B7280",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.45rem",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#2563EB"; (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#6B7280"; (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; }}
                >
                  <Icon style={{ width: "0.9rem", height: "0.9rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mono-tag" style={{ marginBottom: "0.85rem" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {NAV.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scroll(href)}
                  style={{
                    textAlign: "left", background: "none", border: "none",
                    cursor: "pointer", fontSize: "0.875rem", color: "#6B7280",
                    transition: "color 0.15s", padding: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#111827")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p className="mono-tag" style={{ marginBottom: "0.85rem" }}>Quick Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                onClick={onOpenResume}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.55rem 0.9rem",
                  background: "#EFF6FF", color: "#2563EB",
                  border: "1px solid #BFDBFE",
                  borderRadius: "0.5rem",
                  fontSize: "0.825rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#DBEAFE")}
                onMouseLeave={e => (e.currentTarget.style.background = "#EFF6FF")}
              >
                <FileText style={{ width: "0.85rem", height: "0.85rem" }} />
                View Résumé
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.55rem 0.9rem",
                  background: "#fff", color: "#6B7280",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.5rem",
                  fontSize: "0.825rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget.style.color = "#111827"); (e.currentTarget.style.borderColor = "#D1D5DB"); }}
                onMouseLeave={e => { (e.currentTarget.style.color = "#6B7280"); (e.currentTarget.style.borderColor = "#E5E7EB"); }}
              >
                <ArrowUp style={{ width: "0.85rem", height: "0.85rem" }} />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem",
          paddingTop: "1.5rem", borderTop: "1px solid #E5E7EB",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
            BSc. Information Technology · KNUST, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
