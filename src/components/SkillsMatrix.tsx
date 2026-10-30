import React from 'react';
import { cyberAudio } from '../utils/audio';
import { Terminal, Shield, Code, Cpu, Gamepad2, Radio, Binary, Sparkles } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  level: string;
}

const SKILLS: SkillItem[] = [
  {
    id: '01',
    name: 'C++',
    category: 'Exploit Engineering',
    description: 'Low-level memory exploitation, buffer overflow craft, customized malware loader design.',
    icon: <Code className="w-4 h-4 text-emerald-400" />,
    level: 'Advanced',
  },
  {
    id: '02',
    name: 'Python',
    category: 'Offensive Scripting',
    description: 'Custom socket automation, raw packet injection with Scapy, rapid vulnerability proof-of-concepts.',
    icon: <Terminal className="w-4 h-4 text-emerald-400" />,
    level: 'Master',
  },
  {
    id: '03',
    name: 'Kali Linux',
    category: 'Security OS',
    description: 'Root system operation, customized security kernels, offensive penetration tooling ecosystem.',
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    level: 'Expert',
  },
  {
    id: '04',
    name: 'Red Team Penetration Testing',
    category: 'Offensive Security',
    description: 'Active Directory compromise, stealth pivot tunneling, endpoint defense evasion, credential dumping.',
    icon: <Cpu className="w-4 h-4 text-cyan-400" />,
    level: 'Elite',
  },
  {
    id: '05',
    name: 'Reverse Engineering & Binary Audits',
    category: 'Vulnerability Research',
    description: 'Stripped binary disassembly via Ghidra/GDB, ROP chain formulation, x86_64 assembly analysis.',
    icon: <Binary className="w-4 h-4 text-purple-400" />,
    level: 'Specialist',
  },
  {
    id: '06',
    name: 'Network Infrastructure Infiltration',
    category: 'Recon & Traffic',
    description: 'Wireshark deep packet inspection, man-in-the-middle interception, protocol tunneling, Nmap.',
    icon: <Radio className="w-4 h-4 text-amber-400" />,
    level: 'Senior',
  },
  {
    id: '07',
    name: 'Aggressive Competitive Gaming',
    category: 'Tactical Esports',
    description: 'Sub-150ms reflex reaction time, mechanical flick precision, tactical server domination.',
    icon: <Gamepad2 className="w-4 h-4 text-rose-400" />,
    level: 'Top-Tier',
  },
];

export const SkillsMatrix: React.FC = () => {
  return (
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            OPERATIONAL SKILLS ARSENAL (SERIAL BY RANK)
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-semibold">07 DISCIPLINES</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {SKILLS.map((skill) => (
          <div
            key={skill.id}
            onMouseEnter={() => cyberAudio.playKeyClick()}
            className="group p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-xs font-bold text-emerald-400 font-mono tabular-nums px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 shrink-0">
                {skill.id}
              </span>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-slate-800/80 shrink-0">
                  {skill.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">· {skill.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>

            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-800/50 self-end sm:self-auto shrink-0 border border-slate-700/60">
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
