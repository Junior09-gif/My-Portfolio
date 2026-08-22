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
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
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
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

          {/* Logo */}
          <button
            onClick={() => go("#home")}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.5rem",
              background: "#2563EB", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: 700,
            }}>
              {initials}
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
              Edwin<span style={{ color: "#2563EB" }}>.</span>dev
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
            {NAV.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button
                  key={label}
                  onClick={() => go(href)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#2563EB" : "#6B7280",
                    background: isActive ? "#EFF6FF" : "transparent",
                    border: "none", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#111827"; e.currentTarget.style.background = "#F9FAFB"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.background = "transparent"; } }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden md:flex">
            <button
              onClick={() => go("#contact")}
              style={{
                padding: "0.45rem 1.1rem",
                background: "#2563EB", color: "#fff",
                borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600,
                border: "none", cursor: "pointer", transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1D4ED8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2563EB")}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: "0.25rem" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => go(href)}
                style={{
                  textAlign: "left", padding: "0.6rem 0.75rem", borderRadius: "0.5rem",
                  fontSize: "0.875rem", fontWeight: active === href ? 600 : 400,
                  color: active === href ? "#2563EB" : "#6B7280",
                  background: active === href ? "#EFF6FF" : "transparent",
                  border: "none", cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              style={{
                marginTop: "0.5rem", padding: "0.65rem",
                background: "#2563EB", color: "#fff",
                borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600,
                border: "none", cursor: "pointer",
              }}
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
