import { X, Printer, Download, GraduationCap, Briefcase, Shield, Award, MapPin, Mail, Phone, Globe } from "lucide-react";
import { UserProfile } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export default function ResumeModal({ isOpen, onClose, profile }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/90 backdrop-blur-xs flex justify-center items-center p-4">
      {/* Container holding Resume Box */}
      <div className="relative w-full max-w-4xl bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[90vh] print:h-auto print:border-none print:shadow-none animate-in scale-in duration-200">
        
        {/* Action Toolbars (Hidden on Print) */}
        <div className="flex justify-between items-center px-6 py-4 bg-navy-900 border-b border-navy-800 text-white flex-shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-brand-500/15 rounded-lg text-brand-400">
              <Award className="w-4 h-4" />
            </span>
            <span className="font-display font-bold text-sm">Pre-formatted Applicant Resume</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-800 hover:bg-navy-750 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Resume</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-navy-800 rounded-lg text-navy-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Paper Area (Can be scrolled on-screen, completely layout-friendly) */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white flex-grow font-sans text-sm tracking-normal underline-offset-4 print:overflow-visible" id="resume_paper_content">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Header / Name Block */}
            <div className="text-center sm:text-left sm:flex justify-between items-start border-b border-gray-200 pb-6">
              <div>
                <h1 className="text-3xl font-display font-extrabold text-navy-950 tracking-tight">{profile.fullName}</h1>
                <p className="text-sm font-semibold text-brand-600 mt-1 font-display tracking-tight">Information Technology Specialist | Creative Website Designer | Cyber Security Enthusiast</p>
                <p className="text-xs text-gray-500 italic mt-0.5">Pursuing BSc. IT at KNUST, Kumasi</p>
              </div>

              {/* Direct applicant markers */}
              <div className="mt-4 sm:mt-0 text-xs text-gray-600 space-y-1 sm:text-right font-mono flex-shrink-0">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-navy-600" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-navy-600" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-navy-600" />
                  <span>github.com/kingslayer5543</span>
                </div>
              </div>
            </div>

            {/* Profile Summary statement */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Professional Statement</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Passionate and solution-oriented Information Technology undergraduate student at Kwame Nkrumah University of Science and Technology. Equipped with robust foundational abilities in computer desktop automation (Python), responsive interface engineering, client/server networking protocols, and basic cybersecurity baselines. Committed to building practical computing applications that mitigate software system vulnerabilities and thwart cybercrime frameworks.
              </p>
            </div>

            {/* Academic history */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Education Background</h3>
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-navy-950 text-base flex items-center gap-1.5 leading-none">
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    BSc. Information Technology
                  </h4>
                  <p className="text-xs text-gray-600 font-medium mt-1">Kwame Nkrumah University of Science and Technology (KNUST)</p>
                  <p className="text-xs text-gray-500 mt-1">Focusing on computing topologies, databases, client-side web technologies, and security audits.</p>
                </div>
                <span className="text-xs font-semibold text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded-md flex-shrink-0">2026 - Present</span>
              </div>
            </div>

            {/* Skills grid section formatted for resume templates */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Core Capabilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>Python Programming</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>Hypertext Markup (HTML)</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>Cascading Styles (CSS)</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>JavaScript Logic Development</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>IPv4 Subnetting & Routing</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <strong>Cybersecurity Baselines</strong>
                </div>
              </div>
            </div>

            {/* Projects resume bullet lists */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-1">Select Laboratory Deliverables</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Personal Portfolio Platform</h4>
                  <p className="text-xs text-gray-500 italic">Core Dev, Frontend Layout | Tech: HTML, CSS, React, Customizers</p>
                  <ul className="list-disc list-inside text-xs text-gray-650 mt-1 pl-1 space-y-0.5">
                    <li>Designed an adaptive interface utilizing custom styling blocks and responsive grid systems.</li>
                    <li>Integrated real-time workspace preview controllers to support on-demand template customization.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm">In-shell Python Calculators</h4>
                  <p className="text-xs text-gray-505 italic">Software Engineer | Tech: Python, Regex Solvers, React Prototypes</p>
                  <ul className="list-disc list-inside text-xs text-gray-650 mt-1 pl-1 space-y-0.5">
                    <li>Built an arithmetic parsing module capable of resolving equations with proper operators.</li>
                    <li>Designed validation logs in user interfaces to catch dividing deviations and division/NaN syntax errors.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Computer Subnet Addressing Project</h4>
                  <p className="text-xs text-gray-505 italic">Network Architect | Tech: Binary Conversion, CIDR Formulas</p>
                  <ul className="list-disc list-inside text-xs text-gray-650 mt-1 pl-1 space-y-0.5">
                    <li>Created IPv4 CIDR conversion algorithms mapping binary masks directly from selection parameters.</li>
                    <li>Outputs network addresses, broadcast boundaries, and exact usable node counts instantly with zero server latency.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Declaration signatures */}
            <div className="border-t border-gray-250 pt-6 mt-8">
              <p className="text-[11px] text-gray-500 leading-normal text-center italic">
                Verified candidate track. Generated for BSc. Information Technology academic review board, KNUST.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
