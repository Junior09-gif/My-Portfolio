import { Github, Mail, ArrowUp, FileText } from "lucide-react";

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
    <footer
      className="relative"
      style={{ background: "#0F0F17", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "#0A84FF" }}
              >
                BK
              </div>
              <span className="text-sm font-semibold" style={{ color: "#F5F5F7" }}>
                Edwin<span style={{ color: "#0A84FF" }}>.</span>dev
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#515154", lineHeight: 1.7, maxWidth: "18rem" }}>
              IT student at KNUST building real-world software and exploring cybersecurity.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Mail, href: `mailto:${encodeURIComponent("kingslayer5543@gmail.com")}` },
                { icon: Github, href: "https://github.com/kingslayer5543" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#515154",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "#515154";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mono-tag mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {NAV.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scroll(href)}
                  className="text-left text-sm transition-colors duration-200 cursor-pointer"
                  style={{ color: "#515154", background: "none", border: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F7")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#515154")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p className="mono-tag mb-4">Quick actions</p>
            <div className="space-y-2">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: "rgba(10,132,255,0.08)",
                  border: "1px solid rgba(10,132,255,0.2)",
                  color: "#0A84FF",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(10,132,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(10,132,255,0.08)")}
              >
                <FileText className="w-4 h-4" />
                View Résumé
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#515154",
                }}
                onMouseEnter={e => {
                  (e.currentTarget.style.color = "#F5F5F7");
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)");
                }}
                onMouseLeave={e => {
                  (e.currentTarget.style.color = "#515154");
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)");
                }}
              >
                <ArrowUp className="w-4 h-4" />
                Back to Top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p style={{ fontSize: "0.75rem", color: "#515154", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#515154", fontFamily: "var(--font-mono)" }}>
            BSc. Information Technology · KNUST, Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
