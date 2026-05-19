'use client';

/**
 * BackgroundEffects — lightweight CSS-only ambient visuals.
 * Floating gradient orbs + grid + floating dots for depth.
 */
export function BackgroundEffects() {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'float-orb 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-[15%] -left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'float-orb 25s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)',
            filter: 'blur(50px)',
            animation: 'float-orb 30s ease-in-out infinite 5s',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Floating micro-dots */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
        {[
          { top: '12%', left: '8%', size: 3, delay: '0s', dur: '18s' },
          { top: '25%', left: '85%', size: 2, delay: '3s', dur: '22s' },
          { top: '55%', left: '15%', size: 2, delay: '7s', dur: '20s' },
          { top: '70%', left: '75%', size: 3, delay: '2s', dur: '25s' },
          { top: '40%', left: '45%', size: 2, delay: '10s', dur: '28s' },
          { top: '80%', left: '30%', size: 2, delay: '5s', dur: '23s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              backgroundColor: 'var(--accent)',
              opacity: 0.15,
              animation: `float-dot ${dot.dur} ease-in-out infinite ${dot.delay}`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
          75% { transform: translate(20px, 10px) scale(1.02); }
        }
        @keyframes float-dot {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          25% { transform: translate(15px, -25px); opacity: 0.25; }
          50% { transform: translate(-10px, 20px); opacity: 0.1; }
          75% { transform: translate(20px, 5px); opacity: 0.2; }
        }
      `}</style>
    </>
  );
}
