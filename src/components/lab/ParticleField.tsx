import { useMemo } from "react";

export const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 3 + Math.random() * 6,
        delay: `${Math.random() * 6}s`,
        duration: `${6 + Math.random() * 8}s`
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0 bg-grid opacity-[0.08]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/60 blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animation: `floatUp ${particle.duration} ease-in-out ${particle.delay} infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          from { transform: translate3d(0, 0, 0) scale(0.96); opacity: .3; }
          to { transform: translate3d(0, -18px, 0) scale(1.15); opacity: .9; }
        }
      `}</style>
    </div>
  );
};
