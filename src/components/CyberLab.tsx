import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, ShieldAlert, Terminal, Play, Lock, Unlock, Key, 
  Search, RefreshCw, AlertTriangle, Eye, EyeOff, CheckCircle2 
} from "lucide-react";

interface PortScanResult {
  port: number;
  service: string;
  status: "open" | "secure";
  threat: string;
  remediation: string;
}

export default function CyberLab() {
  const [activeTab, setActiveTab] = useState<"scanner" | "entropy" | "cipher">("scanner");

  // --- 1. Portfolio Port Scanner Simulation ---
  const [scanTargetIp, setScanTargetIp] = useState<string>("192.168.1.102");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanResults, setScanResults] = useState<PortScanResult[]>([]);
  const [scanProgress, setScanProgress] = useState<number>(0);

  const mockPorts: PortScanResult[] = [
    { port: 21, service: "FTP", status: "open", threat: "Anonymous login allowed; unencrypted data transfer threat.", remediation: "Disable anonymous FTP, shift to SFTP on Port 22." },
    { port: 22, service: "SSH", status: "secure", threat: "Secure cryptographic terminal login.", remediation: "Reinforced with public-key sign-on. Keep restricted." },
    { port: 80, service: "HTTP", status: "open", threat: "Transmits packets in plain text. Vulnerable to sniffing attacks.", remediation: "Force SSL redirect to Encrypted HTTPS on Port 443." },
    { port: 443, service: "HTTPS", status: "secure", threat: "Encrypted secure web communication channel.", remediation: "Maintain up-to-date TLS 1.3 certificate configurations." },
    { port: 3306, service: "MySQL", status: "open", threat: "Remote connection allowed. High SQL Injection / Brute-Force risk.", remediation: "Bind to localhost 127.0.0.1 or integrate tight firewall filters." }
  ];

  const runPortScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    setScanLogs(["[sys] Initializing Portfolio Cybersecurity Scanner...", "[sys] Setting socket timeout to 2500ms..."]);

    const logs = [
      `[info] Mapping targets to address: ${scanTargetIp}`,
      "[info] Scanning standard TCP port range [21, 22, 80, 443, 3306]",
      "[probe] Sending TCP SYN requests...",
      "[alert] Unencrypted packets crawled on Port 21 (FTP)",
      "[probe] Querying SSL handshakes...",
      "[alert] Port 3306 (MySQL) reports active listening without SSL limits",
      "[sys] Generating complete defensive vulnerability assessment logs..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLogIndex]]);
        setScanProgress(Math.floor(((currentLogIndex + 1) / logs.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setScanResults(mockPorts);
        setIsScanning(false);
        setScanProgress(100);
      }
    }, 600);
  };

  // --- 2. Password Strength & Entropy Sandbox ---
  const [testPassword, setTestPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [entropyStats, setEntropyStats] = useState({
    length: 0,
    charsetSize: 0,
    entropyBits: 0,
    tier: "Extremely Weak",
    timeToCrack: "Instant",
    remediations: [] as string[]
  });

  useEffect(() => {
    const len = testPassword.length;
    if (len === 0) {
      setEntropyStats({
        length: 0,
        charsetSize: 0,
        entropyBits: 0,
        tier: "N/A",
        timeToCrack: "N/A",
        remediations: []
      });
      return;
    }

    let charset = 0;
    const rules = {
      hasLower: /[a-z]/.test(testPassword),
      hasUpper: /[A-Z]/.test(testPassword),
      hasDigit: /[0-9]/.test(testPassword),
      hasSpecial: /[^A-Z0-9a-z]/.test(testPassword)
    };

    if (rules.hasLower) charset += 26;
    if (rules.hasUpper) charset += 26;
    if (rules.hasDigit) charset += 10;
    if (rules.hasSpecial) charset += 33;

    // Shannon Entropy formula: Bits = Log2(CharsetSize ^ Length) = Length * (Log(CharsetSize) / Log(2))
    const bits = Math.round(len * (Math.log(charset) / Math.log(2)));

    // Categorize
    let tier = "Extremely Weak";
    let crackTime = "Instant";
    if (bits >= 80) {
      tier = "Strong-hold Level";
      crackTime = "Hundreds of Years";
    } else if (bits >= 60) {
      tier = "Moderate Security";
      crackTime = "A few Weeks/Months";
    } else if (bits >= 35) {
      tier = "Vulnerable";
      crackTime = "A few hours/minutes";
    }

    const recs: string[] = [];
    if (!rules.hasUpper) recs.push("Add uppercase credentials (A-Z).");
    if (!rules.hasDigit) recs.push("Integrate numerical integers (0-9).");
    if (!rules.hasSpecial) recs.push("Use special characters or symbols (e.g., #, $, @).");
    if (len < 12) recs.push("Aim for at least 12-16 characters long.");

    setEntropyStats({
      length: len,
      charsetSize: charset,
      entropyBits: bits,
      tier,
      timeToCrack: crackTime,
      remediations: recs
    });
  }, [testPassword]);

  // --- 3. Cryptography Cipher Decoder ---
  const [cryptText, setCryptText] = useState<string>("Boadu Edwin");
  const [cipherShift, setCipherShift] = useState<number>(13);
  const [cryptResult, setCryptResult] = useState<string>("");

  useEffect(() => {
    const shifted = cryptText.split("").map(char => {
      const code = char.charCodeAt(0);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + cipherShift) % 26) + 65);
      }
      // Lowercase letters
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + cipherShift) % 26) + 97);
      }
      return char; // Whitespace & punctuation remains
    }).join("");
    setCryptResult(shifted);
  }, [cryptText, cipherShift]);

  return (
    <section id="cyber-lab" className="py-24 bg-navy-950 border-t border-navy-900 relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Vulnerability Sandbox
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Cybersecurity Interactive Lab</p>
          <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-navy-400 max-w-xl mx-auto mt-3 font-sans">
            Explore interactive network security operations. Test simulated systems for vulnerabilities and check how cryptographic defenses prevent cybercrime.
          </p>
        </div>

        {/* Outer Tab Controls */}
        <div className="flex justify-center border-b border-navy-850 max-w-lg mx-auto mb-10 p-1 bg-navy-900/45 rounded-xl">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wide font-medium transition-all cursor-pointer ${
              activeTab === "scanner" 
                ? "bg-emerald-500/15 text-emerald-300 shadow-xs border border-emerald-500/20" 
                : "text-navy-400 hover:text-white"
            }`}
          >
            Vulnerability Probe
          </button>
          <button
            onClick={() => setActiveTab("entropy")}
            className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wide font-medium transition-all cursor-pointer ${
              activeTab === "entropy" 
                ? "bg-emerald-500/15 text-emerald-300 shadow-xs border border-emerald-500/20" 
                : "text-navy-400 hover:text-white"
            }`}
          >
            Credential Strength
          </button>
          <button
            onClick={() => setActiveTab("cipher")}
            className={`flex-1 py-2 rounded-lg text-xs font-mono tracking-wide font-medium transition-all cursor-pointer ${
              activeTab === "cipher" 
                ? "bg-emerald-500/15 text-emerald-300 shadow-xs border border-emerald-500/20" 
                : "text-navy-400 hover:text-white"
            }`}
          >
            Cryptography Cipher
          </button>
        </div>

        {/* Tab Contents */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* 1. Vulnerability port scanner */}
            {activeTab === "scanner" && (
              <motion.div
                key="scanner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Controller Terminal Controls (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-navy-900 border border-navy-800 p-5 rounded-2xl shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-emerald-400 text-sm font-bold">
                      <Terminal className="w-5 h-5" />
                      <span>TCP/IP Port Audit Console</span>
                    </div>
                    <p className="text-xs text-navy-300 leading-relaxed font-sans">
                      Specify an IP address inside your simulated web network to trigger deep socket audits. Discover vulnerable endpoints waiting for system patching.
                    </p>

                    <div>
                      <label className="block text-[10px] font-mono text-navy-500 uppercase mb-1">Simulated IP Target</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={scanTargetIp}
                          onChange={(e) => setScanTargetIp(e.target.value)}
                          disabled={isScanning}
                          className="flex-grow bg-navy-950 border border-navy-800 focus:border-emerald-500 focus:outline-hidden rounded-xl px-4 py-2 font-mono text-xs text-emerald-400"
                        />
                        <button
                          onClick={runPortScan}
                          disabled={isScanning}
                          className="px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Scan</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progressive Green Terminal progress logs */}
                  <div className="mt-6 bg-navy-950 border border-navy-850 rounded-xl p-4 h-48 select-none font-mono text-[10px] text-emerald-400 leading-normal overflow-y-auto space-y-1.5 flex flex-col justify-start">
                    {scanLogs.map((log, idx) => (
                      <p key={idx} className="break-all">{log}</p>
                    ))}
                    {isScanning && (
                      <div className="flex items-center gap-1.5 text-emerald-300 animate-pulse pt-2 border-t border-emerald-900/30">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>System scanning: {scanProgress}%</span>
                      </div>
                    )}
                    {scanLogs.length === 0 && (
                      <span className="text-navy-500 text-center my-auto">Press "Scan" to start the port audit emulator.</span>
                    )}
                  </div>
                </div>

                {/* Audit Vulnerability Reports (7 Cols) */}
                <div className="lg:col-span-7 bg-navy-900 border border-navy-800 p-5 rounded-2xl shadow-xl flex flex-col">
                  <h3 className="font-display font-medium text-white text-sm mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span>Audit Output Assessments</span>
                  </h3>

                  {scanResults.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-navy-800 rounded-2xl p-8 text-center text-navy-500">
                      <AlertTriangle className="w-10 h-10 text-navy-500/40 mb-3" />
                      <p className="text-xs font-semibold">Ready for active scan results</p>
                      <p className="text-[10px] opacity-75 mt-0.5">Please execute the query using the adjacent command terminal.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                      {scanResults.map((result) => (
                        <div 
                          key={result.port}
                          className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                            result.status === "open"
                              ? "bg-rose-500/5 border-rose-500/25 text-rose-300"
                              : "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold flex items-center gap-1.5 font-mono">
                              Port {result.port} <span className="opacity-80">({result.service})</span>
                            </span>
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${
                              result.status === "open"
                                ? "bg-rose-950/40 border-rose-500/30 text-rose-400"
                                : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                            }`}>
                              {result.status === "open" ? "Vulnerability Risk" : "Secure System"}
                            </span>
                          </div>
                          
                          <p className={`text-[11px] leading-relaxed font-sans ${result.status === "open" ? 'text-rose-200' : 'text-emerald-200'}`}>
                            <strong>Threat Risk:</strong> {result.threat}
                          </p>
                          
                          <div className="text-[10px] opacity-90 font-mono bg-navy-950/45 p-2 rounded-md border border-white/5 text-navy-300 leading-normal">
                            <span className="text-white font-semibold">Remediation:</span> {result.remediation}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. Password strength validator */}
            {activeTab === "entropy" && (
              <motion.div
                key="entropy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-navy-900 border border-navy-800 p-6 rounded-2xl shadow-xl space-y-6"
              >
                <div className="flex items-center gap-2 font-display text-white font-bold text-base">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <span>Credential Entropy Assessment Sandbox</span>
                </div>
                
                <p className="text-xs text-[13px] text-navy-300 font-sans leading-relaxed">
                  Cyber adversaries implement extreme computing rigs to guess user credentials. Analyze your credential entropy levels below to see what makes a password secure against brute-force attacks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                  
                  {/* Left Controls */}
                  <div className="space-y-4 bg-navy-950 border border-navy-850 p-4 rounded-xl">
                    <div>
                      <label className="block text-[10px] font-mono text-navy-400 uppercase tracking-widest mb-1.5">Input Test Credential</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={testPassword}
                          onChange={(e) => setTestPassword(e.target.value)}
                          placeholder="e.g. secure_p@ss12"
                          className="w-full bg-navy-900 border border-navy-800 focus:border-emerald-500 focus:outline-hidden rounded-xl pl-4 pr-10 py-2.5 font-mono text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-450 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[10px] text-navy-450 leading-relaxed font-sans space-y-1.5 border-t border-navy-850 pt-3">
                      <p><strong>Entropy Metric Explanations:</strong></p>
                      <p>• <strong className="text-white">Charset Size</strong>: Pool of unique alphanumeric symbols matched.</p>
                      <p>• <strong className="text-white">Entropy Bits</strong>: Mathematical value of information security bits.</p>
                      <p>• <strong className="text-white">Remediations</strong>: Safeguards suggested to avoid automated dictionary queries.</p>
                    </div>
                  </div>

                  {/* Right Results Dashboard */}
                  {testPassword.length === 0 ? (
                    <div className="border border-dashed border-navy-800 text-center py-10 rounded-xl text-navy-500 flex flex-col justify-center items-center">
                      <Unlock className="w-8 h-8 text-navy-500/30 mb-2.5" />
                      <span className="text-xs font-semibold">Test Sandbox Ready</span>
                      <span className="text-[10px] opacity-75 mt-0.5">Please provide characters in the credential box.</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      
                      {/* Grid Stats */}
                      <div className="grid grid-cols-2 gap-3 font-mono">
                        <div className="bg-navy-950 border border-navy-850/80 p-3 rounded-xl">
                          <span className="text-[9px] text-navy-500 block">SHANNON ENTROPY</span>
                          <span className="text-sm font-bold text-emerald-400">{entropyStats.entropyBits} bits</span>
                        </div>
                        <div className="bg-navy-950 border border-navy-850/80 p-3 rounded-xl">
                          <span className="text-[9px] text-navy-500 block">CHARACTER SET VALUE</span>
                          <span className="text-sm font-bold text-white">{entropyStats.charsetSize} Syms</span>
                        </div>
                        <div className="bg-navy-950 border border-navy-850/80 p-3 rounded-xl">
                          <span className="text-[9px] text-navy-500 block">BRUTE FORCE AUDIT</span>
                          <span className={`text-xs font-bold leading-normal mt-0.5 block ${
                            entropyStats.entropyBits >= 60 ? 'text-emerald-400' : 'text-rose-400'
                          }`}>{entropyStats.tier}</span>
                        </div>
                        <div className="bg-navy-950 border border-navy-850/80 p-3 rounded-xl">
                          <span className="text-[9px] text-navy-500 block">EST. CRACK LATENCY</span>
                          <span className="text-xs font-bold text-white">{entropyStats.timeToCrack}</span>
                        </div>
                      </div>

                      {/* Remediations list */}
                      <div className="p-3.5 rounded-xl bg-navy-950/45 border border-navy-850 font-sans text-xs">
                        <span className="text-white font-bold block mb-2 font-mono text-[10px]">REMEDIATION ADVISORIES:</span>
                        {entropyStats.remediations.length === 0 ? (
                          <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>This model meets secure entropy regulations! Extremely safe credentials.</span>
                          </div>
                        ) : (
                          <div className="space-y-1.5 text-[11px] text-rose-300">
                            {entropyStats.remediations.map((rec, i) => (
                              <p key={i}>• {rec}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 3. Cryptography Cipher */}
            {activeTab === "cipher" && (
              <motion.div
                key="cipher"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-navy-900 border border-navy-800 p-6 rounded-2xl shadow-xl space-y-6"
              >
                <div className="flex items-center gap-2 font-display text-white font-bold text-base">
                  <Key className="w-5 h-5 text-emerald-400" />
                  <span>Symmetric Encryptor (Caesar Shift Cipher)</span>
                </div>

                <p className="text-xs text-[13px] text-navy-300 font-sans leading-relaxed">
                  Encryption transforms intelligible plaintext data into scrambled ciphertext protocols. Set your custom character shift index below to encrypt or decode secret scripts instantaneously.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                  {/* Left Entry */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-navy-500 uppercase mb-1.5">Plaintext Input</label>
                      <textarea
                        value={cryptText}
                        onChange={(e) => setCryptText(e.target.value)}
                        rows={3}
                        className="w-full bg-navy-950 border border-navy-800 focus:border-emerald-500 focus:outline-hidden rounded-xl p-3 text-xs text-white resize-none font-mono"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-navy-400 mb-1">
                        <span>Cipher Shift Offset</span>
                        <span className="text-white font-semibold">{cipherShift} Char positions</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="25"
                        value={cipherShift}
                        onChange={(e) => setCipherShift(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-navy-850 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Right Cryptography Outputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-navy-500 uppercase mb-1.5">Resulting Ciphertext</label>
                      <div className="w-full bg-navy-950 border border-navy-800 rounded-xl p-3 h-24 font-mono text-xs text-emerald-400 break-all select-all flex items-center justify-start overflow-y-auto">
                        {cryptResult || <span className="text-navy-500">Plaintext is required...</span>}
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[10px] text-navy-300 leading-normal font-mono">
                      <span className="text-white font-bold block mb-1">CYBER LAB LOG:</span>
                      Altering character codes prevents plain-text reading. This Caesar substitution template represents historic cryptography architectures used since ancient times.
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
