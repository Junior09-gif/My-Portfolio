import { useState } from "react";
import { Menu, X, Shield, Terminal, Edit3, Eye, Share2, Check } from "lucide-react";

interface NavbarProps {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
  fullName: string;
}

export default function Navbar({ editMode, setEditMode, fullName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    let baseUrl = "https://ais-pre-p6s7ubg7bk6753uhksmpxk-527426969725.europe-west1.run.app";
    // If not localhost or system ports, construct clean domain URL
    if (window.location.host && !window.location.host.includes("localhost") && !window.location.host.includes("3000")) {
      baseUrl = window.location.protocol + "//" + window.location.host;
    }
    const cleanName = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const shareUrl = `${baseUrl}?ref=${cleanName}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Cyber Lab", href: "#cyber-lab" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-md border-b border-navy-900 shadow-lg" id="app_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <div className="relative group flex items-center justify-center">
              <svg className="w-9 h-9 text-brand-400 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glowing Outer Tech Ring */}
                <circle cx="50" cy="50" r="45" fill="url(#logo-bg)" stroke="url(#logo-border)" strokeWidth="3" />
                <circle cx="50" cy="50" r="39" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Monogram BKME Initials Cyber-design */}
                <path d="M32 28V72" stroke="url(#logo-accent)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M32 28H46C51 28 51 38 46 38H32M32 38H48C53 38 53 48 48 48H32" stroke="url(#logo-accent)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M52 28L66 48M52 48L66 28" stroke="#3b82f6" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 60L41 72L50 60L59 72L68 60" stroke="#f472b6" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Digital Core Node */}
                <circle cx="50" cy="50" r="3.5" fill="#10b981" />

                <defs>
                  <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#030712" />
                    <stop offset="100%" stopColor="#0b1530" />
                  </linearGradient>
                  <linearGradient id="logo-border" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="logo-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <a href="#home" className="font-display font-medium text-base tracking-tight text-white hover:text-brand-400 transition-colors flex flex-col justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-pink-400 to-emerald-400 text-sm tracking-wider font-mono">Mr. Edwin</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="font-sans text-sm font-medium text-navy-200 hover:text-brand-400 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Share Link Button */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-navy-900 text-navy-300 border-navy-800 hover:text-white hover:border-navy-700 hover:bg-navy-850"
              }`}
              title="Copy portfolio website link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Share Link"}</span>
            </button>

            {/* Live Customizer Controller Button */}
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                editMode
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                  : "bg-brand-500/10 text-brand-400 border-brand-500/30 hover:bg-brand-500/20"
              }`}
              title="Toggle Live Portfolio Editing Mode"
            >
              {editMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Mode</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize Bio</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu, Customizer button & toggler */}
          <div className="flex items-center md:hidden gap-1.5">
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-navy-900 text-navy-300 border-navy-800"
              }`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                editMode
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-brand-500/10 text-brand-400 border-brand-500/30"
              }`}
            >
              {editMode ? <Eye className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
              <span>{editMode ? "Preview" : "Edit"}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-navy-400 hover:text-white hover:bg-navy-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-navy-800 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-navy-200 hover:text-brand-400 hover:bg-navy-800 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
