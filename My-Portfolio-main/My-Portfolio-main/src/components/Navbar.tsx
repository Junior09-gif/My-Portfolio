import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { profile } from "../data";

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenSubnet: () => void;
  onOpenResume: () => void;
  onOpenCyberToolkit: () => void;
}

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
      background: scrolled ? "rgba(248,249,251,0.95)" : "rgba(248,249,251,0.8)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "#E5E7EB" : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.75rem" }}>

        {/* Logo */}
        <button onClick={() => go("#home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#171A21", letterSpacing: "-0.02em" }}>
            Edwin <span style={{ color: "#315EFB" }}>Boadu</span>
          </span>
        </button>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {NAV.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button key={label} onClick={() => go(href)} style={{
                  padding: "0.4rem 0.9rem", borderRadius: "0.45rem",
                  fontSize: "0.875rem", fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#315EFB" : "#667085",
                  background: isActive ? "#EEF2FF" : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#171A21"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#667085"; }}
                >{label}</button>
              );
            })}
          </div>
        )}

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {!isMobile && profile.cvUrl !== "#" && (
            <a href={profile.cvUrl} download className="btn-primary" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
              <Download style={{ width: "0.8rem", height: "0.8rem" }} />
              Download CV
            </a>
          )}
          {!isMobile && profile.cvUrl === "#" && (
            <button onClick={onOpenResume} className="btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}>
              View CV
            </button>
          )}

          {isMobile && (
            <button onClick={() => setOpen(!open)} style={{
              padding: "0.4rem", background: "transparent",
              border: "1px solid #E5E7EB", borderRadius: "0.4rem",
              cursor: "pointer", color: "#374151",
              display: "flex", alignItems: "center",
            }}>
              {open ? <X style={{ width: "1.1rem", height: "1.1rem" }} /> : <Menu style={{ width: "1.1rem", height: "1.1rem" }} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div key="drawer"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "#FFFFFF", borderTop: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
          >
            <div style={{ padding: "0.75rem 1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              {NAV.map(({ label, href }) => (
                <button key={label} onClick={() => go(href)} style={{
                  textAlign: "left", padding: "0.65rem 0.85rem", borderRadius: "0.45rem",
                  fontSize: "0.9rem", fontWeight: active === href ? 600 : 400,
                  color: active === href ? "#315EFB" : "#374151",
                  background: active === href ? "#EEF2FF" : "transparent",
                  border: "none", cursor: "pointer",
                }}>{label}</button>
              ))}
              <div style={{ height: "1px", background: "#E5E7EB", margin: "0.5rem 0" }} />
              <button onClick={onOpenResume} className="btn-primary" style={{ justifyContent: "center" }}>
                View CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
