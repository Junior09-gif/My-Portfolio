import { Code2, ArrowUp, FileText, Github, Mail } from "lucide-react";

interface FooterProps {
  fullName: string;
  onOpenResume: () => void;
}

export default function Footer({ fullName, onOpenResume }: FooterProps) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Cyber Lab", href: "#cyber-lab" },
    { label: "Contact", href: "#contact" },
  ];

  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-surface-900 border-t border-white/5 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-display font-bold text-white text-sm">
                Edwin<span className="text-brand-400">.</span>dev
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              IT student at KNUST building real-world software solutions and exploring cybersecurity.
            </p>
            <div className="flex gap-2">
              <a href="mailto:kingslayer5543@gmail.com"
                className="p-2 rounded-lg bg-surface-700 border border-white/6 text-slate-400 hover:text-white hover:border-white/15 transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://github.com/kingslayer5543" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-700 border border-white/6 text-slate-400 hover:text-white hover:border-white/15 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {links.map(({ label, href }) => (
                <button key={label} onClick={() => scroll(href)}
                  className="text-left text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-4">Quick Actions</p>
            <div className="space-y-2">
              <button onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full bg-brand-600/10 border border-brand-500/20 text-brand-400 hover:bg-brand-600/20 transition-colors cursor-pointer text-sm font-medium">
                <FileText className="w-4 h-4" />View Resume
              </button>
              <button onClick={scrollTop}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full bg-surface-700 border border-white/6 text-slate-400 hover:text-white hover:border-white/15 transition-colors cursor-pointer text-sm font-medium">
                <ArrowUp className="w-4 h-4" />Back to Top
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
          <p>BSc. Information Technology · KNUST, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
