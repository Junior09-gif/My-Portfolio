import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Download, Terminal, Network, Shield, FileText } from "lucide-react";
import { profile } from "../data";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

interface Props {
  onOpenTerminal?: () => void;
  onOpenSubnet?: () => void;
  onOpenResume?: () => void;
  onOpenCyberToolkit?: () => void;
}

export default function Navbar({ onOpenTerminal, onOpenSubnet, onOpenResume, onOpenCyberToolkit }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1000);
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
      background: scrolled ? "rgba(10,15,30,0.95)" : "rgba(10,15,30,0.6)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${scrolled ? "rgba(30,41,59,0.8)" : "rgba(30,41,59,0.3)"}`,
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#e2e8f0", fontFamily: "var(--font-mono)" }}>
            eii<span style={{ color: "#06b6d4" }}>.jnr</span>
          </span>
          <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "#22c55e", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", padding: "0.1rem 0.4rem", borderRadius: "999px" }}>
            KNUST IT
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
                  color: isActive ? "#22d3ee" : "#94a3b8",
                  background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#e2e8f0"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#64748b"; }}
                >{label}</button>
              );
            })}
          </div>
        )}

        {/* Right CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          
          {/* Quick Terminal Trigger button */}
          {onOpenTerminal && !isMobile && (
            <button
              onClick={onOpenTerminal}
              title="Launch Cyber Terminal"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.35rem 0.75rem", background: "rgba(6,182,212,0.08)",
                color: "#22d3ee", border: "1px solid rgba(6,182,212,0.25)",
                borderRadius: "0.4rem", fontSize: "0.78rem", fontWeight: 600,
                fontFamily: "var(--font-mono)", cursor: "pointer",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,0.08)"; }}
            >
              <Terminal style={{ width: "0.85rem", height: "0.85rem" }} />
              <span>CLI</span>
            </button>
          )}

          {/* Subnet Calc Trigger button */}
          {onOpenSubnet && !isMobile && (
            <button
              onClick={onOpenSubnet}
              title="IPv4 Subnet Calculator"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.35rem 0.75rem", background: "#0a0f1e",
                color: "#cbd5e1", border: "1px solid #1e293b",
                borderRadius: "0.4rem", fontSize: "0.78rem", fontWeight: 500,
                fontFamily: "var(--font-mono)", cursor: "pointer",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"; e.currentTarget.style.color = "#22d3ee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#cbd5e1"; }}
            >
              <Network style={{ width: "0.85rem", height: "0.85rem", color: "#06b6d4" }} />
              <span>Subnet</span>
            </button>
          )}

          {!isMobile && (
            <button
              onClick={() => onOpenResume ? onOpenResume() : null}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.4rem 0.95rem", background: "#06b6d4", color: "#fff",
                borderRadius: "0.4rem", fontSize: "0.8rem", fontWeight: 600,
                border: "none", cursor: "pointer", textDecoration: "none",
                transition: "background 0.2s",
                boxShadow: "0 0 15px rgba(6,182,212,0.25)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0891b2")}
              onMouseLeave={e => (e.currentTarget.style.background = "#06b6d4")}
            >
              <FileText style={{ width: "0.8rem", height: "0.8rem" }} />
              Resume CV
            </button>
          )}

          {isMobile && (
            <button onClick={() => setOpen(!open)} style={{
              padding: "0.45rem", background: open ? "#1e293b" : "transparent",
              border: "1px solid #1e293b", borderRadius: "0.4rem",
              cursor: "pointer", color: "#94a3b8",
              display: "flex", alignItems: "center",
            }}>
              {open ? <X style={{ width: "1.15rem", height: "1.15rem" }} /> : <Menu style={{ width: "1.15rem", height: "1.15rem" }} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "rgba(10,15,30,0.98)", backdropFilter: "blur(20px)",
              borderTop: "1px solid #1e293b",
            }}
          >
            <div style={{ padding: "1rem 1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.5rem" }}>
                {onOpenTerminal && (
                  <button
                    onClick={() => { setOpen(false); onOpenTerminal(); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                      padding: "0.6rem", background: "rgba(6,182,212,0.1)", color: "#22d3ee",
                      border: "1px solid rgba(6,182,212,0.3)", borderRadius: "0.45rem",
                      fontSize: "0.8rem", fontFamily: "var(--font-mono)", cursor: "pointer",
                    }}
                  >
                    <Terminal style={{ width: "0.85rem", height: "0.85rem" }} />
                    Terminal CLI
                  </button>
                )}
                {onOpenSubnet && (
                  <button
                    onClick={() => { setOpen(false); onOpenSubnet(); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                      padding: "0.6rem", background: "#0a0f1e", color: "#e2e8f0",
                      border: "1px solid #1e293b", borderRadius: "0.45rem",
                      fontSize: "0.8rem", fontFamily: "var(--font-mono)", cursor: "pointer",
                    }}
                  >
                    <Network style={{ width: "0.85rem", height: "0.85rem", color: "#06b6d4" }} />
                    Subnet Tool
                  </button>
                )}
                {onOpenCyberToolkit && (
                  <button
                    onClick={() => { setOpen(false); onOpenCyberToolkit(); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                      padding: "0.6rem", background: "#0a0f1e", color: "#e2e8f0",
                      border: "1px solid #1e293b", borderRadius: "0.45rem",
                      fontSize: "0.8rem", fontFamily: "var(--font-mono)", cursor: "pointer",
                    }}
                  >
                    <Shield style={{ width: "0.85rem", height: "0.85rem", color: "#06b6d4" }} />
                    Cyber Toolkit
                  </button>
                )}
              </div>

              <div style={{ height: "1px", background: "#1e293b", margin: "0.5rem 0" }} />
              <button
                onClick={() => { setOpen(false); if (onOpenResume) onOpenResume(); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                  padding: "0.7rem", background: "#06b6d4", color: "#fff",
                  borderRadius: "0.45rem", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer",
                }}
              >
                <FileText style={{ width: "0.9rem", height: "0.9rem" }} />
                View Full Resume (CV)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
