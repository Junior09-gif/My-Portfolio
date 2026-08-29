import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps { fullName: string; }

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Cyber Lab", href: "#cyber-lab" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ fullName }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ href }) => { const el = document.querySelector(href); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const initials = fullName.split(" ").map(w => w[0]).slice(0, 2).join("");

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(9,13,22,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #1e293b" : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.75rem" }}>

          {/* Logo */}
          <button onClick={() => go("#home")}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer" }}>
            <div style={{
              width: "1.9rem", height: "1.9rem", borderRadius: "0.4rem",
              background: "#2563eb", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.65rem", fontWeight: 700, fontFamily: "var(--font-mono)",
            }}>
              {initials}
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#f1f5f9", fontFamily: "var(--font-mono)" }}>
              edwin<span style={{ color: "#2563eb" }}>.dev</span>
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }} className="hidden md:flex">
            {NAV.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button key={label} onClick={() => go(href)}
                  style={{
                    padding: "0.35rem 0.8rem", borderRadius: "0.4rem",
                    fontSize: "0.825rem", fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#f1f5f9" : "#475569",
                    background: isActive ? "rgba(37,99,235,0.1)" : "transparent",
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#94a3b8"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#475569"; } }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <button onClick={() => go("#contact")}
              style={{
                padding: "0.4rem 1rem",
                background: "#2563eb", color: "#fff",
                borderRadius: "0.4rem", fontSize: "0.825rem", fontWeight: 600,
                border: "none", cursor: "pointer", transition: "background 0.2s",
                fontFamily: "var(--font-mono)", letterSpacing: "0.03em",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1d4ed8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2563eb")}
            >
              Hire Me
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", padding: "0.25rem" }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "rgba(9,13,22,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid #1e293b" }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0.65rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {NAV.map(({ label, href }) => (
              <button key={label} onClick={() => go(href)}
                style={{
                  textAlign: "left", padding: "0.55rem 0.75rem", borderRadius: "0.4rem",
                  fontSize: "0.875rem", fontWeight: active === href ? 600 : 400,
                  color: active === href ? "#f1f5f9" : "#475569",
                  background: active === href ? "rgba(37,99,235,0.1)" : "transparent",
                  border: "none", cursor: "pointer",
                }}
              >{label}</button>
            ))}
            <button onClick={() => go("#contact")}
              style={{ marginTop: "0.4rem", padding: "0.6rem", background: "#2563eb", color: "#fff", borderRadius: "0.4rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
