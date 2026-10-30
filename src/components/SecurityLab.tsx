import React, { useState } from 'react';
import { cyberAudio } from '../utils/audio';
import { Shield, Radio, KeyRound, Terminal, CheckCircle2, AlertTriangle, Bug, Copy, Check, RefreshCw } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

interface PortResult {
  port: number;
  service: string;
  state: 'open' | 'filtered' | 'closed';
  version: string;
  cve?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
}

const PRESET_TARGETS = [
  { name: 'corp-edge.internal', ip: '10.10.14.88', desc: 'Corporate Edge Router & Gateway' },
  { name: 'shadow-vault.dmz', ip: '192.168.100.42', desc: 'Financial Records Database Node' },
  { name: 'stealth-c2.mesh', ip: '172.16.5.19', desc: 'Isolated Testbed Sandbox' },
];

const SCAN_PROFILES: Record<string, PortResult[]> = {
  'corp-edge.internal': [
    { port: 22, service: 'OpenSSH', state: 'open', version: '8.4p1 Debian', cve: 'CVE-2023-38408', severity: 'medium' },
    { port: 80, service: 'HTTP', state: 'open', version: 'nginx 1.18.0', cve: 'CVE-2021-23017', severity: 'low' },
    { port: 443, service: 'HTTPS', state: 'open', version: 'OpenSSL 1.1.1k', cve: 'None (Patched)', severity: 'low' },
    { port: 3389, service: 'MS-RDP', state: 'open', version: 'Windows Terminal Server', cve: 'CVE-2019-0708 (BlueKeep Vulnerable)', severity: 'critical' },
    { port: 8080, service: 'Apache Tomcat', state: 'open', version: '9.0.41', cve: 'CVE-2020-13935', severity: 'high' },
  ],
  'shadow-vault.dmz': [
    { port: 53, service: 'DNS', state: 'open', version: 'BIND 9.16.1', cve: 'None', severity: 'low' },
    { port: 443, service: 'HTTPS', state: 'open', version: 'Envoy Proxy 1.25.1', severity: 'low' },
    { port: 3306, service: 'MySQL', state: 'open', version: 'Oracle MySQL 8.0.28', cve: 'CVE-2022-21444', severity: 'high' },
    { port: 6379, service: 'Redis', state: 'open', version: 'Redis 6.2.5 (Unauthenticated)', cve: 'CVE-2022-0543 (Remote Code Exec)', severity: 'critical' },
  ],
  'stealth-c2.mesh': [
    { port: 22, service: 'SSH', state: 'open', version: 'Dropbear sshd 2020.81', severity: 'low' },
    { port: 4444, service: 'Metasploit Listener', state: 'open', version: 'Meterpreter Reverse TCP', cve: 'Active C2 Beacon', severity: 'critical' },
    { port: 9001, service: 'Tor Relay', state: 'open', version: 'tor 0.4.7.13', severity: 'medium' },
  ],
};

export const SecurityLab: React.FC = () => {
  // Scanner state
  const [selectedTarget, setSelectedTarget] = useState(PRESET_TARGETS[0].name);
  const [customIP, setCustomIP] = useState(PRESET_TARGETS[0].name);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<PortResult[] | null>(SCAN_PROFILES['corp-edge.internal']);
  const [scanProgress, setScanProgress] = useState(100);

  // Cipher tool state
  const [cipherInput, setCipherInput] = useState('RkxBR3tiTDRja19oNHRfZzRtM3JfMjAyNn0=');
  const [decodedOutput, setDecodedOutput] = useState('');
  const [cipherType, setCipherType] = useState<'base64' | 'hex' | 'rot13' | 'reverse'>('base64');
  const [copied, setCopied] = useState(false);

  // Scanner run handler
  const handleStartScan = () => {
    cyberAudio.playScanTone();
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      setScanProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        cyberAudio.playAccessGranted();
        const results = SCAN_PROFILES[selectedTarget] || SCAN_PROFILES['corp-edge.internal'];
        setScanResults(results);
      }
    }, 140);
  };

  // Decode algorithms
  const decodeCipher = (text: string, type: 'base64' | 'hex' | 'rot13' | 'reverse') => {
    try {
      if (type === 'base64') {
        return atob(text.trim());
      } else if (type === 'hex') {
        const clean = text.replace(/\s+/g, '');
        let str = '';
        for (let i = 0; i < clean.length; i += 2) {
          str += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
        }
        return str;
      } else if (type === 'rot13') {
        return text.replace(/[a-zA-Z]/g, (char) => {
          const code = char.charCodeAt(0);
          const base = code >= 97 ? 97 : 65;
          return String.fromCharCode(((code - base + 13) % 26) + base);
        });
      } else if (type === 'reverse') {
        return text.split('').reverse().join('');
      }
      return text;
    } catch {
      return '[!] DECRYPTION ERROR: Invalid encoding byte sequence.';
    }
  };

  const handleDecode = (type: 'base64' | 'hex' | 'rot13' | 'reverse') => {
    cyberAudio.playChirp(820, 0.05);
    setCipherType(type);
    const result = decodeCipher(cipherInput, type);
    setDecodedOutput(result);
  };

  const copyToClipboard = (text: string) => {
    cyberAudio.playChirp(1000, 0.04);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="security-lab" className="py-16 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offensive Reconnaissance & Cryptography Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            <ScrambleText text="SECURITY ARSENAL & VULNERABILITY LAB" />
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Live interactive security testbeds. Execute simulated network reconnaissance probes against mock targets or inspect and crack encrypted challenge flags.
          </p>
        </div>

        {/* 2-Column Split: Network Port Scanner & Interactive Cryptography Decrypter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Network Reconnaissance Scanner (7 cols) */}
          <div className="lg:col-span-7 bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-display font-bold text-white">RECONNAISSANCE SCANNER SIMULATOR</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400/90">
                SYN_STEALTH v4.2
              </span>
            </div>

            {/* Target Selectors */}
            <div className="space-y-3 mb-4">
              <label className="text-xs font-mono text-slate-400 block">SELECT TARGET FOR AUDIT:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PRESET_TARGETS.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      cyberAudio.playKeyClick();
                      setSelectedTarget(t.name);
                      setCustomIP(t.name);
                    }}
                    className={`p-2.5 text-left rounded border transition-all text-xs font-mono ${
                      selectedTarget === t.name
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-emerald-300 truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{t.ip}</p>
                  </button>
                ))}
              </div>

              {/* IP Input & Action */}
              <div className="flex gap-2 mt-2">
                <div className="flex-1 flex items-center bg-slate-950 rounded border border-slate-800 px-3 py-1.5 text-xs font-mono">
                  <span className="text-emerald-500 mr-2">probe://</span>
                  <input
                    type="text"
                    value={customIP}
                    onChange={(e) => setCustomIP(e.target.value)}
                    className="bg-transparent text-white w-full focus:outline-none"
                    placeholder="hostname or ip"
                  />
                </div>
                <button
                  onClick={handleStartScan}
                  disabled={isScanning}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'PROBING...' : 'EXECUTE SCAN'}</span>
                </button>
              </div>
            </div>

            {/* Scan Progress Bar */}
            {isScanning && (
              <div className="my-3 space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>DISPATCHING SYN PACKETS...</span>
                  <span className="text-emerald-400">{scanProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-150"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Scan Results Display */}
            {scanResults && !isScanning && (
              <div className="mt-4 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Target: <span className="text-white font-semibold">{selectedTarget}</span></span>
                  <span className="text-emerald-400 text-[11px]">Audit Status: COMPLETED</span>
                </div>

                <div className="overflow-x-auto rounded border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3 font-medium">PORT</th>
                        <th className="py-2 px-3 font-medium">SERVICE</th>
                        <th className="py-2 px-3 font-medium">VERSION</th>
                        <th className="py-2 px-3 font-medium">VULNERABILITY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                      {scanResults.map((p) => (
                        <tr key={p.port} className="hover:bg-slate-900/40">
                          <td className="py-2 px-3 text-emerald-400 font-bold tabular-nums">
                            {p.port}/tcp
                          </td>
                          <td className="py-2 px-3 text-slate-200">{p.service}</td>
                          <td className="py-2 px-3 text-slate-400">{p.version}</td>
                          <td className="py-2 px-3">
                            {p.severity === 'critical' ? (
                              <span className="text-rose-400 flex items-center gap-1 font-semibold">
                                <AlertTriangle className="w-3 h-3 shrink-0" />
                                <span>{p.cve || 'Critical RCE'}</span>
                              </span>
                            ) : p.severity === 'high' ? (
                              <span className="text-amber-400 flex items-center gap-1 font-medium">
                                <Bug className="w-3 h-3 shrink-0" />
                                <span>{p.cve || 'High Risk'}</span>
                              </span>
                            ) : (
                              <span className="text-slate-500">Secure</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <p>
                    Operative Assessment: High-value attack surfaces identified on exposed database and administrative ports. Exploitation chain feasible via buffer vulnerability.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Cryptography & CTF Flag Decrypter (5 cols) */}
          <div className="lg:col-span-5 bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-display font-bold text-white">CTF CIPHER & FLAG DECODER</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                SOLVER_ENGINE
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Paste encrypted payload or select preset CTF challenge strings to test the client-side cryptanalysis engine.
            </p>

            {/* Quick Presets */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-500">SAMPLE CHALLENGES:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    setCipherInput('RkxBR3tiTDRja19oNHRfZzRtM3JfMjAyNn0=');
                    setDecodedOutput('');
                  }}
                  className="px-2 py-1 text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                >
                  Flag 01 (Base64)
                </button>
                <button
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    setCipherInput('68 61 63 6b 20 74 68 65 20 70 6c 61 6e 65 74');
                    setDecodedOutput('');
                  }}
                  className="px-2 py-1 text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                >
                  Payload 02 (Hex)
                </button>
                <button
                  onClick={() => {
                    cyberAudio.playKeyClick();
                    setCipherInput('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT');
                    setDecodedOutput('');
                  }}
                  className="px-2 py-1 text-[11px] font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
                >
                  C-Three (ROT13)
                </button>
              </div>
            </div>

            {/* Input Ciphertext */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 block">ENCRYPTED INPUT:</label>
              <textarea
                value={cipherInput}
                onChange={(e) => setCipherInput(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                placeholder="Enter base64, hex or cipher text..."
              />
            </div>

            {/* Decoder Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => handleDecode('base64')}
                className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                  cipherType === 'base64' && decodedOutput
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                Base64
              </button>
              <button
                onClick={() => handleDecode('hex')}
                className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                  cipherType === 'hex' && decodedOutput
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                Hex to ASCII
              </button>
              <button
                onClick={() => handleDecode('rot13')}
                className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                  cipherType === 'rot13' && decodedOutput
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                ROT-13
              </button>
              <button
                onClick={() => handleDecode('reverse')}
                className={`py-1.5 px-2 text-xs font-mono rounded border transition-colors ${
                  cipherType === 'reverse' && decodedOutput
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                Reverse
              </button>
            </div>

            {/* Decoded Result Box */}
            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>PLAINTEXT RESOLUTION:</span>
                {decodedOutput && (
                  <button
                    onClick={() => copyToClipboard(decodedOutput)}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
              <p className="font-mono text-xs text-white min-h-[44px] break-all select-all font-semibold">
                {decodedOutput || <span className="text-slate-600 font-normal italic">Click a decode algorithm above to decipher...</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Offensive Arsenal Badges / Methodology */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 space-y-2">
            <h4 className="text-sm font-display font-semibold text-emerald-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> 01. Binary Exploitation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Disassembling stripped ELF/PE binaries in Ghidra & IDA Pro. Crafting memory corruption exploits, ROP chains, format string leaks, and shellcode payloads.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 space-y-2">
            <h4 className="text-sm font-display font-semibold text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> 02. Red Team Web Audits
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated and manual web vulnerability hunting. Specializing in advanced authentication bypasses, SSRF in cloud microservices, and prototype pollution.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 space-y-2">
            <h4 className="text-sm font-display font-semibold text-emerald-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> 03. Tactical Network Warfare
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Packet injection with Scapy, Wireshark traffic telemetry analysis, man-in-the-middle vector probing, and hardened pivot proxy configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
