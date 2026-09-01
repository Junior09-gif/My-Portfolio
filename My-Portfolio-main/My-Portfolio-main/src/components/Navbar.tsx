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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    NAV.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(9,13,22,0.95)" : "rgba(9,13,22,0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "#1e293b" : "rgba(30,41,59,0.3)"}`,
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

            {/* ── Logo ── */}
            <button onClick={() => go("#home")} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "none", border: "none", cursor: "pointer",
              textDecoration: "none",
            }}>
              <span style={{
                fontSize: "0.9rem", fontWeight: 800, color: "#f1f5f9",
                fontFamily: "var(--font-mono)", letterSpacing: "-0.02em",
              }}>
                edwin<span style={{ color: "#2563eb" }}>.dev</span>
              </span>
            </button>

            {/* ── Desktop nav ── */}
            {!isMobile && (
              <div style={{
                display: "flex", alignItems: "center",
                gap: "0.1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #1e293b",
                borderRadius: "0.6rem",
                padding: "0.25rem",
              }}>
                {NAV.map(({ label, href }) => {
                  const isActive = active === href;
                  return (
                    <button key={label} onClick={() => go(href)} style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "0.45rem",
                      fontSize: "0.8rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#f1f5f9" : "#475569",
                      background: isActive ? "#1e293b" : "transparent",
                      border: "none", cursor: "pointer",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#94a3b8"; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#475569"; }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Right side ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

              {/* Hire Me CTA */}
              {!isMobile && (
                <button onClick={() => go("#contact")} style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.45rem 1.1rem",
                  background: "#2563eb", color: "#fff",
                  borderRadius: "0.45rem",
                  fontSize: "0.8rem", fontWeight: 700,
                  border: "none", cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  boxShadow: "0 0 16px rgba(37,99,235,0.3)",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1d4ed8";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(37,99,235,0.5)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#2563eb";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(37,99,235,0.3)";
                  }}
                >
                  Hire Me
                </button>
              )}

              {/* Mobile hamburger */}
              {isMobile && (
                <button onClick={() => setOpen(!open)} style={{
                  padding: "0.4rem",
                  background: open ? "#1e293b" : "transparent",
                  border: "1px solid #1e293b",
                  borderRadius: "0.4rem",
                  cursor: "pointer", color: "#94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}>
                  {open
                    ? <X style={{ width: "1.1rem", height: "1.1rem" }} />
                    : <Menu style={{ width: "1.1rem", height: "1.1rem" }} />
                  }
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isMobile && open && (
          <div style={{
            background: "rgba(9,13,22,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid #1e293b",
          }}>
            <div style={{
              maxWidth: "72rem", margin: "0 auto",
              padding: "1rem 1.5rem 1.25rem",
              display: "flex", flexDirection: "column", gap: "0.25rem",
            }}>
              {NAV.map(({ label, href }) => {
                const isActive = active === href;
                return (
                  <button key={label} onClick={() => go(href)} style={{
                    textAlign: "left", padding: "0.65rem 0.85rem",
                    borderRadius: "0.45rem", fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#f1f5f9" : "#94a3b8",
                    background: isActive ? "rgba(37,99,235,0.1)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(37,99,235,0.2)" : "transparent"}`,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {label}
                  </button>
                );
              })}

              <div style={{ height: "1px", background: "#1e293b", margin: "0.5rem 0" }} />

              <button onClick={() => go("#contact")} style={{
                padding: "0.7rem",
                background: "#2563eb", color: "#fff",
                borderRadius: "0.45rem",
                fontSize: "0.875rem", fontWeight: 700,
                border: "none", cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}>
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
