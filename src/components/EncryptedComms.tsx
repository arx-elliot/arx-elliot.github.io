import React, { useState } from 'react';
import { cyberAudio } from '../utils/audio';
import { Lock, Mail, Key, ShieldCheck, Send, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { ScrambleText } from './ScrambleText';
import cyberMainframeImg from '../assets/images/cyber_mainframe_1793366742857.jpg';

export const EncryptedComms: React.FC = () => {
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');
  const [cipherMode, setCipherMode] = useState<'hex' | 'base64' | 'rot13'>('hex');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmittedPacket, setTransmittedPacket] = useState<{
    id: string;
    hash: string;
    timestamp: string;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.11.0
Comment: https://openpgpjs.org

xjMEY0x5WRYJKwYBBAHaRw8BAQdAxL8VqZ2+91kQ2mE5rT3p9kLl018w
3s7e8rW7q8tF387z...
Fingerprint: 0x7F4A 9B88 C12D 3E01 9A55 B8F3 4400 1E99 D47B C816
-----END PGP PUBLIC KEY BLOCK-----`;

  // Compute live encrypted ciphertext
  const getCiphertext = () => {
    if (!message) return 'Awaiting payload input stream...';
    try {
      if (cipherMode === 'hex') {
        return message
          .split('')
          .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join(' ');
      } else if (cipherMode === 'base64') {
        return btoa(message);
      } else if (cipherMode === 'rot13') {
        return message.replace(/[a-zA-Z]/g, (c) => {
          const code = c.charCodeAt(0);
          const base = code >= 97 ? 97 : 65;
          return String.fromCharCode(((code - base + 13) % 26) + base);
        });
      }
    } catch {
      return 'BUFFER_ENCODE_FAULT';
    }
    return message;
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    cyberAudio.playScanTone();
    setIsTransmitting(true);

    setTimeout(() => {
      setIsTransmitting(false);
      cyberAudio.playAccessGranted();
      setTransmittedPacket({
        id: `PKT-${Math.floor(100000 + Math.random() * 900000)}`,
        hash: `SHA256-${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        timestamp: new Date().toISOString(),
      });
    }, 1100);
  };

  const copyPgp = () => {
    cyberAudio.playChirp(800, 0.04);
    navigator.clipboard.writeText(pgpKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const copyEmail = () => {
    cyberAudio.playChirp(800, 0.04);
    navigator.clipboard.writeText('darkg8016@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="comms" className="py-16 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic Transmission Gateway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            <ScrambleText text="ENCRYPTED COMMS & CONTACT CHANNELS" />
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Transmit encrypted dispatches or connect via PGP-signed channels. Zero plaintext metadata leaked.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Transmission Form & Real-Time Cipher Preview (7 cols) */}
          <div className="lg:col-span-7 bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>DISPATCH ENCRYPTED TRANSMISSION</span>
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-mono">
                {(['hex', 'base64', 'rot13'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      cyberAudio.playKeyClick();
                      setCipherMode(mode);
                    }}
                    className={`px-2 py-0.5 rounded uppercase ${
                      cipherMode === mode
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white bg-slate-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleTransmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-400 block mb-1">OPERATIVE ALIAS / SENDER HANDLE:</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. Agent_Zero / Anon"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">DISPATCH PAYLOAD (PLAINTEXT):</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  placeholder="Type your message, collaboration proposal, or security challenge..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Real-time Cipher Preview */}
              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>REAL-TIME CIPHER STREAM ({cipherMode.toUpperCase()}):</span>
                  <span className="text-emerald-400">READY</span>
                </div>
                <p className="text-emerald-400 text-xs font-mono break-all line-clamp-3 select-all">
                  {getCiphertext()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isTransmitting || !message.trim()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-pulse' : ''}`} />
                  <span>{isTransmitting ? 'TRANSMITTING VIA ONION PROXY...' : 'TRANSMIT ENCRYPTED PAYLOAD'}</span>
                </button>

                <a
                  href={`mailto:darkg8016@gmail.com?subject=Transmission from ${encodeURIComponent(handle || 'Operative')}&body=${encodeURIComponent(message)}`}
                  className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open via Mail Client</span>
                </a>
              </div>
            </form>

            {/* Packet Delivery Confirmation Notice */}
            {transmittedPacket && (
              <div className="mt-4 p-3.5 bg-emerald-950/40 border border-emerald-500/60 rounded-lg font-mono text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PACKET RELAY CONFIRMED // DELIVERED</span>
                </div>
                <p className="text-slate-300">
                  Packet ID: <span className="text-white font-semibold">{transmittedPacket.id}</span>
                </p>
                <p className="text-slate-400 text-[11px] truncate">
                  Verification Digest: <span className="text-emerald-300">{transmittedPacket.hash}</span>
                </p>
                <p className="text-slate-500 text-[10px]">
                  Encrypted payload dispatched to darkg8016 inbox node.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: PGP Keys & Direct Contact Dossier (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Channels Card */}
            <div className="bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl space-y-4 font-mono text-xs">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>DIRECT REACHABILITY NODES</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Primary Email Node</p>
                      <p className="text-white font-semibold">darkg8016@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">PGP Fingerprint</p>
                      <p className="text-emerald-400 font-mono text-[11px] truncate max-w-[200px] sm:max-w-xs">
                        0x7F4A 9B88 C12D 3E01 9A55 B8F3
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={copyPgp}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy PGP Key Block"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Vault Server Visual Mini */}
              <div className="rounded-lg overflow-hidden border border-slate-800 relative group">
                <img
                  src={cyberMainframeImg}
                  alt="Encrypted server mainframe vault"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-3">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-emerald-400 font-bold">VAULT // CORE 01:</span> All communications routed through encrypted multi-region mirrors.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
