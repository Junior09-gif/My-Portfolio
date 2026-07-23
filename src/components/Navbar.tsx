import { useState, useEffect } from "react";
import { Menu, X, Share2, Check, Code2 } from "lucide-react";

interface NavbarProps {
  fullName: string;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Cyber Lab", href: "#cyber-lab" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ fullName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active nav item based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const url = `${window.location.origin}?ref=${cleanName}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#060810]/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
              <Code2 className="w-4 h-4 text-brand-400" />
            </div>
            <span className="font-display font-bold text-sm text-white tracking-tight">
              Edwin<span className="text-brand-400">.</span>dev
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${active === item.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                {active === item.href && (
                  <span className="absolute inset-0 rounded-lg bg-white/5" />
                )}
                {item.label}
                {active === item.href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-400" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${copied
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-surface-800 text-slate-300 border-white/10 hover:border-brand-500/40 hover:text-white"
                }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Share"}
            </button>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-lg shadow-brand-900/40"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${active === item.href
                    ? "bg-brand-500/10 text-brand-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2 rounded-lg text-xs font-semibold border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Share Link"}
              </button>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="flex-1 py-2 rounded-lg text-xs font-semibold bg-brand-600 text-white text-center"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
