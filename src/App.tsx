import React, { useState, useRef } from 'react';
import { cyberAudio } from './utils/audio';
import { ScrambleText } from './components/ScrambleText';
import { ParticleBackground } from './components/ParticleBackground';
import { GitHubCard } from './components/GitHubCard';
import { SkillsMatrix } from './components/SkillsMatrix';
import { SocialLinks } from './components/SocialLinks';
import {
  Volume2,
  VolumeX,
  Tv,
  Shield,
  Gamepad2,
  Terminal,
  Upload,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Lock,
  Mail,
  Download,
} from 'lucide-react';

export default function App() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isCrtActive, setIsCrtActive] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('/Image.PNG');
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleSound = () => {
    const newState = cyberAudio.toggle();
    setIsSoundEnabled(newState);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setHasCustomImage(true);
      cyberAudio.playAccessGranted();
    }
  };

  return (
    <div className={`min-h-screen bg-[#050608] text-slate-200 ${isCrtActive ? 'crt-effect' : ''} relative flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 font-sans`}>
      {/* Subtle Floating Interactive Cyber Particles */}
      <ParticleBackground />

      {/* Top Bar Contract (Single-row, 3-zone standard) */}
      <header className="sticky top-0 z-40 bg-[#050608]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
          {/* Zone 1: Single brand wordmark */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-sm inline-block shadow-[0_0_8px_#00ff78]" />
            <a
              href="#"
              className="text-base font-display font-black tracking-wider text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            >
              ARX ELLIOT
            </a>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              // SAHADAT HOSSAIN
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-400">
            <a href="#about-section" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              01. Identity
            </a>
            <a href="#skills-section" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              02. Skills
            </a>
            <a href="#github-section" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              03. GitHub
            </a>
            <a href="#comms-section" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
              04. Comms
            </a>
          </nav>

          {/* Zone 3: Utilities & Contact Action */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={isSoundEnabled ? 'Disable Cyber Audio' : 'Enable Cyber Audio'}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* CRT Toggle */}
            <button
              onClick={() => {
                cyberAudio.playKeyClick();
                setIsCrtActive(!isCrtActive);
              }}
              title="Toggle Retro CRT Scanlines"
              className={`p-1.5 rounded-lg border transition-colors ${
                isCrtActive
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
            </button>

            {/* 1-Click Download for GitHub */}
            <a
              href="/arx-elliot-github-website.zip"
              download="arx-elliot-github-website.zip"
              onClick={() => cyberAudio.playAccessGranted()}
              title="Download Ready-to-Drop GitHub Website ZIP"
              className="px-3 py-1.5 text-xs font-mono font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download ZIP</span>
            </a>

            {/* Direct Contact Button */}
            <a
              href="mailto:darkg8016@gmail.com"
              onClick={() => cyberAudio.playChirp(700, 0.04)}
              className="px-3 py-1.5 text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,102,0.3)]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container: Compact, Single-Screen Focused Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: 5:3 Aspect Ratio Image Frame + Dedicated GitHub Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* 5:3 Ratio Image Container */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0a0d14] border border-slate-800 shadow-2xl group">
              {/* Corner Cyber Accents */}
              <div className="absolute top-2 left-2 z-20 text-[10px] font-mono text-emerald-400/80 pointer-events-none select-none">
                ┌─ [ID: ARX-01]
              </div>
              <div className="absolute top-2 right-2 z-20 text-[10px] font-mono text-emerald-400/80 pointer-events-none select-none">
                [RATIO 5:3] ─┐
              </div>

              {/* Exact 5:3 Aspect Ratio Container */}
              <div className="aspect-[5/3] w-full relative overflow-hidden bg-slate-950">
                <img
                  src={imageSrc}
                  alt="Arx Elliot (Sahadat Hossain) Profile"
                  onError={(e) => {
                    // Fallback to internal generated asset if Image.PNG not yet placed
                    e.currentTarget.src = '/Image.PNG';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-black/30 to-transparent" />
                
                {/* Operative Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-black/75 px-2 py-0.5 rounded border border-emerald-500/40">
                      OPERATIVE // CODENAME
                    </span>
                    <h2 className="text-lg font-display font-black text-white tracking-wide mt-1 drop-shadow-md">
                      Arx Elliot
                    </h2>
                    <p className="text-xs font-mono text-slate-300">
                      Sahadat Hossain
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                    Image.PNG
                  </span>
                </div>
              </div>

              {/* Image Toolbar (Allows instant file testing for GitHub repo preview) */}
              <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px] truncate">
                  Target: <code className="text-emerald-400 font-bold">Image.PNG</code>
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-[11px] flex items-center gap-1.5 transition-colors"
                    title="Upload / Preview custom photo in real-time"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{hasCustomImage ? 'Change Image' : 'Preview Photo'}</span>
                  </button>

                  <a
                    href="/arx-elliot-github-website.zip"
                    download="arx-elliot-github-website.zip"
                    onClick={() => cyberAudio.playAccessGranted()}
                    className="px-2.5 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/40 text-[11px] flex items-center gap-1.5 transition-colors font-bold"
                    title="Download ZIP for GitHub"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download ZIP</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Status / Operational Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">DOMAIN</span>
                  <span className="text-white font-bold text-[11px]">Red Team Pentest</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
                <Gamepad2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">GAMING</span>
                  <span className="text-white font-bold text-[11px]">Aggressive Esports</span>
                </div>
              </div>
            </div>

            {/* Dedicated Interactive GitHub UI Showcase Card */}
            <div id="github-section">
              <GitHubCard username="arx-elliot" />
            </div>
          </div>

          {/* RIGHT COLUMN: Animated Title, Narrative Bio, Serial Skills, Social Links (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Identity Kicker */}
            <div id="about-section" className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">CYBER SECURITY ENGINEER</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>RED TEAM PENETRATION TESTER</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-cyan-400 font-semibold">COMPETITIVE GAMER</span>
              </div>

              {/* Bold Text With Decryption Animation (Exact text requested) */}
              <div className="border-b border-slate-800/80 pb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
                  <ScrambleText
                    text="About Arx Elliot (Sahadat Hossain)"
                    className="glow-green text-white"
                  />
                </h1>
              </div>
            </div>

            {/* Biography Narrative (Verbatim requested text + expanded tactical cyber/gaming prose) */}
            <div className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="font-normal text-slate-200">
                Operating in the digital underworld, I am a <strong className="text-white font-semibold">Cyber Security Engineer</strong> and <strong className="text-emerald-400 font-semibold">Red Team Penetration Tester</strong>. I wield <strong className="text-emerald-300 font-semibold">C++</strong> and <strong className="text-emerald-300 font-semibold">Python</strong> to infiltrate and dismantle complex network infrastructures. As a professional <strong className="text-cyan-300 font-semibold">Kali Linux</strong> user, I expertly navigate the shadows for security research. Dominator of underworld cyber security, commanding the digital deep with absolute authority.
              </p>
              <p className="font-normal text-slate-300">
                My dominance extends to the gaming arena, where I reign as an <strong className="text-rose-400 font-semibold">aggressive, competitive gamer</strong>, bringing relentless precision and tactical ruthlessness to every server I conquer.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-mono bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                Forged in adversarial testbeds and high-stakes CTF battlegrounds, I engineer low-level exploit chains, weaponize memory corruptions, and dismantle hardened defensive perimeters. In the gaming lobby, this translates into sub-150ms reflex times, ruthless map control, and unwavering mechanical execution.
              </p>
            </div>

            {/* Serial Skills Matrix (Numbered 01 to 07) */}
            <div id="skills-section">
              <SkillsMatrix />
            </div>

            {/* Social Media Network Links Strip */}
            <div id="comms-section" className="pt-2">
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>

      {/* Minimalist Cyber Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-4 bg-[#050608]/90 font-mono text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-white font-bold">Arx Elliot (Sahadat Hossain)</span>
            <span aria-hidden="true">·</span>
            <span>All Systems Hardened</span>
            <span aria-hidden="true">·</span>
            <span>Ready for GitHub Repository</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://github.com/arx-elliot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>github.com/arx-elliot</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <a
              href="mailto:darkg8016@gmail.com"
              className="hover:text-emerald-400 transition-colors"
            >
              darkg8016@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
