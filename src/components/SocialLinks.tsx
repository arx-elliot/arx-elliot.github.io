import React from 'react';
import { cyberAudio } from '../utils/audio';
import { ArrowUpRight } from 'lucide-react';

interface SocialItem {
  name: string;
  url: string;
  handle: string;
  bgBrandColor: string;
  textBrandColor: string;
  borderBrandColor: string;
  badgeBorder: string;
  iconSvg: React.ReactNode;
}

export const SocialLinks: React.FC = () => {
  const socials: SocialItem[] = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1HzKJ3fSnq/',
      handle: 'Arx Elliot',
      bgBrandColor: 'hover:bg-[#1877F2]/10',
      textBrandColor: 'text-[#1877F2]',
      borderBrandColor: 'hover:border-[#1877F2]/70',
      badgeBorder: 'border-[#1877F2]/40 text-[#1877F2] bg-[#1877F2]/10',
      iconSvg: (
        <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/arx_elliot?vrfl=a2w5czNjcTA1M3E4',
      handle: '@arx_elliot',
      bgBrandColor: 'hover:bg-[#E1306C]/10',
      textBrandColor: 'text-[#E1306C]',
      borderBrandColor: 'hover:border-[#E1306C]/70',
      badgeBorder: 'border-[#E1306C]/40 text-[#E1306C] bg-[#E1306C]/10',
      iconSvg: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ig-gradient-2)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@arx_elliot?si=CWY8zHHROexFmNoF',
      handle: '@arx_elliot',
      bgBrandColor: 'hover:bg-[#FF0000]/10',
      textBrandColor: 'text-[#FF0000]',
      borderBrandColor: 'hover:border-[#FF0000]/70',
      badgeBorder: 'border-[#FF0000]/40 text-[#FF0000] bg-[#FF0000]/10',
      iconSvg: (
        <svg className="w-5 h-5 fill-[#FF0000]" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arx-elliot?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      handle: 'arx-elliot',
      bgBrandColor: 'hover:bg-[#0A66C2]/10',
      textBrandColor: 'text-[#0A66C2]',
      borderBrandColor: 'hover:border-[#0A66C2]/70',
      badgeBorder: 'border-[#0A66C2]/40 text-[#0A66C2] bg-[#0A66C2]/10',
      iconSvg: (
        <svg className="w-5 h-5 fill-[#0A66C2]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/arx-elliot',
      handle: '@arx-elliot',
      bgBrandColor: 'hover:bg-white/10',
      textBrandColor: 'text-white',
      borderBrandColor: 'hover:border-white/60',
      badgeBorder: 'border-white/30 text-white bg-white/10',
      iconSvg: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SOCIAL & NETWORK HUBS</span>
        </span>
        <span className="text-[11px] text-emerald-400 font-semibold">CLICK TO VIEW PROFILE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => cyberAudio.playKeyClick()}
            onClick={() => cyberAudio.playAccessGranted()}
            className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 ${s.bgBrandColor} ${s.borderBrandColor} transition-all duration-200 flex items-center justify-between gap-3 group relative hover:shadow-lg`}
          >
            {/* Left side: Icon in original color + text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-black/50 border border-slate-800/80 shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                {s.iconSvg}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {s.name}
                  </span>
                </div>
                {/* Explicitly displays "Click to view profile" beside/under the icon */}
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[11px] font-bold text-emerald-400 group-hover:underline whitespace-nowrap">
                    Click to view profile
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            </div>

            {/* Subtle platform handle badge */}
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${s.badgeBorder} shrink-0 hidden sm:inline`}>
              {s.handle}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
