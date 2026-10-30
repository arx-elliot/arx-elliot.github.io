import React, { useState, useRef } from 'react';
import { cyberAudio } from '../utils/audio';
import { Gamepad2, Cpu, Monitor, Zap, Trophy, Crosshair, Sparkles, Flame, Check } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

// Using generated high-res battlestation rig asset
import battlestationImg from '../assets/images/battlestation_rig_1793366742917.jpg';

export const GamerBattlestation: React.FC = () => {
  // Reaction test state
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [reactionMessage, setReactionMessage] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startReactionTest = () => {
    cyberAudio.playChirp(600, 0.05);
    setReactionState('waiting');
    setReactionTime(null);

    const randomDelay = 1500 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setReactionState('ready');
      cyberAudio.playAccessGranted();
    }, randomDelay);
  };

  const handleBoxClick = () => {
    if (reactionState === 'idle') {
      startReactionTest();
    } else if (reactionState === 'waiting') {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setReactionState('result');
      setReactionTime(null);
      setReactionMessage('Too early! Disqualified probe. Try again.');
      cyberAudio.playAccessDenied();
    } else if (reactionState === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setReactionState('result');
      cyberAudio.playScanTone();

      if (elapsed < 160) {
        setReactionMessage('Godlike Reflexes // Tier 0 Esports Pro!');
      } else if (elapsed < 210) {
        setReactionMessage('Exceptional Reflexes // High-Tier Competitive!');
      } else {
        setReactionMessage('Solid Response Time // Ready for Combat.');
      }
    } else if (reactionState === 'result') {
      startReactionTest();
    }
  };

  const games = [
    {
      title: 'Counter-Strike 2',
      badge: 'Faceit Level 10 · 2,420 ELO',
      role: 'AWP Sniper & Tactical Caller',
      metrics: '1.42 K/D · 67.4% Headshot · 2,800+ Hours',
      accent: 'border-emerald-500/40 text-emerald-400',
    },
    {
      title: 'Valorant',
      badge: 'Immortal 3 Peak',
      role: 'Initiator / Info Gatherer (Sova, Fade)',
      metrics: '280 ACS · 72% Winrate in 5-stacks',
      accent: 'border-cyan-500/40 text-cyan-400',
    },
    {
      title: 'Cyberpunk 2077',
      badge: 'Netrunner Legend',
      role: 'Overclock Cyberdeck & Stealth Infiltration',
      metrics: '100% Achievements · Very Hard Solo',
      accent: 'border-amber-500/40 text-amber-400',
    },
    {
      title: 'Elden Ring & Soulsborne',
      badge: 'Master of Deflection',
      role: 'Rune Level 1 Challenge Run Specialist',
      metrics: 'No-Hit Malenia · All Remembrance Bosses',
      accent: 'border-purple-500/40 text-purple-400',
    },
  ];

  const rigSpecs = [
    { icon: <Cpu className="w-4 h-4 text-emerald-400" />, label: 'CPU Processor', value: 'AMD Ryzen 9 7950X3D (16-Core, PBO Tuned)' },
    { icon: <Zap className="w-4 h-4 text-emerald-400" />, label: 'Graphics Card', value: 'NVIDIA GeForce RTX 4090 24GB GDDR6X' },
    { icon: <Sparkles className="w-4 h-4 text-emerald-400" />, label: 'RAM Memory', value: '64GB G.Skill Trident Z5 DDR5-6000 CL30' },
    { icon: <Monitor className="w-4 h-4 text-emerald-400" />, label: 'Primary Display', value: '49" Samsung Odyssey OLED G9 (240Hz, 0.03ms)' },
    { icon: <Gamepad2 className="w-4 h-4 text-emerald-400" />, label: 'Input Controls', value: 'Wooting 60HE (0.1mm Rapid Trigger) + G Pro X 4K' },
  ];

  return (
    <section id="battlestation" className="py-16 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center justify-center sm:justify-start gap-2">
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tactical Battlestation & Esports Dossier</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            <ScrambleText text="HIGH-OCTANE GAMING COMBAT RIG" />
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Where cyber offensive engineering meets competitive esports. Tuned for zero-latency frame timing, rapid micro-flicks, and unmatched mechanical precision.
          </p>
        </div>

        {/* Battlestation Image Banner with Cyber Hud Overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-10 shadow-2xl group">
          <img
            src={battlestationImg}
            alt="Futuristic gamer battlestation and security command center"
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-96 md:h-[420px] object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
                COMMAND STATION 01 // OVERCLOCKED
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                BATTLESTATION & TELEMETRY HUB
              </h3>
              <p className="text-xs text-slate-300 max-w-lg hidden sm:block">
                Custom liquid-cooled loop, dual vertical surveillance monitors for packet sniffers, ultra-wide primary panel for panoramic tactical games.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
              <Crosshair className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>REFLEX DELTA: &lt;140ms</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Hardware Specs & Interactive Reflex Tester */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Hardware Specs Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl">
            <h3 className="text-sm font-display font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>HARDWARE ARSENAL & PERFORMANCE TUNING</span>
            </h3>

            <div className="space-y-3">
              {rigSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-slate-800/70">{spec.icon}</div>
                    <span className="text-slate-400 font-mono">{spec.label}</span>
                  </div>
                  <span className="text-white font-mono font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>KERNEL: Linux Zen 6.7 + Custom Wayland / DWM</span>
              <span className="text-emerald-400">FPS CAP: 500+ Stable</span>
            </div>
          </div>

          {/* Interactive Reflex & Reaction Time Simulator (5 cols) */}
          <div className="lg:col-span-5 bg-[#080b11] rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-emerald-400" />
                <span>INTERACTIVE REFLEX SPEED TEST</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">APM_PROBE</span>
            </div>

            <p className="text-xs text-slate-400">
              Test your neuro-mechanical reflex speed against darkg8016's benchmark (&lt;150ms).
            </p>

            {/* Click Target Box */}
            <div
              onClick={handleBoxClick}
              className={`cursor-pointer h-44 rounded-xl border-2 flex flex-col items-center justify-center p-4 text-center select-none transition-all duration-150 ${
                reactionState === 'idle'
                  ? 'bg-slate-900/60 border-slate-700 hover:border-emerald-500 hover:bg-slate-800/60'
                  : reactionState === 'waiting'
                  ? 'bg-rose-950/40 border-rose-600 animate-pulse'
                  : reactionState === 'ready'
                  ? 'bg-emerald-500 border-white text-slate-950 shadow-2xl scale-[1.02]'
                  : 'bg-slate-900/90 border-emerald-500'
              }`}
            >
              {reactionState === 'idle' && (
                <div className="space-y-1">
                  <Flame className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white font-mono">CLICK TO INITIATE TEST</p>
                  <p className="text-[11px] text-slate-400">Wait for the screen to turn GREEN, then click instantly!</p>
                </div>
              )}

              {reactionState === 'waiting' && (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-rose-400 font-mono uppercase tracking-widest">
                    STAND BY...
                  </p>
                  <p className="text-[11px] text-slate-300">Keep crosshairs primed... Do not click yet!</p>
                </div>
              )}

              {reactionState === 'ready' && (
                <div className="space-y-1 text-slate-950">
                  <p className="text-2xl font-black font-display tracking-tight">CLICK NOW!</p>
                  <p className="text-xs font-bold font-mono">STRIKE TARGET IMMEDIATELY</p>
                </div>
              )}

              {reactionState === 'result' && (
                <div className="space-y-1.5 font-mono">
                  {reactionTime !== null ? (
                    <>
                      <p className="text-3xl font-display font-extrabold text-emerald-400 tabular-nums">
                        {reactionTime} ms
                      </p>
                      <p className="text-xs text-white font-semibold">{reactionMessage}</p>
                      <p className="text-[11px] text-slate-400 pt-1">Click to retry test</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-rose-400 uppercase">{reactionMessage}</p>
                      <p className="text-[11px] text-slate-400 pt-1">Click to retry</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-1">
              <span>Benchmark: Human Average ~250ms</span>
              <span className="text-emerald-400 font-semibold">DARK_G Record: 138ms</span>
            </div>
          </div>
        </div>

        {/* Competitive Titles & Ranks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <div
              key={game.title}
              className={`p-4 rounded-xl bg-slate-900/40 border ${game.accent} hover:border-emerald-400/80 transition-all space-y-2`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-display font-bold text-white">{game.title}</h4>
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-xs font-mono font-semibold text-emerald-400">{game.badge}</p>
              <p className="text-xs text-slate-300 font-medium">{game.role}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                {game.metrics}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
