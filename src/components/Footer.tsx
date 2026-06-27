import { Shield, FileText, ArrowUp } from "lucide-react";

interface FooterProps {
  fullName: string;
  onOpenResume: () => void;
}

export default function Footer({ fullName, onOpenResume }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 border-t border-navy-900 py-12 relative overflow-hidden" id="app_footer">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Brand text */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-brand-600/10 border border-brand-500/20 rounded-lg text-brand-400">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-display font-medium text-sm text-navy-200">
            <span className="font-bold text-white text-brand-400">{fullName}</span> | IT Portfolio
          </span>
        </div>

        {/* Navigation / Actions section */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-navy-400 font-mono">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-md hover:bg-brand-500/20 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Resume (Printable)</span>
          </button>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 px-2.5 py-1 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Scroll to Top</span>
          </button>
        </div>

        {/* Copyright notice */}
        <div className="text-center md:text-right text-xs text-navy-500 font-mono">
          <p>© {new Date().getFullYear()} {fullName.split(" ").slice(0, 2).join(" ")}. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
