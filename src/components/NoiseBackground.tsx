// src/components/NoiseBackground.tsx
const NoiseBackground = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.015] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default NoiseBackground;