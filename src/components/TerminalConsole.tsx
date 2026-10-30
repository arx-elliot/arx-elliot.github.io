import React, { useState, useRef, useEffect } from 'react';
import { cyberAudio } from '../utils/audio';
import { Terminal, Maximize2, Minimize2, Trash2, CornerDownLeft, Shield, Gamepad2, Play } from 'lucide-react';

interface TerminalConsoleProps {
  alias: string;
  themeColor: string;
  onToggleMatrix?: () => void;
  onToggleSound?: () => void;
}

interface CommandHistoryEntry {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  alias,
  themeColor,
  onToggleMatrix,
  onToggleSound,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: 'system-boot --verbose',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">
            [+] DARK_G // SHADOW_KERNEL v6.4.12-HARDENED INITIALIZED
          </p>
          <p className="text-xs text-slate-400">
            Node: 0xDARKG // Status: UNTRACEABLE // Routing: Multi-hop Onion Mesh
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-emerald-400 font-semibold">'help'</span> to inspect available operational directives, or click quick execution directives below.
          </p>
        </div>
      ),
      timestamp: '00:00:01',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isScanning]);

  const executeCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim();
    if (!cleanCmd) return;

    cyberAudio.playChirp(750, 0.05);

    const parts = cleanCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCommandList((prev) => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (command) {
      case 'help':
        outputNode = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <p className="text-emerald-400 font-semibold">AVAILABLE CLI DIRECTIVES:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
              <div>
                <span className="text-emerald-300 font-bold">whoami</span>
                <span className="text-slate-400"> - Operative dossier & dual identity</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">skills</span>
                <span className="text-slate-400"> - Cyber offensive & defense toolkit</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">games</span>
                <span className="text-slate-400"> - Battlestation specs & competitive ranks</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">nmap &lt;target&gt;</span>
                <span className="text-slate-400"> - Execute live simulated port probe</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">crack &lt;hash&gt;</span>
                <span className="text-slate-400"> - Brute-force hash decipher sandbox</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">ctf</span>
                <span className="text-slate-400"> - Captured flags & security writeups</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">matrix</span>
                <span className="text-slate-400"> - Toggle visual matrix glyph rain</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">sound</span>
                <span className="text-slate-400"> - Toggle cyber audio synthesis</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">contact</span>
                <span className="text-slate-400"> - PGP key and encrypted comms relay</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">sudo</span>
                <span className="text-slate-400"> - Request elevated root privileges</span>
              </div>
              <div>
                <span className="text-emerald-300 font-bold">clear</span>
                <span className="text-slate-400"> - Flush console buffer</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
        outputNode = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300 border-l border-emerald-500/40 pl-3">
            <p className="text-emerald-400 font-bold">IDENTIFIER: {alias} (darkg8016)</p>
            <p className="text-slate-300">
              ROLE: Offensive Cyber Security Researcher · Exploit Analyst · High-Tier Competitive Gamer.
            </p>
            <p className="text-slate-400">
              PHILOSOPHY: "The system is never secure, only unobserved. The map is never clear, only unpushed."
            </p>
            <div className="text-xs text-slate-400 space-y-0.5">
              <p>Primary Weapon: Arch Linux / Kali Linux · Custom Neovim · Wireshark · Ghidra</p>
              <p>Secondary Weapon: RTX 4090 · Wooting 60HE Hall-Effect Keyboard · 240Hz OLED</p>
              <p>Affiliations: Independent Red Team Researcher, CTF Solo Operator, Steam High-Tier Lobbyist</p>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">SECURITY & COMBAT CAPABILITIES:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <p className="text-emerald-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Binary & Exploitation
                </p>
                <p className="text-slate-400">Ghidra, GDB-GEF, x86_64 Assembly, Buffer Overflow, ROP Gadgets, Shellcoding</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <p className="text-emerald-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Web & Network Defense
                </p>
                <p className="text-slate-400">Burp Suite Pro, SQLi, SSRF, OAuth Exploits, Wireshark Packet Dissection, Scapy</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <p className="text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" /> High-APM Gaming
                </p>
                <p className="text-slate-400">Sub-150ms Tactical Reaction, Recoil Geometry Muscle Memory, Game Engine Optimization</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <p className="text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" /> System Kernel & Hardware
                </p>
                <p className="text-slate-400">Linux Kernel Preemption, Low-Latency DPC Tuning, GPU VBIOS Undervolting, Custom Firmware</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'games':
      case 'steam':
        outputNode = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">COMPETITIVE COMBAT LOG & BATTLESTATION:</p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-white font-medium">Counter-Strike 2</span>
                <span className="text-emerald-400">Faceit Level 10 · 2,420 ELO · AWPer</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-white font-medium">Valorant</span>
                <span className="text-emerald-400">Immortal 3 · Initiator / Sova / Cypher</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-white font-medium">Cyberpunk 2077</span>
                <span className="text-cyan-400">Netrunner Stealth · 100% Achievements</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-1">
                <span className="text-white font-medium">Elden Ring / Souls</span>
                <span className="text-purple-400">RL1 No-Hit Malenia Defeated</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Rig: AMD Ryzen 9 7950X3D · RTX 4090 24GB · 64GB DDR5 · 240Hz QD-OLED · Wooting 60HE
            </p>
          </div>
        );
        break;

      case 'nmap': {
        const target = args[0] || '192.168.1.137';
        setIsScanning(true);
        cyberAudio.playScanTone();

        setTimeout(() => {
          setIsScanning(false);
          cyberAudio.playAccessGranted();
          setHistory((prev) => [
            ...prev,
            {
              command: `nmap -sV -T4 -p 22,80,443,3389,8080 ${target}`,
              output: (
                <div className="space-y-1.5 text-xs font-mono text-slate-300">
                  <p className="text-emerald-400">
                    Starting Nmap 7.94 ( https://nmap.org ) at {getTimestamp()}
                  </p>
                  <p className="text-slate-400">Nmap scan report for {target}</p>
                  <p className="text-slate-400">Host is up (0.00042s latency).</p>
                  <div className="bg-slate-950/70 p-2 rounded border border-slate-800 text-xs mt-1">
                    <p className="text-slate-400 border-b border-slate-800 pb-1">
                      PORT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE&nbsp;&nbsp;&nbsp;SERVICE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VERSION
                    </p>
                    <p className="text-emerald-400">22/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;ssh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OpenSSH 9.6p1 (Debian GLIBC)</p>
                    <p className="text-emerald-400">80/tcp&nbsp;&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;http&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nginx/1.24.0 (Custom Reverse Proxy)</p>
                    <p className="text-emerald-400">443/tcp&nbsp;&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;ssl/https&nbsp;&nbsp;&nbsp;&nbsp;Cloudflare TLS v1.3</p>
                    <p className="text-amber-400">8080/tcp&nbsp;open&nbsp;&nbsp;&nbsp;&nbsp;http-proxy&nbsp;&nbsp;&nbsp;Shadow-C2-Telemetry Gateway</p>
                  </div>
                  <p className="text-emerald-400 font-bold">
                    [+] SCAN COMPLETE: 4 open services identified. 0 vulnerabilities exposed to unauthenticated probes.
                  </p>
                </div>
              ),
              timestamp: getTimestamp(),
            },
          ]);
        }, 1200);

        outputNode = (
          <div className="text-xs text-amber-300 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Transmitting SYN probes to {target}... Analyzing returned TCP banners...</span>
          </div>
        );
        break;
      }

      case 'crack': {
        const hashToCrack = args[0] || '5f4dcc3b5aa765d61d8327deb882cf99';
        cyberAudio.playScanTone();
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-emerald-400">
              HASHCAT v6.2.6 BRUTE-FORCE DEMONSTRATION // MODE 0 (MD5)
            </p>
            <p className="text-slate-400">Target Hash: {hashToCrack}</p>
            <p className="text-slate-400">Dictionary: rockyou.txt (14,344,392 words) + rule-based mangling</p>
            <p className="text-emerald-300 font-semibold">
              [+] STATUS: CRACKED! Resulting Plaintext: <span className="text-white underline font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded">password</span>
            </p>
            <p className="text-slate-500">Hash matched in 0.003s utilizing GPU CUDA parallel hash engine.</p>
          </div>
        );
        break;
      }

      case 'ctf':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">ACTIVE CTF ENGAGEMENTS & FLAGS:</p>
            <div className="space-y-1 text-xs">
              <p className="text-slate-300">
                1. <span className="text-white font-medium">DefCon CTF Qualifier:</span> Reverse Engineering (x86_64 Binary Unpacking) - <span className="text-emerald-400">SOLVED [FLAG&#123;0xDEADBEEF_ROP_CHAIN&#125;]</span>
              </p>
              <p className="text-slate-300">
                2. <span className="text-white font-medium">HackTheBox Pro Labs:</span> Dante & Offshore Active Directory Compromise - <span className="text-emerald-400">100% FLAGS EXTRACTED</span>
              </p>
              <p className="text-slate-300">
                3. <span className="text-white font-medium">PicoCTF / Cryptography:</span> ECC Curve Weak Primes Factorization - <span className="text-emerald-400">SOLVED</span>
              </p>
              <p className="text-slate-400 mt-2">
                Tip: Scroll down to the Security Lab section on this page to test the interactive live cipher decrypter!
              </p>
            </div>
          </div>
        );
        break;

      case 'sudo':
        cyberAudio.playAccessDenied();
        outputNode = (
          <div className="text-xs text-rose-400 font-mono space-y-1">
            <p>[!] ACCESS DENIED: {alias} is not in the sudoers file.</p>
            <p className="text-slate-400">This incident will be reported to /dev/null.</p>
            <p className="text-slate-500 text-[11px]">(Nice try, script kiddie. Black hat operatives elevate via dirtyc0w or kernel exploit, not sudo!)</p>
          </div>
        );
        break;

      case 'matrix':
        if (onToggleMatrix) {
          onToggleMatrix();
          outputNode = (
            <p className="text-xs text-emerald-300">
              [+] Matrix Rain state toggled. Check page background.
            </p>
          );
        }
        break;

      case 'sound':
        if (onToggleSound) {
          onToggleSound();
          outputNode = (
            <p className="text-xs text-emerald-300">
              [+] Cyber audio synthesizer state toggled.
            </p>
          );
        }
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">ENCRYPTED COMMS RELAY:</p>
            <p>Direct Email: <span className="text-cyan-300 font-semibold">darkg8016@gmail.com</span></p>
            <p>PGP Fingerprint: <span className="text-slate-400">0x7F4A 9B88 C12D 3E01 9A55 B8F3 4400 1E99 D47B C816</span></p>
            <p>Discord / Steam: <span className="text-slate-400">darkg8016 // 0xDARKG</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        cyberAudio.playAccessDenied();
        outputNode = (
          <div className="text-xs text-rose-400 font-mono">
            <span>zsh: command not found: {cleanCmd}. Type </span>
            <span className="text-emerald-400 font-bold">'help'</span>
            <span> for list of valid operations.</span>
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cleanCmd,
        output: outputNode,
        timestamp: getTimestamp(),
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKeyClick();

    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandList[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandList.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandList[nextIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'whoami', 'skills', 'games', 'nmap', 'crack', 'ctf', 'matrix', 'sound', 'contact', 'clear'];
      const match = available.find((c) => c.startsWith(input.toLowerCase().trim()));
      if (match) {
        setInput(match);
      }
    }
  };

  const quickActions = [
    { label: 'whoami', cmd: 'whoami' },
    { label: 'skills', cmd: 'skills' },
    { label: 'games', cmd: 'games' },
    { label: 'nmap 192.168.1.1', cmd: 'nmap 192.168.1.1' },
    { label: 'crack hash', cmd: 'crack' },
    { label: 'ctf', cmd: 'ctf' },
    { label: 'help', cmd: 'help' },
  ];

  return (
    <div
      className={`transition-all duration-300 font-mono rounded-lg border border-slate-800 bg-[#080b11]/95 backdrop-blur-md shadow-2xl flex flex-col ${
        isFullscreen
          ? 'fixed inset-4 z-50 rounded-xl border-emerald-500/50 glow-box-green'
          : 'w-full h-[460px] md:h-[500px]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>bash ~ {alias.toLowerCase()}@shd-node01: zsh (tty1)</span>
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => {
              cyberAudio.playChirp(600, 0.05);
              setHistory([]);
            }}
            title="Clear buffer"
            className="p-1 hover:text-slate-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              cyberAudio.playChirp(700, 0.05);
              setIsFullscreen(!isFullscreen);
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1 hover:text-slate-200 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs md:text-sm text-slate-200"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="text-emerald-400 font-bold">┌──({alias}@shd)-[~]</span>
              <span className="text-slate-600">[{entry.timestamp}]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">└─$</span>
              <span className="text-white font-semibold">{entry.command}</span>
            </div>
            <div className="pt-0.5 pb-1">{entry.output}</div>
          </div>
        ))}

        {isScanning && (
          <div className="flex items-center gap-2 text-emerald-400 text-xs py-1">
            <span className="animate-spin">⠋</span>
            <span>Negotiating raw packet socket...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Interactive Directives Bar */}
      <div className="px-3 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
        <span className="text-slate-500 font-semibold uppercase tracking-wider shrink-0">DIRECTIVES:</span>
        {quickActions.map((action) => (
          <button
            key={action.cmd}
            onClick={() => executeCommand(action.cmd)}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-emerald-950/60 hover:text-emerald-400 hover:border-emerald-500/50 text-slate-300 border border-slate-800 transition-colors shrink-0 flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs select-none">
          {alias.toLowerCase()}@shd:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or command... (Tab to autocomplete)"
          className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none placeholder:text-slate-600"
          autoFocus
        />
        <button
          onClick={() => executeCommand(input)}
          className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
          title="Send Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
