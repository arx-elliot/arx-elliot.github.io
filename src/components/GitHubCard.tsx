import React, { useState } from 'react';
import { cyberAudio } from '../utils/audio';
import { Github, ExternalLink, GitBranch, Terminal, Shield, ArrowUpRight } from 'lucide-react';

interface GitHubCardProps {
  username?: string;
  className?: string;
}

export const GitHubCard: React.FC<GitHubCardProps> = ({
  username = 'arx-elliot',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const profileUrl = `https://github.com/${username}`;

  return (
    <div className="relative">
      {/* Click to view bubble indicator */}
      <div
        className={`absolute -top-8 right-6 pointer-events-none transition-all duration-200 z-30 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        <div className="px-3 py-1 rounded-full bg-slate-900 text-[10px] font-mono font-bold text-white border border-emerald-500/60 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Click to view GitHub</span>
        </div>
        <div className="w-2 h-2 bg-slate-900 border-r border-b border-emerald-500/60 rotate-45 mx-auto -mt-1" />
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          cyberAudio.playKeyClick();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => cyberAudio.playAccessGranted()}
        className={`group block p-4 rounded-xl bg-gradient-to-br from-[#0c1017] via-[#090d14] to-[#06090e] border border-slate-800 hover:border-emerald-500/80 transition-all duration-300 shadow-xl hover:shadow-emerald-500/15 ${className}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-black/60 border border-slate-700/80 flex items-center justify-center text-white group-hover:text-emerald-400 group-hover:border-emerald-500/60 transition-colors shadow-inner">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  github.com/{username}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                Red Team Repositories & Exploit Projects
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all shrink-0">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Cyber Telemetry Strip inside GitHub card */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <GitBranch className="w-3.5 h-3.5" />
            <span>BRANCH: MAIN</span>
          </span>
          <span className="text-slate-500 text-[10px]">HOSTED PROFILE</span>
          <span className="text-white font-semibold group-hover:text-emerald-300 transition-colors flex items-center gap-1">
            <span>Explore Repos</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  );
};
