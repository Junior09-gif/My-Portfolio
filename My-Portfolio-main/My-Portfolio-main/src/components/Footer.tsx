import { Github, Mail, ArrowUp, FileText, Linkedin } from "lucide-react";

interface FooterProps { fullName: string; onOpenResume: () => void; }

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
    <footer style={{ background: "#0d1120", borderTop: "1px solid #1e293b", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem 1.75rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.35rem", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-mono)" }}>BK</div>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)" }}>edwin<span style={{ color: "#2563eb" }}>.dev</span></span>
            </div>
            <p style={{ fontSize: "0.825rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: "16rem" }}>IT student at KNUST building real-world software and exploring cybersecurity.</p>
            <div style={{ display: "flex", gap: "0.45rem" }}>
              {[
                { icon: Mail, href: "mailto:kingslayer5543@gmail.com" },
                { icon: Github, href: "https://github.com/Junior09-gif" },
                { icon: Linkedin, href: "https://linkedin.com/in/boadu-kofi-junior-edwin" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "0.4rem", background: "transparent", color: "#475569", border: "1px solid #1e293b", borderRadius: "0.4rem", transition: "all 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; (e.currentTarget as HTMLElement).style.borderColor = "#263347"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; }}
                >
                  <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {NAV.map(({ label, href }) => (
                <button key={label} onClick={() => scroll(href)}
                  style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", color: "#94a3b8", transition: "color 0.15s", padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                >{label}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="mono-tag" style={{ marginBottom: "0.75rem" }}>Quick Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <button onClick={onOpenResume}
                style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 0.85rem", background: "rgba(37,99,235,0.08)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.18)", borderRadius: "0.4rem", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,99,235,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,99,235,0.08)")}
              >
                <FileText style={{ width: "0.8rem", height: "0.8rem" }} />View Résumé
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 0.85rem", background: "transparent", color: "#475569", border: "1px solid #1e293b", borderRadius: "0.4rem", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "all 0.18s" }}
                onMouseEnter={e => { (e.currentTarget.style.color = "#f1f5f9"); (e.currentTarget.style.borderColor = "#263347"); }}
                onMouseLeave={e => { (e.currentTarget.style.color = "#475569"); (e.currentTarget.style.borderColor = "#1e293b"); }}
              >
                <ArrowUp style={{ width: "0.8rem", height: "0.8rem" }} />Back to Top
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.6rem", paddingTop: "1.25rem", borderTop: "1px solid #1e293b" }}>
          <p style={{ fontSize: "0.75rem", color: "#475569", fontFamily: "var(--font-mono)" }}>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
          <p style={{ fontSize: "0.75rem", color: "#475569", fontFamily: "var(--font-mono)" }}>BSc. IT · KNUST, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
