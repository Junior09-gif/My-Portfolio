import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { profile } from "../data";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
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

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(10,15,30,0.94)" : "rgba(10,15,30,0.5)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${scrolled ? "#1e293b" : "rgba(30,41,59,0.4)"}`,
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.75rem" }}>

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e2e8f0", fontFamily: "var(--font-mono)" }}>
            eii<span style={{ color: "#06b6d4" }}>.jnr</span>
          </span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
            {NAV.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button key={label} onClick={() => go(href)} style={{
                  padding: "0.35rem 0.85rem", borderRadius: "0.4rem",
                  fontSize: "0.825rem", fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#22d3ee" : "#64748b",
                  background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#94a3b8"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#64748b"; }}
                >{label}</button>
              );
            })}
          </div>
        )}

        {/* Right CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {!isMobile && (
            <a href={profile.cvUrl} download
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.4rem 1rem", background: "#06b6d4", color: "#fff",
                borderRadius: "0.4rem", fontSize: "0.8rem", fontWeight: 600,
                border: "none", cursor: "pointer", textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0891b2")}
              onMouseLeave={e => (e.currentTarget.style.background = "#06b6d4")}
            >
              <Download style={{ width: "0.8rem", height: "0.8rem" }} />
              Download CV
            </a>
          )}

          {isMobile && (
            <button onClick={() => setOpen(!open)} style={{
              padding: "0.4rem", background: open ? "#1e293b" : "transparent",
              border: "1px solid #1e293b", borderRadius: "0.4rem",
              cursor: "pointer", color: "#94a3b8",
              display: "flex", alignItems: "center",
            }}>
              {open ? <X style={{ width: "1.1rem", height: "1.1rem" }} /> : <Menu style={{ width: "1.1rem", height: "1.1rem" }} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobile && open && (
        <div style={{
          background: "rgba(10,15,30,0.98)", backdropFilter: "blur(20px)",
          borderTop: "1px solid #1e293b",
        }}>
          <div style={{ padding: "1rem 1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {NAV.map(({ label, href }) => (
              <button key={label} onClick={() => go(href)} style={{
                textAlign: "left", padding: "0.65rem 0.85rem", borderRadius: "0.45rem",
                fontSize: "0.875rem", fontWeight: active === href ? 600 : 400,
                color: active === href ? "#22d3ee" : "#94a3b8",
                background: active === href ? "rgba(6,182,212,0.08)" : "transparent",
                border: active === href ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
                cursor: "pointer",
              }}>{label}</button>
            ))}
            <div style={{ height: "1px", background: "#1e293b", margin: "0.5rem 0" }} />
            <a href={profile.cvUrl} download style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
              padding: "0.7rem", background: "#06b6d4", color: "#fff",
              borderRadius: "0.45rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
            }}>
              <Download style={{ width: "0.9rem", height: "0.9rem" }} />
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
