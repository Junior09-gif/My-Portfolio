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

  const go = (href: string) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  const initials = fullName.split(" ").map(w => w[0]).slice(0, 2).join("");

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(8,13,26,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

          {/* Logo */}
          <button onClick={() => go("#home")} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer" }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: 700, color: "#fff",
              boxShadow: "0 0 12px rgba(59,130,246,0.4)",
            }}>
              {initials}
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F0F4FF" }}>
              Edwin<span style={{ color: "#3B82F6" }}>.</span>dev
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }} className="hidden md:flex">
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
                    color: isActive ? "#60A5FA" : "#8FA3C8",
                    background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                    border: "none", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#F0F4FF"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#8FA3C8"; e.currentTarget.style.background = "transparent"; } }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={() => go("#contact")}
              style={{
                padding: "0.45rem 1.1rem",
                background: "#3B82F6", color: "#fff",
                borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600,
                border: "none", cursor: "pointer", transition: "all 0.2s",
                boxShadow: "0 0 16px rgba(59,130,246,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.boxShadow = "0 0 16px rgba(59,130,246,0.3)"; }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#8FA3C8", padding: "0.25rem" }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(8,13,26,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV.map(({ label, href }) => (
              <button key={label} onClick={() => go(href)} style={{
                textAlign: "left", padding: "0.6rem 0.75rem", borderRadius: "0.5rem",
                fontSize: "0.875rem", fontWeight: active === href ? 600 : 400,
                color: active === href ? "#60A5FA" : "#8FA3C8",
                background: active === href ? "rgba(59,130,246,0.1)" : "transparent",
                border: "none", cursor: "pointer",
              }}>
                {label}
              </button>
            ))}
            <button onClick={() => go("#contact")} style={{
              marginTop: "0.5rem", padding: "0.65rem",
              background: "#3B82F6", color: "#fff",
              borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600,
              border: "none", cursor: "pointer",
            }}>
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
