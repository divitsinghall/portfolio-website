const NoiseBackground = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="pedroduarteisalegend">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.80" 
            numOctaves="4" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#pedroduarteisalegend)" />
      </svg>
    </div>
  );
};

export default NoiseBackground;