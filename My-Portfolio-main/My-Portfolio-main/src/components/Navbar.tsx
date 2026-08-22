import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps { fullName: string; }

const NAV = [
  { label: "Home",      href: "#home"      },
  { label: "About",     href: "#about"     },
  { label: "Skills",    href: "#skills"    },
  { label: "Projects",  href: "#projects"  },
  { label: "Cyber Lab", href: "#cyber-lab" },
  { label: "Contact",   href: "#contact"   },
];

export default function Navbar({ fullName }: NavbarProps) {
  const [open,    setOpen]    = useState(false);
  const [scrolled,setScrolled]= useState(false);
  const [active,  setActive]  = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  // Initials from full name
  const initials = fullName.split(" ").map(w => w[0]).slice(0, 2).join("");

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => go("#home")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#0A84FF", fontFamily: "var(--font-sans)" }}
            >
              {initials}
            </div>
            <span className="text-sm font-semibold" style={{ color: "#F5F5F7" }}>
              Edwin<span style={{ color: "#0A84FF" }}>.</span>dev
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button
                  key={label}
                  onClick={() => go(href)}
                  className="relative px-3.5 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive ? "#F5F5F7" : "#86868B",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => go("#contact")}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-all duration-200"
              style={{ background: "#0A84FF" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#409CFF")}
              onMouseLeave={e => (e.currentTarget.style.background = "#0A84FF")}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: "#86868B" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            background: "rgba(10,10,15,0.96)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 py-4 space-y-1">
            {NAV.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => go(href)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                style={{
                  color: active === href ? "#F5F5F7" : "#86868B",
                  background: active === href ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                {label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => go("#contact")}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer"
                style={{ background: "#0A84FF" }}
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
