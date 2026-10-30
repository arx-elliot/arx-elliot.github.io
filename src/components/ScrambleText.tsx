import React, { useEffect, useState, useRef } from 'react';
import { cyberAudio } from '../utils/audio';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  autoPlayOnMount?: boolean;
  delayMs?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const GLYPHS = '0123456789ABCDEF!@#$%&*<>_[]{}~0x';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  scrambleOnHover = true,
  autoPlayOnMount = true,
  delayMs = 0,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const isScramblingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }

      iteration += 1 / 2.2;
    }, 28);
  };

  useEffect(() => {
    if (autoPlayOnMount) {
      const timer = setTimeout(() => {
        startScramble();
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [text, autoPlayOnMount, delayMs]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      cyberAudio.playKeyClick();
      startScramble();
    }
  };

  return (
    <Component
      className={`inline-block font-mono select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
};
