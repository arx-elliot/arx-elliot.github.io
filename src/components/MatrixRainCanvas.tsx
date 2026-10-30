import React, { useEffect, useRef } from 'react';

interface MatrixRainCanvasProps {
  color?: string;
  opacity?: number;
  className?: string;
  enabled?: boolean;
}

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({
  color = '#00ff66',
  opacity = 0.14,
  className = '',
  enabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '0123456789ABCDEF0x<>{}[]+=*~#!:;µ§¢£';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
    };

    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const fpsInterval = 1000 / 28; // ~28fps authentic terminal pacing

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      // Semi-transparent background fade
      ctx.fillStyle = 'rgba(5, 6, 8, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is bright cyan/white, tail is colored
        const isLeading = Math.random() > 0.85;
        ctx.fillStyle = isLeading ? '#ffffff' : color;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, color]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
    />
  );
};
