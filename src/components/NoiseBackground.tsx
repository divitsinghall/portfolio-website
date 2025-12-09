// src/components/NoiseBackground.tsx
import { useEffect, useRef } from 'react';

const NoiseBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Use pseudo-random with frame-based offset for movement
        const noise = Math.random() * 255;

        data[i] = noise;     // Red
        data[i + 1] = noise; // Green
        data[i + 2] = noise; // Blue
        data[i + 3] = 8;     // Alpha (very low for 0.03 opacity feel)
      }

      ctx.putImageData(imageData, 0, 0);
      frame = (frame + 1) % 60;
    };

    const animate = () => {
      generateNoise();
      // Slow down the animation to ~10fps for subtle film grain effect
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 100);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    />
  );
};

export default NoiseBackground;